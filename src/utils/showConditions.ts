export function canShowSolanaExplorer(showSolanaExplorer: Boolean) {
    var button = document.getElementById('solana-explorer');
    if (button) {
        if (showSolanaExplorer) {
            button.style.visibility = "visible";
            button.style.display = "inline";
        }
        else {
            button.style.visibility = "hidden";
            button.style.display = "none";
        }
    }
}

export function showUploadedText(canShowUploadedText: Boolean) {
    var div = document.getElementById('text');
    if (div) {
        if (canShowUploadedText) {
            div.style.visibility = "visible";
            div.style.display = "inline";
        }
        else {
            div.style.visibility = "hidden";
            div.style.display = "none";
        }
    }
}

export function showUploadedTextCard(canShowUploadedText: Boolean) {
    var div = document.getElementById('uploaded-text');
    if (div) {
        if (canShowUploadedText) {
            div.style.visibility = "visible";
            div.style.display = "inline";
        }
        else {
            div.style.visibility = "hidden";
            div.style.display = "none";
        }
    }
}