// // server.js  (Node >= 18, Express 5, ESM)
// import express from "express";
// import cors from "cors";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import { chatWithLLM } from "./llm.js";   // ✅ ใช้ฟังก์ชันกลางจาก llm.js

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ----- Paths -----
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const FRONTEND_DIR = path.resolve(__dirname, "../frontend");
// const INDEX_HTML = path.join(FRONTEND_DIR, "index.html");

// // Debug paths
// console.log("📁 FRONTEND_DIR:", FRONTEND_DIR);
// console.log("📄 INDEX_HTML exists?:", fs.existsSync(INDEX_HTML));

// // Health check
// app.get("/health", (_req, res) => res.json({ ok: true }));

// // Static frontend
// app.use(express.static(FRONTEND_DIR));
// app.get("/", (_req, res) => res.sendFile(INDEX_HTML));

// // ===== API: แชตกับโมเดล =====
// app.post("/api/chat", async (req, res) => {
//   try {
//     const { message } = req.body ?? {};
//     if (!message) return res.status(400).json({ error: "message is required" });

//     const reply = await chatWithLLM(message);
//     return res.json({ reply });
//   } catch (err) {
//     console.error("LLM error:", err?.response?.data || err);
//     return res.status(500).json({ error: "Server error", detail: err?.message });
//   }
// });

// // Catch-all สำหรับหน้าเว็บ (ยกเว้น API/health) — ใช้ regex ที่ Express 5 รองรับ
// app.get(/^\/(?!api)(?!health).*/, (_req, res, next) => {
//   if (!fs.existsSync(INDEX_HTML)) return next();
//   return res.sendFile(INDEX_HTML);
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });


// backend/server.js  (Node >= 18, Express 5, ESM)
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { chatWithLLM } from './llm.js';

const app = express();
app.use(cors());
app.use(express.json());

// ----- Paths -----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONTEND_DIR = path.resolve(__dirname, '../frontend');
const INDEX_HTML = path.join(FRONTEND_DIR, 'index.html');

console.log('📁 FRONTEND_DIR:', FRONTEND_DIR);
console.log('📄 INDEX_HTML exists?:', fs.existsSync(INDEX_HTML));

// ----- Health check -----
app.get('/health', (_req, res) => res.json({ ok: true }));

// ----- Static frontend -----
app.use(express.static(FRONTEND_DIR));
app.get('/', (_req, res) => res.sendFile(INDEX_HTML));

// ----- API: แชตกับโมเดล -----
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body ?? {};
    const reply = await chatWithLLM(message ?? '');
    res.json({ reply });
  } catch (err) {
    console.error('LLM error:', err);
    res.status(500).json({ error: 'LLM failed', details: String(err?.message ?? err) });
  }
});

// ----- Fallback: ส่ง index.html สำหรับเส้นทางที่ไม่ใช่ /api หรือ /health -----
app.get(/^\/(?!api)(?!health).*/, (_req, res, next) => {
  if (!fs.existsSync(INDEX_HTML)) return next();
  return res.sendFile(INDEX_HTML);
});

// ----- Start server -----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
