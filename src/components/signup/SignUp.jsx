import React, { useEffect, useRef, useState } from "react";
import "./signup-style.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import Auth from "../../services/authService";
import MailService from "../../services/mailService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import EmailMessage from "../../utils/emailMessages/Message";
import ReactDOMServer from "react-dom/server";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { GrView } from "react-icons/gr";

function SignUp() {
    const location = useLocation();
    const [emailOtp, setEmailOtp] = useState(0);
    const [loader, setLoader] = useState(false);
    const [credentials, setCredentials] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        userName: "",
        email: "",
        phoneNumber: "",
        institution: "",
        password: "",
        confPassword: "",
    });
    const navigate = useNavigate();
    const [visibleIcon, setVisibleIcon] = useState(true);
    const pswd = useRef();

    useEffect(() => {
        setEmailOtp(Math.floor(1000 + Math.random() * 900000));
    }, [setEmailOtp]);

    /**
     * Handles the form submission for signing up a user.
     * 
     * @param {Event} event - The form submission event.
     * @returns {Promise<void>} - A promise that resolves when the submission is complete.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!event.target['alert-policy'].checked) {
            return toast.error('Please accept the Terms, Privacy & Policy.');
        }
        if (credentials.password !== credentials.confPassword) {
            return toast.error('Passwords do not match.');
        }
        setLoader(true);
        const responseData = await Auth.register(credentials);
        if (responseData.success) {
            const resMailData = await MailService.sendMail({
                mailFrom: "Article Submission System",
                mailTo: credentials.email,
                mailSubject: "Verify Your Email Address",
                // mailText: `Your OTP is ${emailOtp}. This passcode will only be valid for the next 2 minutes.`,
                mailHtml: ReactDOMServer.renderToString(<EmailMessage otp={emailOtp} firstName={credentials.firstName} target="sign-up" />),
            });
            if (resMailData.success) {
                navigate("/sign-up/verify-email", { state: { email: credentials.email, emailOtp: emailOtp, redirectTo: location.state?.redirectTo } });
                toast.success('Registration successful. Please verify your email address.');
                setLoader(false);
            }
        }
        else {
            toast.error(responseData.message);
            setLoader(false);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const autoGenerateUsername = (e) => {
        if (credentials.firstName === "") {
            toast.error("Please enter your first name to auto-generate username.");
            e.target.checked = false;
            return;
        }
        if (e.target.checked) {
            setCredentials({ ...credentials, userName: credentials.firstName.toLowerCase() + Math.floor(Math.random() * 1000) });
        }
        else {
            setCredentials({ ...credentials, userName: "" });
        }
    }

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

    return (
        <>
            {
                (location.pathname === "/sign-up/verify-email") ? <Outlet /> :
                    <section className="signup-section d-flex justify-content-center align-items-center">
                        <div className="signup-wrapper">
                            <h3 className="text-center fw-bold">Registration</h3>
                            <hr className="bottom-rule" />
                            {/* form elements */}
                            <form onSubmit={handleSubmit}>
                                <div className="content">
                                    <div className="input-control">
                                        <label htmlFor="first_name">
                                            First Name <span className="required-field">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter first name"
                                            name="firstName"
                                            id="first_name"
                                            autoComplete="on"
                                            value={credentials.firstName}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-control">
                                        <label htmlFor="middle_name">Middle Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Middle name"
                                            name="middleName"
                                            id="middle_name"
                                            value={credentials.middleName}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="input-control">
                                        <label htmlFor="last_name">
                                            Last Name <span className="required-field">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Last name"
                                            name="lastName"
                                            id="last_name"
                                            value={credentials.lastName}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-control">
                                        <label htmlFor="username">
                                            Username {"("}<span>{" "}
                                                <input
                                                    type="checkbox"
                                                    id="auto-username"
                                                    style={{ width: "auto", height: "auto" }}
                                                    onChange={autoGenerateUsername}
                                                />
                                                {" "}<label className="d-inline" htmlFor="auto-username">Auto generated</label> </span>{")"} <span className="required-field">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter username"
                                            name="userName"
                                            id="username"
                                            autoComplete="on"
                                            value={credentials.userName}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-control">
                                        <label htmlFor="email">
                                            Email <span className="required-field">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Enter valid email address"
                                            name="email"
                                            id="email"
                                            autoComplete="on"
                                            value={credentials.email}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-control">
                                        <label htmlFor="phone_number">
                                            Phone number <span className="required-field">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="Enter phone number"
                                            name="phoneNumber"
                                            id="phone_number"
                                            autoComplete="on"
                                            value={credentials.phoneNumber}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-control">
                                        <label htmlFor="institute-name">
                                            Institution Name <span className="required-field">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Institution Name"
                                            name="institution"
                                            id="institute-name"
                                            value={credentials.institution}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-control">
                                        <label htmlFor="password">
                                            Password <span className="required-field">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Enter new password"
                                            name="password"
                                            id="password"
                                            value={credentials.password}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-control position-relative">
                                        <label htmlFor="confPassword">
                                            Confirm Password <span className="required-field">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="confPassword"
                                            id="confPassword"
                                            value={credentials.confPassword}
                                            onChange={onChange}
                                            ref={pswd}
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


                                </div>
                                {/* terms & condition */}
                                <div className="policy">
                                    <label className="policy-text" htmlFor="policy-btn">
                                        <input type="checkbox" name="alert-policy" id="policy-btn" /> By
                                        clicking sign up, you agree to our{" "}
                                        {/* <Link to="/sign-up">Terms,</Link>{" "} */}
                                        <Link to="/sign-up">Terms, Privacy & Policy</Link>. You may receive sms
                                        notifications from us and can opt out at any time.
                                    </label>
                                </div>
                                {/* signup button */}
                                <div className="button-container">
                                    {loader ? <button type="submit" className="d-flex justify-content-center"><ThreeDots
                                        height={28}
                                        width={54}
                                    /></button> :
                                        <button type="submit">Sign up</button>}
                                </div>
                                <p className="text-center mt-lg-3 is-account">
                                    Already have an account, please <Link to="/login" state={{ redirectTo: location.state?.redirectTo }}>Login</Link>.
                                </p>
                            </form>
                        </div>
                    </section>
            }
        </>
    );
}

export default SignUp;