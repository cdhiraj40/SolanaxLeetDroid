import {Button} from "./Button";
import "./Profile.css"
import videos from "../assets/videos/welcome.mp4";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {ConnectionProvider, useAnchorWallet, WalletProvider} from "@solana/wallet-adapter-react";
import {WalletModalProvider, WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter
} from "@solana/wallet-adapter-wallets";

import {clusterApiUrl} from "@solana/web3.js";
import React, {ReactNode, useEffect, useMemo, useRef} from "react";
import {profileNotFetched, usernameNotProvided, walletNotProvided} from "../utils/Errors";
import {profileAddedText, profileAddedTextTsx, SOLANA_EXPLORER_URL} from "../utils/Const";
import fetchProfile from "../api/fetchProfile";
import siteLogo from "../assets/images/main_logo.png";
import ProfileCard from "./ProfileCard";
import {canShowCopyTsxID, canShowSolanaExplorer, showUploadedText} from "../utils/showConditions";
import {scrollToView} from "../utils/scrollToView";
import getProvider from "../api/getProvider";
import {LeetCodeProfile} from '../api/Interfaces/LeetCodeProfile';
import LeetCodeProfileBlockchain from "../api/Queries/LeetCodeProfile";
import sendProfile from "../api/sendProfile";
import copyText from "../utils/copyText";

require("../App.css");
require("@solana/wallet-adapter-react-ui/styles.css");

const Profile = () => {
    return (
        <Context>
            <Content/>
        </Context>
    );
};
export default Profile;

