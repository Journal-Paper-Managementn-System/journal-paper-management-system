import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GrDocumentPdf } from 'react-icons/gr';
import PDFViewer from '../fileviewer/PDFViewer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

function EditorArticleView(props) {
    const article = props.article;
    const [modalShow, setModalShow] = useState(false);

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
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
                            <td>{article.abstract}</td>
                            <td>{article.keywords.join(", ")}</td>
                            <td>
                                {article.authors.map((author, index) =>
                                    <div>
                                        {author.firstName} {author.lastName}
                                    </div>
                                )}
                            </td>
                            <td>
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
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditorArticleView;