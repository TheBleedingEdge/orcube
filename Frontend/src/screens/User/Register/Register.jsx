import React from 'react'
import { Link } from 'react-router-dom'
import { register } from '../../../function/userFunctions'

function Register() {



    return (
        <div className="min-h-screen bg-slate-50 flex items-center">
            <div className="card mt-10 mx-auto w-full max-w-xl  shadow-xl">
                <div className="  bg-base-100 rounded-xl">
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
                        <form>

                            <div className="mb-4">
                                <div className='flex'>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text text-base-content bold "><b>First Name</b></span>
                                        </label>
                                        <input type='text' placeholder='' name='name' className="input input-sm input-bordered w-3/4 " />
                                        
                                    </div>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-base-content bold "><b>Email</b></span>
                                    </label>

                                    <input type='email' placeholder='' name='email' className="input input-sm  input-bordered w-3/4 " />

                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-base-content "><b>Password</b></span>
                                    </label>

                                    <input type="password" placeholder='' name='password' className="input input-sm input-bordered w-3/4 " />

                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-base-content "><b>Mobile No</b></span>
                                    </label>

                                    <input type="number" placeholder='' name='mobile' className="input input-sm input-bordered w-3/4 " />

                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-base-content "><b>OTP</b></span>
                                    </label>
                                    <input type="number" placeholder='' className="input input-sm input-bordered w-1/2 " />
                                </div>

                            </div>

                            <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                            </div>

                            {/* <ErrorText styleClass="mt-8">{errorMessage}</ErrorText> */}
                            <button type="submit" className="btn btn-sm mt-2 w-1/3 w-full btn-primary">Register</button>

                            <div className='text-center mt-4'>Have an account yet? <Link to="/login"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register