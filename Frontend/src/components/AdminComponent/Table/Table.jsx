import React, { useState } from 'react'
import axios from '../../../config/axios';
import { useEffect } from 'react'

function Table() {

  const [userdata, setuserdata] = useState([{
    name:'',
    email:'',
    mobile:''
  }]);

  const userDoc = async () => {
    const { data } = await axios.get('/userdocs')
    console.log('userData',data);
    setuserdata([{
      name:data.name,
      email:data.email,
      mobile:data.mobile
    }])
    console.log("user",userdata);
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
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>


           {userdata.map((data, index) => (

            <tr>
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
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
              </td>
              <td>Purple</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>

           ))} 
          {/* <!-- row 1 --> */}





        </tbody>
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