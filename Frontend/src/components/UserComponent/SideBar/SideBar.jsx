import React from 'react'

function SideBar() {
  return (
    <div className="drawer-side shadow-xl">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-slate-50 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li><a>Dashboard</a></li>
          <div className="border-b"></div>
          <li><a>My Profile</a></li>
          <div className="border-b"></div>
          <li><a>My Bookings</a></li>
          <div className="border-b"></div>
          <li><a>My Accommodation</a></li>
          <div className="border-b"></div>
          <li><a>settings</a></li>
          <div className="border-b"></div>
          <li><a>Logout</a></li>
        </ul>
    </div>
  )
}

export default SideBar
