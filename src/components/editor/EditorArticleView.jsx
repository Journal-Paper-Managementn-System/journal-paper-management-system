import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GrDocumentPdf } from 'react-icons/gr';
import PDFViewer from '../fileviewer/PDFViewer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

function EditorArticleView(props) {
    const article = props.article;
    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    React.useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const handleClose = () => {
        setShow(false);
        props.onHide();
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="xl"
            dialogClassName='modal-90w'
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    {article.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead className='table-dark'>
                        <tr>
                            <th>Abstract</th>
                            <th>Keywords</th>
                            <th>Authors</th>
                            <th>View Article</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={1}>
                            <td>
                                <div className="txt-container" onClick={(e) => e.target.classList.toggle("txt-expanded")} style={{width: "40rem"}}>
                                    {article.abstract}
                                </div>
                            </td>
                            <td>
                                {article.keywords.map((keyword, index) =>
                                    <div key={index} className='btn btn-success mx-1'>
                                        {keyword}
                                    </div>
                                )}
                            </td>
                            <td>
                                {article.authors.map((author, index) =>
                                    <div key={index}>
                                        {author.firstName} {author.lastName}
                                    </div>
                                )}
                            </td>
                            <td className='text-center'>
                                <Button variant="primary" onClick={() => setModalShow(true)}>
                                    <GrDocumentPdf />
                                </Button>
                                <PDFViewer
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    fileurl={article.file}
                                    title={article.title}
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditorArticleView;