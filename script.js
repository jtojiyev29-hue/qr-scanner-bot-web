const cameraSelect = document.getElementById("cameraSelect");
const startScanBtn = document.getElementById("startScan");
const resultElement = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");
const sendBtn = document.getElementById("sendBtn");
let html5QrCode;
let selectedCameraId = null;

async function loadCameras() {
  try {
    const devices = await Html5Qrcode.getCameras();
    cameraSelect.innerHTML = "";
    devices.forEach((device) => {
      const option = document.createElement("option");
      option.value = device.id;
      option.text = device.label || `Camera ${cameraSelect.length + 1}`;
      cameraSelect.appendChild(option);
    });
    if (devices.length > 0) {
      selectedCameraId = devices[0].id;
    }
  } catch (err) {
    console.error("Camera error:", err);
  }
}

cameraSelect.addEventListener("change", (e) => {
  selectedCameraId = e.target.value;
});

startScanBtn.addEventListener("click", () => {
  if (!selectedCameraId) return alert("No camera selected!");
  if (html5QrCode) {
    html5QrCode.stop().catch(() => {});
  }
  html5QrCode = new Html5Qrcode("reader");
  html5QrCode.start(
    { deviceId: { exact: selectedCameraId } },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      resultElement.textContent = decodedText;
    }
  );
});

copyBtn.addEventListener("click", () => {
  const text = resultElement.textContent;
  if (text && text !== "None") {
    navigator.clipboard.writeText(text);
    alert("Barcode copied!");
  }
});

sendBtn.addEventListener("click", () => {
  const barcode = resultElement.textContent;
  if (barcode && barcode !== "None") {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.sendData(barcode);
      alert("Barcode sent to bot!");
    } else {
      alert("Telegram WebApp not available!");
    }
  }
});

loadCameras();
