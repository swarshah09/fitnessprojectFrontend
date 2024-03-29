import React, { useState } from 'react';
import './AuthPopup.scss';
import Image from 'next/image';
import logo from '@/assets/fitfreak.png'
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai'
import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { ToastContainer, toast } from 'react-toastify';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

interface AuthPopupProps {
    setShowpopup: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SignupFormData {
    name: string;
    email: string;
    password: string;
    weightInKg: number;
    heightInCm: number;
    goal: string;
    gender: string;
    dob: Date | null;
    activityLevel: string;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ setShowpopup }) => {
    const [showSignup, setShowSignup] = React.useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [signupformData, setSignupFormData] = useState<SignupFormData>({
        name: '',
        email: '',
        password: '',
        weightInKg: 0.0,
        heightInCm: 0.0,
        goal: '',
        gender: '',
        dob: new Date(),
        activityLevel: ''
    })
    const [loginformData, setLoginFormData] = useState({
        email: '',
        password: '',
    })

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    // router.post('/register', async (req, res, next) => {
    //     console.log(req.body);
    //     try {
    //         const { name, email, password, weightInKg, heightInCm, gender, dob, goal, activityLevel } = req.body;
    //         const existingUser = await User.findOne({ email: email });

    //         if (existingUser) {
    //             return res.status(409).json(createResponse(false, 'Email already exists'));
    //         }//if the user already exists you cant login with the same email
    //         const newUser = new User({
    //             name,
    //             password,
    //             email,
    //             weight: [
    //                 {
    //                     weight: weightInKg,
    //                     unit: "kg",
    //                     date: Date.now()
    //                 }
    //             ],
    //             height: [
    //                 {
    //                     height: heightInCm,
    //                     date: Date.now(),
    //                     unit: "cm"
    //                 }
    //             ],
    //             gender,
    //             dob,
    //             goal,
    //             activityLevel
    //         });
    //         await newUser.save(); // Await the save operation

    //         res.status(201).json(createResponse(true, 'User registered successfully'));

    //     }
    //     catch (err) {
    //         next(err);
    //     }
    // })


    // router.post('/login', async (req, res, next) => {
    //     try {
    //         const { email, password } = req.body;
    //         const user = await User.findOne({ email });
    //         if (!user) {
    //             return res.status(400).json(createResponse(false, 'Invalid credentials'));
    //         }
    //         const isMatch = await bcrypt.compare(password, user.password); //to comapre the hash passwords is already exist or not using bycrpt
    //         if (!isMatch) {
    //             return res.status(400).json(createResponse(false, 'Invalid credentials'));
    //         }

    //         const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '50m' });
    //         const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '100m' });

    //         res.cookie('authToken', authToken, { httpOnly: true });
    //         res.cookie('refreshToken', refreshToken, { httpOnly: true });
    //         res.status(200).json(createResponse(true, 'Login successful', {
    //             authToken,
    //             refreshToken
    //         }));
    //     }
    //     catch (err) {
    //         next(err);
    //     }
    // })

    const handleLogin = () => {
        console.log(loginformData);

        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginformData),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.ok) {
                    toast.success(data.message)

                    setShowpopup(false)
                }
                else {
                    toast.error(data.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    const handleSignup = () => {
        // console.log(process.env.NEXT_PUBLIC_BACKEND_API);

        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupformData),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.ok) {
                    toast.success(data.message)

                    setShowSignup(false)
                }
                else {
                    toast.error(data.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }


    const handleActivityLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSignupFormData({
            ...signupformData,
            activityLevel: e.target.value
        });
    };

    const handleGoalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSignupFormData({
            ...signupformData,
            goal: e.target.value
        });
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSignupFormData({
            ...signupformData,
            gender: e.target.value
        });
    };
    return (
        <div className='popup'>
            <button className='close'
                onClick={() => {
                    setShowpopup(false)
                }}>
                <AiOutlineClose />
            </button>
            {/* <div className="logo">
                <Image src={logo} alt="Logo" />
            </div> */}

            {
                showSignup ? (
                    <div className='form-containerS'>
                        <div className="Sright">
                            <h1 className='title'>Signup</h1>
                            <form action="" className='form'>

                                <input type="email" className="input" placeholder="Email"
                                    onChange={(e) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            email: e.target.value
                                        })
                                    }} />

                                {/* <input type="password" className="input" placeholder="Password"
                                    onChange={(e) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            password: e.target.value
                                        })
                                    }} /> */}

                                <div className='pass'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input"
                                    placeholder="Password"
                                    value={signupformData.password}
                                    onChange={(e) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            password: e.target.value
                                        });
                                    }}
                                />
                                <span className="password-toggle" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FiEye /> : <FiEyeOff />}
                                </span>
                                </div>


                                <div className="form_input_leftright">
                                    <input className='input1' placeholder='Name' type='string'
                                        onChange={(e) => {
                                            setSignupFormData({
                                                ...signupformData,
                                                name: e.target.value
                                            })
                                        }} />

                                    <input className='input1' placeholder='Weight(Kg)' type='string'
                                        onChange={(e) => {
                                            setSignupFormData({
                                                ...signupformData,
                                                weightInKg: parseFloat(e.target.value)
                                            })
                                        }} />
                                </div>

                                <select className='inputActivityLevel' value={signupformData.activityLevel || ''} onChange={handleActivityLevelChange}>
                                    <option value="">Activity Level</option>
                                    <option value="sedentary">Sedentary</option>
                                    <option value="light">Light</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="active">Active</option>
                                    <option value="veryactive">Veryactive</option>
                                </select>

                                <select className='inputGoal' value={signupformData.goal || ''} onChange={handleGoalChange}>
                                    <option value="">Goal</option>
                                    <option value="weightLoss">Lose</option>
                                    <option value="weightMaintain">Maintain</option>
                                    <option value="weightGain">Gain</option>
                                </select>

                                <select className='inputGender' value={signupformData.gender || ''} onChange={handleGenderChange}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>

                                <div className="form_input_leftrightH">
                                    <label htmlFor="">Height</label>
                                    <input className='inputH' placeholder="cm" type='number'
                                        onChange={(e) => {
                                            setSignupFormData({
                                                ...signupformData,
                                                heightInCm: parseFloat(e.target.value)
                                            })
                                        }} />
                                </div>

                                <div className="dob">
                                    <label htmlFor="">DOB</label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker defaultValue={dayjs(new Date())}
                                            sx={{
                                                backgroundColor: 'white',
                                                borderRadius: 10,
                                                border: 'none',
                                                width: '100%',
                                                marginLeft: '15px',
                                            }}

                                            onChange={(newValue) => {
                                                setSignupFormData({
                                                    ...signupformData,
                                                    dob: new Date(newValue as any)
                                                })
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>

                                <button className="form-btn" onClick={(e) => {
                                    e.preventDefault();
                                    handleSignup();
                                }}>Sign up</button>
                            </form>

                            <p className="sign-up-label">
                                Already have an account?
                                <span className='sign-up-link' onClick={() => {
                                    setShowSignup(false)
                                }}>Login</span>
                            </p>
                        </div>

                        <div className="buttons-container">
                            <div className="apple-login-button">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" className="apple-icon" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
                                </svg>
                                <span>Sign up with Apple</span>
                            </div>
                            <div className="google-login-button">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px" className="google-icon" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
        c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
        c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
        c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                                <span>Sign up with Google</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='form-containerL'>
                        <div className="right">
                            <h1 className='titleL'>Welcome back!</h1>
                            <form action="" className='formL'>

                                <input type="email" className="inputL" placeholder="Email"
                                    onChange={(e) => {
                                        setLoginFormData({
                                            ...loginformData,
                                            email: e.target.value
                                        })
                                    }} />

                                {/* <input type="password" className="inputL" placeholder="Password"
                                    onChange={(e) => {
                                        setLoginFormData({
                                            ...loginformData,
                                            password: e.target.value
                                        })
                                    }} /> */}

                                <div className="pass1">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="inputL"
                                    placeholder="Password"
                                    value={loginformData.password}
                                    onChange={(e) => {
                                        setLoginFormData({
                                            ...loginformData,
                                            password: e.target.value
                                        });
                                    }}
                                />
                                <span className="password-toggle" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FiEye /> : <FiEyeOff />}
                                </span>
                                </div>

                                <p className="page-linkL">
                                    <span className="page-link-labelL">Forgot Password?</span>
                                </p>

                                <button className="form-btnL" onClick={(e) => {
                                    e.preventDefault();
                                    handleLogin();
                                }}>Log in</button>
                            </form>

                            <p className="sign-up-labelL">
                                Don't have an account?
                                <span className='sign-up-linkL' onClick={() => setShowSignup(true)}>Sign up</span>
                            </p>

                            <div className="buttons-container">
                                <div className="apple-login-button">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" className="apple-icon" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
                                    </svg>
                                    <span>Log in with Apple</span>
                                </div>
                                <div className="google-login-button">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px" className="google-icon" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
        c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
        c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
        c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    </svg>
                                    <span>Log in with Google</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}
export default AuthPopup;
