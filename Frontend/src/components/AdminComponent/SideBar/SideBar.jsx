import React from 'react'
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="drawer-side mt-16 shadow-xl">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 bg-base-100 text-base-content">
        {/* <!-- Sidebar content here --> */}
        <li><a>Dashboard</a></li>
        <li><a>Users</a></li>
        <li><a>Hosts</a></li>
        <li><a>Space Approval</a></li>
      </ul>
    </div>
  )
}

export default SideBar
