// // llm.js
// import "dotenv/config";
// import OpenAI from "openai";

// // สร้าง client ไว้ที่ไฟล์นี้ไฟล์เดียว
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // ฟังก์ชันเรียกโมเดล (ให้ server.js เรียกใช้งาน)
// export async function chatWithLLM(message) {
//   const resp = await openai.chat.completions.create({
//     // model: "gpt-4o-mini", // เปลี่ยนเป็นรุ่นที่บัญชีคุณใช้ได้
//     model: "GPT-3.5 Turbo", // เปลี่ยนเป็นรุ่นที่บัญชีคุณใช้ได้
//     messages: [{ role: "user", content: message }],
//     temperature: 0.7,
//   });
//   return resp.choices?.[0]?.message?.content ?? "";
// }


// backend/llm.js

import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function chatWithLLM(message) {
  if (!message || typeof message !== 'string') return '';

  const resp = await openai.chat.completions.create({
    model: 'gpt-4o-mini',   // หรือใช้ 'gpt-3.5-turbo'
    messages: [{ role: 'user', content: message }],
    temperature: 0.3,
  });

  return resp.choices?.[0]?.message?.content?.trim() ?? '';
}
