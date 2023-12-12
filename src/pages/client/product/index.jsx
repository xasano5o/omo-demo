import React from 'react'
import Product from '../../../components/client/Product.jsx'
import Navbar from '../../../components/client/Navbar.jsx'
import Footer from '../../../components/client/Footer.jsx'

const ProductPage = () => {
    return (
        <div>
            <Navbar/>
            <Product />
           <Footer/>
        </div>
    )
}

export default ProductPage