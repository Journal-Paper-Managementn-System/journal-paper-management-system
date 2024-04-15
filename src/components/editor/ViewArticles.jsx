import React, { useEffect, useState } from 'react';
import { FaRegSave } from "react-icons/fa";
// import { RiDeleteBinLine } from "react-icons/ri";
import { useAuth } from '../../store/AuthContext';
import parse from 'html-react-parser';
import Article from '../../services/articleService';
import { toast } from 'react-toastify';
import Confirmation from '../../utils/Confirmation';

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
                    <p style={{ minWidth: "15rem" }}>
                        {article.reviewers?.[index]?.comments ? parse(article.reviewers?.[index]?.comments) : "Null"}
                    </p>
                </tr>
            </td>
        </>
    )
}

function ViewArticles() {
    const [articles, setArticles] = useState([]);
    const { user, journalData, getArticles, token } = useAuth();
    const [cnfModalShow, setCnfModalShow] = useState(false);

    /**
     * Retrieves journal articles for the current user.
     * @returns {Promise<void>} A Promise that resolves when the articles are retrieved.
     */
    const getJournalArticles = async () => {
        /**
         * Finds the journal ID based on the editor ID.
         *
         * @param {Object[]} journalData - The array of journals.
         * @param {string} user._id - The editor ID.
         * @returns {string} The journal ID.
         */
        if (journalData.length === 0) return;
        const journal = journalData.find((journal) => journal.editorId === user._id);
        if (journal !== undefined) {
            const response = await getArticles(journal._id);
            if (response.success) {
                setArticles(response.data);
            }
        }
    };

    useEffect(() => {
        // Call the function to get the articles
        getJournalArticles();
    }, []);

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
        setCnfModalShow(true);
    }

    /**
     * Handles the submission of an article.
     *
     * @param {string} id - The ID of the article to be submitted.
     * @returns {Promise<void>} - A promise that resolves when the submission is complete.
     */
    const handleSubmit = async (article) => {
        article.finalStatus = article.status;
        // Update the article based on the field
        const response = await Article.updateArticle(article, token);
        if (response.success) {
            getJournalArticles();
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
    const handleChange = (e) => {
        // Find the article based on the ID
        const article = articles.find((article) => article._id === e.target.id);
        // Update the article based on the field
        article[e.target.name] = e.target.value;
        setArticles([...articles]);
    };

    return (
        <div className="table-responsive">
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
                                                    id={article._id}
                                                    rows="5"
                                                    cols="40"
                                                    style={{ minWidth: "300px" }}
                                                    className='form-control'
                                                    placeholder='Additional comments'
                                                    onChange={handleChange}
                                                    value={article.editorComments || ""}
                                                >
                                                </textarea>
                                            }
                                        </td>
                                        <td rowSpan={3}>
                                            {article.finalStatus === "accepted" ? <div className='text-primary fw-bold'>Accepted</div> : article.finalStatus === "rejected" ? <div className='text-danger fw-bold'>Rejected</div> :
                                                <select
                                                    name="status"
                                                    id={article._id}
                                                    className='form-select'
                                                    style={{ width: "10rem" }}
                                                    onChange={handleChange}
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
                                                            show={cnfModalShow}
                                                            handleClose={() => setCnfModalShow(false)}
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