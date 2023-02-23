import React from 'react'
import { Link } from 'react-router-dom'

function Card() {
    return (
        <Link to='/productdetails' className='mt-10'>
            <div className="card w-50 bg-base-100 shadow-xl">
                <figure><img src="https://www.planetware.com/wpimages/2019/11/canada-in-pictures-beautiful-places-to-photograph-morraine-lake.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        Himalaya!
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Fashion</div>
                        <div className="badge badge-outline">Products</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card