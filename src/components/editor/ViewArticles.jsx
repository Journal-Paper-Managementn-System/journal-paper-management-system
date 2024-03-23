import React, { useEffect, useState } from 'react';
import { FaRegSave } from "react-icons/fa";
// import { RiDeleteBinLine } from "react-icons/ri";
import { useAuth } from '../../store/AuthContext';
import parse from 'html-react-parser';
import JournalArticle from '../../services/journalAService';
import { toast } from 'react-toastify';

function ReviewerRow({ article, index }) {
    return (
        <>
            <td>
                <tr>
                    {article.reviewers?.[index]?.email}
                </tr>
            </td>
            <td>
                <tr className='text-capitalize'>
                    {article.reviewers?.[index]?.status}
                </tr>
            </td>
            <td>
                <tr>
                    <div style={{ width: "15rem" }}>
                        {article.reviewers?.[index]?.comments ? parse(article.reviewers?.[index]?.comments) : ""}
                    </div>
                </tr>
            </td>
        </>
    )
}

function ViewArticles() {
    const [articles, setArticles] = useState([{}]);
    const { user, journalData, getArticles, token } = useAuth();

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
        const { _id: journalId } = journalData.find((journal) => journal.editorId === user._id);
        const response = await getArticles(journalId);
        if (response.success) {
            setArticles(response.data);
        }
    };

    useEffect(() => {
        // Call the function to get the articles
        getJournalArticles();
    }, []);

    /**
     * Handles the submission of an article.
     *
     * @param {string} id - The ID of the article to be submitted.
     * @returns {Promise<void>} - A promise that resolves when the submission is complete.
     */
    const handleSubmit = async (id) => {
        // Find the article based on the ID
        const article = articles.find((article) => article._id === id);
        if (!["accepted", "rejected"].includes(article.status)) {
            return toast.error("Please select a status");
        }
        article.finalStatus = article.status;
        // Update the article based on the field
        const response = await JournalArticle.updateArticle(article, token);
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
                        <tr>
                            <th rowSpan={3}>{index + 1}</th>
                            <td rowSpan={3}>
                                <div className="txt-container text-start" onClick={(e) => e.target.classList.toggle("txt-expanded")} style={{ width: "20rem" }}>
                                    {article.title}
                                </div>
                            </td>
                            <ReviewerRow article={article} index={0} />
                            <td rowSpan={3}>
                                {["accepted", "rejected"].includes(article.finalStatus) ?
                                    article.editorComments :
                                    <textarea
                                        name="editorComments"
                                        id={article._id}
                                        rows="5"
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
                                        onChange={handleChange}
                                        value={['accepted', 'rejected'].includes(article.status) ? article.status : "select-status"}
                                    >
                                        <option value="select-status" selected disabled>Select Status</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="rejected">Rejected</option>
                                    </select>}
                            </td>
                            <td rowSpan={3}>
                                {["accepted", "rejected"].includes(article.finalStatus) ? "" :
                                    <div className="d-flex flex-column">
                                        <div className='save-button'>
                                            <button className='btn btn-primary my-3' onClick={(() => handleSubmit(article._id))} ><FaRegSave /></button>
                                        </div>
                                        {/* <div className='delete-button'>
                                            <button className='btn btn-danger'><RiDeleteBinLine /></button>
                                        </div> */}
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
    )
}

export default ViewArticles;