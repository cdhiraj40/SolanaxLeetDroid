import {useAnchorWallet} from "@solana/wallet-adapter-react";

export default function getAnchorWallet() {
    return useAnchorWallet();
}
