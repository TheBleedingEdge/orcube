import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SpaceCard from '../SpaceCard/spaceCard'
import { getToApproveSpace, changeSpaceStatus } from '../../../actions/adminActions';

function CardContainer() {
  const [isToggled, setIsToggled] = useState(false);
  const dispatch = useDispatch();
  const { toApprovespaceDocs } = useSelector((state) => state.getToApproveSpace)
  console.log(toApprovespaceDocs);

  useEffect(() => {
    getspace();
  }, [])

  useEffect(() => {
    getspace();
  }, [isToggled])

  const getspace = async () => {
    dispatch(getToApproveSpace())
  }

  const status = async(id) => {
    console.log("user ID HERE",id);
    // window.location.reload()
    dispatch(changeSpaceStatus(id))
  }

  return (
    <div>
      <div className='overflow-x-auto mt-20 px-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>

        {toApprovespaceDocs?.map((data, index) => (
          <div className="card bg-slate-400 card-compact w-50 shadow-xl">
            <figure className='h-1/2 w:1/2'><img src={data.PicData.ImageUrl[0]} alt="Shoes" /></figure>
            <div className="card-body">
              <h2 className="card-title">{data.Title}</h2>
              <p>{data.Discription.slice(0, 100) + "..."}</p>
              <div className="card-actions justify-end">
                {/* <label htmlFor="my-modal-5" className="btn btn-info">Details</label> */}
                <button onClick={() => {status(data._id) && setIsToggled(!isToggled);}} className="btn btn-success">Approve</button>
              </div>
            </div>
          </div>
        ))}

      </div>


      {/* The button to open modal */}
      {/* <label htmlFor="my-modal-5" className="btn">open modal</label> */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
          <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
          <div className="modal-action">
            <label htmlFor="my-modal-5" className="btn">Yay!</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardContainer