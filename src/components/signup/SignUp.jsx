import React from "react";
import "./signup-style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { useHistory } from "react-router-dom";

function SignUp() {
    // let history = useHistory();
    const [credentials, setCredentials] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confPassword: "",
        gender: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            alert(json.message);
        }
        else {
            alert(json.message);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <section className="signup-section d-flex justify-content-center align-items-center">
            <div className="signup-wrapper">
                <h5 className="main_heading text-center">REGISTRATION</h5>
                <hr className="bottom-rule" />
                {/* form elements */}
                <form onSubmit={handleSubmit}>
                    <div className="content">
                        <div className="input-control">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                placeholder="Enter first name"
                                name="firstName"
                                id="first_name"
                                autoComplete="on"
                                value={credentials.firstName}
                                onChange={onChange}
                                // required
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
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                placeholder="Enter Last name"
                                name="lastName"
                                id="last_name"
                                value={credentials.lastName}
                                onChange={onChange}
                                // required
                            />
                        </div>
                        <div className="input-control">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                placeholder="Enter username"
                                name="userName"
                                id="username"
                                autoComplete="on"
                                value={credentials.userName}
                                onChange={onChange}
                                // required
                            />
                        </div>
                        <div className="input-control">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Enter valid email address"
                                name="email"
                                id="email"
                                autoComplete="on"
                                value={credentials.email}
                                onChange={onChange}
                                // required
                            />
                        </div>
                        <div className="input-control">
                            <label htmlFor="phone_number">Phone number</label>
                            <input
                                type="tel"
                                placeholder="Enter phone number"
                                name="phoneNumber"
                                id="phone_number"
                                autoComplete="on"
                                value={credentials.phoneNumber}
                                onChange={onChange}
                                // required
                            />
                        </div>
                        <div className="input-control">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                name="password"
                                id="password"
                                value={credentials.password}
                                onChange={onChange}
                                // required
                            />
                        </div>
                        <div className="input-control">
                            <label htmlFor="confPassword">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="confPassword"
                                id="confPassword"
                                value={credentials.confPassword}
                                onChange={onChange}
                                // required
                            />
                        </div>
                        <span className="gender-title">Gender</span>
                        <div className="gender_category">
                            <input type="radio" name="gender" id="male" 
                                value="male"
                                checked={credentials.value === "male"}
                                onChange={onChange}
                            />
                            <label htmlFor="male">Male</label>
                            <input type="radio" name="gender" id="female"
                                value="female"
                                checked={credentials.value === "female"}
                                onChange={onChange}
                            />
                            <label htmlFor="female">Female</label>
                            <input type="radio" name="gender" id="other"
                                value="other"
                                checked={credentials.value === "other"}
                                onChange={onChange}
                            />
                            <label htmlFor="other">Other</label>
                        </div>
                    </div>
                    {/* term & condition */}
                    <div className="policy">
                        <p className="policy-text">
                            <input type="checkbox" name="alert-policy" id="policy-btn" /> By
                            clicking sign up, you agree to our{" "}
                            <Link to="/sign-up">Terms,</Link>{" "}
                            <Link to="/sign-up">Privacy & Policy</Link>. You may receive sms
                            notifications from us and can opt out at any time.
                        </p>
                    </div>
                    {/* signup button */}
                    <div className="button-container">
                        <button type="submit">Sign up</button>
                    </div>
                    <p className="text-center mt-lg-3 is-account">
                        Already have an account, please <Link to="/login">Login</Link>.
                    </p>
                </form>
            </div>
        </section>
    );
}

export default SignUp;
