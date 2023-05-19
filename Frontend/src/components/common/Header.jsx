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
    navigate("/");

  }

  const accountnav = () => {
    navigate("/user/account");
  };

  const handleLoginNavigation = () => {
    navigate('/login');
  };

  return (
    <div className="w-full navbar shadow-xl bg-cyan-500 rounded-xl z-30 fixed">
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
        <label tabIndex={0} className="btn btn-ghost rounded-btn"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        </label>
        <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
          {userInfo && userInfo ? (<li><Link to='/user/account'><a>Profile</a></Link></li>) : null}
          {userInfo && userInfo ? (<li><a onClick={handleLogout}>Logout</a></li>) : null}
          {!userInfo ? (<li><Link to='/login'>Login</Link></li>) : null}
        </ul>
      </div>
    </div>
  )
}

export default Header