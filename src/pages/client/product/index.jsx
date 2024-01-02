import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../../../components/client/Footer.jsx'
import Navbar from '../../../components/client/Navbar.jsx'
import Product from '../../../components/client/Product.jsx'

const ProductPage = () => {
    return (

        <div>
            <Helmet>
                <title>Product id page</title>
            </Helmet>
            <Navbar />
            <Product />
            <Footer />
        </div>
    )
}

export default ProductPage