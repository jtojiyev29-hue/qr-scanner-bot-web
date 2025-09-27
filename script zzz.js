// 🔹 Telegram Bot ma'lumotlari
const TELEGRAM_BOT_TOKEN = "BOT_TOKENINGIZNI_QOYING"; 
const CHAT_ID = "CHAT_IDINGIZNI_QOYING";

let lastScanned = null;

// 🔹 Botga yuborish funksiyasi
function sendToTelegram(barcode) {
  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: `📦 Barcode skanerlandi: ${barcode}`
    }),
  }).then(() => {
    alert("✅ Botga yuborildi!");
  });
}

// 🔹 Barcode topilganda ishlaydi
function onScanSuccess(decodedText) {
  lastScanned = decodedText;
  document.getElementById("result").innerText = `✅ Scanned: ${decodedText}`;
  document.getElementById("sendBtn").style.display = "block"; // tugma paydo bo'ladi
}

// 🔹 Tugma bosilganda yuborish
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sendBtn").addEventListener("click", () => {
    if (lastScanned) {
      sendToTelegram(lastScanned);
    } else {
      alert("Avval barcode skanerlashingiz kerak!");
    }
  });
});

// 🔹 Scanner ishga tushirish
const html5QrcodeScanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 250
});
html5QrcodeScanner.render(onScanSuccess);