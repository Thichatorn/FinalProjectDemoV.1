// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("diagramForm");
//   const inputText = document.getElementById("inputText");
//   const output = document.getElementById("output");

document.getElementById("sendBtn").addEventListener("click", async () => {
  const message = document.getElementById("userInput").value;

  const res = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  document.getElementById("chatOutput").innerText = data.reply;
});

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // ป้องกัน reload หน้า

  const text = inputText.value;

  try {
    const response = await fetch("http://localhost:8000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    const code = data.diagram_code;

    // แสดงโค้ด Mermaid
    output.innerHTML = `<pre class="mermaid">${code}</pre>`;
    if (window.mermaid) {
      mermaid.init(undefined, output); // render diagram ด้วย mermaid.js
    }
  } catch (err) {
    output.innerHTML = `<p style="color:red;">เกิดข้อผิดพลาด: ${err}</p>`;
  }
});

document.getElementById("generateBtn").addEventListener("click", () => {
  const code = document.getElementById("inputText").value;
  const output = document.getElementById("output");
  output.innerHTML = `<pre class="mermaid">${code}</pre>`;
  if (window.mermaid) {
    mermaid.init(undefined, output);
  }
});


