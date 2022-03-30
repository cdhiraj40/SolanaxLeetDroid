import { Button } from './Button';
import './Welcome.css'
import React, { FC, useRef } from 'react';
require('../App.css');
import videos from "../assets/videos/welcome.mp4";
import siteLogo from "../assets/images/main_logo.png";
import { ProfileCard } from './ProfileCard';
import totalSubmissionNum from '../api/Queries/TotalSubmissionNum'
import allQuestionsCount from '../api/Queries/AllQuestionsCount'
import acSubmissionNum from '../api/Queries/ACSubmissionNum'
import { AcSubmissionNum, AllQuestionsCount, TotalSubmissionNum } from '../api/Interfaces/LeetCodeProfile';

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
    const username = useRef(null)
    const div = useRef(null)

    function getStarted() {
        if (div && div.current) {
            div.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
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
                    <input type="text" ref={username} />
                </label>
                <div className="submit-btns">
                    <Button buttonStyle='btn--outline' buttonSize='btn--medium'>Get Transaction</Button>
                </div>
                <div className="submit-btns">
                    <Button buttonStyle='btn--outline' buttonSize='btn--medium' to='/Upload-Profile'>Get your own profile card</Button>
                </div>

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
    );
}
export default Welcome;
