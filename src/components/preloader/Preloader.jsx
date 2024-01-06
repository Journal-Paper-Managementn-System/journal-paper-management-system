import React from "react";
import "./preloader.css";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
function Preloader() {
  return (
    <section className="preloader-section">
      <div className="container">
        <h1 className="journal-title text-center p-lg-3 p-sm-2 p-md-3">
          Journal Publication Lists
        </h1>
        <Link to="/" className="text-center d-flex justify-content-center align-items-center journal-logo">
            <img src="/journal-icon.png" alt="logo" width={50} />
        </Link>
        <hr className="bottom-rule" />
        <div className="journal-lists">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Journals</th>
                <th>created-at</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <p>
                    <Link to="/login">The A.I evalution</Link>
                  </p>
                </td>
                <td>
                  <p>{new Date().toDateString()}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="journal-pagination d-flex justify-content-center align-items-center">
            <Pagination pageNo={1} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Preloader;
