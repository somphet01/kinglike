const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const dataDir = path.join(root, "data");
const storePath = path.join(dataDir, "store.json");
const port = Number(process.env.PORT || 4173);

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml"
};

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store"
  });
  res.end(body);
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
  try {
    return JSON.parse(fs.readFileSync(storePath, "utf8"));
  } catch (error) {
    return { products: [], promotion: {}, updatedAt: null };
  }
}

function writeStore(data) {
  fs.mkdirSync(dataDir, { recursive: true });
  const clean = {
    products: Array.isArray(data.products) ? data.products : [],
    promotion: data.promotion && typeof data.promotion === "object" ? data.promotion : {},
    updatedAt: new Date().toISOString()
  };
  fs.writeFileSync(storePath, JSON.stringify(clean, null, 2));
  return clean;
}

function safeStaticPath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const requested = decoded === "/" ? "/index.html" : decoded;
  const filePath = path.normalize(path.join(root, requested));
  return filePath.startsWith(root) ? filePath : null;
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.url.startsWith("/api/store")) {
      if (req.method === "GET") {
        send(res, 200, JSON.stringify(readStore()), "application/json; charset=utf-8");
        return;
      }
      if (req.method === "POST") {
        const body = await readBody(req);
        const saved = writeStore(JSON.parse(body || "{}"));
        send(res, 200, JSON.stringify(saved), "application/json; charset=utf-8");
        return;
      }
      send(res, 405, "Method not allowed");
      return;
    }

    const filePath = safeStaticPath(req.url);
    if (!filePath || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      send(res, 404, "Not found");
      return;
    }

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
});
