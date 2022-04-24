import {Button} from './Button';
import './Welcome.css'
import React, {useEffect, useRef, useState} from 'react';
import videos from "../assets/videos/welcome.mp4";
import siteLogo from "../assets/images/main_logo.png";
import {LeetCodeProfile} from '../api/Interfaces/LeetCodeProfile';
import {transactionNotProvided} from '../utils/Errors';
import LeetCodeProfileBlockchain from '../api/Queries/LeetCodeProfile';
import GetTransaction from '../api/getTransaction';
import ProfileCard from './ProfileCard';
import {scrollToView} from '../utils/scrollToView';
import downloadProfile from '../utils/downloadProfile';

require('../App.css');

const Welcome = () => {

    const [profile, setProfile] = useState<LeetCodeProfile>(LeetCodeProfileBlockchain);

    const div = useRef(null);
    const certificateWrapper = useRef(null);

    const [transactionID, setTransactionID] = useState('');
    const [QRurl, setQRurl] = useState("");
    const [loader, setLoader] = useState(false);
    const [click, setClick] = useState(false);

    useEffect(() => {

        if (click) {
            (async () => {
                await GetTransaction(transactionID).then(data => {
                    if (data === false) {
                        setLoader(false)
                    } else if (data) {
                        setProfile(data);
                        setQRurl(transactionID);
                        setLoader(false)
                    }
                }).catch(err => console.warn(err))

            })();
        }
        setClick(false) // setting the click to false so that state can be changed again.
    }, [click]);

    const getStarted = () => {
        scrollToView(div.current.offsetTop); // scroll to profile card.
    }

    function checkIfTransactionID() {
        // if tsx added then get profile else show toast
        if (transactionID) {
            setLoader(true);
            setClick(true);
        } else {
            transactionNotProvided();
        }
    }

    return (
        <div className="Welcome">
            <div className='welcome-container'>
                <video src={videos} autoPlay loop muted/>
                <img alt="site logo" src={siteLogo}/>
                <div className="welcome-btns">
                    <Button id="get-started" buttonStyle='btn--outline' buttonSize='btn--medium' onClick={getStarted}
                            to="/" type="light">Get Started</Button>
                </div>
            </div>
            <div ref={div} className="input-container">
                <label>Enter your transaction ID:
                    <input type="text" onChange={e => setTransactionID(e.target.value.trim())}/>
                </label>

                <div className="submit-btns">
                    <Button id="get-transaction" buttonStyle='btn--outline' buttonSize='btn--medium'
                            onClick={checkIfTransactionID} type="light" to="/">
                        Get Transaction</Button>
                </div>
                <div className="submit-btns">
                    <Button id="get-your-profile" buttonStyle='btn--outline' buttonSize='btn--medium' type="light"
                            onClick={undefined} to='/upload-profile'>Get your own profile card</Button>
                </div>

                <div className="cert-container">
                    <div id="downloadWrapper-exp" ref={certificateWrapper}>
                        <div id="certificateWrapper-exp">
                            <ProfileCard
                                profile={profile}
                                QRurl={QRurl}
                                problemSolved={(profile.ac_submissin_num === "") ? "" : JSON.parse(profile.ac_submissin_num)}
                                totalProblems={(profile.all_question_count === "") ? "" : JSON.parse(profile.all_question_count)}
                                showLoader={loader}
                            />
                        </div>
                    </div>
                </div>
                <div className="download-btn">
                    <Button id="download-profile" buttonStyle='btn--outline' buttonSize='btn--medium' type="light"
                            to="/" onClick={(element: any) => {
                        downloadProfile(certificateWrapper, element)
                    }}>Download</Button>
                </div>
            </div>
        </div>
    );
}
export default Welcome;