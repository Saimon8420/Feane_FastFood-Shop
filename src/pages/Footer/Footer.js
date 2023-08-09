import React from 'react';
import './Footer.css';
import fbIcon from '../../icons/icons8-facebook-circled-100.png';
import pinterIcon from '../../icons/icons8-pinterest-100.png';
import linkdnIcon from '../../icons/icons8-linkedin-circled-100.png';
import youtubeIcon from '../../icons/icons8-play-button-circled-100.png';
import twitterIcon from '../../icons/icons8-twitter-circled-100.png';
import whatsAppIcon from '../../icons/icons8-whatsapp-100.png';
import instaIcon from '../../icons/icons8-instagram-100.png';
const Footer = () => {
    const date = new Date();
    return (
        <div className='display-footer'>
            <div className='footer-info'>
                <div className='contact'>
                    <h2>Contact Us</h2>
                    <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                        Dhaka,Bangladesh</p>
                    <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                        +8801500000000</p>
                    <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                        demo@gmail.com</p>
                </div>
                <div className='feane'>
                    <h2>Feane</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate, aspernatur ipsum. Adipisci minus id, vero atque, alias unde ipsa numquam voluptatem, repellat enim rerum libero? Debitis suscipit illum minus veritatis.</p>
                    <p>Connected With Us:</p>
                    <div className='social-icons'>
                        <img src={fbIcon} alt="" />
                        <img src={instaIcon} alt="" />
                        <img src={whatsAppIcon} alt="" />
                        <img src={youtubeIcon} alt="" />
                        <img src={twitterIcon} alt="" />
                        <img src={linkdnIcon} alt="" />
                        <img src={pinterIcon} alt="" />
                    </div>
                </div>
                <div className='opening-info'>
                    <h2>Opening Hours</h2>
                    <p>Everyday</p>
                    <p>10.00AM-10.00PM</p>
                </div>
            </div>
            <div className='rights-info'>
                <h5 id='copyright'>&#169; {date.getFullYear()} All Rights Reserved By Feane</h5>
                <h6 id='theme-right'>&#169; Distributed By ThemeWagon</h6>
            </div>
        </div>
    );
};

export default Footer;