import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Dedicated API endpoint for the loader
  app.get("/api/loader", async (req, res) => {
    const userAgent = req.headers["user-agent"] || "";
    
    // Function to send a "Safe" Lua error
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
      // Protected Lua Script Response using a "Mini VM" approach
      const targetUrl = process.env.LOADER_URL || "https://pinathub2.vercel.app/api/loader";
      const executionCode = `loadstring(game:HttpGet("${targetUrl}"))()`;
      
      // Encrypt the execution code (Simple shift encryption for the "VM")
      const key = Math.floor(Math.random() * 10) + 1;
      const encryptedBytes = executionCode.split('').map(c => c.charCodeAt(0) + key);

      const luaScript = `-- PinatHub Virtualized Loader
-- Signature: ${signature}
-- Built with PinatVM v1.0.4

local _0xVM = {
    _0xData = {${encryptedBytes.join(',')}},
    _0xKey = ${key},
    _0xRun = function(self)
        local _0xOut = ""
        local _0xS = string.char
        for _0xI = 1, #self._0xData do
            _0xOut = _0xOut .. _0xS(self._0xData[_0xI] - self._0xKey)
        end
        local _0xRes, _0xErr = pcall(function()
            return loadstring(_0xOut)()
        end)
        if not _0xRes then
            warn("PinatVM Runtime Error: " .. tostring(_0xErr))
        end
    end
}

print("PinatHub: Initializing Virtual Machine...")
_0xVM:_0xRun()
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
