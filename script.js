function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code matched = ${decodedText}`, decodedResult);
    document.getElementById("result").innerText = "✅ Scanned: " + decodedText;

    // Agar Telegram WebApp orqali ishlatilsa, natijani qaytarish mumkin
    if (window.Telegram && Telegram.WebApp) {
        Telegram.WebApp.sendData(decodedText);
    }
}

function onScanFailure(error) {
    console.warn(`Code scan error = ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess, onScanFailure);