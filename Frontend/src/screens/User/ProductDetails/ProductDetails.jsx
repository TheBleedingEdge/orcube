import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../config/axios';
import ImageGallery from '../../../components/UserComponent/ImageGallery/ImageGallery'
import Header from '../../../components/common/Header'
import './ProductDetails.css'
import Mapbox from './components/Mapbox/Mapbox'
import Card from './components/Card'
import CommentReviews from './components/CommentReviews'
import Footer from '../../../components/UserComponent/Footer/Footer'

function ProductDetails() {

    const { id } = useParams();
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(`/api/user/details/${id}`);
                console.log('Card sent successfully:', data);
                setProductData(data);
            } catch (error) {
                console.error('Error sending card:', error);
            }
        }

        fetchData();
    }, [id]);

    function Perk({ label, checked }) {
        return (
            <label className="border bg-blue-100 shadow-md p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" className="checkbox" checked={checked} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                </svg>
                <span>{label}</span>
            </label>
        );
    }



    return (
        <div>
            <Header />
            <div className='px-10'>
                <h1>l</h1>
                <div className="divider" />

                <div className='lg:px-40 lg:relative lg:justify-center'>
                    <h2 className='text-2xl font-bold'>{productData?.Title}</h2>
                    <div className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <h6 className='text-lg from-neutral-600 underline'>{productData?.Address}</h6>
                    </div>
                </div>


                <div className="divider" />
                <div style={{ display: 'flex', position: "relative", alignItems: 'center', justifyContent: 'center' }} className='mt-10 lg:px-56'>

                    <ImageGallery images={productData?.PicData.ImageUrl} />
                </div>

                <div className="divider mt-10" />

                <div>
                    <div className='mt-10 lg:px-20'>
                        {/* <h3 className='text-xl font-bold'>Asset near trivandrum</h3>
                        <div className='flex gap-3 text-lg py-5'>
                            <h5>5 Guest |</h5>
                            <h5>3 BedRoom |</h5>
                            <h5>2 bathroom |</h5>
                            <h5>2 Bed</h5>
                        </div> */}
                    </div>
                </div>

                <div className="divider mt-10" />

                {/* discription and pay area */}

                <div className='lg:flex'>
                    <div className='w-full lg:px-20'>
                        <div className=''>
                            <h3 className='text-2xl text-black'>Discription</h3>
                            <p>
                                {productData?.Discription}
                            </p>
                        </div>

                        <div className='my-10'>
                            <section>
                                <span className='text-2xl'>Perks</span>
                                <div className='mt-2 grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
                                    <Perk label="Wifi" checked={productData?.Perks.isWifi} />
                                    <Perk label="Parking" checked={productData?.Perks.isParking} />
                                    <Perk label="TV" checked={productData?.Perks.isTv} />
                                    <Perk label="Kitchen" checked={productData?.Perks.isKtchen} />
                                    <Perk label="Entrance" checked={productData?.Perks.isEntrance} />
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className='w-full lg:py-20 ' style={{ display: 'flex', position: "relative", alignItems: 'center', justifyContent: 'center' }}>
                        <Card cardData={productData} spaceid={id} />
                    </div>

                </div>

                <div className="divider mt-10" />

                <section>
                    <Mapbox mapData={productData?.coordinates} />
                </section>

                {/* cooment and reviews */}

            </div>
            <CommentReviews />
            <Footer />
        </div>
    )
}

export default ProductDetails