import React from "react";
import { GrView } from "react-icons/gr";
import { BiMessageSquareAdd } from "react-icons/bi";
import { MdOutlineAnalytics } from "react-icons/md";
import styles from "./sidebarStyle.module.css";
import { NavLink } from "react-router-dom";

function SidebarMenu() {
    return (
        <ul>
            <li id="sidebar-link">
                <NavLink to="/dashboard/view-submission" className="btn text-white text-center">
                    <GrView className={`${styles.dashboardIconView}`} />
                    View Submission
                </NavLink>
            </li>
            <li id="sidebar-link">
                <NavLink
                    to="/dashboard/add-submission"
                    className="btn text-white text-center">
                    <BiMessageSquareAdd className={`${styles.dashboardIconView}`} />
                    Add Submission
                </NavLink>
            </li>
            <li id="sidebar-link">
                <NavLink
                    to="/dashboard/analytical-report"
                    className="btn text-white text-center"
                >
                    <MdOutlineAnalytics className={`${styles.dashboardIconView}`} />
                    Analytical Report
                </NavLink>
            </li>
        </ul>
    );
}

export default SidebarMenu;
