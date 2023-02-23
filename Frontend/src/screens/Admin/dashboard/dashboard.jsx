import React from 'react'
import SideBar from '../../../components/AdminComponent/SideBar/SideBar'
import Table from '../../../components/AdminComponent/Table/Table'

function Dashboard() {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* <!-- Page content here --> */}

        <Table />


      </div>
      
        <SideBar />

    </div>
  )
}

export default Dashboard