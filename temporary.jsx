import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
// import { GrLinkNext } from "react-icons/gr";
import "./editor.css";
import { useAuth } from "../../store/AuthContext";
// import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import JournalArticle from "../../services/journalAService";

function Editor() {
    const { getArticles, journalData, user, userList, token } = useAuth();
    const [articles, setArticles] = useState([]);
    const [article, setArticle] = useState(false);
    const [newUserList, setNewUserList] = useState([]);

    const handleSelectUsers = (e) => {
        const selectedUser = e.target.value;
        setNewUserList([...newUserList, selectedUser]);
        userList.filter((user) => user._id !== selectedUser);
    }

    const handleSubmitStatus = async (e) => {
        e.preventDefault();
        const response = await JournalArticle.updateArticle(article, token);
        if (response.success) {
            toast.success("Status updated successfully");
        } else {
            toast.error(response.message);
        }
    };

    const handleSubmitUsers = async (e) => {
        e.preventDefault();
        toast.success("Status updated successfully");
    };

    const getJournalArticles = async () => {
        const { _id: journalId } = journalData.find((journal) => journal.userId === user._id);
        const response = await getArticles(journalId);
        if (response.success) {
            setArticles(response.data);
        }
    }

    useEffect(() => {
        getJournalArticles();
    }, [article,])

    const handleClick = (e) => {
        e.target.parentNode.childNodes.forEach((button) => {
            button.classList.remove("isActive");
            button.childNodes[3].classList.add("d-none");
        });
        const button = e.target;
        if (!button.classList.contains("isActive")) {
            button.classList.add("isActive");
            button.childNodes[3].classList.remove("d-none");
            setArticle(articles.find((article) => article._id === button.id));
        }
    }

    const statusChange = (e) => {
        setArticle({ ...article, status: e.target.value });
    }

    return (
        <section className="editor">
            <div className="container">
                <div className="editor-heading logo d-flex align-items-center bg-light rounded-1">
                    <h5 className="py-1 mx-2 my-3 fs-2">
                        <span className="text-danger">Welcome,</span> {user.firstName}
                    </h5>
                    <MdAdminPanelSettings size={40} color="#8B3DFF" />
                </div>
                <hr className="my-0" />
                <div className="editor-form">
                    <div className="row m-0 p-0">
                        {/* submisiion-title */}
                        <div className="col-12 col-sm-12 col-lg-4 col-md-4">
                            <div className="card">
                                <div className="card-title">
                                    <h5>Submission Title</h5>
                                </div>
                                <div className="card-body">
                                    {articles.map((article, index) => (
                                        <button className="my-2" key={index} id={article._id} onClick={handleClick}>
                                            {article.title}
                                            <hr />
                                            {new Date(article.createdAt).toDateString()}
                                            <span className="check-btn d-none">
                                                <FaCheckCircle
                                                    size={22}
                                                    color="#48a950"
                                                    className="text-center mb-1"
                                                />
                                            </span>
                                        </button>
                                    )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* List of users */}
                        {article && <div className="col-12 col-sm-12 col-lg-4 col-md-4">
                            <div className="card review-action">
                                <div className="card-title">
                                    <h5>List of Users</h5>
                                </div>
                                <div className="card-body d-flex flex-column justify-content-center">
                                    <form onSubmit={handleSubmitUsers}>
                                        <select name="user" id="user" className="form-select">
                                            <option value="select-user" disabled>Select User</option>
                                            {userList.map((user, index) => (
                                                <option key={index} value={user._id}>{user.firstName} {user.middleName} {user.lastName}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="submit"
                                            value="Submit"
                                            className="btn btn-success btn-lg w-100 mt-3"
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>}

                        {/* status */}
                        {article && <div className="col-12 col-sm-12 col-lg-4 col-md-4">
                            <div className="card status">
                                <div className="card-title">
                                    <h5>Status</h5>
                                </div>
                                <div className="card-body d-flex flex-column justify-content-around">
                                    <form onSubmit={handleSubmitStatus}>
                                        <select name="status" id="status" className="form-select" value={article.status} onChange={statusChange}>
                                            <option value="select-status" disabled>Select Status</option>
                                            <option value="approved">Approved</option>
                                            <option value="rejected">Rejected</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                        <input
                                            type="submit"
                                            value="Submit"
                                            className="btn btn-dark btn-lg w-100 mt-3"
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>}
                    </div>
                    {/* review-page button */}
                    {/* <div className="review-page mt-3 d-flex justify-content-center align-items-center">
                            <Link to="/reviewer" className="review-link">
                                Go Review
                                <GrLinkNext className="mx-2" />
                            </Link>
                        </div> */}
                    {/* end review-page button */}
                </div>
                {/* end editor-form here */}
            </div>
            {/* end container here */}
        </section>
    );
}

export default Editor;