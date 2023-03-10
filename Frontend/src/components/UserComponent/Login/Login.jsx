import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../../config/axios';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const loginUser = async() => {
        console.log(email);
        console.log("login user");

        const {data} = await axios.post('/api/user/login', {
            email,
            password
        })
        console.log({data});

        if(data){
            navigate('/')
        }

        localStorage.setItem("userInfo", JSON.stringify(data));

        console.log(data);

    }


    return (
        <div className="min-h-screen bg-slate-50 flex items-center">
            <div className="card mx-auto w-full max-w-xl  shadow-xl">
                <div className="  bg-base-100 rounded-xl">
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                            <div className="mb-4">

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-base-content bold ">Email</span>
                                    </label>
                                    <input value={email}
                                        onChange={ev => setEmail(ev.target.value)} type='email' placeholder='' className="input input-sm input-bordered w-full " />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-base-content ">Password</span>
                                    </label>
                                    <input value={password}
                                        onChange={ev => setPassword(ev.target.value)} type="password" placeholder='' className="input input-sm input-bordered w-full " />
                                </div>

                            </div>

                            <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                            </div>

                            {/* <ErrorText styleClass="mt-8">{errorMessage}</ErrorText> */}
                            <div className='justify-center'>
                                <button type="submit" onClick={() => {
                                    loginUser()
                                }} className="btn btn-sm mt-2 w-1/3 btn-primary">Login</button>
                            </div>

                            <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login