import React, { useState } from 'react'
import SideBar from '../../../components/AdminComponent/SideBar/SideBar'
import UsersTable from '../../../components/AdminComponent/Table/userTable'
import HostTable from '../../../components/AdminComponent/Table/hostTable'
import Header from '../../../components/common/Header'
import CardContainer from '../../../components/AdminComponent/spaceCardContainer/CardContainer'

function Dashboard() {

  const [activeSidebar, setActiveSidebar] = useState('Users');

  return (
    <div>
      <Header />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content items-center justify-center">
            {activeSidebar === 'Users' ? <UsersTable /> : null}
            {activeSidebar === 'SpaceApproval' ? <CardContainer /> : null}
            {activeSidebar === 'Hosts' ? <HostTable /> : null}
        </div>


        <div className="drawer-side mt-16 shadow-xl">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li><button onClick={()=>{setActiveSidebar('Dashboard')}}>Dashboard</button></li>
            <li><button onClick={()=>{setActiveSidebar('Users')}}>Users</button></li>
            <li><button onClick={()=>{setActiveSidebar('Hosts')}}>Hosts</button></li>
            <li><button onClick={()=>{setActiveSidebar('SpaceApproval')}}>Space Approval</button></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard