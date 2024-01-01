import React from "react";
import { RxDashboard } from "react-icons/rx";
import { GrView } from "react-icons/gr";
import { BiMessageSquareAdd } from "react-icons/bi";
import { MdOutlineAnalytics } from "react-icons/md";
import styles from "./sidebarStyle.module.css";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className={`${styles.leftSideBar}`}>
      <div className={`${styles.dashboardTitle}`}>
        <h4 className="text-light text-center">
          <RxDashboard className={`${styles.dashboardIcon}`} />
          <span>Dashboard</span>
        </h4>
      </div>
      <div
        className={`${styles.leftSidebarMenu} d-flex justify-content-center align-items-center`}
      >
        <ul>
          <li>
            <Link to="/" className="active btn btn-primary">
              <GrView className={`${styles.dashboardIconView} text-light`} />
              View Submission
            </Link>
          </li>
          <li>
            <Link to="/" className="text-white text-center">
              <BiMessageSquareAdd className={`${styles.dashboardIconView}`} />
              Add Submission
            </Link>
          </li>
          <li>
            <Link to="/" className="text-white text-center">
              <MdOutlineAnalytics className={`${styles.dashboardIconView}`} />
               Analytical Report
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
