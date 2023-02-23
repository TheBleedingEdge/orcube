import React from 'react'
import SideBar from '../../../components/UserComponent/SideBar/SideBar'
import Table from '../../../components/UserComponent/Table/Table'

function UserAccount() {

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

export default UserAccount