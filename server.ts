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
    // Browsers usually have 'Mozilla' in UA and accept 'text/html'
    const isBrowser = accept.includes("text/html") && userAgent.includes("Mozilla");
    const isRoblox = userAgent.includes("Roblox") || userAgent.includes("RobloxApp");

    // If it's a browser and NOT Roblox, show the website
    if (isBrowser && !isRoblox) {
      return next();
    }

    // Function to send a "Safe" Lua error instead of letting loadstring fail with nil
    const sendLuaError = (msg: string) => {
      res.setHeader("Content-Type", "text/plain");
      return res.send(`warn("PinatHub Error: ${msg}"); print("Check your connection or headers.");`);
    };

    // --- ANTI-EVERYTHING PROTECTIONS ---
    
    // 1. ANTI-CURL & ANTI-WGET
    if (userAgent.includes("curl") || userAgent.includes("wget") || userAgent.includes("HTTPie")) {
      return sendLuaError("Tool not allowed (Curl/Wget)");
    }

    // 2. ANTI-PYTHON
    if (userAgent.includes("Python") || userAgent.includes("requests") || userAgent.includes("urllib") || userAgent.includes("aiohttp")) {
      return sendLuaError("Python scripts not allowed");
    }

    // 3. ANTI-SCRAPPER
    if (userAgent.includes("scrapy") || userAgent.includes("bot") || userAgent.includes("crawler") || userAgent.includes("spider")) {
      return sendLuaError("Scrapers not allowed");
    }

    // 5. ANTI-CRACK / DYNAMIC SIGNATURE
    const hour = new Date().getUTCHours();
    const signature = Buffer.from(`pinathub-auth-${hour}`).toString('base64');
    
    // Random delay 100-300ms for realism
    const delay = Math.floor(Math.random() * 200) + 100;

    setTimeout(() => {
      // Protected Lua Script Response using Environment Variable
      const targetUrl = process.env.LOADER_URL || "https://pinathub2.vercel.app/api/loader";
      
      // Basic protection: Hex encoding the URL
      const hexUrl = targetUrl.split('').map(c => '\\' + c.charCodeAt(0).toString(10)).join('');

      const luaScript = `-- PinatHub Protected Loader
-- Signature: ${signature}
-- Generated at: ${new Date().toISOString()}

local _0xPinat = "${hexUrl}"
local function _0xExecute(_0xData)
    local _0xStatus, _0xError = pcall(function()
        local _0xBody = game:HttpGet(_0xData)
        if _0xBody:find("404") or _0xBody:find("Not Found") then
            error("Target Loader URL returned 404. Is your repo public?")
        end
        loadstring(_0xBody)()
    end)
    if not _0xStatus then
        warn("PinatHub Execution Error: " .. tostring(_0xError))
        print("Make sure your GitHub Repo is PUBLIC if using raw links.")
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
