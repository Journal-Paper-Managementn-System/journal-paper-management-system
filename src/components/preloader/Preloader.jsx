import React from "react";
import "./preloader.css";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import PreloaderNav from "./PreloaderNav";
import { useJournal } from "../../store/JournalContext";
import { useAuth } from "../../store/AuthContext";

function Preloader() {
    const { journalData } = useJournal();
    const { user, isLoggedIn } = useAuth();

    return (
        <>
            <PreloaderNav />
            <section className="preloader-section container mb-2">
                <div className="">
                    <h1 className="journal-title text-center p-lg-3 p-sm-2 p-md-3 fw-semibold">
                        Publication Lists
                    </h1>
                    <Link to="/" className="text-center d-flex justify-content-center align-items-center journal-logo mb-3">
                        <img src="/journal-icon.png" alt="logo" width={50} />
                    </Link>
                    <hr className="bottom-rule" />
                    <div className="journal-lists">
                        <table className="table table-striped table-bordered table-hover">
                            <thead className="table-dark">
                                <tr className="text-center">
                                    <th>#</th>
                                    <th>Journals</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {journalData.map((journal, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <p style={{ minWidth: "10rem" }}>
                                                {isLoggedIn && (user.isEditor || user.isSuperAdmin) ?
                                                    journal.title :
                                                    <Link to={`/dashboard/add-submission/${journal._id}`} className="text-start">{journal.title}</Link>
                                                }
                                            </p>
                                        </td>
                                        <td>
                                            <p>{journal.description}</p>
                                        </td>
                                        <td style={{ minWidth: "20rem" }}>{new Date(journal.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="journal-pagination d-flex justify-content-center align-items-center">
                            <Pagination pageNo={1} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Preloader;
