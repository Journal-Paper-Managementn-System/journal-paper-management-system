import React from "react";
import { RxDashboard } from "react-icons/rx";
import styles from "./sidebarStyle.module.css";
import SidebarMenu from "./SidebarMenu";

function SideBar() {
    return (
        <div className={`${styles.leftSideBar}`}>
            <div className={`${styles.dashboardTitle}`}>
                <h4 className="text-light text-center">
                    <RxDashboard className={`${styles.dashboardIcon}`} />
                    <span>Dashboard</span>
                </h4>
            </div>
            {/* sideBar Menu items */}
            <div
                className={`${styles.leftSidebarMenu} d-flex justify-content-center align-items-center`}>
                <SidebarMenu />
            </div>
        </div>
    );
}

export default SideBar;
