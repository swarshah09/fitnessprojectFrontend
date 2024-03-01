import React from 'react';
import Link from 'next/link';
import './WelcomePage.scss';
import Image from 'next/image';

interface WelcomePageProps {
    onGetStarted: () => void; // Define the type of the onGetStarted prop
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onGetStarted }) => {

    return (
        <div className="hero-banner">
            <div className="bgimage">
                
            </div>
            <div className="content">
                <div className="text-content">
                    <h1>Fitness<span>Freaks. </span></h1>
                    <p>Taking The Best Care Of Your Health.</p>
                    <p>Welcome To Our Fitness Training App</p>

                    <div className="navigate">
                        <button onClick={onGetStarted}>Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
