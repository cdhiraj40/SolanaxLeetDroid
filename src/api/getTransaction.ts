import { DEVNET_API } from "../Const";

async function GetTransaction(transactionID) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getTransaction",
        "params": [
            transactionID,
            "json"
        ]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    // fetch the transaction
    return fetch(DEVNET_API, requestOptions as RequestInit)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var main = data.result.meta.logMessages[4];

            // remove unnessasary text and trimmed important data to JSON
            var mainJSON = JSON.parse(main.substring(main.indexOf("{"), main.indexOf("}") + 1));


            // get date from timestamp
            // eg. 2022-03-31T09:36:29.000Z
            var date = new Date(mainJSON.timestamp * 1000);

            // convert the above date into human readable eg. 3/31/2022
            mainJSON.timestamp = date.toLocaleDateString("en-US");

            // log the fetched json
            console.log(mainJSON)

            return mainJSON;
        })
        .catch(error => console.log('error', error));

}

export default GetTransaction;

