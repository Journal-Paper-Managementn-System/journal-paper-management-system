import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// React.lazy() is used to dynamically import a component when it's rendered.
lazy(() => import("../App.css"));
const Loading = lazy(() => import("../utils/Loading"));
const Layout = lazy(() => import("../Layout"));
const DashBoard = lazy(() => import("./dashboard/DashBoard"));
const ViewSubmission = lazy(() => import("./dashboard/ViewSubmission"));
const AddSubmission = lazy(() => import("./dashboard/AddSubmission"));
const AnalyticReport = lazy(() => import("./dashboard/AnalyticReport"));
const Login = lazy(() => import("./login/Login"));
const SignUp = lazy(() => import("./signup/SignUp"));
const Preloader = lazy(() => import("./preloader/Preloader"));
// const Logout = lazy(() => import("./logout/Logout"));
const Profile = lazy(() => import("./profile/Profile"));
const Verification = lazy(() => import("./signup/Verification"));
const ForgotPassword = lazy(() => import("./login/ForgotPassword"));
const AssignReviewer = lazy(() => import("./editor/AssignReviewer"));
const ProtectedRoute = lazy(() => import("../utils/ProtectedRoute"));
const ReviewArticles = lazy(() => import("./reviewer/ReviewArticles"));
const AddReviewer = lazy(() => import("./editor/AddReviewer"));
const ViewArticles = lazy(() => import("./editor/ViewArticles"));
const AcceptedArticles = lazy(() => import("./editor/AcceptedArticles"));
const PageNotFound = lazy(() => import("./PageNotFound"));
const AddEditor = lazy(() => import("./admin/AddEditor"));
const GuestRoute = lazy(() => import("../utils/GuestRoute"));
const ErrorElement = lazy(() => import("./ErrorElement"));
// const DocViewer = lazy(() => import("./fileviewer/DOCViewer"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Preloader />,
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
                                errorElement: <ErrorElement />,
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
    {
        path: "/*",
        element: <PageNotFound />,
    },
]);

function BaseAppLazy() {
    return (
        <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
        </Suspense>
    );
}

export default BaseAppLazy;