import React, { useEffect, useState } from 'react'
import axios from '../../../config/axios';

function Card() {

    const [Data, setData] = useState();

    useEffect(() => {
        async function fetchData() {
            const userinfoString = localStorage.getItem('userInfo');
            if (userinfoString) {
                const userinfo = JSON.parse(userinfoString);
                const {token} = userinfo;
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const { data } = await axios.post('/api/admin/gettotaldata', {} ,config)
                if(data){
                    setData(data)
                }
            }
        }
        fetchData()
    },[]);

    return (
        <div className="card ml-14 mt-16 w-96 h-52 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Overview</h2>
                <label>Total Users : {Data && Data[0]}</label>
                <label>Total Spaces : {Data && Data[1]}</label>
                <label>Total Bookings : {Data && Data[2]}</label>
            </div>
        </div>
    )
}

export default Card