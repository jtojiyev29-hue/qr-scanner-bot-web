let scannedCode = null;
const BOT_TOKEN = "7860502264:AAFHPo_CXGQPJw6repdVstx7jP26FHMb0wY";
const CHAT_ID = "5869442579";

document.getElementById("start-scan").addEventListener("click", () => {
  const html5QrCode = new Html5Qrcode("scanner-container");
  Html5Qrcode.getCameras().then((devices) => {
    if (devices && devices.length) {
      const cameraId = devices[0].id;
      html5QrCode.start(
        cameraId,
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          scannedCode = decodedText;
          document.getElementById("scanned-code").innerText = scannedCode;
        }
      );
    }
  });
});

// Copy button
document.getElementById("copy-btn").addEventListener("click", () => {
  if (scannedCode) {
    navigator.clipboard.writeText(scannedCode);
    alert("Copied: " + scannedCode);
  } else {
    alert("No code scanned yet.");
  }
});

// Send to Bot button
document.getElementById("send-btn").addEventListener("click", () => {
  if (scannedCode) {
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: "📦 Scanned Code: " + scannedCode
      })
    })
    .then(res => res.json())
    .then(data => {
      alert("Sent to bot successfully!");
    })
    .catch(err => alert("Error sending to bot: " + err));
  } else {
    alert("No code scanned to send.");
  }
});
