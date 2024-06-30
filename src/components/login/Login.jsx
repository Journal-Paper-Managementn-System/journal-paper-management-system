import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import Auth from "../../services/authService";
import { useAuth } from "../../store/AuthContext";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import MailService from "../../services/mailService";
import ReactDOMServer from "react-dom/server";
import EmailMessage from "../../utils/emailMessages/Message";

function Login() {
    const [visibleIcon, setVisibleIcon] = useState(true);
    const [checkbox, setCheckbox] = useState(false);
    const pswd = useRef();
    const navigate = useNavigate();
    const { storeToken, getUser } = useAuth();
    const location = useLocation();
    const { state, pathname } = location;
    const [loader, setLoader] = useState(false);

    /**
     * Toggles the visibility of the password input field.
     * If the password input field is not empty, it toggles between showing the password as plain text and hiding it.
     * If the password input field is empty, it displays a warning toast message.
     */
    const handleOnVisible = () => {
        if (pswd.current.type !== 'password') {
            pswd.current.type = 'password';
            setVisibleIcon(true);
        }
        else {
            pswd.current.type = 'text';
            setVisibleIcon(!visibleIcon);
        }
    }

    const [credentials, setCredentials] = useState({ userName: "", password: "" })

    /**
     * Handles the form submission for the login component.
     * @param {Event} event - The form submission event.
     * @returns {Promise<void>} - A promise that resolves when the submission is handled.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoader(true);
        const responseData = await Auth.login(credentials);
        if (responseData.success) {
            storeToken(responseData.accessToken, checkbox);
            if (responseData.data.isSuperAdmin) {
                navigate('/add-editor', { replace: true });
                toast.success(responseData.message);
                setLoader(false);
                return;
            }
            if (state) {
                navigate(state.redirectTo || '/dashboard/profile', { replace: true });
            } else {
                navigate('/dashboard/profile', { replace: true });
            }
            toast.success(responseData.message);
            setLoader(false);
        }
        else {
            if (responseData.message === 'Email not verified') {
                const emailOtp = Math.floor(1000 + Math.random() * 900000);
                const resMailData = await MailService.sendMail({
                    mailFrom: "Article Submission System",
                    mailTo: responseData.data.email,
                    mailSubject: "Verify Your Email Address",
                    mailText: "Please verify your email address using OTP to complete registration.",
                    mailHtml: ReactDOMServer.renderToString(<EmailMessage otp={emailOtp} firstName={responseData.data.firstName} target="sign-up" />),
                });
                if (resMailData.success) {
                    navigate('/login/verify-email', { state: { email: responseData.data.email, emailOtp: emailOtp, redirectTo: state?.redirectTo || '/dashboard' } }, { replace: true });
                } else {
                    toast.error('Email verification failed');
                }
                return setLoader(false);
            }
            toast.error(responseData.message);
            setLoader(false);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setCheckbox(e.target.checked);
    }

    useEffect(() => {
        document.title = "Login - Article Submission System";
    })

    return (
        <>
            {
                (pathname === '/login/forgot-password' || pathname === '/login/verify-email') ? <Outlet /> :
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
                                    {!loader ? "Login" : <div className="d-flex justify-content-center"><ThreeDots height={25} width={54} color="#fff" /></div>}
                                </button>
                                <div className="sign-up-link">
                                    <p>
                                        Don't have an account? Please <Link to="/sign-up" state={{ redirectTo: state?.redirectTo }} className="text-white fw-bold text-decoration-underline">Sign up or register</Link>
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
