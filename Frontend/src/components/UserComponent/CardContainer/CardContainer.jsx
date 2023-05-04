import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getSpaces } from '../../../actions/userActions';
import Card from '../Card/Card'
import Loading from "../../common/Loading"
import axios from '../../../config/axios';
import { ToastContainer, toast } from "react-toastify"
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import { TextField } from '@mui/material'

function CardContainer() {

  const dispatch = useDispatch();
  const spaceDocs = useSelector((state) => state.getSpaces)
  const { spaceData, loading } = spaceDocs

  const [location, setLocation] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("")
  const [searchedData, setSearchedData] = useState(null);
  const [searched, setSearched] = useState(false);


  const submitHandler = async () => {
    if (!location || !checkIn || !checkOut || !guests) {
      toast.error("Please include all fields!")
    } else {
      try {
        const response = await axios.post('/api/user/search', {
          location,
          checkIn,
          checkOut,
          guests,
        });
        setSearchedData(response.data);
        setSearched(true)
      } catch (error) {
        console.error(error);
      }

    }
  }

  const dataToDisplay = searchedData || spaceData;

  useEffect(() => {
    dispatch(getSpaces())
  }, [])




  return (

    <div>
      <div><ToastContainer /></div>
      <div className='flex justify-center'>
        <div className="bar mt-10 w-650 bg-white shadow-md rounded-full flex justify-center text-sm">
          <div className="location w-34 px-6 py-2 rounded-full transition-colors duration-250 ease">
            <p className='text-green-500'>Location</p>
            <input onChange={(e) => setLocation(e.target.value)} value={location} type="text" placeholder="Where are you going?" className="bg-transparent border-none mt-2 placeholder-gray-500 focus:outline-none" />
          </div>
          <div className="check-in w-22 px-6 py-2 rounded-full transition-colors duration-250 ease">
            <p className='text-green-500'>Check in</p>
            <input onChange={(e) => setCheckIn(e.target.value)} value={checkIn} type="date" placeholder="Add dates" className="bg-transparent border-none mt-2 placeholder-gray-500 focus:outline-none" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Check In"
                value={checkIn}
                onChange={(newValue) => {
                  setCheckIn(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                inputProps={{}} // Set inputProps to an empty object to prevent Mui-error class from being added
              />
            </LocalizationProvider>

          </div>
          <div className="check-out w-22 px-6 py-2 rounded-full transition-colors duration-250 ease">
            <p className='text-green-500'>Check out</p>
            <input onChange={(e) => setCheckOut(e.target.value)} type="date" value={checkOut} placeholder="Add dates" className="bg-transparent border-none mt-2 placeholder-gray-500 focus:outline-none" />
          </div>
          <div className="guests w-22 px-6 py-2 rounded-full relative transition-colors duration-250 ease">
            <p className='text-green-500'>Guests</p>
            <input onChange={(e) => setGuests(e.target.value)} value={guests} type="text" placeholder="Add guests" className="bg-transparent border-none placeholder-gray-500 mt-2 focus:outline-none" />
            <button onClick={submitHandler} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-green-600 text-white rounded-full text-xs px-4 py-1"><i class="fa fa-search" aria-hidden="true"></i><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            </button>
          </div>
        </div>
      </div>


      <div>
        <div>
          {spaceData?.length > 0 ? (
            <div className='overflow-x-auto py-20 px-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
              {loading && <Loading />}
              {dataToDisplay?.length > 0 ? (
                dataToDisplay.map((data, index) => (
                  <Link
                    to={{
                      pathname: `/productdetails/${data._id}`,
                    }}
                    key={index}
                  >
                    <div className="card w-50 bg-base-100 shadow-xl mt-10">
                      <figure><img src={data.PicData.ImageUrl[0]} alt="Shoes" /></figure>
                      <div className="card-body">
                        <h2 className="card-title">
                          {data.Title}
                          {/* <div className="badge badge-secondary">NEW</div> */}
                        </h2>
                        <p>{data.Discription.slice(0, 90)}...</p>
                        <div className="card-actions justify-start">
                          <div className="text-slate-900 font-bold">Price /night :</div>
                          <div className="">{data.Price}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : searched ? (
                <p className="text-center">No spaces found based on your search criteria.</p>
              ) : (
                <p className="text-center">No Spaces Found</p>
              )}
            </div>

          ) : (
            <p className="text-center my-10">No Spaces Found</p>
          )}
        </div>
      </div>

    </div>
  )
}

export default CardContainer