const Context = (
    {
        children
    }: {
        children: ReactNode
    }
) => {
    // The Wallet network is set to "devnet".
    const network = WalletAdapterNetwork.Devnet;

    // We can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // wallet that are compiled into the application 
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({network}),
            new LedgerWalletAdapter(),
            new SolletWalletAdapter({network}),
            new SolletExtensionWalletAdapter({network}),
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

const Content = () => {

    const [transactionID, setTransactionID] = React.useState("")

    const [profile, setProfileCard] = React.useState<LeetCodeProfile>(LeetCodeProfileBlockchain);

    const [profileUsername, setProfileUsername] = React.useState("")
    const [profileName, setProfileName] = React.useState("")
    const [profileBio, setProfileBio] = React.useState("")
    const [profileRanking, setProfileRanking] = React.useState("")
    const [profileStars, setProfileStars] = React.useState(0)
    const [profileTotalProblems, setProfileTotalProblems] = React.useState("")
    const [profileProblemSolved, setProfileProblemSolved] = React.useState("")
    const [profileCorrectProblemSolved, setProfileCorrectProblemSolved] = React.useState("")
    const [profilePictureUrl, setProfilePictureUrl] = React.useState("")

    const [click, setClick] = React.useState(false)
    const [loader, setLoader] = React.useState(false)
    const username = useRef(null)
    const div = useRef(null)

    const wallet = useAnchorWallet()
    const provider = getProvider(wallet)

    async function checkIfProfileFetched() {
        if (profileUsername) {
            if (!provider) {
                walletNotProvided() // show toast that wallet not provided
                scrollToView(div.current.offsetTop); // scroll up to the "select wallet" button

                console.error("Provider is null")
                return
            } else {
                const tsx = await sendProfile(provider, profileUsername, profileName, profilePictureUrl, profileBio, profileRanking, profileStars, profileTotalProblems, profileCorrectProblemSolved)

                setTransactionID(tsx);
                scrollToView(div.current.offsetTop); // scroll up to show tsx ID

                // show uploaded text, copy tsx ID and verify buttons
                canShowSolanaExplorer(true);
                canShowCopyTsxID(true);
                showUploadedText(true);
            }

        } else {
            profileNotFetched() // show toast if profile has not been fetched yet
        }
    }

    useEffect(() => {
        if (click) {
            (async () => {
                await fetchProfile(username.current.value)
                    .then(response => {
                        if (response) {
                            // using a constant to increase readability
                            const user = response.data;

                            // stringify the "submit stats"
                            setProfileTotalProblems(JSON.stringify(user.allQuestionsCount))
                            setProfileProblemSolved(JSON.stringify(user.matchedUser.submitStats.totalSubmissionNum))

                            // adding + to ease the process of getting profile from solana-contract logs.
                            setProfileCorrectProblemSolved(JSON.stringify(user.matchedUser.submitStats.acSubmissionNum).concat("+"))

                            setLoader(false) // stop the loader and set the profile.
                            setProfile(
                                user.matchedUser.username,
                                user.matchedUser.profile.realName,
                                user.matchedUser.profile.userAvatar,
                                user.matchedUser.profile.aboutMe,
                                user.matchedUser.profile.ranking,
                                user.matchedUser.profile.starRating,
                            )
                        } else {
                            setLoader(false)
                        }
                    })
                    .catch(err => console.warn(err))

                async function setProfile(
                    username: string,
                    name: string,
                    profilePicUrl: string,
                    aboutMe: string,
                    ranking: string,
                    rating: number,
                ) {
                    setProfileUsername(username)
                    setProfileName(name)
                    setProfilePictureUrl(profilePicUrl)
                    setProfileBio(aboutMe)
                    setProfileRanking(ranking.toString())
                    setProfileStars(rating)

                    const profile = {
                        username: username.toString(),
                        name: name.toString(),
                        pic_url: profilePicUrl.toString(),
                        bio: aboutMe.toString(),
                        ranking: ranking.toString().toString(),
                        stars: rating,
                        problemSolved: 1,
                        acceptanceRate: 0.0,
                        timestamp: "",
                        all_question_count: profileProblemSolved.toString(),
                        total_submission_num: profileTotalProblems.toString(),
                        ac_submissin_num: profileCorrectProblemSolved.toString()
                    }
                    setProfileCard(profile) // set the profile for profile card component.
                }
            })();
        }
        setClick(false); // setting the click to false so that state can be changed again.
    }, [click]);


    function setButtonClick() {
        // hide uploaded text, copy tsx ID and verify buttons
        canShowSolanaExplorer(false);
        canShowCopyTsxID(false);
        showUploadedText(false);

        // if username added then get profile else show toast
        if (username.current.value) {
            setLoader(true)
            setClick(true)
        } else {
            usernameNotProvided();
        }
    }

    function openSolanaExplorer() {
        window.open(`${SOLANA_EXPLORER_URL}${transactionID}?cluster=devnet`)
    }

    function onClickCopy() {
        copyText(transactionID).then()
    }


    return (
        <div className="profile">
            <div ref={div} className="input-container">
                <video src={videos} autoPlay loop muted/>
                <img alt="site logo" className="site-logo" src={siteLogo}/>
                <div className="uploaded-text">
                    <h3 id="heading">Upload Your LeetCode Profile on<br/>Solana Blockchain (Devnet)</h3>
                    <h3 id="text">{profileAddedText}<br/>{profileAddedTextTsx(transactionID)}</h3>
                </div>
                <div className="wallet-btns">
                    <WalletMultiButton className="wallet"/>
                    <Button id="copy-tsx-id" buttonStyle="btn--outline" buttonSize="btn--medium" type="light"
                            to="/upload-profile" onClick={onClickCopy}>Copy Transaction ID</Button>
                    <Button id="solana-explorer" buttonStyle="btn--outline" buttonSize="btn--medium" type="light"
                            to="/upload-profile" onClick={openSolanaExplorer}>Verify Transaction</Button>
                </div>
                <label>Enter your leetcode username:
                    <input type="text" ref={username}/>
                </label>
                <Button id="get-profile" buttonStyle="btn--outline" buttonSize="btn--medium" type="light"
                        to="/upload-profile" onClick={setButtonClick}>Get Profile</Button>
                <div className="cert-container">
                    <div id="certificateWrapper-exp">
                        <ProfileCard
                            profile={profile}
                            QRurl={""}
                            problemSolved={(profileCorrectProblemSolved === "") ? "" : JSON.parse(profileCorrectProblemSolved.substring(0, profileCorrectProblemSolved.length - 1))}
                            totalProblems={(profileTotalProblems === "") ? "" : JSON.parse(profileTotalProblems)}
                            showLoader={loader}
                        />
                    </div>
                </div>
                <Button id="send-profile" buttonStyle="btn--outline" buttonSize="btn--medium" type="light"
                        to="/upload-profile" onClick={checkIfProfileFetched}>Send Profile</Button>
            </div>
        </div>
    );
}
