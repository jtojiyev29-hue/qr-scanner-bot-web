// O'zingizning bot token va chat ID ni shu yerga yozasiz
const TELEGRAM_BOT_TOKEN = "7860502264:AAFHPo_CXGQPJw6repdVstx7jP26FHMb0wY"; 
const CHAT_ID = "101429378131515453662";

function sendToTelegram(barcode) {
  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: `📦 Barcode skanerlandi: ${barcode}`
    }),
  });
}

function onScanSuccess(decodedText) {
  document.getElementById("result").innerText = `Scanned: ${decodedText}`;
  sendToTelegram(decodedText);
}

const html5QrcodeScanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 250
});
html5QrcodeScanner.render(onScanSuccess);