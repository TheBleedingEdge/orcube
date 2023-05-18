import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;


  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.assign('/')
    window.location.reload();

  }

  const accountnav = () => {
    navigate("/user/account");
  };

  const handleLoginNavigation = () => {
    navigate('/login');
  };

  return (
    <div className="w-full navbar bg-cyan-600 z-30 fixed">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div>
      <div className="flex-1 px-2 mx-2 font-mono text-2xl">ORCUBE</div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          {/* <!-- Navbar menu content here --> */}
          <li className=''><a>{userInfo?.name}</a></li>
        </ul>
      </div>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost rounded-btn">{userInfo?(userInfo?.name):null}</label>
        <div tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
          {/* <Link to='/login'><a>Login</a></Link> */}
          <Link to='/user/account'><a>Profile</a></Link>
          <a onClick={handleLogout}>Logout</a>
        </div>
      </div>
    </div>
  )
}

export default Header