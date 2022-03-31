import { Button } from './Button';
import './Welcome.css'
import React, { FC, useRef, useState } from 'react';
require('../App.css');
import videos from "../assets/videos/welcome.mp4";
import siteLogo from "../assets/images/main_logo.png";
import { ProfileCard } from './ProfileCard';
import totalSubmissionNum from '../api/Queries/TotalSubmissionNum'
import allQuestionsCount from '../api/Queries/AllQuestionsCount'
import acSubmissionNum from '../api/Queries/ACSubmissionNum'
import { AcSubmissionNum, AllQuestionsCount, TotalSubmissionNum } from '../api/Interfaces/LeetCodeProfile';
import { exportComponentAsJPEG } from 'react-component-export-image';

import GetTransaction from '../api/getTransaction'

const Welcome: FC = () => {

    const [profileUsername, setProfileUsername] = React.useState('')
    const [profileName, setProfileName] = React.useState('')
    const [profileBio, setProfileBio] = React.useState('')
    const [profileRanking, setProfileRanking] = React.useState('')
    const [profileStars, setProfileStars] = React.useState(0.0)
    const [profileTotalProblems, setProfileTotalProblems] = React.useState<AllQuestionsCount[]>(allQuestionsCount)
    const [profileProblemSolved, setProfileProblemSolved] = React.useState<TotalSubmissionNum[]>(totalSubmissionNum)
    const [profileCorrectProblemSolved, setProfileCorrectProblemSolved] = React.useState<AcSubmissionNum[]>(acSubmissionNum)
    const [profilePictureUrl, setProfilePictureUrl] = React.useState('')

    const transactionID = useRef(null)
    const div = useRef(null)

    const certificateWrapper = React.createRef();
    const [search, setSearch] = useState('')
    const [QRurl, setQRurl] = useState("")

    function getStarted() {
        if (div && div.current) {
            div.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
    }

    function getTransaction() {
        GetTransaction(search);
        setQRurl(search);
    }

    function downloadProfile(element) {
        element.preventDefault();
        exportComponentAsJPEG(certificateWrapper, {
            html2CanvasOptions: { backgroundColor: null },
            fileName: "myLeetCodeProfile.jpg"
        });
    }

    return (
        <div className="Welcome">
            <div className='welcome-container'>
                <video src={videos} autoPlay loop muted />
                <img src={siteLogo}></img>
                <div className="welcome-btns">
                    <Button className="welcome-btns" buttonStyle='btn--outline' buttonSize='btn--medium' onClick={getStarted}>Get Started</Button>
                </div>
            </div>
            <div ref={div} className="input-container">
                <label>Enter your trasaction ID:
                    <input type="text" ref={transactionID} onChange={e => setSearch(e.target.value.trim())} />
                </label>

                <div className="submit-btns">
                    <Button buttonStyle='btn--outline' buttonSize='btn--medium' onClick={getTransaction}>
                        Get Transaction</Button>
                </div>
                <div className="submit-btns">
                    <Button buttonStyle='btn--outline' buttonSize='btn--medium' to='/Upload-Profile'>Get your own profile card</Button>
                </div>

                <div className="cert-container">
                    <div id="downloadWrapper-exp" ref={certificateWrapper}>
                        <div id="certificateWrapper-exp">
                            <p id="profileUsername"></p>
                            <p id="profilePictureUrl"></p>
                            <p id="profileName"></p>
                            <p id="profileBio"></p>
                            <p id="profileRanking"></p>
                            <p id="profileStars"></p>
                            <p id="profileTotalProblems"></p>
                            <p id="profileCorrectProblemSolved"></p>
                            <p id="timestamp"></p>
                            <p id="QR"><img id="QR-img" src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${QRurl}`} alt="" /> </p>

                            <ProfileCard
                                username={profileUsername}
                                profilePicUrl={profilePictureUrl}
                                name={profileName} bio={profileBio}
                                ranking={profileRanking}
                                stars={profileStars}
                                totalProblems={profileTotalProblems}
                                problemSolved={profileCorrectProblemSolved} />
                        </div>
                    </div>

                    <Button
                        onClick={(element) => {
                            downloadProfile(element)
                        }}
                    >download</Button>
                </div>
            </div>
        </div>
    );
}
export default Welcome;
