import React, { useState } from 'react'
import axios from '../../../config/axios';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getUsers,changeStatus } from '../../../actions/adminActions';
import classNames from "classnames";

function Table() {

  const [isBlocked, setisBlocked] = useState(true);
  const buttonClassNames = classNames(
    "btn-success",
    "btn",
    { "btn-error": isBlocked }
  );

  function empty(){

  }

  const dispatch = useDispatch();
  const usersDocs = useSelector((state) => state.adminShowUsers)
  const { userData } = usersDocs
  const hostsData = userData?.filter(userData => userData.isHost === true)
  console.log("got all users", usersDocs);

  useEffect(() => {
    userDoc();
  }, [])

  const userDoc = async () => {
    dispatch(getUsers())
  }

  const status = async(id) => {
    console.log("user ID HERE",id);
    dispatch(changeStatus(id))
  }




  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Action</th>
          </tr>
        </thead>


        {hostsData?.map((data, index) => (
          <tbody>
            <tr key={index}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png" alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{data.name}</div>
                    <div className="text-sm opacity-50">{data.email}</div>
                  </div>
                </div>
              </td>
              <td>
              {data.email}
                <br />
                {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
              </td>
              <td>{data.mobile}</td>
              <th>
                <button
                  className={data.isBlocked?"btn btn-error":"btn btn-success"}
                  onClick={() => {status(data._id)}}
                >
                  {data.isBlocked ? "BLOCKED" : "UNBLOCKED"}
                </button>
              </th>
            </tr>
          </tbody>
        ))}
        {/* <!-- row 1 --> */}








        {/* <!-- foot --> */}
        {/* <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </tfoot> */}

      </table>
    </div>
  )
}

export default Table