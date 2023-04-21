import axios from '../../../config/axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function ShowBookingCard() {

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, userInfo } = userLogin;
    const [Bookingdetails, setBookingdetails] = useState();

    const getBookingDetails = async()=>{
        const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };

        const {data} = await axios.post("/api/user/getbookingdetails",{
            userInfo
        }, config)
        console.log("Here Data",data);
        if(data){
            setBookingdetails(data)
        }
    }

    useEffect(()=>{
        getBookingDetails();
    },[])

    return (
        <div className='overflow-x-auto mt-20 px-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {Bookingdetails &&
        Bookingdetails.map((data, index) => (
        <div>
        <a
            href="#"
            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
        >
            <span
                className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
            ></span>

            <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        {data?.spaceID.Title}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-gray-600">{data.spaceID.Location}</p>
                </div>

                <div className="hidden sm:block sm:shrink-0">
                    <img
                        alt="Paul Clapton"
                        src={data?.spaceID.PicData.ImageUrl[1]}
                        className="h-16 w-16 rounded-lg object-cover shadow-sm"
                    />
                </div>
            </div>

            <div className="mt-4">
                <p className="max-w-[40ch] text-sm text-gray-500">
                   {data?.spaceID.Discription.slice(0, 90)}...
                </p>
            </div>

            <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">Booked Date</dt>
                    <dd className="text-xs text-gray-500">{Date(data?.createdAt)}</dd>
                </div>
                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">Price</dt>
                    <dd className="text-xs text-gray-500">Rs.{data?.totalCost}</dd>
                </div>
            </dl>
        </a>
        </div>
        ))}
        </div>
        
        
    )
}

export default ShowBookingCard