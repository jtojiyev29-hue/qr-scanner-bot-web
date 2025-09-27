let selectedDeviceId;
const codeReader = new ZXing.BrowserMultiFormatReader();
const resultElement = document.getElementById('result');
const copyBtn = document.getElementById('copyBtn');
const sendBtn = document.getElementById('sendBtn');
const cameraSelect = document.getElementById('cameraSelect');
const startBtn = document.getElementById('startBtn');

// Kameralar ro'yxatini olish
navigator.mediaDevices.enumerateDevices().then((devices) => {
    devices.forEach((device) => {
        if (device.kind === 'videoinput') {
            const option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label || `Camera ${cameraSelect.length + 1}`;
            cameraSelect.appendChild(option);
        }
    });
});

startBtn.addEventListener('click', () => {
    selectedDeviceId = cameraSelect.value;
    codeReader.decodeOnceFromVideoDevice(selectedDeviceId, 'video').then((result) => {
        resultElement.textContent = result.text;
    }).catch((err) => console.error(err));
});

// Copy tugmasi
copyBtn.addEventListener('click', () => {
    const barcode = resultElement.textContent;
    if (barcode && barcode !== "None") {
        navigator.clipboard.writeText(barcode);
        alert("Barcode copied!");
    }
});

// Send to Bot tugmasi
sendBtn.addEventListener('click', () => {
    const barcode = resultElement.textContent;
    if (barcode && barcode !== "None") {
        const botToken = "7860502264:AAFHPo_CXGQPJw6repdVstx7jP26FHMb0wY";
        const chatId = "5869442579";
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${barcode}`);
        alert("Barcode sent to bot!");
    }
});
