import React from 'react'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer/Footer'
// import { useAuth } from './store/AuthContext';

function Layout() {
    // const { user } = useAuth();
    return (
        <>
            {/* {!user.isEditor && <NavBar />} */}
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
