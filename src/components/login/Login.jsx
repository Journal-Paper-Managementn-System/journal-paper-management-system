import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { AiOutlineEyeInvisible } from "react-icons/ai";

function Login() {
    const [visibleIcon, setVisibleIcon] = useState(true);
    const pswd = useRef();

    const handleOnVisible = () => {
        if (pswd.current.value !== '') {
            if (pswd.current.type !== 'password') {
                pswd.current.type = 'password';
                setVisibleIcon(true)
            }
            else {
                pswd.current.type = 'text';
                setVisibleIcon(!visibleIcon);
            }
        } else {
            alert('Please enter a valid password');
        }
    }

    const [credentials, setCredentials] = useState({userName: "", password: ""})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/auth/login", {
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
        <section className="wrapper">
            <div className="center-wrapper">
                <form onSubmit={handleSubmit}>
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
                            <input type="checkbox" />
                            Remember Me
                        </label>
                        <p>
                            <Link to="#">Forgot Password</Link>
                        </p>
                    </div>
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                    <div className="sign-up-link">
                        <p>
                            Don't have an account? Please <Link to="/sign-up">Sign up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;
