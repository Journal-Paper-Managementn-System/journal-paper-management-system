import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ThreeDots } from 'react-loader-spinner';
import Journal from '../../services/journalService';
import { toast } from 'react-toastify';
import mailService from '../../services/mailService';

function UpdateEditor(props) {
    const [loader, setLoader] = useState(false);
    const { journal, getJournalData, token } = props;

    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const handleClose = () => {
        setShow(false);
        props.handleClose();
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setLoader(true);
        // console.log(e.target.firstName.value, e.target.lastName.value, e.target.email.value, e.target.phoneNumber.value, e.target.gender.value);
        const response = await Journal.addEditor({
            firstName: e.target.firstName.value,
            middleName: e.target.middleName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            phoneNumber: e.target.phoneNumber.value,
            gender: e.target.gender.value,
            journalId: journal._id
        }, token);
        if (response.success) {
            getJournalData();
            toast.success(response.message);
            handleClose();
            await mailService.sendMail({
                mailFrom: "Journal Submission",
                mailTo: e.target.email.value,
                mailSubject: "Editor Update",
                mailHtml: `<div>
                    <h4>Hello ${e.target.firstName.value},</h4>
                    <p>You have been added as an editor for the journal <strong>${journal.title}</strong>. Please <a href=${window.location.origin + "/login"}>login</a> using the bellow credentials to start editing the journal.</p>
                    <br />
                    <p><strong> Username: </strong> ${response.data.userName}</p>
                    <p><strong> Password: </strong> ${response.data.password}</p>
                </div>`
            });
        } else {
            toast.error(response.message);
        }
        setLoader(false);
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title className='fw-bold'>Add Editor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3" onSubmit={handleSaveChanges}>
                    <div className="col-md-4">
                        <label htmlFor="first-name" className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            id='first-name'
                            placeholder='Enter First Name'
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="middle-name" className="form-label">Middle Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="middle-name"
                            name='middleName'
                            placeholder='Enter Middle Name'
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="last-name" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="last-name"
                            name='lastName'
                            placeholder='Enter Last Name'
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name='email'
                            placeholder='Enter Email'
                            required
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="phone-number" className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone-number"
                            name='phoneNumber'
                            placeholder='Enter Phone Number'
                            required
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="gender" className='form-label'>Gender</label>
                    </div>
                    <div className="col-10">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" id="male" value="male" />
                            <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" id="female" value="female" />
                            <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" id="other" value="other" />
                            <label className="form-check-label" htmlFor="inlineRadio3">Other</label>
                        </div>
                    </div>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        {
                            loader ? <Button variant="primary" type='button' disabled><ThreeDots height={24} width={50} wrapperStyle={{ padding: "0 22px" }} color='white' /></Button>
                                : <Button variant="primary" type='submit'>Save changes</Button>
                        }
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default UpdateEditor;