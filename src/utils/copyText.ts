import {tsxCopied} from "./Notifications";

export default async function copyText(entryText) {
    await navigator.clipboard.writeText(entryText)
        .then(tsxCopied)
}