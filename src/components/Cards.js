import React from 'react'
import CardItem from './CardItem'
import './Cards.css'
import imgCard1 from '../assets/images/logos/logo-black.svg'

function Cards() {
    return (
        <div className='cards'>
            <h1>These are my projects</h1>
            <div className="cards--container">
                <div className="cards--wrapper">
                    <ul className="cards--items">
                        {/* To put more cards just copy and change properties 
                        If you need a new line just copy the ul*/}
                        <CardItem src={imgCard1} text="massa massa ultricies mi quis hendrerit dolor magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant" label="Test Label" path="/" />
                        <CardItem src={imgCard1} text="massa massa ultricies mi quis hendrerit dolor magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant" label="Test Label" path="/" />
                    </ul>
                    <ul className="cards--items">
                        {/* To put more cards just copy and change properties 
                        If you need a new line just copy the ul*/}
                        <CardItem src={imgCard1} text="massa massa ultricies mi quis hendrerit dolor magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant" label="Test Label" path="/" />
                        <CardItem src={imgCard1} text="massa massa ultricies mi quis hendrerit dolor magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant" label="Test Label" path="/" />
                        <CardItem src={imgCard1} text="massa massa ultricies mi quis hendrerit dolor magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant" label="Test Label" path="/" />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards