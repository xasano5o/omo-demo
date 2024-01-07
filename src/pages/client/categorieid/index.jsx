import React from 'react'
import CategoryId from '../../../components/client/CategoryIdPage.jsx'
import Navbar from '../../../components/client/Navbar.jsx'
import Footer from '../../../components/client/Footer.jsx'
import { Helmet } from 'react-helmet'

const CategoryIdPage = () => {
    return (
        <div>
            <Helmet>
                <title>Kategoriya id Page</title>
            </Helmet>
            <Navbar />
            <CategoryId />
            <Footer />
        </div>
    )
}

export default CategoryIdPage