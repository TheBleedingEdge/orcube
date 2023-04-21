import React, { Children, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import './card.css';
import axios from '../../../../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Card({ cardData, spaceid }) {

    const [countAdult, setCountAdult] = useState(1);
    const [countChildren, setCountChildren] = useState(1);
    const [countPets, setCountPets] = useState(0);

    const [firstDate, setFirstDate] = useState(null);
    const [secondDate, setSecondDate] = useState(null);
    const [Total, setTotal] = useState(0);

    const diffInDays = dayjs(secondDate).diff(dayjs(firstDate), 'day');
    const [isSameDate, setIsSameDate] = useState(false);
    const [available, setAvailable] = useState(false);

    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, userInfo } = userLogin;

    const handleFirstDateChange = (newValue) => {
        if (newValue) {
            setFirstDate(newValue);
        }
    };

    const handleSecondDateChange = (newValue) => {
        setSecondDate(newValue);
        if (firstDate === secondDate) {
            setIsSameDate(true);
        }
    };

    const checkAvailability = async () => {
        try {
            const response = await axios.post('/api/user/check-availability', {
                spaceid,
                firstDate,
                secondDate,
            });

            const data = response.data;
            setAvailable(data.available);
        } catch (error) {
            console.error('Error while checking availability:', error);
        }
    };

    useEffect(() => {
        checkAvailability()
    }, [secondDate])

    useEffect(() => {
        { setTotal(cardData?.Price * diffInDays + 2000) }
    }, [diffInDays])

    const handleCheckout = () => {
        const BookingDetails = { countAdult, countChildren, countPets, firstDate, secondDate, Total, diffInDays, Total, cardData, userInfo, spaceid }
        const jsonString = JSON.stringify(BookingDetails);
        localStorage.setItem('bookingInfo', jsonString);
        axios.post('api/stripe/create-checkout-session', { countAdult, countChildren, countPets, firstDate, secondDate, Total, diffInDays, Total, cardData })
            .then((res) => {
                if (res.data.url) {
                    window.location.href = res.data.url
                }
            })
            .catch((err) => console.log(err.message))
    }


    // const submitData = async () => {
    //     console.log("Imagae data here", ref.current.imageurl);
    //     const imageUrl = ref.current.imageurl
    //     dispatch(SpaceUpload(countAdult, countChildren, countPets, firstDate, secondDate, diffInDays))
    //   }

    return (
        <div class="card w-2/3 bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Book Here</h2>
                <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                    {/* <h1 class="sm:text-2xl font-bold text-gray-900 sm:text-3xl">Canada</h1> */}
                    <div class="mt-5 flex items-center">
                        <div class="flex items-center">
                            <svg class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                            </svg>
                            <svg class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                            </svg>
                            <svg class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                            </svg>
                            <svg class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                            </svg>
                            <svg class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                            </svg>
                        </div>
                        <p class="ml-2 text-sm font-medium text-gray-500">1,209 Reviews</p>
                    </div>
                    <div className="collapse">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title bg-slate-300 rounded-xl">
                            Guests
                        </div>
                        <div className="collapse-content bg-slate-100 rounded-b-xl">
                            <div className="prose flex items-center justify-center w-full">
                                <label htmlFor=""><h4>Adult</h4></label>
                                <div className='ml-10'>
                                    <button onClick={() => setCountAdult((prev) => Math.max(prev - 1, 0))} className="btn btn-square border-none btn-md bg-slate-400 focus:outline-none hover:bg-slate-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                        </svg>
                                    </button>
                                    <input value={countAdult} type="number" className="w-16 text-xl text-center border-b border-gray-700 px-3 py-1 rounded-md focus:outline-none" />
                                    <button onClick={() => setCountAdult((prev) => Math.min(prev + 1, cardData.Guests.Adult))} className="btn btn-square border-none btn-md bg-slate-400 focus:outline-none hover:bg-slate-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="prose flex items-center justify-center w-full">
                                <label className='mr-2' htmlFor=""><h4>Children</h4></label>
                                <div className='ml-3.5'>
                                    <button onClick={() => setCountChildren((prev) => Math.max(prev - 1, 0))} className="btn btn-square border-none btn-md bg-slate-400 focus:outline-none hover:bg-slate-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                        </svg>
                                    </button>
                                    <input value={countChildren} type="number" className="w-16 text-xl text-center border-b border-gray-700 px-3 py-1 rounded-md focus:outline-none" />
                                    <button onClick={() => setCountChildren((prev) => Math.min(prev + 1, cardData.Guests.Children))} className="btn btn-square border-none btn-md bg-slate-400 focus:outline-none hover:bg-slate-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="prose flex items-center justify-center w-full">
                                <label className='mr-2' htmlFor=""><h4>Pets</h4></label>
                                <div className='ml-12'>
                                    <button onClick={() => setCountPets((prev) => Math.max(prev - 1, 0))} className="btn btn-square border-none btn-md bg-slate-400 focus:outline-none hover:bg-slate-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                        </svg>
                                    </button>
                                    <input value={countPets} type="number" className="w-16 text-xl text-center border-b border-gray-700 px-3 py-1 rounded-md focus:outline-none" />
                                    <button onClick={() => setCountPets((prev) => Math.min(prev + 1, cardData.Guests.Pets))} className="btn btn-square border-none btn-md bg-slate-400 focus:outline-none hover:bg-slate-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div class="flex gap-10">
                        {!isNaN(diffInDays) && (
                            <h6>₹{cardData?.Price} x {diffInDays} nights:</h6>
                        )}
                        {!isNaN(diffInDays) && (
                            <h6>₹{cardData?.Price * diffInDays} nights:</h6>
                        )}
                    </div>
                    <div class="flex gap-7">
                        <h6>Orcube service fee:</h6>
                        <h6>₹2000</h6>
                    </div>

                    <div className="gap-5 flex mt-5 ">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div>
                                <DatePicker
                                    label="First Date"
                                    value={firstDate}
                                    onChange={handleFirstDateChange}
                                    disablePast="true"
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </div>
                            <div>
                                <DatePicker
                                    label="Second Date"
                                    value={secondDate}
                                    onChange={handleSecondDateChange}
                                    disablePast="true"
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </div>
                        </LocalizationProvider>
                    </div>
                    <div>
                        {
                            available ? null : <p className='text-red-600'>Date not available</p>
                        }
                    </div>
                    {/* <div className='mt-5'>
                        <button className="btn btn-accent">Check Availability</button>
                    </div> */}
                    <div class="mt-10 flex flex-col items-center justify-between space-y-4 border-t gap-3 border-b py-4 sm:flex-row sm:space-y-0">
                        <div>
                            <span class="text-base">Total</span>
                            <h1 class="text-3xl font-bold">₹{Total || 2000}</h1>
                        </div>
                        {userInfo ? (
                            available && firstDate && secondDate ? (
                                <button onClick={() => handleCheckout()} className="btn btn-success btn-wide">
                                    Reserve
                                </button>
                            ) : (
                                <button className="btn btn-success btn-wide" disabled>
                                    Reserve
                                </button>
                            )
                        ) : (
                            <button onClick={()=>{navigate('/login')}} className="btn btn-success btn-wide">
                                Login to Reserve
                            </button>
                        )}
                    </div>
                    <ul class="mt-8 space-y-2">
                        <li class="flex items-center text-left text-sm font-medium text-gray-600">
                            <svg class="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" class=""></path>
                            </svg>
                            Free shipping worldwide
                        </li>
                        <li class="flex items-center text-left text-sm font-medium text-gray-600">
                            <svg class="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" class=""></path>
                            </svg>
                            Cancel Anytime
                        </li>
                    </ul>
                </div>
            </div>
        </div >

    )
}

export default Card