"use client"
import React from 'react'
import logo from '@/assets/fitfreak.png';
import { IoIosBody } from 'react-icons/io';
import './Navbar.scss'
import Image from 'next/image'
import Link from 'next/link'
import AuthPopup from '../AuthPopup/AuthPopup';


const Navbar = () => {
    const [isloggedin, setIsloggedin] = React.useState<boolean>(false) //checking whether the user is logged in or not 

    const [showpopup, setShowpopup] = React.useState<boolean>(false) //this is for logging page pop up 

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
            <Image className="img" src={logo} alt="Logo" />
            <Link href="/">Workout</Link>
            <Link href="/">Handbook</Link>
            <div className="center">
                <div className="search">
                    <input placeholder="Search..." type="text" />
                    <button type="submit">Go</button>
                </div>
            </div>

            <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/"><IoIosBody/></Link>
            {
                isloggedin ?
                    <button>Logout</button>
                    :
                    <button onClick={() => {
                        setShowpopup(true)
                    }}>Login</button>
            }
            {
                showpopup && <AuthPopup setShowpopup={setShowpopup} />
            }
        </nav>
    )
}

export default Navbar
