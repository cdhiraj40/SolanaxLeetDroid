function GetTransaction(transactionID) {
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
    fetch("https://api.devnet.solana.com", requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var main = data.result.meta.logMessages[4];

            // remove unnessasary text and trimmed important data to JSON
            var mainJSON = JSON.parse(main.substring(main.indexOf("{"), main.indexOf("}") + 1));

            // log the fetched json
            console.log(mainJSON)
            document.getElementById("profileUsername").innerHTML = mainJSON.username
            document.getElementById("profileName").innerHTML = mainJSON.name
            document.getElementById("profileBio").innerHTML = mainJSON.bio
            document.getElementById("profileRanking").innerHTML = mainJSON.ranking
            document.getElementById("profileStars").innerHTML = mainJSON.stars
            document.getElementById("profileTotalProblems").innerHTML = mainJSON.problem_solved
            document.getElementById("profileCorrectProblemSolved").innerHTML = mainJSON.acceptance_rate

            // get date from timestamp
            // eg. 2022-03-31T09:36:29.000Z
            var date = new Date(mainJSON.timestamp * 1000);

            // convert the above date into human readable eg. 3/31/2022
            document.getElementById("timestamp").innerHTML = date.toLocaleDateString("en-US"); 

        })
        .catch(error => console.log('error', error));
}

export default GetTransaction;

