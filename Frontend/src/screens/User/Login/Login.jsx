import React from 'react'
import { Link } from 'react-router-dom'
import "./Login.css"

function Login() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center">
            <div className="card mx-auto w-full max-w-xl  shadow-xl">
                <div className="  bg-base-100 rounded-xl">
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                        <form>

                            <div className="mb-4">

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-base-content bold ">Email</span>
                                    </label>
                                    <input type='email' value='' placeholder='' className="input  input-bordered w-full " />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-base-content ">Password</span>
                                    </label>
                                    <input type="password" value='' placeholder='' className="input  input-bordered w-full " />
                                </div>

                            </div>

                            <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                            </div>

                            {/* <ErrorText styleClass="mt-8">{errorMessage}</ErrorText> */}
                            <button type="submit" className="btn mt-2 w-full btn-primary">Login</button>

                            <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login