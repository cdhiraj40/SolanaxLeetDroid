import { generalError } from "./Errors";

/**
 * show solana explorer button
 * if showSolanaExplorer is true
 * dont show if showSolanaExplorer is false
*/ 
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

/**
 * show uploaded text on profile page.
 * if canShowUploadedText is true
 * dont show if canShowUploadedText is false
*/ 
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

/**
 * show uploaded text on profile card
 * if canShowUploadedText is true
 * dont show if canShowUploadedText is false
*/ 
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

/**
 * check if user exist
 * returns true if exists
 * return false if does not exists 
*/ 
export async function checkIfUserExist(userData) {
    if (userData.data?.matchedUser === null) {
        if (userData.errors?.[0]?.message.toString() == "That user does not exist.") {
            console.log("user does not exist");
            return false;
        } else {
            console.log("something went wrong");
            generalError();
            return false;
        }
    } else {
        console.log("user exists")
        return true;
    }
}