import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ThreeDots } from 'react-loader-spinner';
import Journal from '../../services/journalService';
import { toast } from 'react-toastify';

function AddJournal(props) {
    const [loader, setLoader] = useState(false);

    /**
     * Handles the save changes action when the form is submitted.
     * @param {Event} e - The form submit event.
     * @returns {Promise<void>} - A promise that resolves when the save changes action is completed.
     */
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setLoader(true);
        const response = await Journal.addJournal({
            title: e.target.title.value,
            description: e.target.description.value
        }, props.token);
        if (response.success) {
            props.getJournalData();
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        setLoader(false);
        props.handleClose();
    }

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
            size='lg'
        >
            <Modal.Header>
                <Modal.Title className='fw-bold text-center w-100'>Add Journal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3" onSubmit={handleSaveChanges} >
                    <div className="col-md-12">
                        <label htmlFor="journal-title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            id='journal-title'
                            placeholder='Enter title of the journal'
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="journal-description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            id='journal-description'
                            rows={5}
                            placeholder='Enter description of the journal'
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
        </Modal>
    )
}

export default AddJournal;