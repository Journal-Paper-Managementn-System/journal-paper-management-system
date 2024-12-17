import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Auth from "../../services/authService";
import { ThreeDots } from "react-loader-spinner";
import "./signup-style.css";

function Verification() {
    const location = useLocation();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [loader, setLoader] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);
    let userEmail = null;
    if (location.state) {
        userEmail = location.state.email.split('@');
        userEmail[0] = userEmail[0].slice(0, 3) + '***';
        userEmail = userEmail.join('@');
    }

    async function verifyOTP(e) {
        e.preventDefault();
        if (otp == location.state.emailOtp) {
            setLoader(true);
            const response = await Auth.verifyEmail(location.state.email);
            if (response.success) {
                navigate('/login', { state: { redirectTo: location.state?.redirectTo } });
                toast.success('OTP Verification Successful! Please login to continue');
            } else {
                toast.error(response.message);
            }
            setLoader(false);
        } else {
            toast.warn('Invalid OTP');
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    navigate('/login', { state: { redirectTo: location.state?.redirectTo } });
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    function handleOtpInput(e) {
        setOtp(e.target.value);
    }

    return (
        <>
            {location.state && userEmail ?
                (<div className="otp-container">
                    <h2 className="text-center fw-bold">Email OTP Verification</h2>
                    <p>An OTP has been successfully sent to your email <span style={{
                        color: "rgb(229, 222, 236)",
                        fontSize: "1.1rem",
                        fontWeight: "500"
                    }}>{userEmail}</span></p>
                    <input
                        type="tel"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={handleOtpInput}
                    />
                    <p className="my-2"><b>Time left:</b> 0{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</p>
                    {loader ?
                        <button type="button" className="d-flex justify-content-center" disabled>
                            <ThreeDots height={25} width={54} color="#fff" />
                        </button>
                        : <button type="submit" onClick={verifyOTP} className="fw-bold">Verify OTP</button>
                    }
                </div>)
                : (<Navigate to="/sign-up" />)}
        </>
    )
}

export default Verification;