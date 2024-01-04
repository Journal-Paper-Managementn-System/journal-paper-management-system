import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "../App.css";
import Layout from "../Layout";
import DashBoard from "./dashboard/DashBoard";
import ViewSubmission from "./dashboard/ViewSubmission";
import AddSubmission from "./dashboard/AddSubmission";
import AnalyticReport from "./dashboard/AnalyticReport";
import Login from "./login/Login";

//
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <DashBoard />,
        children: [
          {
            path: "view-submission",
            element: <ViewSubmission />,
          },
          {
            path: "add-submission",
            element: <AddSubmission />,
          },
          {
            path: "analytical-report",
            element: <AnalyticReport />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function BaseApp() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default BaseApp;
