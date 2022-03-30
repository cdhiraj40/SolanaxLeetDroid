import { Button } from './Button';
import './Welcome.css'
import React, { FC, useRef } from 'react';
require('../App.css');
import videos from "../assets/videos/welcome.mp4";
import siteLogo from "../assets/images/main_logo.png";

const Welcome: FC = () => {
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
                <Button className='welcome' buttonStyle='btn--outline' buttonSize='btn--medium'>Get Transaction</Button>
                <Button className='welcome' buttonStyle='btn--outline' buttonSize='btn--medium' to='/Upload-Profile'>Get your own profile card</Button>
            </div>
        </div>
    );
}
export default Welcome;
