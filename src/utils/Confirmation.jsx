import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import parse from 'html-react-parser';

function Confirmation(props) {
    const { show, handleClose, onConfirm } = props;
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(show);
    }, [show]);

    const handleHide = () => {
        setShowModal(false);
        handleClose();
    }

    const handleConfirm = () => {
        onConfirm();
        handleHide();
    }

    return (
        <Modal
            show={showModal}
            onHide={handleHide}
            backdrop="static"
            // keyboard={false} 
        >
            <Modal.Header>
                <Modal.Title className='fw-bold'>
                    {props.title || "Confirmation"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* parse() is used to render HTML content */}
                {parse(props.message)}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleConfirm}>
                    Yes
                </Button>
                <Button variant="primary" onClick={handleHide}>No</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Confirmation;