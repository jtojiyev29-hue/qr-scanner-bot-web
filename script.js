let selectedDeviceId;
const codeReader = new ZXing.BrowserMultiFormatReader();
const sourceSelect = document.getElementById('sourceSelect');
const resultElement = document.getElementById('result');
const copyButton = document.getElementById('copyButton');
const sendButton = document.getElementById('sendButton');

// Kameralar ro‘yxatini olish
navigator.mediaDevices.enumerateDevices().then(devices => {
    devices.forEach(device => {
        if (device.kind === 'videoinput') {
            const option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label || `Camera ${sourceSelect.length + 1}`;
            sourceSelect.appendChild(option);
        }
    });

    if (sourceSelect.length > 0) {
        selectedDeviceId = sourceSelect.value;
    }
});

// Kamera tanlash
sourceSelect.onchange = () => {
    selectedDeviceId = sourceSelect.value;
};

// Skanner ishga tushirish
document.getElementById('startButton').addEventListener('click', () => {
    codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
        if (result) {
            resultElement.textContent = result.text; // faqat barcode raqami chiqadi
            copyButton.disabled = false;
            sendButton.disabled = false;
        }
        if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err);
        }
    });
});

// Copy tugmasi
copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(resultElement.textContent);
    alert("Barcode copied!");
});

// Botga yuborish tugmasi
sendButton.addEventListener('click', () => {
    const barcode = resultElement.textContent;
    if (barcode) {
        // Bu yerga sizning bot API linkingiz bo‘lishi kerak
        fetch(`https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage?chat_id=<YOUR_CHAT_ID>&text=${barcode}`);
        alert("Barcode sent to bot!");
    }
});