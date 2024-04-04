import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DeleteJournal(props) {
    const { journalData, getJournalData } = props;
    const [loader, setLoader] = React.useState(false);

    const handleSaveChanges = (e) => {
        e.preventDefault();
        const journalId = e.target.journal.value;
        console.log(journalId); // Delete the journal with this id
        if (!journalId) {
            return;
        }
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
            <Modal.Header closeButton>
                <Modal.Title className='fw-bold'>Delete Journal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3" onSubmit={handleSaveChanges}>
                    <select name="journal" id="journal-id" className='form-select'>
                        <option value=''>Select Journal</option>
                        {
                            journalData.map((journal, index) =>
                                <option key={index} value={journal._id}>{journal.title}</option>
                            )
                        }
                    </select>

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

export default DeleteJournal;