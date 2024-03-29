import React, { useState, useEffect } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import SimpleBackdrop from '../../common/Loading';
import { loginUser } from '../../../actions/userActions';
import axios from '../../../config/axios';
import Header from '../../common/Header';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userInfoFromStorage = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null;

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, userInfo } = userLogin;


    useEffect(() => {
        if (userInfo) {
                navigate("/")
            }
            else {
                navigate("/login")
            }
        }, [userInfo])



    const loginHandler = () => {
        dispatch(loginUser(email, password))
    }




    return (
        <div>
            <Header />
            <div className="min-h-screen bg-slate-50 gap- xl:flex items-center">
                {loading && <SimpleBackdrop />}

                <div className="hero min-h-screen min-w-1/2 bg-slate-100" style={{ backgroundImage: `url('https://images.wallpaperscraft.com/image/single/silhouette_lonely_mountain_129665_1280x720.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className='pl-10'>
                            <h1 className="text-5xl font-bold text-cyan-200">Discover the joy of travel - Your home away from home awaits!</h1>
                            <p className="py-6 text-slate-100">"Explore the world, one stay at a time - Experience the warmth of local hospitality, create unforgettable memories, and embrace the adventure of diverse cultures in the comfort of a home away from home."</p>
                            <button className="btn btn-primary">Get Started</button>
                        </div>
                    </div>
                </div>



                <div className="card min-h-screen bg-white mx-auto w-full max-w-xl  shadow-xl">
                    <div className="  bg-base-100 rounded-xl">
                        <div className='py-24 px-10'>
                            <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                            <div className="mb-4">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-base-content bold ">Email</span>
                                    </label>
                                    <input
                                        onChange={ev => setEmail(ev.target.value)} type='email' placeholder='' className="input input-sm input-bordered w-full " />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-base-content ">Password</span>
                                    </label>
                                    <input
                                        onChange={ev => setPassword(ev.target.value)} type="password" placeholder='' className="input input-sm input-bordered w-full " />
                                </div>

                            </div>

                            <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                            </div>

                            {/* <ErrorText styleClass="mt-8">{errorMessage}</ErrorText> */}
                            <div className='justify-center'>
                                <button onClick={loginHandler} className="btn btn-sm mt-2 w-1/3 btn-primary">Login</button>
                            </div>

                            <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login