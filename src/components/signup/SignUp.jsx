import React from "react";
import "./signup-style.css";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <section className="signup-section d-flex justify-content-center align-items-center">
      <div className="signup-wrapper">
        <h5 className="main_heading text-center">REGISTRATION</h5>
        <hr className="bottom-rule" />
        {/* form elements */}
        <form action="/" method="post">
          <div className="content">
            <div className="input-control">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                name="first_name"
                id="first_name"
                autoComplete="on"
                required
              />
            </div>
            <div className="input-control">
              <label htmlFor="middle_name">Middle Name</label>
              <input
                type="text"
                placeholder="Enter Middle name"
                name="middle_name"
                id="middle_name"
              />
            </div>
            <div className="input-control">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                placeholder="Enter Last name"
                name="last_name"
                id="last_name"
                required
              />
            </div>
            <div className="input-control">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                name="username"
                id="username"
                autoComplete="on"
                required
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
                required
              />
            </div>
            <div className="input-control">
              <label htmlFor="phone_number">Phone number</label>
              <input
                type="tel"
                placeholder="Enter phone number"
                name="phone_number"
                id="phone_number"
                required
              />
            </div>
            <div className="input-control">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                name="password"
                id="password"
                required
              />
            </div>
            <div className="input-control">
              <label htmlFor="confPassword">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confPassword"
                id="confPassword"
                required
              />
            </div>
            <span className="gender-title">Gender</span>
            <div className="gender_category">
              <input type="radio" name="male" id="male" />
              <label htmlFor="male">Male</label>
              <input type="radio" name="female" id="female" />
              <label htmlFor="female">Female</label>
              <input type="radio" name="other" id="other" />
              <label htmlFor="other">Other</label>
            </div>
          </div>
          {/* term & condition */}
          <div className="policy">
            <p className="policy-text">
              <input type="checkbox" name="alert-policy" id="policy-btn" /> By
              clicking sign up, you agree to our{" "}
              <Link to="/sign-up">Terms,</Link>{" "}
              <Link to="/sign-up">Privacy Policy</Link>. You may receive sms
              notifications from us and can opt out at any time.
            </p>
            <p className="text-center">
              already have an account, please <Link to="/login">Login</Link>.
            </p>
          </div>
          {/* signup button */}
          <div className="button-container">
            <button type="submit">Sign up</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
