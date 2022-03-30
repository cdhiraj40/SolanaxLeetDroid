import React from 'react';
import './ProfileCard.css'
import { AcSubmissionNum, AllQuestionsCount, RootObject, TotalSubmissionNum } from "../api/Interfaces/LeetCodeProfile"
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver'
import {toast} from 'react-toastify';
 
import 'react-toastify/dist/ReactToastify.css';
 
toast.configure()
const downloadImage = () => {
    saveAs('https://i.picsum.photos/id/1026/536/354.jpg?hmac=HCbe18ElwrIr-HhIHYt2HVHDsIIZobiAYjNONKQ-xz4', 'image.jpg') // Put your image url here.
}

const notify = ()=>{
 
    // Calling toast method by passing string
    toast('Hello Geeks')
}

export const ProfileCard = ({ username, name, bio, ranking, stars, totalProblems, problemSolved, profilePicUrl }) => {

    return (
        <div className="card">
            <div className="img">
                <img src={profilePicUrl} />
            </div>
            <div className="infos">
                <div className="name">
                    <h2>{name}</h2>
                    <h4>@{username}</h4>
                </div>
                <p className="text">
                    {bio}
                </p>
                <ul className="stats">
                    <li>
                        <h3>EASY</h3>
                        <h4>{`${problemSolved[1].count}/${totalProblems[1].count}`}</h4>
                        <h5>lol</h5>
                    </li>
                    <li>
                        <h3>MEDIUM</h3>
                        <h4>{`${problemSolved[2].count}/${totalProblems[2].count}`}</h4>
                        <h5>lol</h5>
                    </li>
                    <li>
                        <h3>HARD</h3>
                        <h4>{`${problemSolved[3].count}/${totalProblems[3].count}`}</h4>
                        <h5>lol</h5>
                    </li>
                </ul>
                <ul>
                    <li>
                        <h3>{ranking}</h3>
                        <h3>{stars}</h3>
                    </li>
                </ul>
                {<div className="links">
                    <button className="follow" onClick={downloadImage}>Follow</button>
                    <button className="view" onClick={notify}>View profile </button>
                </div>}
            </div>
        </div>
    )
};

