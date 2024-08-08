import React from "react";
import { GrView } from "react-icons/gr";
import { BiMessageSquareAdd } from "react-icons/bi";
import { MdOutlineAnalytics, MdOutlineAssignmentInd, MdPreview } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { FaRegCheckCircle, FaRegUserCircle } from "react-icons/fa";
import styles from "./sidebarStyle.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

function SidebarMenu() {
    const { user } = useAuth();

    return (
        <ul>
            <li className="sidebar-links">
                <NavLink to="/dashboard/profile" className="btn text-white text-start w-100">
                    <FaRegUserCircle className={`${styles.dashboardIconView}`} />
                    Profile
                </NavLink>
            </li>
            
            {/* Show this if user is an Editor */}
            {user.isEditor && (
                <>
                    <li className="sidebar-links">
                        <NavLink to="/dashboard/view-articles" className="btn text-white text-start w-100">
                            <GrView className={`${styles.dashboardIconView}`} />
                            View Articles
                        </NavLink>
                    </li>
                    <li className="sidebar-links">
                        <NavLink to="/dashboard/assign-reviewer" className="btn text-white text-start w-100">
                        <MdOutlineAssignmentInd className={`${styles.dashboardIconView}`} />
                            Assign Reviewer
                        </NavLink>
                    </li>
                    <li className="sidebar-links">
                        <NavLink to="/dashboard/add-reviewer" className="btn text-white text-start w-100">
                            <FiUserPlus className={`${styles.dashboardIconView}`} />
                            Add Reviewer
                        </NavLink>
                    </li>
                    <li className="sidebar-links">
                        <NavLink to="/dashboard/accepted-articles" className="btn text-white text-start w-100">
                            <FaRegCheckCircle className={`${styles.dashboardIconView}`} />
                            Accepted Articles
                        </NavLink>
                    </li>
                </>
            )}

            {/* Show this if user is not an Editor */}
            {!user.isEditor && (
                <>
                    <li className="sidebar-links">
                        <NavLink to="/dashboard/view-submission" className="btn text-white text-center">
                            <GrView className={`${styles.dashboardIconView}`} />
                            View Submission
                        </NavLink>
                    </li>
                    <li className="sidebar-links">
                        <NavLink to="/dashboard/add-submission" className="btn text-white text-center">
                            <BiMessageSquareAdd className={`${styles.dashboardIconView}`} />
                            Add Submission
                        </NavLink>
                    </li>
                    {/* <li className="sidebar-links">
                        <NavLink to="/dashboard/analytical-report" className="btn text-white text-center">
                            <MdOutlineAnalytics className={`${styles.dashboardIconView}`} />
                            Analytical Report
                        </NavLink>
                    </li> */}
                    {user.isReviewer && <li className="sidebar-links">
                        <NavLink to="/dashboard/review-article" className="btn text-white text-center">
                            <MdPreview className={`${styles.dashboardIconView}`} />
                            Review Article
                        </NavLink>
                    </li>}
                </>
            )}
        </ul>
    );
}

export default SidebarMenu;
