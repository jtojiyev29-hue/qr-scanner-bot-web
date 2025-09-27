const codeReader = new ZXing.BrowserMultiFormatReader();
const resultElement = document.getElementById('result');
const copyBtn = document.getElementById('copyBtn');
const sendBtn = document.getElementById('sendBtn');
const galleryBtn = document.getElementById('galleryBtn');
const fileInput = document.getElementById('fileInput');

// Orqa kamerani avtomatik yoqish
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
  .then(stream => {
    const video = document.getElementById('video');
    video.srcObject = stream;
    video.setAttribute("playsinline", true);
    video.play();

    codeReader.decodeFromVideoDevice(null, 'video', (result, err) => {
      if (result) {
        resultElement.textContent = result.text;
      }
    });
  })
  .catch(err => {
    alert("Camera access denied: " + err);
  });

// Gallerydan skanerlash
galleryBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      codeReader.decodeFromImage(undefined, reader.result).then((result) => {
        resultElement.textContent = result.text;
      }).catch(err => {
        resultElement.textContent = "Not found!";
      });
    };
    reader.readAsDataURL(file);
  }
});

// Copy tugmasi
copyBtn.addEventListener('click', () => {
  const barcode = resultElement.textContent;
  if (barcode && barcode !== "None") {
    navigator.clipboard.writeText(barcode);
    alert("✅ Barcode copied!");
  }
});

// Send to Bot tugmasi
sendBtn.addEventListener('click', () => {
  const barcode = resultElement.textContent;
  if (barcode && barcode !== "None") {
    const botToken = "7860502264:AAFHPo_CXGQPJw6repdVstx7jP26FHMb0wY";
    const chatId = "5869442579";
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${barcode}`);
    alert("✅ Barcode sent to bot!");
  }
});