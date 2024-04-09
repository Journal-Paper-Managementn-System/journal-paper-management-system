import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Confirmation(props) {
    const { show, handleClose, setConfirm, message } = props;

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            // keyboard={false} 
        >
            {/* <Modal.Header>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {setConfirm(true); handleClose();}}>
                    Yes
                </Button>
                <Button variant="primary" onClick={() => {setConfirm(false); handleClose();}}>No</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Confirmation;