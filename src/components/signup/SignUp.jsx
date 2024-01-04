import React from 'react'
import './signup-style.css'

function SignUp() {
  return (
    <section>
       <div className="signup-container">
        <form action="/" method='post'>
            <h2 className="main_haiding">REGISTRATION</h2>
            <div className="content">
                <div className="input-box">
                    <label for="first_name">First Name</label>
                    <input type="text" placeholder="Enter first name" name="first_name" required />
                </div>
                <div className="input-box">
                    <label for="Middle_name">Middle Name</label>
                    <input type="text" placeholder="Enter Middle name" name="Middle_name"/>
                </div>
                <div className="input-box">
                    <label for="last_name">Last Name</label>
                    <input type="text" placeholder="Enter Last name" name="Last_name" required/>
                </div>
                <div className="input-box">
                    <label for="Username">Username</label>
                    <input type="text" placeholder="Enter username" name="Username" required/>
                </div>
                <div className="input-box">
                    <label for="email">Email</label>
                    <input type="email" placeholder="Enter valid email address" name="email" required/>
                </div>
                <div className="input-box">
                    <label for="Phone_number">Phone number</label>
                    <input type="tel" placeholder="Enter phone number" name="Phone_number" required/>
                </div>
                <div className="input-box">
                    <label for="Password">Password</label>
                    <input type="password" placeholder="Enter new password" name="Password" required/>
                </div>
                <div className="input-box">
                    <label for="Cpassword">Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" name="Cpassword" required/>
                </div>
                <span className="gender-title">Gender</span>
                <div className="gender_category">
                    <input type="radio" name="gender" id="male"/>
                    <label for="gender">Male</label>
                    <input type="radio" name="gender" id="female"/>
                    <label for="gender">Female</label>
                    <input type="radio" name="gender" id="other" />
                    <label for="gender">Other</label>
                </div>
            </div>
            <div className="policy">
                <p><input type="checkbox" name="alert-policy" id="policy" /> By clicking sign up, you agree to our <a
                        href="#">Terms,</a> <a href="#">Privacy Policy</a>. You may receive sms notifications from us
                    and can opt out at any time</p>

            </div>
            <div className="button-container">
                <button type="submit">Sign Up</button>
            </div>
        </form>

    </div>
    </section>
  )
}

export default SignUp