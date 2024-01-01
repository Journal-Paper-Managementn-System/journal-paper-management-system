import React, { Children } from "react";
import SideBar from "./dashboard/SideBar";
import DashBoard from "./dashboard/DashBoard";
import BgThemeChanger from "./BgThemeChanger";
import "../App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <>
            <DashBoard>
              <SideBar />
            </DashBoard>
          </>
        ),
      },
      {
        path: '/themes',
        element: <BgThemeChanger/>
      }
    ],
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
