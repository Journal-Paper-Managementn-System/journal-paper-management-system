import React from "react";
import SideBar from "./SideBar";
import NavBar from "../NavBar";
import ViewSubmission from "./ViewSubmission";
import { Outlet } from "react-router-dom";

function DashBoard() {
  return (
    <main>
      <section className="container">
        <NavBar />
        <div className="dashboard-contents d-flex">
          <SideBar />
          <div className="dashboard-content-body">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
}

export default DashBoard;
