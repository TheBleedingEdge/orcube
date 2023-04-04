import React from 'react'
import ImageGallery from '../../../components/UserComponent/ImageGallery/ImageGallery'
import Header from '../../../components/common/Header'
import './ProductDetails.css'
import Mapbox from './components/Mapbox/Mapbox'
import Card from './components/Card'
import CommentReviews from './components/CommentReviews'
import Footer from '../../../components/UserComponent/Footer/Footer'

function ProductDetails() {


    return (
        <div>
            <Header />
            <div className='px-10'>
                <h1>l</h1>
                <div className="divider" />


                <div className='lg:px-40 lg:relative lg:justify-center'>
                    <h2 className='text-2xl font-bold'>Beautiful 2 BHK Farm with Private Pool (Sanitised)</h2>
                    <div className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <h6 className='text-lg from-neutral-600 underline'> Kroustas, Greece </h6>
                    </div>
                </div>


                <div className="divider" />
                <div style={{ display: 'flex', position: "relative", alignItems: 'center', justifyContent: 'center' }} className='mt-10 lg:px-56'>

                    <ImageGallery />
                </div>

                <div className="divider mt-10" />

                <div>
                    <div className='mt-10 lg:px-20'>
                        <h3 className='text-xl font-bold'>Asset near trivandrum</h3>
                        <div className='flex gap-3 text-lg py-5'>
                            <h5>5 Guest |</h5>
                            <h5>3 BedRoom |</h5>
                            <h5>2 bathroom |</h5>
                            <h5>2 Bed</h5>
                        </div>
                    </div>
                </div>

                <div className="divider mt-10" />

                {/* discription and pay area */}

                <div className='lg:flex'>
                    <div className='w-full lg:px-20'>
                        <div className=''>
                            <h3>Discription</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>

                        <div className='my-10'>
                            <section>
                                <span className='text-2xl'>Perks</span>
                                <div className='mt-2 grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
                                    <label className="border bg-blue-100 hover:bg-blue-200 shadow-md p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                        <input type="checkbox" className="checkbox" disabled/>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                                        </svg>
                                        <span>Wifi</span>
                                    </label>
                                    <label className="border bg-blue-100 hover:bg-blue-200 shadow-md p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                        <input type="checkbox" className="checkbox" disabled/>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                        </svg>
                                        <span>Free parking</span>
                                    </label>
                                    <label className="border bg-blue-100 hover:bg-blue-200 shadow-md p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                        <input type="checkbox" className="checkbox" disabled/>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                                        </svg>
                                        <span>TV</span>
                                    </label>
                                    <label className="border bg-blue-100 hover:bg-blue-200 shadow-md p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                        <input type="checkbox" className="checkbox" disabled/>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                                        </svg>
                                        <span>Kitchen</span>
                                    </label>
                                    <label className="border bg-blue-100 hover:bg-blue-200 shadow-md p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                        <input type="checkbox" className="checkbox" disabled/>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                        </svg>
                                        <span>Private entrance</span>
                                    </label>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className='w-full lg:py-20 ' style={{ display: 'flex', position: "relative", alignItems: 'center', justifyContent: 'center' }}>
                        <Card />
                    </div>

                </div>

                <div className="divider mt-10" />

                <section>
                    <Mapbox />
                </section>

                {/* cooment and reviews */}

            </div>
            <CommentReviews />
            <Footer />
        </div>
    )
}

export default ProductDetails