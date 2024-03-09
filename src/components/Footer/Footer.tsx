"use client"
import React from 'react'
import './Footer.scss';
import Image from 'next/image';
import logo from '@/assets/fitfreak.png';
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import ChestPage from '../Workouts/ChestPage';
import AbsPage from '../Workouts/AbsPage';
import BackPage from '../Workouts/BackPage';
import BicepsPage from '../Workouts/BicepsPage';
import TricepsPage from '../Workouts/TricepsPage';


const Footer = () => {
    const [showChest, setShowChest] = React.useState<boolean>(false);
    const [showAbs, setShowAbs] = React.useState<boolean>(false);
    const [showBack, setShowBack] = React.useState<boolean>(false);
    const [showBiceps, setShowBiceps] = React.useState<boolean>(false);
    const [showTriceps, setShowTriceps] = React.useState<boolean>(false);

    return (
        <footer className="site-footer">
            <div className="container1">
                <div className="img">
                    <Image className="imgg" src={logo} alt="Logo" />
                </div>
                <div className="about">
                    <h6>About</h6>
                    <p className="text-justify">Welcome to our fitness tracking website! We are dedicated to helping you achieve your health and wellness goals. With personalized fitness tracking tools and expert guidance, we empower you to take control of your fitness journey. Whether you're looking to lose weight, build muscle, or improve your overall health, our platform offers tailored plans and valuable insights to support your progress. Join our community today and embark on a journey towards a healthier, happier life!</p>
                </div>

                <div className="phone">
                    <div className="categories">
                        <h6>Workouts</h6>
                        <ul className="footer-links">
                            <li><a onClick={() => {
                                setShowChest(true);
                            }}>Chest Day</a></li>{showChest && <ChestPage setShowChest={setShowChest} />}

                            <li><a onClick={() => {
                                setShowAbs(true);
                            }}>Abs Day</a></li>{showAbs && <AbsPage setShowAbs={setShowAbs} />}

                            <li><a onClick={() => {
                                setShowBack(true);
                            }}>Back Day</a></li>{showBack && <BackPage setShowBack={setShowBack} />}

                            <li><a onClick={() => {
                                setShowBiceps(true);
                            }}>Biceps</a></li>{showBiceps && <BicepsPage setShowBiceps={setShowBiceps} />}

                            <li><a onClick={() => {
                                setShowTriceps(true);
                            }}>Triceps</a></li>{showTriceps && <TricepsPage setShowTriceps={setShowTriceps} />}
                        </ul>
                    </div>

                    <div className="links">
                        <h6>Quick Links</h6>
                        <ul className="footer-links">
                            <li><a href="/">About Us</a></li>
                            <li><a href="tel:+91830-280-8701">Contact Us</a></li>
                            <li><a href="mailto:sswar3939@gmail.com">Email</a></li>
                            <li><a href="/">Privacy Policy</a></li>
                            <li><a href="/">Sitemap</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container2">
                <div className="copyright">
                    <p className="copyright-text">Copyright &copy; 2024 All Rights Reserved by
                        <a href="#"> Swar Shah</a>.
                    </p>
                </div>

                <div className="icons">
                    <ul className="social-icons">
                        <li><a className="facebook" href="https://www.facebook.com/swar.shah.33/"><SlSocialFacebook /></a></li>
                        <li><a className="twitter" href="https://twitter.com/SwarShah09"><SlSocialTwitter /></a></li>
                        <li><a className="instagram" href="https://www.instagram.com/swarshahhh/"><SlSocialInstagram /></a></li>
                        <li><a className="linkedin" href="https://www.linkedin.com/in/swar-shah-190a84218/"><SlSocialLinkedin /></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer
