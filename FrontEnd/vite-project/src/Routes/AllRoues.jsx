import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import SingleProductPage from '../Pages/SingleProductPage';
import AddToCart from '../Pages/AddToCart';

export default function AllRoues() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/singleproduct/:id' element={<SingleProductPage />} />
                <Route path='/addtocart' element={<AddToCart />} />

            </Routes>
        </div>
    )
}
