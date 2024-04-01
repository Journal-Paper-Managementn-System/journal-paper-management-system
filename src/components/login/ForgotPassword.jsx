import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import MailService from "../../services/mailService";
import { toast } from "react-toastify";
import Auth from "../../services/authService";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import "../signup/signup-style.css";
import EmailMessage from "../../utils/emailMessages/Message";
import ReactDOMServer from "react-dom/server";

function ForgotPassword() {
    const location = useLocation();
    let isNavigate = false;
    if (location.state) {
        isNavigate = location.state.isNavigate;
    }
    const [loader, setLoader] = useState(false);
    const [sendOtp, setSendOtp] = useState(0);
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [userOtp, setUserOtp] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [emailOtp, setEmailOtp] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setEmailOtp(Math.floor(1000 + Math.random() * 900000).toString());
    }, []);

    const handleSubmit = async () => {
        if (sendOtp === 0) {
            setLoader(true);
            const checkUser = await Auth.checkUser({email: userEmail});
            if (!checkUser.success) {
                setLoader(false);
                return toast.warn(checkUser.message);
            }
            // Send OTP to the user's email
            const resMailData = await MailService.sendMail({
                mailFrom: "Journal Submission",
                mailTo: userEmail,
                mailSubject: "Verify Your Email Address",
                mailText: "Please verify your email address using OTP to complete registration.",
                mailHtml: ReactDOMServer.renderToString(<EmailMessage otp={emailOtp} firstName={checkUser.data.firstName} target="forgot-password" />)
            })
            if (resMailData.success) {
                setSendOtp(1);
                toast.success('OTP sent successfully!');
            }
        } else if (sendOtp === 1) {
            setLoader(true);
            if (userOtp === emailOtp) {
                setSendOtp(2);
            } else {
                toast.warn('Invalid OTP');
            }
        } else if (sendOtp === 2) {
            setLoader(true);
            if (password === cpassword) {
                const response = await Auth.resetPassword({
                    email: userEmail,
                    password: password
                });
                if (response.success) {
                    toast.success('Password reset successfully!');
                    navigate('/login', { state: { redirectTo: location.state.redirectTo } });
                }
            } else {
                toast.warn('Password does not match');
            }
        }
        setLoader(false);
    }

    return (
        <>
            { isNavigate ?
                <>
                    <div className="otp-container">
                        <h2 className="text-center fw-bold">
                            {sendOtp === 0 ? "Forgot Password" : (sendOtp === 1 ? "Verify OTP" : "Reset Password")}
                        </h2>
                        {sendOtp === 0 ?
                            <p>Enter your email to forgot your password:</p>
                            : (sendOtp === 1 ? <p>An OTP has been successfully sent to your email <span style={{
                                color: "rgb(229, 222, 236)",
                                fontSize: "1.1rem",
                                fontWeight: "500"
                            }}>{userEmail}</span></p> : null)
                        }
                        {sendOtp === 0 ?
                            <input
                                type="text"
                                placeholder="Enter your email..."
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                            /> : (sendOtp === 2 ?
                                <input
                                    type="password"
                                    value={password}
                                    placeholder="Enter new password..."
                                    onChange={(e) => setPassword(e.target.value)}
                                /> : null)
                        }
                        {sendOtp === 1 ?
                            <input
                                type="text"
                                placeholder="Enter the OTP..."
                                value={userOtp}
                                onChange={(e) => setUserOtp(e.target.value)}
                            /> :
                            (sendOtp === 2 ?
                                <input
                                    type="password"
                                    placeholder="Confirm password..."
                                    value={cpassword}
                                    onChange={(e) => setCPassword(e.target.value)}
                                /> :
                                null)}
                        {loader ?
                            <button type="button" className="d-flex justify-content-center">
                                <ThreeDots height={25} width={54} color="#fff" />
                            </button>
                            :
                            <button type="button" onClick={handleSubmit} className="fw-bold">
                                {sendOtp === 0 ? "Send OTP" : (sendOtp === 1 ? "Verify OTP" : "Submit")}
                            </button>
                        }
                    </div>
                </> : <Navigate to="/login" />}
        </>
    );
}

export default ForgotPassword;