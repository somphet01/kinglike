const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const database = require("./database");

const root = __dirname;
const dataDir = path.join(root, "data");
const port = Number(process.env.PORT || 4173);
const adminPassword = process.env.ADMIN_PASSWORD || "kinglike2026";
const sessionSecret = process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");
const sessionCookie = "kinglike_admin";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime"
};

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function redirect(res, location) {
  res.writeHead(302, {
    Location: location,
    "Cache-Control": "no-store"
  });
  res.end();
}

function parseCookies(header = "") {
  return Object.fromEntries(header.split(";").map((part) => {
    const [key, ...value] = part.trim().split("=");
    return [key, decodeURIComponent(value.join("=") || "")];
  }).filter(([key]) => key));
}

function adminToken() {
  return crypto.createHmac("sha256", sessionSecret).update(adminPassword).digest("hex");
}

function isAdmin(req) {
  return parseCookies(req.headers.cookie)[sessionCookie] === adminToken();
}

function requireAdmin(req, res, { api = false } = {}) {
  if (isAdmin(req)) return true;
  if (api) {
    send(res, 401, JSON.stringify({ error: "Admin login required" }), "application/json; charset=utf-8");
    return false;
  }
  redirect(res, "/admin-login.html");
  return false;
}

function setAdminCookie(res) {
  res.setHeader("Set-Cookie", `${sessionCookie}=${encodeURIComponent(adminToken())}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`);
}

