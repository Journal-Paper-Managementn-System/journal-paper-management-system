import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useLayoutEffect, useState } from 'react';
import Auth from '../../services/authService';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

function EditProfile(props) {
    const { user, getUser } = props;
    const [loader, setLoader] = useState(false);
    const [userDetails, setUserDetails] = useState(Object);
    const accessToken = sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken");

    useLayoutEffect(() => {
        setUserDetails(user);
    }, [user]);

    /**
     * Handles the save changes event.
     *
     * @param {Event} event - The event object.
     * @returns {Promise<void>} - A promise that resolves when the save changes operation is complete.
     */
    const handleSaveChanges = async (event) => {
        event.preventDefault();
        setLoader(true);
        const formData = new FormData();
        formData.append('firstName', userDetails.firstName);
        formData.append('middleName', userDetails.middleName);
        formData.append('lastName', userDetails.lastName);
        formData.append('userName', userDetails.userName);
        formData.append('profile-picture', userDetails.profilePicture);
        formData.append('email', userDetails.email);
        formData.append('phoneNumber', userDetails.phoneNumber);
        formData.append('dateOfBirth', userDetails.dateOfBirth);
        formData.append('institution', userDetails.institution);
        const reponse = await Auth.profileUpdate(formData, accessToken);
        if (reponse.success) {
            getUser();
            toast.success(reponse.message);
        } else {
            toast.error(reponse.message);
        }
        setLoader(false);
        props.handleClose();
    }

    /**
     * Handles the change event for input fields.
     * @param {Event} event - The change event object.
     */
    const handleChange = (event) => {
        // console.log(event.target.files[0]);
        const { name, value, type } = event.target;
        setUserDetails({
            ...userDetails,
            [name]: type === 'file' ? event.target.files[0] : value
        });
    }

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
            size='lg'
        >
            <div style={{ backgroundColor: "transparent", borderRadius: "5px" }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3" encType='multipart/form-data' onSubmit={handleSaveChanges} >
                        <div className="col-md-4">
                            <label htmlFor="first-name" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="firstName"
                                id='first-name'
                                value={userDetails.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="middle-name" className="form-label">Middle Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="middle-name"
                                name='middleName'
                                value={userDetails.middleName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="last-name" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last-name"
                                name='lastName'
                                value={userDetails.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name='userName'
                                value={userDetails.userName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="profile-picture" className="form-label">Profile Picture</label>
                            <input
                                type="file"
                                className="form-control"
                                id="profile-picture"
                                accept='image/*'
                                name='profilePicture'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="email-id" className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email-id"
                                name='email'
                                value={userDetails.email}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="phone-number" className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone-number"
                                name='phoneNumber'
                                value={userDetails.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dob"
                                name='dateOfBirth'
                                value={userDetails.dateOfBirth ? new Date(userDetails.dateOfBirth).toISOString().split('T')[0] : ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="institution-name" className="form-label">Institution</label>
                            <input
                                type="text"
                                className="form-control"
                                id="institution-name"
                                name='institution'
                                value={userDetails.institution}
                                onChange={handleChange}
                            />
                        </div>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                            {
                                loader ? <Button variant="primary" type='button' disabled><ThreeDots height={24} width={50} wrapperStyle={{ padding: "0 22px" }} color='white' /></Button>
                                    : <Button variant="primary" type='submit'>Save changes</Button>
                            }
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </div>
        </Modal>
    )
}

export default EditProfile;