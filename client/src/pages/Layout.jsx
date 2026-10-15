import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
        
        <div>
          <Navbar />
          <Outlet />
        </div>
    </div>
  )
}

export default Layout