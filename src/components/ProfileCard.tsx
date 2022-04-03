import React from "react"
import { DEFAULT_PROFILE_URL, QRSERVER_API } from "../utils/Const";
import './ProfileCard.css'

const ProfileCard = profile => {

    var picUrl = (profile.picUrl == "") ? DEFAULT_PROFILE_URL : profile.picUrl;
    var QRurl = (profile.QRurl == "") ? "" : profile.QRurl;
    var timeStamp = (profile.timeStamp == "") ? "" : profile.timeStamp;
    var uploadedText = (profile.timeStamp == "") ? "" : `Uploaded profile on ${timeStamp} to Solana Blockchain (Devnet)`
    var allProblems = (profile.problemSolved == "") ? "" : `${profile.problemSolved[0].count}/${profile.totalProblems[0].count}`
    var easyProblems = (profile.problemSolved == "") ? "" : `${profile.problemSolved[1].count}/${profile.totalProblems[1].count}`
    var mediumProblems = (profile.problemSolved == "") ? "" : `${profile.problemSolved[2].count}/${profile.totalProblems[2].count}`
    var hardProblems = (profile.problemSolved == "") ? "" : `${profile.problemSolved[3].count}/${profile.totalProblems[3].count}`

    return (
        <div className="wrapper">
            <div className="profile-card js-profile-card">
                <div className="profile-card__img">
                    <img src={picUrl} alt="profile card"></img>
                </div>

                <div className="profile-card__cnt js-profile-cnt">
                    <div className="profile-card__username">{`@${profile.username}`}</div>
                    <div className="profile-card__name">{profile.name}</div>
                    <div className="profile-card__txt">{profile.bio}</div>

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
                <img id="QR-img" src={`${QRSERVER_API}${QRurl}`} alt="" />
                <p id="watemark">Solana x LeetDroid © 2022</p>
                <p id="uploaded-text">{uploadedText} </p>
            </div>

        </div>
    )

}

export default ProfileCard;