import { Button } from "./Button";
require("../App.css");
import "./Profile.css"
import videos from "../assets/videos/welcome.mp4";
import { RootObject } from "../api/Interfaces/LeetCodeProfile"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, useAnchorWallet, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter
} from "@solana/wallet-adapter-wallets";
import * as anchor from "@project-serum/anchor";

import {
    Program, Provider, web3, BN,
} from "@project-serum/anchor";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import React, { FC, ReactNode, useEffect, useMemo, useRef } from "react";
import idl from "../utils/idl.json"
import { profileNotFetched, usernameNotProvided, walletNotProvided } from "../utils/Errors";
import { DEVNET_API, processed, SOLANA_EXPLORER_URL } from "../utils/Const";
import fetchProfile from "../api/fetchProfile";
import siteLogo from "../assets/images/main_logo.png";
import ProfileCard from "./ProfileCard";
import { canShowSolanaExplorer, showUploadedText } from "../utils/showConditions";
import { scrollToView } from "../utils/scrollToView";
import getProvider from "../api/getProvider";
import getAnchorWallet from "../api/getAnchorWallet";
require("../App.css");
require("@solana/wallet-adapter-react-ui/styles.css");


const Profile: FC = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default Profile;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to "devnet", "testnet", or "mainnet-beta".
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new LedgerWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new SolletExtensionWalletAdapter({ network }),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {

    const [transactionID, setTransactionID] = React.useState("")
    const [profileUsername, setProfileUsername] = React.useState("")
    const [profileName, setProfileName] = React.useState("")
    const [profileBio, setProfileBio] = React.useState("")
    const [profileRanking, setProfileRanking] = React.useState("")
    const [profileStars, setProfileStars] = React.useState(0)
    const [profileTotalProblems, setProfileTotalProblems] = React.useState<string>("")
    const [profileProblemSolved, setProfileProblemSolved] = React.useState<string>("")
    const [profileCorrectProblemSolved, setProfileCorrectProblemSolved] = React.useState<string>("")
    const [profilePictureUrl, setProfilePictureUrl] = React.useState("")
    const [data, setData] = React.useState<RootObject>(null)
    const [click, setClick] = React.useState(false)
    const [loader, setLoader] = React.useState(false)
    const username = useRef(null)
    const div = useRef(null)

    function checkIfProfileFetched() {
        if (profileUsername) {
            sendProfile()
        } else {
            profileNotFetched()
        }
    }

    const wallet = getAnchorWallet()

    async function sendProfile() {
        const baseAccount = web3.Keypair.generate()
        const key = baseAccount.publicKey
        const provider = getProvider(wallet)

        if (!provider) {
            walletNotProvided()
            scrollToView(div.current.offsetTop);
            
            console.error("Provider is null")
            return
        }

        /* Create the program interface combining the idl, program IDL, and provider" */
        const jsonString = JSON.stringify(idl);
        const idlJSON = JSON.parse(jsonString);

        const program = new Program(idlJSON, idl.metadata.address, provider);

        const tsx = await program.rpc.sendProfile(profileUsername.substring(0, 50), profileName, profilePictureUrl, profileBio, profileRanking, 1, 0.0, profileStars, profileTotalProblems, profileCorrectProblemSolved, {
            accounts: {
                // account share...
                profile: baseAccount.publicKey,
                author: program.provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            },
            signers:
                // Key pairs of signers here...
                [baseAccount],
        });

        // log the transaction ID
        console.log("transaction ID:", tsx)

        setTransactionID(tsx);
        scrollToView(div.current.offsetTop);

        // show uploaded text and verify buttons
        canShowSolanaExplorer(true);
        showUploadedText(true);

        // After sending the transaction to the blockchain.
        // Fetch the account details of the created LeetDroid account.
        const leetdroidAccount = await program.account.leetCodeAccount.fetch(baseAccount.publicKey);
        console.log("account:", leetdroidAccount);
    }

    useEffect(() => {
        if (click) {
            (async () => {
                await fetchProfile(username.current.value)
                    .then(data => {
                        setData(data);

                        if (data) {
                            // using a constant to increase readability
                            const user  = data.data;

                            // stringify the submit stats 
                            const submitStats1 = JSON.stringify(user.allQuestionsCount)
                            const submitStats2 = JSON.stringify(user.matchedUser.submitStats.totalSubmissionNum)
                            const submitStats3 = JSON.stringify(user.matchedUser.submitStats.acSubmissionNum)
                            console.log("stringified submitStats:", submitStats1, submitStats2, submitStats3);

                            setLoader(false)
                            setProfile(
                                user.matchedUser.username,
                                user.matchedUser.profile.realName,
                                user.matchedUser.profile.userAvatar,
                                user.matchedUser.profile.aboutMe,
                                user.matchedUser.profile.ranking,
                                user.matchedUser.profile.starRating,
                                submitStats1,
                                submitStats2,
                                submitStats3.concat("+"), // adding + to ease the process of getting profile
                                // from solana-contract logs. 
                            )
                        } else {
                            setLoader(false)
                        }
                    })

                    .catch(err => console.warn(err))

                async function setProfile(
                    username: React.SetStateAction<string>,
                    name: React.SetStateAction<string>,
                    profilePicUrl: React.SetStateAction<string>,
                    aboutMe: React.SetStateAction<string>,
                    ranking: { toString: () => React.SetStateAction<string>; },
                    rating: React.SetStateAction<number>,
                    allQuestionsCount: React.SetStateAction<string>,
                    totalSubmissionNum: React.SetStateAction<string>,
                    acSubmissionNum: React.SetStateAction<string>,
                ) {
                    if (username) {
                        setProfileUsername(username)
                    }
                    if (name) {
                        setProfileName(name)
                    }
                    if (profilePicUrl) {
                        setProfilePictureUrl(profilePicUrl)
                    }
                    if (aboutMe) {
                        setProfileBio(aboutMe)
                    }
                    if (ranking) {
                        setProfileRanking(ranking.toString())
                    }
                    if (rating) {
                        setProfileStars(rating)
                    }
                    if (allQuestionsCount) {
                        setProfileTotalProblems(allQuestionsCount)
                    }
                    if (totalSubmissionNum) {
                        setProfileProblemSolved(totalSubmissionNum)
                    }
                    if (acSubmissionNum) {
                        setProfileCorrectProblemSolved(acSubmissionNum)
                    }
                }
            })();
        }
        setClick(false)
    }, [click]);


    function setButtonClick(val: any) {
        canShowSolanaExplorer(false);
        showUploadedText(false);
        if (username.current.value) {
            setLoader(true)
            setClick(true)
        } else {
            usernameNotProvided()
        }
    }

    function openSolanaExplorer() {
        window.open(`${SOLANA_EXPLORER_URL}${transactionID}?cluster=devnet`)
    }

    const text1 = "Your LeetCode Profile has been added to the Blockchain !!"
    const text2 = `You can get the profile card by pasting the below mentioned Transaction ID on the Homepage.
    You can also verify this transaction by clicking below button. Thank you for uploading your leetcode profile on the Blockchain.
    Transaction ID: ${transactionID}`


    return (
        <div className="profile">
            <div ref={div} className="input-container">
                <video src={videos} autoPlay loop muted />
                <img className="site-logo" src={siteLogo}></img>
                <div className="uploaded-text">
                    <h3 id="heading">Upload Your LeetCode Profile on<br></br>Solana Blockchain (Devnet)</h3>
                    <h3 id="text">{text1}<br></br>{text2}</h3>
                </div>
                <div className="wallet-btns">
                    <WalletMultiButton className="wallet" ></WalletMultiButton>
                    <Button id="solana-explorer" buttonStyle="btn--outline" buttonSize="btn--medium" type="light" to="/upload-profile" onClick={openSolanaExplorer}>Verify Transaction</Button>
                </div>
                <label>Enter your leetcode username:
                    <input type="text" ref={username} />
                </label>
                <Button id="get-profile" buttonStyle="btn--outline" buttonSize="btn--medium" type="light" to="/upload-profile" onClick={setButtonClick}>Get Profile</Button>
                <div className="cert-container">
                    <div id="certificateWrapper-exp">
                        <ProfileCard
                            timeStamp={""}
                            QRurl={""}
                            username={profileUsername}
                            picUrl={profilePictureUrl}
                            name={profileName}
                            bio={profileBio}
                            problemSolved={(profileCorrectProblemSolved == "") ? "" : JSON.parse(profileCorrectProblemSolved.substring(0, profileCorrectProblemSolved.length - 1))}
                            totalProblems={(profileTotalProblems == "") ? "" : JSON.parse(profileTotalProblems)}
                            showLoader={loader}
                        />
                    </div>
                </div>
                <Button id="send-profile" buttonStyle="btn--outline" buttonSize="btn--medium" type="light" to="/upload-profile" onClick={checkIfProfileFetched}>Send Profile</Button>
            </div>
        </div>
    );
}
