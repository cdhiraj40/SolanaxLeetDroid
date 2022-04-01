
function canShowQRCode(showQRCode: Boolean) {
    var node = document.getElementById("QR");
    if (node) {
        if (showQRCode) {
            node.style.visibility = "visible";
        }
        else {
            node.style.visibility = "hidden";
        }
    }
}

export default canShowQRCode;