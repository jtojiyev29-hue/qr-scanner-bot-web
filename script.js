```javascript
const cameraSelect = document.getElementById("cameraSelect");
const startBtn = document.getElementById("startScan");
const resultElement = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");
const sendBtn = document.getElementById("sendBtn");

let html5QrCode;
let currentCameraId = null;
let lastScannedCode = null;

// Kameralarni yuklash
Html5Qrcode.getCameras().then(devices => {
  devices.forEach(device => {
    let option = document.createElement("option");
    option.value = device.id;
    option.text = device.label || `Camera ${cameraSelect.length + 1}`;
    cameraSelect.appendChild(option);
  });
  if (devices.length > 0) {
    currentCameraId = devices[0].id;
  }
});

cameraSelect.addEventListener("change", (e) => {
  currentCameraId = e.target.value;
});

// Skaner boshlash
startBtn.addEventListener("click", () => {
  if (html5QrCode) {
    html5QrCode.stop().then(() => {
      html5QrCode.clear();
    });
  }

  html5QrCode = new Html5Qrcode("preview");
  html5QrCode.start(
    currentCameraId,
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      lastScannedCode = decodedText;
      resultElement.textContent = decodedText;
    },
    (error) => {}
  ).catch(err => {
    console.error("Camera start error:", err);
  });
});

// Copy tugmasi
copyBtn.addEventListener("click", () => {
  if (lastScannedCode) {
    navigator.clipboard.writeText(lastScannedCode);
    alert("✅ Barcode copied!");
  }
});

// Botga yuborish tugmasi
sendBtn.addEventListener("click", () => {
  if (lastScannedCode) {
    // Universal link - foydalanuvchi botga yuboradi
    const botUsername = "aynimocheck_bot"; // Bot username qo'yasiz
    window.open(`https://t.me/${botUsername}?start=${lastScannedCode}`, "_blank");
  }
});