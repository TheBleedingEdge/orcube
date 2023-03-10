import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../../config/axios';
import app from '../../../config/firebaseConfig';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";




function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [Cpassword, setCpassword] = useState('');
    const [ifpass, setIfpass] = useState('');
    const [otpconfirm, setOtpConfirm] = useState();
    const [verified, setVerified] = useState();
    const navigate = useNavigate();

    const mobileno = useRef()

    const auth = getAuth(app);


    const registerUser = async (req,res) => {
        try {
            const mobile = mobileno.current.value
            console.log(mobile);
            if (password === Cpassword) {
                setIfpass(false)
                const { data } = await axios.post('/api/user/register', {
                    name,
                    email,
                    password,
                    mobile
                })
                console.log(data)
                if (data != null) {
                    navigate("/")
                    alert("Registration Completed")
                } else {
                    alert("Registration failed")
                }
            }
            else {
                setIfpass(true)
            }
        } catch (error) {
            alert("Registration failed")
        }
    }

function empty() {

}

    async function sentOtp() {
        console.log('get into sentotp function');
        try {
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
        } catch (error) {
            console.log(error);
        }

        const appVerifier = window.recaptchaVerifier;
        console.log("123345", appVerifier);
        console.log("123345", auth);
        const ph = '+91' + mobileno.current.value
        console.log('mob', ph);
        await signInWithPhoneNumber(auth, ph, appVerifier)
            .then((confirmationResult) => {
                console.log("123");
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                setOtpConfirm(confirmationResult)
                window.confirmationResult = confirmationResult;
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                console.log(error);
            });
    }

    const verifyOTP = async() => {
        try {
            const verifiedotp = await otpconfirm.confirm(otp)
            console.log(verifiedotp);
            setVerified(verifiedotp)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="min-h-screen bg-slate-50 flex items-center">
            <div className="card mt-10 mx-auto w-full max-w-xl  shadow-xl">
                <div className="  bg-base-100 rounded-xl">
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
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
                                    <button onClick={sentOtp} className="btn btn-info w-1/5 ml-5">Sent OTP</button>
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
                            verified ? registerUser()  : empty()
                        }} className="btn btn-md mt-2 w-1/3 btn-primary">Register</button>

                        <div className='text-center mt-4'>Have an account yet? <Link to="/login"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link></div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register