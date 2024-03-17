import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GrDocumentPdf } from 'react-icons/gr';
import PDFViewer from '../fileviewer/PDFViewer';

function EditorArticleView(props) {
    const article = props.article;
    const [modalShow, setModalShow] = useState(false);

    return (
        <Modal
            {...props}
            size='xl'
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {article.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className='table table-bordered text-center'>
                    <thead>
                        <tr>
                            <th>Abstract</th>
                            <th>Keywords</th>
                            <th>Authors</th>
                            <th>View Article</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={2}>
                            <td>{article.abstract}</td>
                            <td>{article.keywords.join(", ")}</td>
                            <td>{article.authors.map((author) =>
                                <p>{author.firstName} {author.lastName}</p>
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
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditorArticleView;