import React, { Children } from 'react'
import HomePage from './home'
import Navbar from '../../components/client/Navbar'
import Footer from '../../components/client/Footer'
import { Outlet } from 'react-router-dom'

const ClientLayout = () => {
  return (
    <div>
       <Navbar/>
     <Outlet/>
       <Footer/>
    </div>
  )
}

export default ClientLayout