import React, { useState } from 'react'
import SideBar from '../../../components/UserComponent/SideBar/SideBar'
import Table from '../../../components/UserComponent/Table/Table'
import ShowBookingCard from '../../../components/UserComponent/Card/ShowBookingCard'
import Header from '../../../components/common/Header'
import MyAccommodation from '../MyAccommodations/MyAccommodation'
import FullChart from './Chart/FullChart'
import Profile from './Profile/Profile'


function UserAccount() {

  const [activeSidebar, setActiveSidebar] = useState('Profile');
  const userData = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div>
      <Header />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content items-center justify-center">
            {activeSidebar === 'Bookings' ? <ShowBookingCard/> : null}
            {activeSidebar === 'Dashboard' ?  <FullChart/> : null}
            {activeSidebar === 'Accommodation' ? <MyAccommodation/>:null}
            {activeSidebar === 'Profile' ? <Profile/>:null}
        </div>


        <div className="drawer-side mt-16 shadow-xl">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            {userData && userData.isHost?(<li><button onClick={()=>{setActiveSidebar('Dashboard')}}>Dashboard</button></li>):null}
            <li><button onClick={()=>{setActiveSidebar('Profile')}}>My Profile</button></li>
            <li><button onClick={()=>{setActiveSidebar('Bookings')}}>My Bookings</button></li>
            <li><button onClick={()=>{setActiveSidebar('Accommodation')}}>My accommodation</button></li>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserAccount