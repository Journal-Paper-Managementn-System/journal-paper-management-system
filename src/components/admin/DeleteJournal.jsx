import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Journal from '../../services/journalService';
import { toast } from 'react-toastify';

function DeleteJournal(props) {
    const { journalData, getJournalData, token } = props;
    const [loader, setLoader] = React.useState(false);

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        if (!e.target.confirm.checked) {
            return toast.error('Please confirm that you want to delete the journal');
        }
        setLoader(true);
        const journalId = e.target.journal.value;
        const response = await Journal.deleteJournal(journalId, token);
        if (response.success) {
            getJournalData();
            toast.success(response.message);
            props.handleClose();
        } else {
            toast.error(response.message);
        }
        setLoader(false);
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
                <form className="row g-3 p-4" onSubmit={handleSaveChanges}>
                    <select name="journal" id="journal-id" className='form-select' required>
                        <option value=''>Select Journal</option>
                        {
                            journalData.map((journal, index) =>
                                <option key={index} value={journal._id}>{journal.title}</option>
                            )
                        }
                    </select>
                    <div className="form-check">
                        <input className="form-check-input border-dark" type="checkbox" id="confirm" value="confirm" />
                        <label className="form-check-label" htmlFor="confirm">
                            Are you sure you want to delete this journal?
                        </label>
                    </div>


                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                        {
                            loader ? <Button variant="primary" type='button' disabled><ThreeDots height={24} width={50} wrapperStyle={{ padding: "0 22px" }} color='white' /></Button>
                                : <Button variant="danger" type='submit'>Delete</Button>
                        }
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteJournal;