import React from 'react'
import SideBar from '../../../components/AdminComponent/SideBar/SideBar'
import UsersTable from '../../../components/AdminComponent/Table/userTable'
import Header from '../../../components/common/Header'

function Dashboard() {

  return (
    <div>
      <Header />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <UsersTable />
        </div>
        <SideBar />
      </div>
    </div>
  )
}

export default Dashboard