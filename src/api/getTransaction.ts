import {DEVNET_API} from "../utils/Const";
import {tryAgainError} from "../utils/Errors";

/**
 *
 * @param transactionID
 * @returns transaction else if anything goes wrong then false.
 */
async function GetTransaction(transactionID) {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getTransaction",
        "params": [
            transactionID,
            "json"
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    // fetch the transaction
    const data = await fetch(DEVNET_API, requestOptions as RequestInit)
        .then(async response => await response.json())
        .catch(error => console.log('error', error));

    console.log("Fetched raw transaction from transaction ID", data)

    // it comes null 30% of times, really not sure why it's happening.
    if (data.result === null) {
        tryAgainError()
        return false
    } else {
        const main = data.result.meta.logMessages[4];

        // remove unnecessary text and trimmed important data to JSON
        const temp = main.substring(main.indexOf("{"), main.indexOf("+") + 10).replace("+", "");
        console.log(temp);
        const mainJSON = JSON.parse(temp);

        // get date from timestamp
        // eg. 2022-03-31T09:36:29.000Z
        const date = new Date(mainJSON.timestamp * 1000);

        // convert the above date into human-readable eg. 3/31/2022
        mainJSON.timestamp = date.toLocaleDateString("en-US").toString();

        // log the fetched json
        console.log("Fetched JSON from transaction ID", mainJSON)

        return mainJSON;
    }
}

export default GetTransaction;

