import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css'
import whiteLogo from '../assets/images/logos/logo-white.svg'
import {GITHUB_PROJECT_LINK} from '../utils/Const'
function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [navbar, setNavbar] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton()
    }, []);

    window.addEventListener('resize', showButton);

    const changeBackground = () => {
        if (window.scrollY >= window.innerHeight - 80) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    const openGithub = () => {
        window.open(GITHUB_PROJECT_LINK)
    }

    window.addEventListener('scroll', changeBackground)

    return (
        <>
            <nav className={navbar ? 'navbar active' : 'navbar'}>
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <img className='navbar-icon' src={whiteLogo} alt='Dhiraj Logo' />
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <div className='nav-links' onClick={openGithub}>
                                Github
                            </div>
                        </li>
                    </ul>
                    {/* Navbar Mobile Buttons */}
                    {button && <Button buttonStyle="btn--outline" to='/how-to-use' >How to use</Button>}
                </div>
            </nav>
        </>
    )
}

export default Navbar