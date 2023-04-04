import React from 'react'

function spaceCard() {

  return (
    <div className="card bg-slate-400 card-compact w-50 shadow-xl">
      <figure className='h-1/2 w:1/2'><img src="https://static.toiimg.com/thumb/msid-92089121,width-748,height-499,resizemode=4,imgsize-139308/Most-beautiful-places-to-visit-in-India-for-first-timers.jpg" alt="Shoes" /></figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-info">Details</button>
          <button className="btn btn-success">Approve</button>
        </div>
      </div>
    </div>
  )
}

export default spaceCard