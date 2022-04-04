import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import whiteLogo from '../assets/images/logos/logo-white.svg'

function Footer() {

    return (
        <div className='footer-container'>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        <Link to='/' className='social-logo'>
                            <img className='footer-icon' src={whiteLogo} alt='Dhiraj Logo' />
                        </Link>
                    </div>
                    <small className='website-rights'>Dhiraj Chauhan &copy; <span>{new Date().getFullYear()}</span></small>
                    <div className='social-icons'>
                        <Link className='social-icon-link gmail' to='/' aria-label='Gmail' onClick={() => { window.open('mailto:chauhandhiraj40.com') }}>
                            <i className="fa fa-envelope" aria-hidden="true" />
                        </Link>
                        <Link className='social-icon-link youtube' to='/' aria-label='Youtube' onClick={() => { window.open('https://www.youtube.com/channel/UCTSqyTvuLkxlTZhxs84djbA') }}>
                            <i className='fab fa-youtube' />
                        </Link>
                        <Link className='social-icon-link twitter' to='/' aria-label='Twitter' onClick={() => { window.open('https://twitter.com/cdhiraj40') }}>
                            <i className='fab fa-twitter' />
                        </Link>
                        <Link className='social-icon-link linkedin' to='/' aria-label='LinkedIn' onClick={() => { window.open('https://www.linkedin.com/in/cdhiraj40/') }}>
                            <i className='fab fa-linkedin' />
                        </Link>
                        <Link className='social-icon-link github' to='/' aria-label='GitHub' onClick={() => { window.open('https://github.com/cdhiraj40') }}>
                            <i className='fab fa-github' />
                        </Link>
                        <Link className='social-icon-link discod' to='/' aria-label='Discord' onClick={() => { window.open('https://discord.com/invite/fKakn9kk39/') }}>
                            <i className='fab fa-discord' />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer;
