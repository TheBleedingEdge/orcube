import React, { useEffect, useState } from 'react'
import TabComponent from '../UserAccount/Tab/TabComponent';

function MyAccommodation() {

    const [Userinfo, setUserinfo] = useState(null);

    useEffect(() => {
        const userinfoString = localStorage.getItem('userInfo');
        if (userinfoString) {
            const userinfo = JSON.parse(userinfoString);
            setUserinfo(userinfo);
        }
    }, []);




    return (
        <div className='px-5'>
            {Userinfo && !Userinfo.isHost && !Userinfo.isApplied ? (
                <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                    <div class="container max-w-screen-lg mx-auto">
                        <div>
                            <h2 class="font-semibold text-xl text-gray-600">Apply for Host here</h2>
                            <p class="text-gray-500 mb-6">Fill all details correctly</p>

                            <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                    <div class="text-gray-600">
                                        <p class="font-medium text-lg">Personal Details</p>
                                        <p>Please fill out all the fields.</p>
                                    </div>

                                    <div class="lg:col-span-2">
                                        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                            <div class="md:col-span-5">
                                                <label for="full_name">Full Name</label>
                                                <input type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
                                            </div>

                                            <div class="md:col-span-5">
                                                <label for="email">Email Address</label>
                                                <input type="text" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
                                            </div>

                                            <div class="md:col-span-3">
                                                <label for="address">Address / Street</label>
                                                <input type="text" name="address" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
                                            </div>

                                            <div class="md:col-span-2">
                                                <label for="city">City</label>
                                                <input type="text" name="city" id="city" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
                                            </div>

                                            <div class="md:col-span-2">
                                                <label for="state">State / province</label>
                                                <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                    <input name="state" id="state" placeholder="State" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="" />
                                                    <button tabindex="-1" class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                        <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                                        </svg>
                                                    </button>
                                                    <button tabindex="-1" for="show_more" class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                        <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div class="md:col-span-1">
                                                <label for="zipcode">Zipcode</label>
                                                <input type="text" name="zipcode" id="zipcode" class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value="" />
                                            </div>

                                            <div class="md:col-span-5">
                                                <div class="inline-flex items-center">
                                                    <input type="checkbox" name="billing_same" id="billing_same" class="form-checkbox" />
                                                    <label for="billing_same" class="ml-2">My billing address is different than above.</label>
                                                </div>
                                            </div>

                                            <div class="md:col-span-2">
                                                <label for="soda">Upload Doc here</label>
                                                <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                                            </div>

                                            <div class="md:col-span-5 text-right">
                                                <div class="inline-flex items-end">
                                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : Userinfo && Userinfo.isApplied ? (
                <div className='mt-20'>
                    you have apllied
                </div>
            ) : Userinfo && Userinfo.isHost && !Userinfo.isApplied ? (
                <div>
                    <TabComponent />
                </div>
            ) : (null)}
        </div>
    )
}

export default MyAccommodation