import React from 'react'
import CardContainer from '../../../components/UserComponent/CardContainer/CardContainer'
import Footer from '../../../components/UserComponent/Footer/Footer'
import Banner from '../../../components/UserComponent/Banner/Banner'

function Home() {
    return (
        <div>
            <Banner />
            <div className="divider mt-10">
                <div className=" w-auto h-auto badge badge-secondary text-2xl badge-outline">Space Lists</div>
            </div>
            <CardContainer />
            <Footer />
        </div>
    )
}

export default Home