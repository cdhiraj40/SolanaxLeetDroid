import React from 'react';
import './ProfileCard.css'
import { AcSubmissionNum, AllQuestionsCount, RootObject, TotalSubmissionNum } from "../api/Interfaces/LeetCodeProfile"
import canShowQRCode from '../showQRCode';
export const ProfileCard = profile => {

    if(profile.QRurl){
        canShowQRCode(true)
    } else{
        canShowQRCode(false)
    }

    return (
        <div className="card">
            <div className="img">
                <img src={profile.picUrl} />
            </div>
            <div className="infos">
                <div className="name">
                    <h2>{profile.name}</h2>
                    <h4>@{profile.username}</h4>
                </div>
                <p className="text">
                    {profile.bio}
                </p>
                <ul className="stats">
                    <li>
                        <h3>EASY</h3>
                        <h4>{`${profile.problemSolved[1].count}/${profile.totalProblems[1].count}`}</h4>
                        <h5>lol</h5>
                    </li>
                    <li>
                        <h3>MEDIUM</h3>
                        <h4>{`${profile.problemSolved[2].count}/${profile.totalProblems[2].count}`}</h4>
                        <h5>lol</h5>
                    </li>
                    <li>
                        <h3>HARD</h3>
                        <h4>{`${profile.problemSolved[3].count}/${profile.totalProblems[3].count}`}</h4>
                        <h5>lol</h5>
                    </li>
                </ul>
                <ul>
                    <li>
                        <h3>{profile.ranking}</h3>
                        <h3>{profile.stars}</h3>
                        <div id="QR">
                        <p ><img id="QR-img" src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${profile.QRurl}`} alt=""/> </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
};

