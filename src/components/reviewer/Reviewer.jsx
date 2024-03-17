import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import { GrDocumentPdf } from 'react-icons/gr';
import PDFViewer from '../fileviewer/PDFViewer';
import { useAuth } from '../../store/AuthContext';
import JournalArticle from '../../services/journalAService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Reviewer() {
    const [modalShow, setModalShow] = useState(false);
    const { token } = useAuth();
    const [articles, setArticles] = useState([{}]);
    const [status, setStatus] = useState("select-status");
    const [comments, setComments] = useState("");

    const getArticles = async () => {
        const responseData = await JournalArticle.getReviewArticles(token);
        setArticles(responseData);
    }

    useEffect(() => {
        getArticles();
    }, []);

    const handleSubmit = async () => {
        console.log(status, comments);
    };

    return (
        <>
            {articles.success && articles.data.reviewers?.filter((reviewer) => reviewer.reviewed).length !== 0 ?
                <table className="table table-striped table-bordered text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Created At</th>
                            <th>View Article</th>
                            <th>Status</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articles.data.map((article, index) => {
                                return (
                                    <>
                                        {!article.reviewers.reviewed &&
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td style={{ width: "40rem" }}>{article.title}</td>
                                                <td>{new Date(article.createdAt).toDateString()}</td>
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
                                                <td>
                                                    <select
                                                        name="status"
                                                        id="status"
                                                        className="form-select"
                                                    >
                                                        <option value="select-status" disabled>Select Status</option>
                                                        <option value="strongly-accept">Strongly Accept</option>
                                                        <option value="accept-with-change">Accept With Change</option>
                                                        <option value="border-line">Border Line</option>
                                                        <option value="reject">Reject</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        data=""
                                                        config={{
                                                            toolbar: ['undo', 'redo', '|', 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
                                                            heading: {
                                                                options: [
                                                                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                                                                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                                                                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
                                                                ]
                                                            }
                                                        }}
                                                        onChange={(event, editor) => {
                                                            setComments(editor.getData());
                                                        }}
                                                    />
                                                    <Button variant="primary" className="mt-2 w-50" onClick={handleSubmit}>
                                                        Submit
                                                    </Button>
                                                </td>
                                            </tr>}
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
                : <h3 className='p-3'>{articles.message}...</h3>}
        </>
    )
}

export default Reviewer;