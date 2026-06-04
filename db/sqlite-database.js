const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

function createSqliteDatabase(options = {}) {
  const root = options.root || path.join(__dirname, "..");
  const dataDir = path.join(root, "data");
  const dbPath = path.join(dataDir, "kinglike.db");
  const legacyStorePath = path.join(dataDir, "store.json");
  const legacyOrdersPath = path.join(dataDir, "orders.json");

  fs.mkdirSync(dataDir, { recursive: true });

  const db = new DatabaseSync(dbPath);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS store_state (
      id TEXT PRIMARY KEY,
      products_json TEXT NOT NULL,
      promotion_json TEXT NOT NULL,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      order_code TEXT,
      status TEXT,
      customer_name TEXT,
      customer_phone TEXT,
      total_amount INTEGER DEFAULT 0,
      created_at TEXT,
      updated_at TEXT,
      payload_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS order_logs (
      id TEXT PRIMARY KEY,
      order_id TEXT,
      created_at TEXT,
      payload_json TEXT NOT NULL
    );
  `);

  function readJsonFile(filePath, fallback) {
    try {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (error) {
      return fallback;
    }
  }

  function parseJson(value, fallback) {
    try {
      return JSON.parse(value || "");
    } catch (error) {
      return fallback;
    }
  }

  function ensureMigrated() {
    const storeRow = db.prepare("SELECT id FROM store_state WHERE id = ?").get("main");
    if (!storeRow) {
      const legacy = readJsonFile(legacyStorePath, { products: [], promotion: {}, updatedAt: null });
      writeStore(legacy, { preserveUpdatedAt: true });
    }

    const orderCount = db.prepare("SELECT COUNT(*) AS count FROM orders").get().count;
    if (!orderCount) {
      const legacy = readJsonFile(legacyOrdersPath, { orders: [], logs: [] });
      writeOrders(legacy);
    }
  }

  function readStore() {
    const row = db.prepare("SELECT products_json, promotion_json, updated_at FROM store_state WHERE id = ?").get("main");
    if (!row) return { products: [], promotion: {}, updatedAt: null };
    return {
      products: parseJson(row.products_json, []),
      promotion: parseJson(row.promotion_json, {}),
      updatedAt: row.updated_at || null
    };
  }

  function writeStore(data, options = {}) {
    const updatedAt = options.preserveUpdatedAt && data.updatedAt ? data.updatedAt : new Date().toISOString();
    const clean = {
      products: Array.isArray(data.products) ? data.products : [],
      promotion: data.promotion && typeof data.promotion === "object" ? data.promotion : {},
      updatedAt
    };
    db.prepare(`
      INSERT INTO store_state (id, products_json, promotion_json, updated_at)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        products_json = excluded.products_json,
        promotion_json = excluded.promotion_json,
        updated_at = excluded.updated_at
    `).run("main", JSON.stringify(clean.products), JSON.stringify(clean.promotion), clean.updatedAt);
    return clean;
  }

  function normalizeOrdersData(data) {
    return {
      orders: Array.isArray(data.orders) ? data.orders : [],
      logs: Array.isArray(data.logs) ? data.logs : []
    };
  }

  function readOrders() {
    const orders = db.prepare("SELECT payload_json FROM orders ORDER BY created_at DESC, rowid DESC").all()
      .map((row) => parseJson(row.payload_json, null))
      .filter(Boolean);
    const logs = db.prepare("SELECT payload_json FROM order_logs ORDER BY created_at DESC, rowid DESC").all()
      .map((row) => parseJson(row.payload_json, null))
      .filter(Boolean);
    return { orders, logs };
  }

  function writeOrders(data) {
    const clean = normalizeOrdersData(data);
    db.exec("BEGIN");
    try {
      db.exec("DELETE FROM order_logs");
      db.exec("DELETE FROM orders");
      const orderStmt = db.prepare(`
        INSERT INTO orders (id, order_code, status, customer_name, customer_phone, total_amount, created_at, updated_at, payload_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const logStmt = db.prepare(`
        INSERT INTO order_logs (id, order_id, created_at, payload_json)
        VALUES (?, ?, ?, ?)
      `);
      clean.orders.forEach((order) => {
        orderStmt.run(
          String(order.id || cryptoId()),
          String(order.orderCode || ""),
          String(order.status || ""),
          String(order.customerName || ""),
          String(order.customerPhone || ""),
          Number(order.totalAmount || 0),
          String(order.createdAt || ""),
          String(order.updatedAt || ""),
          JSON.stringify(order)
        );
      });
      clean.logs.forEach((log) => {
        logStmt.run(
          String(log.id || cryptoId()),
          String(log.orderId || ""),
          String(log.createdAt || ""),
          JSON.stringify(log)
        );
      });
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    }
    return clean;
  }

  function cryptoId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  ensureMigrated();

  return {
    backend: "sqlite",
    dbPath,
    readStore,
    writeStore,
    readOrders,
    writeOrders
  };
}

module.exports = {
  createSqliteDatabase
};
