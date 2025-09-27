const resultElement = document.getElementById("result");
let lastScanned = null;

function startScanner() {
  const html5QrCode = new Html5Qrcode("preview");
  html5QrCode.start(
    { facingMode: "environment" }, // Telefon uchun orqa kamera
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      lastScanned = decodedText;
      resultElement.textContent = decodedText;
    },
    (errorMessage) => {
      // console.log("Skaner xatosi:", errorMessage);
    }
  ).catch(err => {
    console.error("Kamerani ochib bo‘lmadi:", err);
    alert("Kamerani ochib bo‘lmadi: " + err);
  });
}

startScanner();

// 📋 Copy tugmasi
document.getElementById("copyBtn").addEventListener("click", () => {
  if (lastScanned) {
    navigator.clipboard.writeText(lastScanned);
    alert("Barcode copied: " + lastScanned);
  }
});

// 📤 Send to Bot tugmasi
document.getElementById("sendBtn").addEventListener("click", () => {
  if (lastScanned) {
    const botUsername = "@aynimo_check_bot"; // 🔹 Bot username yozing
    const message = encodeURIComponent(lastScanned);
    window.open(`https://t.me/${botUsername}?start=${message}`, "_blank");
  }
});