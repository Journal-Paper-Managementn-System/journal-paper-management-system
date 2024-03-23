import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { GrDocumentPdf } from 'react-icons/gr';
import PDFViewer from '../fileviewer/PDFViewer';
import { useAuth } from '../../store/AuthContext';
import JournalArticle from '../../services/journalAService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';

function ReviewArticles() {
    const [modalShow, setModalShow] = useState(false);
    const { token } = useAuth();
    const [articles, setArticles] = useState([{}]);

    const getArticles = async () => {
        const responseData = await JournalArticle.getReviewArticles(token);
        setArticles(responseData);
    }

    useEffect(() => {
        getArticles();
    }, []);

    /**
     * Handles the submission of a review for an article.
     * @param {Event} e - The event object representing the form submission.
     * @returns {Promise<void>} - A promise that resolves once the review is submitted.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Find the article based on the ID
        const article = articles.data.find((article) => article._id === e.target.id);
        article.reviewers[0].reviewed = true;
        article.reviewers[0].reviewDate = new Date();
        const response = await JournalArticle.updateReview(article, token);
        if (response.success) {
            getArticles();
            toast.success("Article reviewed successfully");
        } else {
            toast.error(response.message);
        }
    };

    /**
     * Handles the status change for an article reviewer.
     * @param {Event} e - The event object triggered by the status change.
     */
    const handleStatus = (e) => {
        const article = articles.data.find((article) => article._id === e.target.id);
        article.reviewers[0].status = e.target.value;
        setArticles({ ...articles });
    };

    /**
     * Handles the comments for a specific article.
     *
     * @param {string} id - The ID of the article.
     * @param {string} comments - The comments to be added.
     */
    const handleComments = (id, comments) => {
        const article = articles.data.find((article) => article._id === id);
        article.reviewers[0].comments = comments;
        setArticles({ ...articles });
    };

    return (
        <>
            {articles.success && articles.data.filter((article) => !article.reviewers[0].reviewed).length !== 0 ?
                <table className="table table-striped table-bordered text-center table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Submission Date</th>
                            <th>View Article</th>
                            <th>Status</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articles.data.filter((article) => !article.reviewers[0].reviewed).map((article, index) => {
                                return (
                                    <tr key={index}>
                                        {!article.reviewers[0].reviewed &&
                                            <>
                                                <th>{index + 1}</th>
                                                <td>
                                                    <div className='txt-container text-start' onClick={(e) => e.target.classList.toggle("txt-expanded")} style={{width: "30rem"}}>
                                                        {article.title}
                                                    </div>
                                                </td>
                                                <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    <Button variant="primary" onClick={() => setModalShow(index, true)}>
                                                        <GrDocumentPdf />
                                                    </Button>
                                                    <PDFViewer
                                                        show={modalShow === index}
                                                        onHide={() => setModalShow(index, false)}
                                                        fileurl={article.file}
                                                        title={article.title}
                                                    />
                                                </td>
                                                <td>
                                                    <select
                                                        name="status"
                                                        id={article._id}
                                                        className="form-select"
                                                        value={article.reviewers[0].status || "select status"}
                                                        onChange={handleStatus}
                                                    >
                                                        <option value="select status" disabled>Select Status</option>
                                                        <option value="strongly accept">Strongly Accept</option>
                                                        <option value="accept with change">Accept With Change</option>
                                                        <option value="border line">Border Line</option>
                                                        <option value="reject">Reject</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        data={article.reviewers[0].comments}
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
                                                            handleComments(article._id, editor.getData());
                                                        }}
                                                    />
                                                    <button className="btn btn-primary mt-2 w-50" onClick={handleSubmit} id={article._id}>
                                                        Submit
                                                    </button>
                                                </td>
                                            </>}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                : <h3 className='p-3'>There are no articles for review...</h3>}
        </>
    )
}

export default ReviewArticles;