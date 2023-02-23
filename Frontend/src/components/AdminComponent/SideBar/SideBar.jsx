import React from 'react'

function SideBar() {
  return (
    <div className="drawer-side shadow-xl">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 bg-slate-50 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li><a>Sales Report</a></li>
          <div className="border-b"></div>
          <li><a>Users</a></li>
          <div className="border-b"></div>
          <li><a>Hosts</a></li>
          <div className="border-b"></div>
          <li><a>Reservations</a></li>
          <div className="border-b"></div>
          <li><a>Reservations for Approval</a></li>
          <div className="border-b"></div>
          <li><a>settings</a></li>
          <div className="border-b"></div>
          <li><a>Logout</a></li>
        </ul>
    </div>
  )
}

export default SideBar
