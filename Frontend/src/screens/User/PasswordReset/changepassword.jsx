import React, { useState } from 'react';
import axios from '../../../config/axios';
import { useNavigate } from 'react-router-dom';

function Changepassword() {

    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');

    const handleEmailChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmaiChange = (e) => {
        setCpassword(e.target.value);
    };

    const handleResetPassword = async () => {
        try {
            const config = {
                headers: {
                    "content-type": "application/json"
                },
            };
            // Send a POST request to your API
            const { data } = await axios.post('/api/user/changepassword', { cpassword }, config);
            // Notify the user that the email was sent
            if (data) {

                alert('Your password changed successfully, Go to login');
                navigate('/login')

            }
        } catch (err) {
            console.error(err);
            alert('Failed to reset password. Please try again.');
        }
    };



    return (
        <div>
            <div className="font-mono min-h-screen bg-gray-400">
                <div className="container mx-auto">
                    <div className="flex justify-center px-6 my-12">
                        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                            <div
                                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                                style={{ backgroundImage: "url('https://source.unsplash.com/oWTW-jNGl9I/600x800')" }}
                            />
                            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                                <div className="px-8 mb-4 text-center">
                                    <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                                    <p className="mb-4 text-sm text-gray-700">
                                        We get it, stuff happens. Just enter your email address below and we'll send you a
                                        link to reset your password!
                                    </p>
                                </div>
                                <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                            Password
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="email"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={handleEmailChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                            Confirm Password
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="email"
                                            placeholder="Enter password"
                                            value={cpassword}
                                            onChange={handleEmaiChange}
                                        />
                                    </div>
                                    <div className="mb-6 text-center">
                                        <button
                                            className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={handleResetPassword}
                                        >
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Changepassword