import './profile.style.css';
import { FaRegUser, FaEdit } from "react-icons/fa";
import { useAuth } from "../../store/AuthContext";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import EditProfile from './EditProfile';
import { IoCalendarNumberOutline, IoSchoolOutline } from "react-icons/io5";
import { IoMdPhonePortrait } from "react-icons/io";
import { MdMailOutline, MdOutlineNature } from "react-icons/md";
import { ImListNumbered } from "react-icons/im";
import { MdPendingActions } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BASE_URL } from '../../services/helper';

function Profile() {
    const { user, getUser, articleData } = useAuth();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="profile-container container position-relative">
            <div className="profile-upper"></div>
            <div className="profile-avatar">
                <img
                    src={user.profilePicture.includes("https") ? user.profilePicture : `${BASE_URL}/profile-pictures/${user.profilePicture}`}
                    alt="Profile Picture"
                />
            </div>
            <div className="profile-info">
                <div className="profile-name">
                    <h3 className="fw-bolder">{user.firstName} {user.middleName} {user.lastName}</h3>
                    <div className='fs-5 d-flex align-items-center'><FaRegUser className='me-2' />{user.userName}</div>
                </div>
                <div className="edit-button">
                    <Button variant="primary" onClick={handleShow} className="d-flex align-items-center"><FaEdit className='me-3' />Edit Profile</Button>

                    <EditProfile show={show} handleClose={handleClose} user={user} getUser={getUser} />

                </div>
            </div>
            <div className="others-info row justify-content-evenly">
                <div className="col-12 user-personal-info mb-2">
                    <div className='personal-data mb-2'>
                        <IoCalendarNumberOutline />
                        <div>
                            {new Date(user.dateOfBirth).toISOString().split('T')[0]}

                        </div>
                    </div>
                    <div className='personal-data mb-2'>
                        <IoMdPhonePortrait />
                        <div>
                            {user.phoneNumber}
                        </div>
                    </div>
                    <div className='personal-data'>
                        <MdMailOutline />
                        <div className='d-flex align-items-center'>
                            {user.email} {user.emailVerified ? <FaCheckCircle className='text-success ms-2' /> : <MdPendingActions className='text-warning ms-2' />}
                        </div>
                    </div>
                </div>
                <div className="col-12 user-submission-info mb-2">
                    <div className="text-capitalize submission-data mb-2">
                        <IoSchoolOutline />
                        <div>
                            {user.institution}
                        </div>
                    </div>
                    <div className="text-capitalize submission-data mb-2">
                        <MdOutlineNature />
                        <div>
                            {user.isEditor ? "Editor" : (user.isReviewer ? "Reviewer" : "User")}
                        </div>
                    </div>
                    <div className='submission-data'>
                        <ImListNumbered />
                        <div>
                            {articleData.success ? (articleData.data.length < 10 ? "0" + articleData.data.length : articleData.data.length) : 0}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;