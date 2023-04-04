import React from 'react'

function Banner() {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url("https://img5.goodfon.com/original/1680x1050/8/26/andrei-chizh-fonari-prichal-reka-nebo-vecher.jpg")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    )
}

export default Banner