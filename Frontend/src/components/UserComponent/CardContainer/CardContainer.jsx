import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getSpaces } from '../../../actions/userActions';
import Card from '../Card/Card'
import Loading from "../../common/Loading"
import axios from '../../../config/axios';

function CardContainer() {

  const dispatch = useDispatch();
  const spaceDocs = useSelector((state) => state.getSpaces)
  const { spaceData, loading } = spaceDocs

  useEffect(() => {
    dispatch(getSpaces())
    console.log("spaces:", spaceData);
  }, [])


  async function handleCardClick(id) {
    try {
      const response = await axios.post('/api/cards', { id });
      console.log('Card sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending card:', error);
    }
  }


  return (
    <div className='overflow-x-auto py-20 px-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
      {loading && <Loading />}
      {/* {loading && console.log("hiiii")} */}
      {spaceData?.map((data, index) => (
        <div className="card w-50 bg-base-100 shadow-xl mt-10">
          <figure><img src={data.PicData.ImageUrl[0]} alt="Shoes" /></figure>
          <div onClick={handleCardClick(data._id)} className="card-body">
            <h2 className="card-title">
              {data.Title}
              {/* <div className="badge badge-secondary">NEW</div> */}
            </h2>
            <p>{data.Discription.slice(0,90)}...</p>

            <div className="card-actions justify-start">
              <div className="text-slate-900 font-bold">Price /night :</div>
              <div className="">{data.Price}</div>
            </div>

            {/* <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div> */}
          </div>
        </div>
      ))}

    </div>
  )
}

export default CardContainer