import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../../config/axios';
import app from '../../../config/firebaseConfig';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { register } from '../../../actions/userActions';
import SimpleBackdrop from '../../common/Loading';
import Header from '../../common/Header';



function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [Cpassword, setCpassword] = useState('');
    const [ifpass, setIfpass] = useState('');
    const [otpconfirm, setOtpConfirm] = useState();
    const [verified, setVerified] = useState();
    const [timeLeft, setTimeLeft] = useState(0);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mobileno = useRef()
    const auth = getAuth(app);


    const userRegister = useSelector((state) => state.userRegister)
    const { loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo])


    useEffect(() => {
        let intervalId;
        if (timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            console.log(timeLeft);
        }
        return () => clearInterval(intervalId);
    }, [timeLeft]);



    const submitHandler = async (req, res) => {
        try {
            if (password === Cpassword) {
                setIfpass(false)
                dispatch(register(name, email, password, mobileno));
            }
            else {
                setIfpass(true)
            }
        } catch (error) {
            alert("Registration failed")
        }
    }


    function empty() {
        toast.warn('OTP not verified', {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        }); //for submit condition
    }


    async function sentOtp() {
        console.log('get into sentotp function');
        try {
            console.log("COundown starts");
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                    'size': 'invisible',
                    'callback': (response) => {
                        // reCAPTCHA solved, allow signInWithPhoneNumber.
                        // ...
                    },
                    'expired-callback': () => {
                        // Response expired. Ask user to solve reCAPTCHA again.
                        // ...
                    }
                }, auth);
            }
        } catch (error) {
            console.log(error);
        }

        const appVerifier = window.recaptchaVerifier;
        const ph = '+91' + mobileno.current.value
        console.log('mob', ph);
        await signInWithPhoneNumber(auth, ph, appVerifier)
            .then((confirmationResult) => {
                setTimeLeft(90);
                toast.success('OTP sent Successfully', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                setOtpConfirm(confirmationResult)
                window.confirmationResult = confirmationResult;
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                toast.error('An Error Occured', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log(error);
            });
    }



    const verifyOTP = async () => {
        try {
            const verifiedotp = await otpconfirm.confirm(otp)
            if (verified) {
                toast.success('OTP verified successfully', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            console.log(verifiedotp);
            setVerified(verifiedotp)
        } catch (error) {
            toast.error('Error in OTP veirfication', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(error);
        }
    }





    return (
        <div>
            <Header />
            <div className="min-h-screen bg-slate-50 xl:flex items-center">
                {loading && <SimpleBackdrop />}
                <ToastContainer
                    position="top-center"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />


                <div className="hero min-h-screen min-w-1/2 bg-slate-100" style={{ backgroundImage: `url('https://images.wallpaperscraft.com/image/single/silhouette_lonely_mountain_129665_1280x720.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className='pl-10'>
                            <h1 className="text-5xl font-bold text-cyan-200">Discover the joy of travel - Your home away from home awaits!</h1>
                            <p className="py-6 text-slate-100">"Explore the world, one stay at a time - Experience the warmth of local hospitality, create unforgettable memories, and embrace the adventure of diverse cultures in the comfort of a home away from home."</p>
                            <button className="btn btn-primary">Get Started</button>
                        </div>
                    </div>
                </div>

                <div className="card mx-auto w-full max-w-xl  shadow-xl">
                    <div className="  bg-base-100 rounded-xl">
                        <div className='py-14 px-10'>
                            <h2 className='text-2xl font-semibold mb-2 text-center mt-3'>Register</h2>
                            <div className="mb-4">
                                <div className='flex'>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text text-base-content bold "><b>First Name</b></span>
                                        </label>
                                        <input value={name}
                                            onChange={ev => setName(ev.target.value)} type='text' placeholder='' name='name' className="input input-md input-bordered w-3/4 " />
                                    </div>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-base-content bold "><b>Email</b></span>
                                    </label>

                                    <input value={email}
                                        onChange={ev => setEmail(ev.target.value)} type='email' placeholder='' name='email' className="input input-md  input-bordered w-3/4 " />

                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-base-content "><b>Password</b></span>
                                    </label>

                                    <input value={password}
                                        onChange={ev => setPassword(ev.target.value)} type="password" placeholder='' name='password' className="input input-md input-bordered w-3/4 " />

                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-base-content "><b>Confirm Password</b></span>
                                    </label>

                                    <input value={Cpassword}
                                        onChange={ev => setCpassword(ev.target.value)} type="password" placeholder='' name='password' className="input input-md input-bordered w-3/4 " />

                                </div>

                                {ifpass && (<div>
                                    <p className='text-red-500'>Passwords do not match !</p>
                                </div>)

                                }

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-base-content "><b>Mobile No</b></span>
                                    </label>
                                    <div>
                                        <input
                                            // value={mobile}
                                            //     onChange={ev => {
                                            //         setMobile(ev.target.value)
                                            //         console.log(mobile)
                                            //     }} 
                                            ref={mobileno}
                                            type="text" placeholder='' name='mobile' className="input input-md input-bordered w-3/4 " />
                                        {
                                            timeLeft == 0 ? <button onClick={sentOtp} className="btn btn-info w-1/5 ml-5">
                                                Sent OTP
                                            </button> : <span className="countdown ml-5 font-mono text-lg text-red-500">
                                                {timeLeft}
                                            </span>
                                        }
                                    </div>
                                </div>

                                <div id='recaptcha-container'>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-base-content "><b>OTP</b></span>
                                    </label>
                                    <div className=''>
                                        <input type="number" value={otp}
                                            onChange={ev => setOtp(ev.target.value)} placeholder='' className="input input-md input-bordered w-1/3 " />
                                        <button onClick={verifyOTP} className="btn btn-info w-1/5 ml-5">Verify</button>
                                    </div>
                                </div>

                            </div>

                            <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                            </div>

                            {/* <ErrorText styleClass="mt-8">{errorMessage}</ErrorText> */}
                            <button type="submit" onClick={() => {
                                if (verified) {
                                    submitHandler()
                                } else {
                                    empty()
                                }
                            }} className="btn btn-md mt-2 w-1/3 btn-primary">Register</button>

                            <div className='text-center mt-4'>Have an account yet? <Link to="/login"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register