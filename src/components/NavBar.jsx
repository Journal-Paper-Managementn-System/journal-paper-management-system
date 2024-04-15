import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

function NavBar() {
    /* It save the current selected or active nav-item until we changes the pathname & also get actual instance after reloads the page.
     */
    const { pathname } = useLocation();
    const { isLoggedIn, user, setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("accessToken") || localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <>
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
                                {user.isSuperAdmin ?
                                    <li className="nav-item mb-0">
                                        <Link to="/add-editor"
                                            className={`nav-link ${pathname === "/add-editor" ? "active text-white" : ""}`}
                                            aria-current="page">Admin
                                        </Link>
                                    </li> :
                                    <li className="nav-item mb-0">
                                        <Link to="/dashboard"
                                            className={`nav-link ${pathname.includes("/dashboard") ? "active text-white" : ""}`}
                                            aria-current="page">Dashboard
                                        </Link>
                                    </li>}
                                <li className="nav-item mb-0">
                                    <button
                                        onClick={handleLogout}
                                        className={`nav-link ${pathname === "/logout" ? "active text-white" : ""}`}
                                        aria-current="page">Logout
                                    </button>
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
