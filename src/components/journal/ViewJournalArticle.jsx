import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import PDFViewer from "../fileviewer/PDFViewer";
import { Navigate } from "react-router-dom";
import { GrDocumentPdf } from "react-icons/gr";

function ViewJournalArticle() {
    const { journalId } = useParams();
    const location = useLocation();
    let articlesData = false;
    let articleData = {};
    if (location.state) {
        articlesData = location.state.articlesData;
        articleData = articlesData.find(article => article._id === journalId);
    }
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            {articlesData ?
                <div className="p-3">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark text-center">
                            <tr>
                                <th>Title</th>
                                <th>Abstract</th>
                                <th>Authors</th>
                                <th>Created At</th>
                                <th>Status</th>
                                <th>View Article</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>
                                    <div className="txt-container" onClick={(e) => e.target.classList.toggle("txt-expanded")} style={{ width: "20rem" }}>
                                        {articleData.title}
                                    </div>
                                </td>
                                <td>
                                    <div className="txt-container" onClick={(e) => e.target.classList.toggle("txt-expanded")} style={{ width: "30rem" }}>
                                        {articleData.abstract}
                                    </div>
                                </td>
                                <td>{articleData.authors.map((author, index) =>
                                    <p key={index}>{author.firstName} {author.lastName}</p>
                                )}</td>
                                <td>{new Date(articleData.createdAt).toDateString()}</td>
                                <td className="text-capitalize">{articleData.status}</td>
                                <td className="text-center">
                                    <Button variant="primary" onClick={() => setModalShow(true)}>
                                        <GrDocumentPdf />
                                    </Button>
                                    <PDFViewer
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        fileurl={articleData.file}
                                        title={articleData.title}
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                : <Navigate to="/dashboard/view-submission" />}
        </>
    );
}

export default ViewJournalArticle;