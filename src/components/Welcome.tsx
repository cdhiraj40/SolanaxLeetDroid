import { Button } from './Button';
import './Welcome.css'
import React, { FC, useRef, useState } from 'react';
require('../App.css');
import videos from "../assets/videos/welcome.mp4";
import siteLogo from "../assets/images/main_logo.png";
import { LeetCodeProfile } from '../api/Interfaces/LeetCodeProfile';
import { exportComponentAsJPEG } from 'react-component-export-image';
import { transactionNotProvided } from '../utils/Errors';
import LeetCodeProfileBlockchain from '../api/Queries/LeetCodeProfile';
import GetTransaction from '../api/getTransaction';
import ProfileCard from './ProfileCard';

const Welcome: FC = () => {

    const [profile, setProfile] = React.useState<LeetCodeProfile>(LeetCodeProfileBlockchain)

    const div = useRef(null)

    const certificateWrapper = React.createRef();
    const [transactionID, setTransactionID] = useState('')
    const [QRurl, setQRurl] = useState("")

    function getStarted() {
        if (div && div.current) {
            div.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

    function _scrollTo(yOffset = 0) {
        if (div && div.current) {
            const y = div.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

            div.current.scrollIntoView({ top: y, behavior: "smooth", block: "center" });
        }
    }

    function checkIfTransactionID() {
        if (transactionID) {
            getTransaction()
        } else {
            transactionNotProvided()
        }
    }

    function getTransaction() {
        GetTransaction(transactionID)
            .then(profile => {
                setProfile(profile)
            })
            .catch(err => console.warn("error while fetching transaction", err))

        setQRurl(transactionID);
    }

    function downloadProfile(element) {
        element.preventDefault();
        exportComponentAsJPEG(certificateWrapper as React.RefObject<HTMLDivElement>, {
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
                    <Button id="get-started" buttonStyle='btn--outline' buttonSize='btn--medium' onClick={_scrollTo} to="/" type="light" >Get Started</Button>
                </div>
            </div>
            <div ref={div} className="input-container">
                <label>Enter your trasaction ID:
                    <input type="text" onChange={e => setTransactionID(e.target.value.trim())} />
                </label>

                <div className="submit-btns">
                    <Button id="get-transaction" buttonStyle='btn--outline' buttonSize='btn--medium' onClick={checkIfTransactionID} type="light" to="/">
                        Get Transaction</Button>
                </div>
                <div className="submit-btns">
                    <Button id="get-your-profile" buttonStyle='btn--outline' buttonSize='btn--medium' type="light" onClick={undefined} to='/upload-profile'>Get your own profile card</Button>
                </div>

                <div className="cert-container">
                    <div id="downloadWrapper-exp" ref={certificateWrapper as React.RefObject<HTMLDivElement>} >
                        <div id="certificateWrapper-exp">
                            <ProfileCard
                                QRurl={QRurl}
                                username={profile.username}
                                picUrl={profile.pic_url}
                                name={profile.name}
                                bio={profile.bio}
                                timeStamp={profile.timestamp}
                                problemSolved={(profile.ac_submissin_num == "") ? "" : JSON.parse(profile.ac_submissin_num)}
                                totalProblems={(profile.all_question_count == "") ? "" : JSON.parse(profile.all_question_count)}
                            />
                        </div>
                    </div>
                </div>
                <div className="download-btn">
                    <Button id="download-profile" buttonStyle='btn--outline' buttonSize='btn--medium' type="light" to="/" onClick={(element: any) => {
                        downloadProfile(element)
                    }}>Download</Button>
                </div>
            </div>
        </div>
    );
}
export default Welcome;
