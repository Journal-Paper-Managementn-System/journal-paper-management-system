import React from "react";
import "./preloader.css";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { useAuth } from "../../store/AuthContext";
import PreloaderNav from "./PreloaderNav";

function Preloader() {
    const { journalData } = useAuth();

    return (
        <>
            <PreloaderNav />
            <section className="preloader-section container">
                <div className="container">
                    <h1 className="journal-title text-center p-lg-3 p-sm-2 p-md-3">
                        Publication Lists
                    </h1>
                    <Link to="/" className="text-center d-flex justify-content-center align-items-center journal-logo">
                        <img src="/journal-icon.png" alt="logo" width={50} />
                    </Link>
                    <hr className="bottom-rule" />
                    <div className="journal-lists">
                        <table className="table table-striped table-bordered table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Journals</th>
                                    <th>Description</th>
                                    <th>Template</th>
                                </tr>
                            </thead>
                            <tbody>
                                {journalData.map((journal, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <p>
                                                <Link to={`/dashboard/add-submission/${journal._id}`}>{journal.title}</Link>
                                            </p>
                                        </td>
                                        <td>
                                            <p>{journal.description}</p>
                                        </td>
                                        <td></td>
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
