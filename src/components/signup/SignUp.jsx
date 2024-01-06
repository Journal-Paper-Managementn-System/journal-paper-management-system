import React from "react";
import "./signup-style.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  // Need to fix the no value return issue of radio button
  const [firstName,setFirstName] = useState("");
  const [middleName,setMiddleName] = useState("");
  const [lastName,setLastName] = useState("");
  const [username,setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // Next work would be to fix there number of handler
  const submit = (submitEvent) => {
    // Add some form handling in here
    alert("Form submitted")
  }
  // Some repetitive boaring bullshit
  const handlePhoneNumberInput = (evt0) =>{
    let numberData = evt0.target.value;
    let pervInp = phoneNumber;
    let matcher = numberData.match(/[^0-9-]/g);
    if(matcher===null){
      setPhoneNumber(numberData);
    }else {
      setPhoneNumber(pervInp);
    }
  }
  const handleFirstName = (evt1) =>{
    let data = evt1.target.value;
    let prevInp = firstName;
    let matcher = data.match(/[^a-zA-Z]/g);
    if(matcher===null){
      setFirstName(data);
    }else {
      setFirstName(prevInp);
    }
  }
  const handleMiddleName = (evt2) =>{
    let data = evt2.target.value;
    let prevInp = middleName;
    let matcher = data.match(/[^a-zA-Z]/g);
    if(matcher===null){
      setMiddleName(data);
    }else {
      setMiddleName(prevInp);
    }
  }
  const handleLastName = (evt3) =>{
    let data = evt3.target.value;
    let prevInp = lastName;
    let matcher = data.match(/[^a-zA-Z]/g);
    if(matcher===null){
      setLastName(data);
    }else {
      setLastName(prevInp);
    }
  }
  const handleUsername = (evt4) =>{
    let data = evt4.target.value;
    let prevInp = username;
    let matcher = data.match(/[^a-zA-Z0-9]/g);
    if(matcher===null){
      setUsername(data);
    }else {
      setUsername(prevInp);
    }
  }
  return (
    <section className="signup-section d-flex justify-content-center align-items-center">
      <div className="signup-wrapper">
        <h5 className="main_heading text-center">REGISTRATION</h5>
        <hr className="bottom-rule" />
        {/* form elements */}
        <form action="/" method="post" onSubmit={submit}>
          <div className="content">
            <div className="input-control">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                name="first_name"
                id="first_name"
                autoComplete="on"
                value={firstName}
                onChange={handleFirstName}
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
                value={middleName}
                onChange={handleMiddleName}
              />
            </div>
            <div className="input-control">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                placeholder="Enter Last name"
                name="last_name"
                id="last_name"
                value={lastName}
                onChange={handleLastName}
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
                value={username}
                onChange={handleUsername}
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
                pattern="[0-9]{10}"
                value={phoneNumber}
                onChange={handlePhoneNumberInput}
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
              <input type="radio" name="gender" id="male" />
              <label htmlFor="male">Male</label>
              <input type="radio" name="gender" id="female" />
              <label htmlFor="female">Female</label>
              <input type="radio" name="gender" id="other" />
              <label htmlFor="other">Other</label>
            </div>
          </div>
          {/* term & condition */}
          <div className="policy">
            <p className="policy-text">
              <input type="checkbox" name="alert-policy" id="policy-btn" required /> By
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