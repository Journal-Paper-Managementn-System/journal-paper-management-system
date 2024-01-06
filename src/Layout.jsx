import React from 'react'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer/Footer'

function Layout() {
  return (
    <>
     <NavBar/>
     <Outlet/>
     <Footer/>
    </>
  )
}

export default Layout
