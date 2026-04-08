import fetch from "node-fetch";

let queue = [];
let isProcessing = false;

// ⏳ delay function (rate limit safe)
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// 📩 Send WhatsApp via UltraMsg
const sendWhatsApp = async (data) => {
  try {
    const message = `✨ *Salon Appointment Confirmed* ✨

👤 Name: ${data.name}
💇 Service: ${data.service}
🎯 Stylist: ${data.stylist}
📅 Date: ${data.date}
⏰ Time: ${data.time}

Thank you ❤️`;

    const url = `https://api.ultramsg.com/${process.env.ULTRA_INSTANCE}/messages/chat`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: process.env.ULTRA_TOKEN,
        to: `91${data.mobile}`, // India format
        body: message,
      }),
    });

    const result = await response.json();

    console.log("✅ WhatsApp Sent:", result);
  } catch (error) {
    console.log("❌ WhatsApp Error:", error.message);
  }
};

// 🔁 Process queue (one-by-one send)
const processQueue = async () => {
  if (isProcessing) return;

  isProcessing = true;

  while (queue.length > 0) {
    const job = queue.shift();

    await sendWhatsApp(job);

    await delay(3000); // ⏳ 3 sec gap (VERY IMPORTANT)
  }

  isProcessing = false;
};

// ➕ Add to queue
export const addToQueue = (data) => {
  queue.push(data);
  processQueue();
};