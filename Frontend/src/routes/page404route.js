import React from 'react'
import Page404 from '../components/common/page404'
import { Routes, Route } from "react-router-dom";


function page404route() {
    return (
        <Routes>
            <Route path="*" element={<Page404 />} />
        </Routes>
    )
}

export default page404route