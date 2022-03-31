import { Button } from './Button';
require('../App.css');
import './Profile.css'
import videos from "../assets/videos/welcome.mp4";
import { AcSubmissionNum, AllQuestionsCount, RootObject, TotalSubmissionNum } from "../api/Interfaces/LeetCodeProfile"
import PROFILE_QUERY from '../api/Queries/ProfileQuery'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, useAnchorWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import * as anchor from "@project-serum/anchor";

import {
    Program, Provider, web3, BN,
} from '@project-serum/anchor';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import React, { FC, ReactNode, useEffect, useMemo, useRef } from 'react';
import { ProfileCard } from './ProfileCard';
import totalSubmissionNum from '../api/Queries/TotalSubmissionNum'
import allQuestionsCount from '../api/Queries/AllQuestionsCount'
import acSubmissionNum from '../api/Queries/ACSubmissionNum'
import idl from '../idl.json'
require('../App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const Profile: FC = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default Profile;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
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
            new TorusWalletAdapter(),
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

    const [profileUsername, setProfileUsername] = React.useState('')
    const [profileName, setProfileName] = React.useState('')
    const [profileBio, setProfileBio] = React.useState('')
    const [profileRanking, setProfileRanking] = React.useState('')
    const [profileStars, setProfileStars] = React.useState(0.0)
    const [profileTotalProblems, setProfileTotalProblems] = React.useState<AllQuestionsCount[]>(allQuestionsCount)
    const [profileProblemSolved, setProfileProblemSolved] = React.useState<TotalSubmissionNum[]>(totalSubmissionNum)
    const [profileCorrectProblemSolved, setProfileCorrectProblemSolved] = React.useState<AcSubmissionNum[]>(acSubmissionNum)
    const [profilePictureUrl, setProfilePictureUrl] = React.useState('')
    const [data, setData] = React.useState<RootObject>(null)
    const [click, setClick] = React.useState(false)
    const username = useRef(null)
    const div = useRef(null)

    const wallet = useAnchorWallet();

    function getProvider() {
        if (!wallet) {
            return null;
        }

        /* Create the provider and return it to the caller */
        const connection = new Connection('https://api.devnet.solana.com', "processed")

        const provider = new Provider(
            connection, wallet, { "preflightCommitment": "processed" },
        );
        return provider
    }

    async function sendProfile() {
        const baseAccount = web3.Keypair.generate()
        const key = baseAccount.publicKey
        const provider = getProvider()
        if (!provider) {
            throw ("Provider is null");
        }

        /* Create the program interface combining the idl, program IDL, and provider" */
        const a = JSON.stringify(idl);
        const b = JSON.parse(a);

        const program = new Program(b, idl.metadata.address, provider);

        const tsx = await program.rpc.sendProfile('cdhiraj40', 'Dhiraj', 'Hey this is Dhiraj', '1001', 10, 55.56, 2, {
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

        // After sending the transaction to the blockchain.
        // Fetch the account details of the created LeetDroid account.
        const leetdroidAccount = await program.account.leetCodeAccount.fetch(baseAccount.publicKey);
        console.log("account:", leetdroidAccount);
    }

    useEffect(() => {
        async function fetchProfile() {
            const data = await fetch('https://damp-garden-91778.herokuapp.com/https://leetcode.com/graphql/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query: PROFILE_QUERY, variables: { "username": username.current.value } })
            }).then(async response => response.json())

            setData(data);
            setProfile(data.data.matchedUser.profile.userAvatar,
                data.data.matchedUser.username,
                data.data.matchedUser.profile.realName,
                data.data.matchedUser.profile.aboutMe,
                data.data.matchedUser.profile.ranking,
                data.data.matchedUser.profile.starRating,
                data.data.allQuestionsCount,
                data.data.matchedUser.submitStats.totalSubmissionNum,
                data.data.matchedUser.submitStats.acSubmissionNum
            )

        }

        async function setProfile(
            profileUrl,
            username,
            name,
            aboutMe,
            ranking,
            rating,
            allQuestionsCount,
            totalSubmissionNum,
            acSubmissionNum
        ) {
            if (profileUrl) {
                setProfilePictureUrl(profileUrl)
            }
            if (username) {
                setProfileUsername(username)
            }
            if (name) {
                setProfileName(name)
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

        if (click) {
            (async () => {
                fetchProfile()
            })();
        }
        setClick(false)
    }, [click]);


    function setButtonClick(val: any) {
        setClick(true)
    }


    return (
        <div className="profile">
            <div ref={div} className='input-container'>
                <video src={videos} autoPlay loop muted />
                <div ref={div} className="input-container">
                    <label>Enter your leetcode username:
                        <input type="text" ref={username} />
                    </label>
                    <Button className='get-profile' buttonStyle='btn--outline' buttonSize='btn--medium' to='/Upload-Profile' onClick={setButtonClick}>Get Profile</Button>
                    <ProfileCard
                        username={profileUsername}
                        profilePicUrl={profilePictureUrl}
                        name={profileName} bio={profileBio}
                        ranking={profileRanking}
                        stars={profileStars}
                        totalProblems={profileTotalProblems}
                        problemSolved={profileCorrectProblemSolved} />
                    <Button className='welcome-btns-btnsns' buttonStyle='btn--outline' buttonSize='btn--medium' to='/Upload-Profile' onClick={sendProfile}>Send Profile</Button>
                    <WalletMultiButton />
                </div>
            </div>
        </div>
    );
}

