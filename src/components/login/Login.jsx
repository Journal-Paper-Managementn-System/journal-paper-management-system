import React from "react";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";

function Login() {
  return (
    <section className="wrapper">
      <div className="center-wrapper">
        <form action="/">
          <h1>Login</h1>
          <div className="input-box">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="enter your valid username"
              required
            />
            <box-icon
              type="solid"
              name="user"
              className="input-icon"
            ></box-icon>
          </div>
          <div className="input-box ">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="enter your valid password"
              required
            />
            <span className="input-icon">
              <GrView />
            </span>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <p>
              <Link to="#">Forgot Password</Link>
            </p>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <div className="sign-up-link">
            <p>
              Don't have an account? Please <Link to="#">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
