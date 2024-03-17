import React from "react";
import SideBar from "./SideBar";
import { Outlet, useLocation } from "react-router-dom";
import Profile from "../profile/Profile";

function DashBoard() {
    const location = useLocation();
    const { pathname } = location;

    return (
        <main>
            <section className="container">
                <div className="dashboard-contents d-flex">
                    <SideBar />
                    <div className="dashboard-content-body">
                        <Outlet />
                        {pathname === '/dashboard' && <Profile />}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default DashBoard;
