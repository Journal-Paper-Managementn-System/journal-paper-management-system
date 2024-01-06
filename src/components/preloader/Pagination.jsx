import React from "react";
import { Link } from "react-router-dom";

function Pagination({pageNo}) {
  return (
    <>
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <Link className="page-link" to="#">
              Previous
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">
              {pageNo}
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">
              2
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Pagination;
