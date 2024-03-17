import React, { useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import Auth from "../../services/authService";
import { useAuth } from "../../store/AuthContext";
import { toast } from "react-toastify";

function Login() {
    const [visibleIcon, setVisibleIcon] = useState(true);
    const [checkbox, setCheckbox] = useState(false);
    const pswd = useRef();
    const navigate = useNavigate();
    const { storeToken } = useAuth();
    const location = useLocation();
    const { state, pathname } = location;

    const handleOnVisible = () => {
        if (pswd.current.value !== '') {
            if (pswd.current.type !== 'password') {
                pswd.current.type = 'password';
                setVisibleIcon(true);
            }
            else {
                pswd.current.type = 'text';
                setVisibleIcon(!visibleIcon);
            }
        } else {
            toast.warn('Please enter a valid password');
        }
    }

    const [credentials, setCredentials] = useState({ userName: "", password: "" })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const responseData = await Auth.login(credentials);
        if (responseData.success) {
            storeToken(responseData.accessToken, checkbox);
            if (state) {
                navigate(state.redirectTo || '/dashboard/profile', { replace: true });
            } else {
                navigate('/dashboard/profile', { replace: true });
            }
            toast.success(responseData.message);
        }
        else {
            toast.error(responseData.message);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setCheckbox(e.target.checked);
    }

    return (
        <>
            {
                (pathname === '/login/forgot-password') ? <Outlet /> :
                    <section className="wrapper">
                        <div className="center-wrapper">
                            <form onSubmit={handleSubmit} action="/login">
                                <h1>Login {visibleIcon}</h1>
                                <div className="input-box">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        name="userName"
                                        id="username"
                                        onChange={onChange}
                                        value={credentials.userName}
                                        placeholder="Enter a valid username"
                                        required
                                    />
                                    <span className="input-icon"> <FaUser className="user-icon" /> </span>
                                </div>
                                <div className="input-box ">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        ref={pswd}
                                        onChange={onChange}
                                        value={credentials.password}
                                        placeholder="Enter a valid password"
                                        required
                                    />
                                    <span className="input-icon">
                                        {
                                            !visibleIcon ?
                                                <GrView onClick={handleOnVisible} className="pswd-icon" />
                                                : <AiOutlineEyeInvisible
                                                    onClick={handleOnVisible} className="pswd-icon" fontSize={24} />
                                        }
                                    </span>
                                </div>
                                <div className="remember-forgot">
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={onChange}
                                            checked={checkbox}
                                        />
                                        Remember Me
                                    </label>
                                    <p>
                                        <Link to="/login/forgot-password" state={{ isNavigate: true, redirectTo: state?.redirectTo }}>Forgot Password</Link>
                                    </p>
                                </div>
                                <button type="submit" className="login-btn">
                                    Login
                                </button>
                                <div className="sign-up-link">
                                    <p>
                                        Don't have an account? Please <Link to="/sign-up" state={{ redirectTo: state?.redirectTo}}>Sign up</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </section>
            }
        </>
    );
}

export default Login;