function clearAdminCookie(res) {
  res.setHeader("Set-Cookie", `${sessionCookie}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 75 * 1024 * 1024) {
        reject(new Error("Request body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function readStore() {
  return database.readStore();
}

function readOrders() {
  return database.readOrders();
}

function writeOrders(data) {
  return database.writeOrders(data);
}

function orderCode() {
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  return `KL${stamp}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function validateSlip(slip) {
  if (!slip || typeof slip !== "object") throw new Error("Slip is required");
  if (!["image/jpeg", "image/png", "application/pdf"].includes(slip.type)) {
    throw new Error("Slip must be JPG, PNG, or PDF");
  }
  if (Number(slip.size || 0) > 5 * 1024 * 1024) {
    throw new Error("Slip file must be 5MB or smaller");
  }
  if (!String(slip.dataUrl || "").startsWith(`data:${slip.type};base64,`)) {
    throw new Error("Slip data is invalid");
  }
}

function createOrder(payload) {
  const items = Array.isArray(payload.items) ? payload.items : [];
  const isChatDraft = payload.mode === "chat_draft" || payload.paymentMethod === "chat" || Boolean(payload.contactChannel);
  if (!isChatDraft && (!payload.customerName || !payload.customerPhone)) {
    throw new Error("Name and phone are required");
  }
  if (!items.length) throw new Error("Order items are required");
  if (!isChatDraft) validateSlip(payload.slip);

  const now = new Date().toISOString();
  const normalizedItems = items.map((item) => {
    const quantity = Math.max(1, Number(item.quantity || 1));
    const unitPrice = Math.max(0, Number(item.unitPrice || 0));
    return {
      id: crypto.randomUUID(),
      productId: String(item.productId || ""),
      productName: String(item.productName || "Kinglike product"),
      size: String(item.size || ""),
      quantity,
      unitPrice,
      subtotal: quantity * unitPrice
    };
  });
  const totalAmount = normalizedItems.reduce((sum, item) => sum + item.subtotal, 0);
  const order = {
    id: crypto.randomUUID(),
    orderCode: orderCode(),
    customerName: String(payload.customerName || (isChatDraft ? "Website chat customer" : "")).trim(),
    customerPhone: String(payload.customerPhone || "").trim(),
    customerWhatsapp: String(payload.customerWhatsapp || payload.customerPhone || "").trim(),
    customerAddress: String(payload.customerAddress || "").trim(),
    note: String(payload.note || "").trim(),
    contactChannel: String(payload.contactChannel || "whatsapp"),
    productLink: String(payload.productLink || ""),
    chatMessage: String(payload.chatMessage || ""),
    totalAmount,
    status: isChatDraft ? "draft" : "checking",
    paymentMethod: isChatDraft ? "chat" : "qr_transfer",
    slip: isChatDraft ? null : payload.slip,
    adminNote: "",
    items: normalizedItems,
    createdAt: now,
    updatedAt: now
  };
  const data = readOrders();
  data.orders.unshift(order);
  data.logs.unshift({
    id: crypto.randomUUID(),
    orderId: order.id,
    oldStatus: "",
    newStatus: order.status,
    changedBy: "customer",
    note: isChatDraft ? `Chat draft via ${order.contactChannel}` : "Order submitted with slip",
    createdAt: now
  });
  writeOrders(data);
  return order;
}

function updateOrderStatus(id, payload) {
  const allowed = new Set(["draft", "checking", "paid", "rejected", "shipping", "completed", "cancelled"]);
  if (!allowed.has(payload.status)) throw new Error("Invalid status");
  const data = readOrders();
  const order = data.orders.find((item) => item.id === id || item.orderCode === id);
  if (!order) throw new Error("Order not found");
  const oldStatus = order.status;
  order.status = payload.status;
  order.adminNote = String(payload.adminNote || order.adminNote || "");
  order.updatedAt = new Date().toISOString();
  data.logs.unshift({
    id: crypto.randomUUID(),
    orderId: order.id,
    oldStatus,
    newStatus: order.status,
    changedBy: "admin",
    note: order.adminNote,
    createdAt: order.updatedAt
  });
  writeOrders(data);
  return { order, logs: data.logs.filter((log) => log.orderId === order.id) };
}

function writeStore(data) {
  return database.writeStore(data);
}

function safeStaticPath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const requested = decoded === "/" ? "/index.html" : decoded;
  const filePath = path.normalize(path.join(root, requested));
  return filePath.startsWith(root) ? filePath : null;
}

const server = http.createServer(async (req, res) => {
  try {
    const reqUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);

    if (reqUrl.pathname === "/api/admin/session") {
      send(res, 200, JSON.stringify({ authenticated: isAdmin(req) }), "application/json; charset=utf-8");
      return;
    }

    if (reqUrl.pathname === "/api/admin/login") {
      if (req.method !== "POST") {
        send(res, 405, "Method not allowed");
        return;
      }
      const body = JSON.parse(await readBody(req) || "{}");
      if (String(body.password || "") !== adminPassword) {
        send(res, 401, JSON.stringify({ error: "Invalid password" }), "application/json; charset=utf-8");
        return;
      }
      setAdminCookie(res);
      send(res, 200, JSON.stringify({ ok: true }), "application/json; charset=utf-8");
      return;
    }

    if (reqUrl.pathname === "/api/admin/logout") {
      clearAdminCookie(res);
      send(res, 200, JSON.stringify({ ok: true }), "application/json; charset=utf-8");
      return;
    }

    if (req.url.startsWith("/api/store")) {
      if (req.method === "GET") {
        send(res, 200, JSON.stringify(readStore()), "application/json; charset=utf-8");
        return;
      }
      if (req.method === "POST") {
        if (!requireAdmin(req, res, { api: true })) return;
        const body = await readBody(req);
        const saved = writeStore(JSON.parse(body || "{}"));
        send(res, 200, JSON.stringify(saved), "application/json; charset=utf-8");
        return;
      }
      send(res, 405, "Method not allowed");
      return;
    }

    if (reqUrl.pathname === "/api/orders") {
      if (req.method === "GET") {
        if (!requireAdmin(req, res, { api: true })) return;
        const data = readOrders();
        send(res, 200, JSON.stringify(data), "application/json; charset=utf-8");
        return;
      }
      if (req.method === "POST") {
        const body = await readBody(req);
        const order = createOrder(JSON.parse(body || "{}"));
        send(res, 200, JSON.stringify(order), "application/json; charset=utf-8");
        return;
      }
      send(res, 405, "Method not allowed");
      return;
    }

    const orderMatch = reqUrl.pathname.match(/^\/api\/orders\/([^/]+)$/);
    if (orderMatch && req.method === "GET") {
      const data = readOrders();
      const order = data.orders.find((item) => item.id === orderMatch[1] || item.orderCode === orderMatch[1]);
      if (!order) {
        send(res, 404, "Order not found");
        return;
      }
      send(res, 200, JSON.stringify({ order, logs: data.logs.filter((log) => log.orderId === order.id) }), "application/json; charset=utf-8");
      return;
    }

    const statusMatch = reqUrl.pathname.match(/^\/api\/orders\/([^/]+)\/status$/);
    if (statusMatch && req.method === "PATCH") {
      if (!requireAdmin(req, res, { api: true })) return;
      const body = await readBody(req);
      const result = updateOrderStatus(statusMatch[1], JSON.parse(body || "{}"));
      send(res, 200, JSON.stringify(result), "application/json; charset=utf-8");
      return;
    }

    const filePath = safeStaticPath(req.url);
    if (!filePath || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      send(res, 404, "Not found");
      return;
    }

    if (["/admin.html", "/admin-orders.html"].includes(reqUrl.pathname) && !requireAdmin(req, res)) return;

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mime[ext] || "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-store" : "public, max-age=60"
    });
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    send(res, 500, error.message || "Server error");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Kinglike server running at http://localhost:${port}/`);
  console.log(`Database backend: ${database.backend}${database.dbPath ? ` (${database.dbPath})` : ""}`);
});
