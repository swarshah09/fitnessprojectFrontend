"use client"
import React from 'react'
import logo from '@/assets/fitfreak.png';
import { IoIosBody } from 'react-icons/io';
import './Navbar.scss'
import Image from 'next/image'
import Link from 'next/link'
import AuthPopup from '../AuthPopup/AuthPopup';
import { HiBookOpen } from "react-icons/hi2";
import { TiHome } from "react-icons/ti";
import ProfilePage from '../Profile/ProfilePage';
import HomeBanner2 from '../HomeBanner2/HomeBanner2';


const Navbar = () => {
    const [isloggedin, setIsloggedin] = React.useState<boolean>(false) //checking whether the user is logged in or not 

    const [showpopup, setShowpopup] = React.useState<boolean>(false) //this is for logging page pop up 
    const [showProfile, setShowProfile] = React.useState<boolean>(false) //this is for logging page pop up 

    const checklogin = async () => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/checklogin', {
            method: 'POST',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.ok) {
                    setIsloggedin(true)
                }
                else {
                    setIsloggedin(false)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    React.useEffect(() => {
        checklogin()
    }, [showpopup]);
    return (
        <nav>
            <div className="block1">
                <Image className="img" src={logo} alt="Logo" />
                <Link className='wk' href="/">Workout</Link>
                <Link className='hb' href="https://fitdocs.netlify.app/">Handbook</Link>
                <Link className='nb' href="https://www.sciencedaily.com/news/health_medicine/fitness/">News</Link>
                <Link className='hbi' href="/"><HiBookOpen /></Link>
                

            </div>

            <div className="center">
                <div className="search">
                    <input placeholder="Search..." type="text" />
                    <button type="submit">Go</button>
                </div>
            </div>

            <div className="block2">
                <Link className='hm' href="/">Home</Link>
                <Link className='hmi' href="/"><TiHome /></Link>
                <Link className='ab' href="/">About</Link>
                {/* <Link href="/"><IoIosBody className='.iosbody'/></Link> */}
                <button className='iobutton'
                onClick={() => {
                    setShowProfile(true)
                }}>
                    <IoIosBody className='.iosbody'/></button>
                {
                    isloggedin ?
                        <button>Logout</button>
                        :
                        <button onClick={() => {
                            setShowpopup(true)
                        }}>Login</button>
                }
                {showpopup && <AuthPopup setShowpopup={setShowpopup} />}
                {showProfile && <ProfilePage setShowProfile={setShowProfile} />}
            </div>
        </nav>
    )
}

export default Navbar
