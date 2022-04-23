import {Provider} from "@project-serum/anchor";
import {Connection} from "@solana/web3.js";
import {DEVNET_API, processed} from "../utils/Const";

/**
 *
 * @returns provider to the caller.
 */
export default function getProvider(wallet) {
    if (!wallet) {
        return null;
    }

    /* Create the provider and return it to the caller */
    const connection = new Connection(DEVNET_API, processed)

    return new Provider(
        connection, wallet, {"preflightCommitment": processed},
    )
}
