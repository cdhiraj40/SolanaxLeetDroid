import React from 'react'
import { Link } from 'react-router-dom'
import './Cards.css'

function CardItem(props) {
    return (
        <>
            <li className="cards--item">
                {/* Imagem e Texto */}
                <Link to={props.path} className="cards--item--link">
                    <figure className="cards--item--pic-wrap" data-category={props.label}>
                        <img src={props.src} alt="" className="cards--item--img" />
                    </figure>
                    <div className="cards--item--info">
                        <h5 className="cards--item--text">
                            {props.text}
                        </h5>
                    </div>
                </Link>
            </li>
        </>

    )
}


export default CardItem