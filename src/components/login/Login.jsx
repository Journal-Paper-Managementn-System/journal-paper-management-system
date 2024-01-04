import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { AiOutlineEyeInvisible } from "react-icons/ai";

function Login() {
  const [visibleIcon,setVisibleIcon] = useState(true);
  const pswd = useRef();

  const handleOnVisible = ()=>{
    if(pswd.current.type !== 'password'){
      pswd.current.type = 'password';
      setVisibleIcon(true)
    }
    else{
      pswd.current.type = 'text';
      setVisibleIcon(!visibleIcon);
    }
  }

  return (
    <section className="wrapper">
      <div className="center-wrapper">
        <form action="/">
          <h1>Login {visibleIcon}</h1>
          <div className="input-box">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="enter your valid username"
              required
            />
            <span className="input-icon"> <FaUser className="user-icon"/> </span>
          </div>
          <div className="input-box ">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              ref={pswd}
              placeholder="enter your valid password"
              required
            />
            <span className="input-icon">
              {
                visibleIcon ? 
                <GrView onClick={handleOnVisible} className="pswd-icon"/> 
                : <AiOutlineEyeInvisible
                 onClick={handleOnVisible} className="pswd-icon" fontSize={24}/>
              }
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
