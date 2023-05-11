import React, { useEffect, useState } from 'react';
import axios from '../../../../config/axios';
import { useSelector } from 'react-redux';

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [previousBookings, setPreviousBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo } = userLogin;

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      'Content-Type': 'multipart/form-data'
    },
  };

  const getbookdata = async () => {
    const { data } = await axios.post("/api/host/getbookingdata", {}, config)
    if (data) {
      setPreviousBookings(data.previousBookings);
      setUpcomingBookings(data.upcomingBookings);
      console.log("Data is here", previousBookings);
    }
  }

  const handleApprove = async (bookingId) => {
    try {
      await axios.post(`/api/host/approvebook/${bookingId}`,{}, config);
      getbookdata(); // Refresh booking data
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };

  

  useEffect(() => {
    getbookdata();
  }, [])

  const getTabContent = () => {
    switch (activeTab) {
      case 1:
        return <div>
          <div className='overflow-x-auto mt-20 px-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {previousBookings && previousBookings.map((data) => (
              <div>
                <a href="#" className="relative block overflow-hidden shadow-lg rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                  <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                  <div className="sm:flex sm:justify-between sm:gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{data.id}</h3>
                      <p className="mt-1 text-xs font-medium text-gray-600">Location</p>
                    </div>
                    <div className="hidden sm:block sm:shrink-0">
                      <img alt="Sample Image" src="image_url" className="h-16 w-16 rounded-lg object-cover shadow-sm" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="max-w-[40ch] text-sm text-gray-500">Description...</p>
                  </div>
                  <dl className="mt-6 flex gap-4 sm:gap-6">
                    <div className="flex flex-col-reverse">
                      <dt className="text-sm font-medium text-gray-600">Booked Date</dt>
                      <dd className="text-xs text-gray-500">Date</dd>
                    </div>
                    <div className="flex flex-col-reverse">
                      <dt className="text-sm font-medium text-gray-600">Price</dt>
                      <dd className="text-xs text-gray-500">Rs. Price</dd>
                    </div>
                  </dl>
                </a>
              </div>
            ))}
          </div>
        </div>;
      case 2:
        return <div>
          <div className='overflow-x-auto mt-20 px-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {upcomingBookings && upcomingBookings.map((data) => (
              <div>
                <a href="#" className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                  <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                  <div className="sm:flex sm:justify-between sm:gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{data?.spaceID.Title.slice(0, 10)}</h3>
                      <p className="mt-1 text-xs font-medium text-gray-600">{data?.spaceID.Location.split(',')[1]}</p>
                    </div>
                    <div className="hidden sm:block sm:shrink-0">
                      <img alt="Sample Image" src={data?.spaceID.PicData.ImageUrl[0]} className="h-16 w-16 rounded-lg object-cover shadow-sm" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="max-w-[40ch] text-sm text-gray-500">{data?.spaceID.Discription.slice(0, 90)}</p>
                  </div>
                  <dl className="mt-6 flex gap-4 sm:gap-6">
                    <div className="flex flex-col-reverse">
                      <dt className="text-sm font-medium text-gray-600">Booked Date</dt>
                      <dd className="text-xs text-gray-500">{(data?.createdAt)}</dd>
                    </div>
                    <div className="flex flex-col-reverse">
                      <dt className="text-sm font-medium text-gray-600">Price</dt>
                      <dd className="text-xs text-gray-500">Rs. {data?.totalCost}</dd>
                    </div>
                  </dl>
                  <div className='flex gap-9'>
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handleApprove(data._id)}
                    >
                      {data.bookingApproved ? 'Approved' : 'Approve'}
                    </button>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className='mt-20'>
      <div className="tabs flex justify-center gap-5">
        <a
          className={`tab tab-lg tab-lifted ${activeTab === 1 ? 'bg-green-500 text-white' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          Previous
        </a>
        <a
          className={`tab tab-lg tab-lifted ${activeTab === 2 ? 'bg-green-500 text-white' : ''}`}
          onClick={() => setActiveTab(2)}
        >
          Upcoming
        </a>
      </div>
      <div className="tab-content">{getTabContent()}</div>
    </div>
  );
};

export default TabComponent;
