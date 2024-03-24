import React from "react";
import { Link, useLocation } from "react-router-dom";
// import menuList from "../config/menuConfig";
import { useAuth } from "../store/AuthContext";

function NavBar() {
    /* It save the current selected or active nav-item until we changes the pathname & also get actual instance after reloads the page.
     */
    const { pathname } = useLocation();
    const { isLoggedIn } = useAuth();

    return (
        <>
            {/* <div className="text-bg-dark">
                <div className="container dashboard-contents">
                    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">


                        <ul className="nav nav-pills justify-content-center align-items-center">
                            <li className="nav-item mb-0">
                                <Link to="/"
                                    className={`nav-link ${pathname === "/" ? "active text-white" : ""}`}
                                    aria-current="page">Home
                                </Link>
                            </li>

                            {isLoggedIn ? <>
                                <li className="nav-item mb-0">
                                    <Link to="/dashboard"
                                        className={`nav-link ${pathname.includes("/dashboard") ? "active text-white" : ""}`}
                                        aria-current="page">Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item mb-0">
                                    <Link to="/logout"
                                        className={`nav-link ${pathname === "/logout" ? "active text-white" : ""}`}
                                        aria-current="page">Logout
                                    </Link>
                                </li> </> :
                                <li className="nav-item mb-0">
                                    <Link to="/login"
                                        className={`nav-link ${pathname === "/login" ? "active text-white" : ""}`}
                                        aria-current="page">Login
                                    </Link>
                                </li>}
                        </ul>

                        <div className="col-md-3 text-end">
                            <button type="button" className="btn btn-outline-primary me-2">Login</button>
                            <button type="button" className="btn btn-primary">Sign-up</button>
                        </div>
                    </header>
                </div>
            </div> */}
            <div className="text-bg-dark">
                <header className="container d-flex justify-content-center py-3">
                    <nav>
                        <ul className="nav nav-pills justify-content-center align-items-center">
                            <li className="nav-item mb-0">
                                <Link to="/"
                                    className={`nav-link ${pathname === "/" ? "active text-white" : ""}`}
                                    aria-current="page">Home
                                </Link>
                            </li>

                            {isLoggedIn ? <>
                                <li className="nav-item mb-0">
                                    <Link to="/dashboard"
                                        className={`nav-link ${pathname.includes("/dashboard") ? "active text-white" : ""}`}
                                        aria-current="page">Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item mb-0">
                                    <Link to="/logout"
                                        className={`nav-link ${pathname === "/logout" ? "active text-white" : ""}`}
                                        aria-current="page">Logout
                                    </Link>
                                </li> </> :
                                <li className="nav-item mb-0">
                                    <Link to="/login"
                                        className={`nav-link ${pathname === "/login" ? "active text-white" : ""}`}
                                        aria-current="page">Login
                                    </Link>
                                </li>}
                        </ul>
                    </nav>
                </header>
            </div>
        </>
    );
}

export default NavBar;
