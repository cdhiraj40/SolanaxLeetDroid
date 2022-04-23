import {web3, Program} from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import idl from '../utils/idl.json'

async function sendProfile(provider: anchor.Provider, profileUsername: string, profileName: string, profilePictureUrl: string, profileBio: string, profileRanking: string, profileStars: number, profileTotalProblems: string, profileCorrectProblemSolved: string) {
    const baseAccount = web3.Keypair.generate()
    const key = baseAccount.publicKey

    /* Create the program interface combining the idl, program IDL, and provider */
    const jsonString = JSON.stringify(idl);
    const idlJSON = JSON.parse(jsonString);

    const program = new Program(idlJSON, idl.metadata.address, provider);

    const tsx = await program.rpc.sendProfile(profileUsername.substring(0, 50), profileName, profilePictureUrl, profileBio, profileRanking, 1, 0.0, profileStars, profileTotalProblems, profileCorrectProblemSolved, {
        accounts: {
            // account share...
            profile: key,
            author: program.provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers:
        // Key pairs of signers here...
            [baseAccount],
    });

    // log the transaction ID
    console.log("transaction ID:", tsx)

    // After sending the transaction to the blockchain.
    // Fetch the account details of the created LeetDroid account.
    const leetdroidAccount = await program.account.leetCodeAccount.fetch(baseAccount.publicKey);
    console.log("account:", leetdroidAccount);

    return tsx;
}

export default sendProfile;