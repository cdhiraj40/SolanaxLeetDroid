import { LEETCODE_API } from "../utils/Const";
import PROFILE_QUERY from "../api/Queries/ProfileQuery";

async function fetchProfile(username: string) {
    const data = await fetch(LEETCODE_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: PROFILE_QUERY, variables: { "username": username } })
    }).then(async response => response.json());

    // log the response
    console.log(data);
    return data;
}

export default fetchProfile;