import React from 'react';
import './Button.css'
import {Link} from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({children, id, type, onClick, buttonStyle, buttonSize, to}) => {

    const checkOnClick = (typeof onClick === 'undefined') ? undefined : onClick;
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    const checkButtonTo = (typeof to === 'undefined') ? '/' : to;

    return (
        <Link to={checkButtonTo} className='btn-mobile'>
            <button id={id} className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={checkOnClick} type={type}>
                {children}
            </button>
        </Link>
    )
};

