export const QRSERVER_API = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="
export const DEVNET_API = "https://api.devnet.solana.com"
export const LEETCODE_API = "https://damp-garden-91778.herokuapp.com/https://leetcode.com/graphql/"
export const processed = "processed"
export const DEFAULT_PROFILE_URL = "https://s3-us-west-1.amazonaws.com/s3-lc-upload/assets/default_avatar.jpg"
export const SOLANA_EXPLORER_URL = "https://explorer.solana.com/tx/"
export const GITHUB_PROJECT_URL = "https://github.com/cdhiraj40/SolanaxLeetDroid"

export type Nullable<T> = T | null;

export const profileAddedText = "Your LeetCode Profile has been added to the Blockchain !!"

export const profileAddedTextTsx = (transactionID) => `You can get the profile card by pasting the below mentioned Transaction ID on the Homepage.
You can also verify this transaction by clicking below button. Thank you for uploading your leetcode profile on the Blockchain.
Transaction ID: ${transactionID}`