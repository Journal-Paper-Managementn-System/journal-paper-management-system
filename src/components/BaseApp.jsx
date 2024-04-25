import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "../App.css";
import Layout from "../Layout";
import DashBoard from "./dashboard/DashBoard";
import Profile from "./profile/Profile";
import AssignReviewer from "./editor/AssignReviewer";
import AddSubmission from "./dashboard/AddSubmission";
import AnalyticReport from "./dashboard/AnalyticReport";
import ReviewArticles from "./reviewer/ReviewArticles";
import ViewArticles from "./editor/ViewArticles";
import AddReviewer from "./editor/AddReviewer";
import AcceptedArticles from "./editor/AcceptedArticles";
import ViewSubmission from "./dashboard/ViewSubmission";
import AddEditor from "./admin/AddEditor";
import Login from "./login/Login";
import ForgotPassword from "./login/ForgotPassword";
import Verification from "./signup/Verification";
import SignUp from "./signup/SignUp";
import PageNotFound from "./PageNotFound";
import Preloader from "./preloader/Preloader";
import ProtectedRoute from "../utils/ProtectedRoute";
import GuestRoute from "../utils/GuestRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Preloader />
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "dashboard",
                        element: <DashBoard />,
                        children: [
                            {
                                path: "profile",
                                element: <Profile />,
                            },
                            {
                                path: "assign-reviewer",
                                element: <AssignReviewer />,
                            },
                            {
                                path: "add-submission/:journalId?",
                                element: <AddSubmission />,
                            },
                            {
                                path: "analytical-report",
                                element: <AnalyticReport />,
                            },
                            {
                                path: "review-article",
                                element: <ReviewArticles />,
                            },
                            {
                                path: "view-articles",
                                element: <ViewArticles />,
                            },
                            {
                                path: "add-reviewer",
                                element: <AddReviewer />,
                            },
                            {
                                path: "accepted-articles",
                                element: <AcceptedArticles />,
                            },
                            {
                                path: "view-submission/:articleId?",
                                element: <ViewSubmission />,
                            },
                        ],
                    },
                    {
                        path: "add-editor",
                        element: <AddEditor />,
                    },
                    
                ],
            },
        ],
    },
    {
        element: <GuestRoute />,
        children: [
            {
                path: "/login",
                element: <Login />,
                children: [
                    {
                        path: "forgot-password",
                        element: <ForgotPassword />,
                    },
                    {
                        path: "verify-email",
                        element: <Verification />,
                    }
                ],
            },
            {
                path: "/sign-up",
                element: <SignUp />,
                children: [
                    {
                        path: "verify-email",
                        element: <Verification />,
                    },
                ],
            },
        ],
    },
    // {
    //     path: "/logout",
    //     element: (
    //         <Suspense fallback={<Loading />}>
    //             <Logout />
    //         </Suspense>
    //     ),
    // },
    {
        path: "/*",
        element: <PageNotFound />,
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