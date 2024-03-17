import React, { useEffect, useState } from 'react';
import { FaRegSave } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useAuth } from '../../store/AuthContext';

function ViewArticles() {
    const [articles, setArticles] = useState([{}]);
    const { user, journalData, getArticles } = useAuth();

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
            console.log(response.data);
        }
    };

    useEffect(() => {
        // Call the function to get the articles
        getJournalArticles();
    }, []);

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
                            <td rowSpan={3}>{article.title}</td>
                            <td><tr>{article.reviewers?.[0]?.email}</tr></td>
                            <td><tr className='text-capitalize'>{article.reviewers?.[0]?.status}</tr></td>
                            <td><tr>{article.reviewers?.[0]?.comment}</tr></td>
                            <td rowSpan={3}>
                                <textarea name="additional-comments" id="additional" rows="5" className='form-control'></textarea>
                            </td>
                            <td rowSpan={3}>
                                <select name="status" id="none" className='form-select'>
                                    <option value="select-status" selected disabled>Select Status</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </td>
                            <td rowSpan={3} style={{ width: "20px" }}>
                                <div className="d-flex flex-column">
                                    <div className='save-button'>
                                        <button className='btn btn-primary my-3'><FaRegSave /></button>
                                    </div>
                                    <div className='delete-button'>
                                        <button className='btn btn-danger'><RiDeleteBinLine /></button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><tr>{article.reviewers?.[1]?.email}</tr></td>
                            <td><tr className='text-capitalize'>{article.reviewers?.[1]?.status}</tr></td>
                            <td><tr>{article.reviewers?.[1]?.comment}</tr></td>
                        </tr>
                        <tr>
                            <td><tr>{article.reviewers?.[2]?.email}</tr></td>
                            <td><tr className='text-capitalize'>{article.reviewers?.[2]?.status}</tr></td>
                            <td><tr>{article.reviewers?.[2]?.comment}</tr></td>
                        </tr>
                    </>))}
            </tbody>
        </table>
    )
}

export default ViewArticles;