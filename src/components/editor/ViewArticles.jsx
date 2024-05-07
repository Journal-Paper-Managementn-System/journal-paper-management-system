import React, { useState } from 'react';
import { FaRegSave } from "react-icons/fa";
// import { RiDeleteBinLine } from "react-icons/ri";
import { useAuth } from '../../store/AuthContext';
import parse from 'html-react-parser';
import Article from '../../services/articleService';
import { toast } from 'react-toastify';
import Confirmation from '../../utils/Confirmation';
import { useJournal } from '../../store/JournalContext';

function ReviewerRow({ article, index }) {
    return (
        <>
            <td>
                <tr>
                    <p style={{ minWidth: "15rem" }}>
                        {article.reviewers?.[index]?.email || "Not Assigned"}
                    </p>
                </tr>
            </td>
            <td>
                <tr className='text-capitalize'>
                    <p style={{ minWidth: "10rem" }}>
                        {article.reviewers?.[index]?.status || "Null"}
                    </p>
                </tr>
            </td>
            <td className='text-start'>
                <tr>
                    <div style={{ minWidth: "15rem" }}>
                        {article.reviewers?.[index]?.comments ? parse(article.reviewers?.[index]?.comments) : "Null"}
                    </div>
                </tr>
            </td>
        </>
    )
}

function ViewArticles() {
    // const [articles, setArticles] = useState([]);
    const { token } = useAuth();
    const { articles, getJournalArticles, setArticles, journalData } = useJournal();
    const [cnfModalShow, setCnfModalShow] = useState(false);

    /**
     * Checks the validation of comments and status.
     *
     * @param {Object} article - The article object.
     * @returns {void}
     */
    const checkValidation = (article) => {
        // Check if the editor comments are empty
        if (article.editorComments.trim() === "") {
            return toast.error("Please provide comments");
        }
        // Check if the status is selected
        if (!["accepted", "rejected"].includes(article.status)) {
            return toast.error("Please select a status");
        }
        setCnfModalShow(prevState => ({ ...prevState, [articles.indexOf(article)]: true }));
    }

    /**
     * Handles the submission of an article.
     *
     * @param {string} id - The ID of the article to be submitted.
     * @returns {Promise<void>} - A promise that resolves when the submission is complete.
     */
    const handleSubmit = async (article) => {
        const updatedArticle = articles.find((art) => art._id === article._id);
        updatedArticle.finalStatus = updatedArticle.status;
        // Update the article based on the field
        const response = await Article.updateArticle(updatedArticle, token);
        if (response.success) {
            getJournalArticles(journalData);
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    /**
     * Handles the change event for input fields.
     * Updates the corresponding article field based on the event target's ID and name.
     * @param {Object} e - The event object.
     */
    const handleChange = (e, article) => {
        // Update the article based on the field
        article[e.target.name] = e.target.value;
        setArticles([...articles]);
    };

    return (
        <div className="table-responsive" style={{maxHeight: "75vh", overflow: "auto"}}>
            {
                articles.length === 0 ? <h2 className='fw-bold p-3'>There are no articles...</h2>
                    :
                    <table className='table table-bordered text-center table-striped'>
                        <thead className='table-dark'>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Reviewers</th>
                                <th>Reviewer Status</th>
                                <th>Reviewer Comments</th>
                                <th>Additional comments</th>
                                <th>Set Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article, index) => (
                                <>
                                    <tr key={index}>
                                        <th rowSpan={3}>{index + 1}</th>
                                        <td rowSpan={3}>
                                            <div className="text-start" style={{ minWidth: "20rem" }}>
                                                {article.title}
                                            </div>
                                        </td>
                                        <ReviewerRow article={article} index={0} />
                                        <td rowSpan={3} >
                                            {["accepted", "rejected"].includes(article.finalStatus) ?
                                                article.editorComments :
                                                <textarea
                                                    name="editorComments"
                                                    // id={article._id}
                                                    rows="5"
                                                    cols="40"
                                                    style={{ minWidth: "300px" }}
                                                    className='form-control'
                                                    placeholder='Additional comments'
                                                    onChange={(e) => handleChange(e, article)}
                                                    value={article.editorComments || ""}
                                                >
                                                </textarea>
                                            }
                                        </td>
                                        <td rowSpan={3}>
                                            {article.finalStatus === "accepted" ? <div className='text-primary fw-bold'>Accepted</div> : article.finalStatus === "rejected" ? <div className='text-danger fw-bold'>Rejected</div> :
                                                <select
                                                    name="status"
                                                    // id={article._id}
                                                    className='form-select'
                                                    style={{ width: "10rem" }}
                                                    onChange={(e) => handleChange(e, article)}
                                                    value={['accepted', 'rejected'].includes(article.status) ? article.status : "select-status"}
                                                >
                                                    <option value="select-status" disabled>Select Status</option>
                                                    <option value="accepted">Accepted</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>}
                                        </td>
                                        <td rowSpan={3}>
                                            {["accepted", "rejected"].includes(article.finalStatus) ? "" :
                                                <div className="d-flex flex-column">
                                                    <div className='save-button'>
                                                        <button className='btn btn-primary my-3' onClick={() => checkValidation(article)} >
                                                            <FaRegSave />
                                                        </button>
                                                        <Confirmation
                                                            show={cnfModalShow[index]}
                                                            handleClose={() => setCnfModalShow(prevState => ({ ...prevState, [index]: false }))}
                                                            onConfirm={() => handleSubmit(article)}
                                                            title="Update Status"
                                                            message={`<p><strong class="text-capitalize d-block mb-2">Status: ${article.status}</strong>Are you sure you want to update the status? You can't undone this, once it changed.</p>`}
                                                        />
                                                    </div>
                                                </div>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <ReviewerRow article={article} index={1} />
                                    </tr>
                                    <tr>
                                        <ReviewerRow article={article} index={2} />
                                    </tr>
                                </>))}
                        </tbody>
                    </table>
            }
        </div>
    )
}

export default ViewArticles;