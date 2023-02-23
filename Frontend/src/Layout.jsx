import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/UserComponent/Header/Header'

function Layout() {
  return (
    <div className='p-4 flex-col min-h-screen'>
        <Header />
        <Outlet />
    </div>
  )
}

export default Layout