import React from "react"
import {DEFAULT_PROFILE_URL, QRSERVER_API} from "../utils/Const";
import './ProfileCard.css'

const ProfileCard = props => {

    const username = (props.profile.username === "") ? "" : `@${props.profile.username}`;
    const picUrl = (props.profile.pic_url === "") ? DEFAULT_PROFILE_URL : props.profile.pic_url;
    const QRurl = (props.QRurl === "") ? "" : props.QRurl;
    const timeStamp = (props.profile.timestamp === "") ? "" : props.profile.timestamp;
    const uploadedText = (props.profile.timestamp === "") ? "" : `Uploaded profile on ${timeStamp} to Solana Blockchain (Devnet)`
    const allProblems = (props.problemSolved === "") ? "" : `${props.problemSolved[0].count}/${props.totalProblems[0].count}`
    const easyProblems = (props.problemSolved === "") ? "" : `${props.problemSolved[1].count}/${props.totalProblems[1].count}`
    const mediumProblems = (props.problemSolved === "") ? "" : `${props.problemSolved[2].count}/${props.totalProblems[2].count}`
    const hardProblems = (props.problemSolved === "") ? "" : `${props.problemSolved[3].count}/${props.totalProblems[3].count}`

    return (
        <div className="wrapper">
            <div className="profile-card js-profile-card">
                <div className="profile-card__img">
                    <img src={picUrl} alt="profile card"/>
                </div>

                <div className="profile-card__cnt js-profile-cnt">
                    {props.showLoader ? (
                        <div className="fancy-spinner">
                            <div className="ring"/>
                            <div className="ring"/>
                            <div className="dot"/>
                        </div>
                    ) : (props.showLoader)}

                    <div className="profile-card__username">{username}</div>
                    <div className="profile-card__name">{props.profile.name}</div>
                    <div className="profile-card__txt">{props.profile.bio}</div>

                    <div className="profile-card-inf">
                        <div className="profile-card-inf__item">
                            <div className="profile-card-inf__title">{allProblems}</div>
                            <div className="profile-card-inf__txt">TOTAL</div>
                        </div>

                        <div className="profile-card-inf__item">
                            <div className="profile-card-inf__title">{easyProblems}</div>
                            <div className="profile-card-inf__txt">EASY</div>
                        </div>

                        <div className="profile-card-inf__item">
                            <div className="profile-card-inf__title">{mediumProblems}</div>
                            <div className="profile-card-inf__txt">MEDIUM</div>
                        </div>

                        <div className="profile-card-inf__item">
                            <div className="profile-card-inf__title">{hardProblems}</div>
                            <div className="profile-card-inf__txt">HARD</div>
                        </div>
                    </div>
                </div>
                <img id="QR-img" src={`${QRSERVER_API}${QRurl}`} alt=""/>
                <p id="watemark">Solana x LeetDroid © 2022</p>
                <p id="uploaded-text">{uploadedText} </p>
            </div>
        </div>
    )
}

export default ProfileCard;