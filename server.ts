import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API: Loader logic moved to root with browser detection
  app.get("/", async (req, res, next) => {
    const userAgent = req.headers["user-agent"] || "";
    const accept = req.headers["accept"] || "";

    // Check if it's a browser request
    const isBrowser = accept.includes("text/html");

    // If it's a browser, let it pass to Vite/Static serving
    if (isBrowser && !userAgent.includes("Roblox")) {
      return next();
    }

    // --- ANTI-EVERYTHING PROTECTIONS ---
    
    // 1. ANTI-CURL & ANTI-WGET
    if (userAgent.includes("curl") || userAgent.includes("wget") || userAgent.includes("HTTPie")) {
      return res.status(403).send("Access Denied: Tool not allowed.");
    }

    // 2. ANTI-PYTHON
    if (userAgent.includes("Python") || userAgent.includes("requests") || userAgent.includes("urllib") || userAgent.includes("aiohttp")) {
      return res.status(403).send("Access Denied: Python scripts not allowed.");
    }

    // 3. ANTI-SCRAPPER
    if (userAgent.includes("scrapy") || userAgent.includes("bot") || userAgent.includes("crawler") || userAgent.includes("spider")) {
      return res.status(403).send("Access Denied: Scrapers not allowed.");
    }

    // 5. ANTI-CRACK / DYNAMIC SIGNATURE
    const hour = new Date().getUTCHours();
    const signature = Buffer.from(`pinathub-auth-${hour}`).toString('base64');
    
    // Random delay 100-500ms
    const delay = Math.floor(Math.random() * 400) + 100;

    setTimeout(() => {
      // Protected Lua Script Response using Environment Variable
      const targetUrl = process.env.LOADER_URL || "https://pinathub2.vercel.app/api/loader";
      
      // Basic protection: Hex encoding the URL to prevent simple string scraping
      const hexUrl = targetUrl.split('').map(c => '\\' + c.charCodeAt(0).toString(10)).join('');

      const luaScript = `-- PinatHub Protected Loader
-- Signature: ${signature}
-- Generated at: ${new Date().toISOString()}

local _0xPinat = "${hexUrl}"
local function _0xExecute(_0xData)
    local _0xStatus, _0xError = pcall(function()
        loadstring(game:HttpGet(_0xData))()
    end)
    if not _0xStatus then
        warn("PinatHub Error: " .. tostring(_0xError))
    end
end

print("PinatHub Secure Loading...")
_0xExecute(_0xPinat)
`;
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("X-Signature", signature);
      res.send(luaScript);
    }, delay);
  });

  // API: Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
