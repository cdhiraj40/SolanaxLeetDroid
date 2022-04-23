import {LEETCODE_API} from "../utils/Const";
import PROFILE_QUERY from "../api/Queries/ProfileQuery";
import {checkIfUserExist} from "../utils/showConditions";
import {userDoesNotExistError} from "../utils/Errors";

/**
 *
 * @param username
 * @returns data if user exists else false.
 *
 */
async function fetchProfile(username: string) {
    const data = await fetch(LEETCODE_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({query: PROFILE_QUERY, variables: {"username": username}})
    }).then(async response => await response.json());

    // check if user exists
    if (await checkIfUserExist(data)) {
        // log the response
        console.log("fetched profile from username", data);
        return data;
    } else {
        userDoesNotExistError();
        // return false to let UI know to stop showing loader.
        return false;
    }
}

export default fetchProfile;