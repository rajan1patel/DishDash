import React from 'react'
import './Footer.css';
import { assets } from '../../assets/frontend_assets/assets';
const Footer = () => {
  return (
    <div className='footer' id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore omnis reprehenderit beatae nesciunt dignissimos fugit </p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
            </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About US</li>
                    <li>delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get in Touch
                    <ul>
                        <li>+9123948384</li>
                        <li>contact@gmail.com</li>
                    </ul>
                </h2>
            </div>
        </div>
        <hr />
        <p>All rights reserved</p>
      
    </div>
  )
}

export default Footer
