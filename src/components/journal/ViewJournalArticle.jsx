import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PDFViewer from "../fileviewer/PDFViewer";
import { Navigate } from "react-router-dom";
import { GrDocumentPdf } from "react-icons/gr";
import { PiArticleBold } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { IoIosJournal } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";
import { MdPreview } from "react-icons/md";
import { BASE_URL } from "../../services/helper";
import { useJournal } from "../../store/JournalContext";
import { useArticle } from "../../store/ArticleContext";
// import { useAuth } from "../../store/AuthContext";
import Loading from "../../utils/Loading";

function ViewJournalArticle() {
    const { articleId } = useParams();
    const { journalData, getJournalArticles } = useJournal();
    const { articleData } = useArticle();
    const [article, setArticle] = useState(false);
    // const { user } = useAuth();
    const { isEditor } = useLocation().state;
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        if (!isEditor) {
            const article = articleData.data.find(article => article._id === articleId);
            setArticle(article);
        } else {
            const data = await getJournalArticles(journalData);
            const article = data.find(article => article._id === articleId);
            setArticle(article);
        }
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            {!loading  ?
                <div className="p-3">
                    {articleId && article ?
                        <div className="row">
                            <div className="col-md-9">
                                <h3 className="fw-bold">{article.title}</h3>
                            </div>
                            <div className="col-md-3 d-flex justify-content-end">
                                <img
                                    src={article.userId.profilePicture.includes("https") ? article.userId.profilePicture : `${BASE_URL}/profile-pictures/${article.userId.profilePicture}`}
                                    alt="Profile Picture"
                                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                />
                                <div className="ms-3">
                                    <p className="m-0 fs-5 fw-bold">
                                        {article.userId.firstName} {article.userId.middleName} {article.userId.lastName}
                                    </p>
                                    <p className="fst-italic m-0 text-end">- {new Date(article.createdAt).toDateString()}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="col-md-6">
                                <h5 className="fw-bold d-flex align-items-center">
                                    <PiArticleBold className="me-2" />
                                    Abstract
                                </h5>
                                <p style={{ textAlign: "justify" }}>
                                    {article.abstract}
                                </p>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-5">
                                <h5 className="fw-bold d-flex align-items-center"><IoIosJournal className="me-2" />Journal Name</h5>
                                <p className="ms-4">{journalData.find(journal => journal._id === article.journalId).title}</p>
                                <hr />
                                <h5 className="fw-bold d-flex align-items-center"><FaUsers className="me-2" />Authors</h5>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hover mb-0">
                                        <thead className="table-dark text-center">
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Affilication</th>
                                                {/* <th>Role</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {article.authors.map((author, index) =>
                                                <tr key={index}>
                                                    <th>{index + 1}</th>
                                                    <td>{author.firstName} {author.lastName}</td>
                                                    <td>{author.email}</td>
                                                    <td>{author.affiliation}</td>
                                                    {/* <td>{author.role}</td> */}
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <hr />
                                <h5 className="fw-bold d-flex align-items-center"><FaHashtag className="me-2" />Keywords</h5>
                                <div className="ms-4">
                                    {article.keywords.map((keyword, index) =>
                                        <p key={index} className="mx-1 mb-0 mt-1 btn btn-outline-secondary">{keyword}</p>
                                    )}
                                </div>
                                <hr />
                                <h5 className="fw-bold d-flex align-items-center"><MdPreview className="me-2" />View Menuscript</h5>
                                <button className="btn btn-primary ms-4 mt-1" onClick={() => setModalShow(true)}>
                                    <GrDocumentPdf />
                                </button>
                                <PDFViewer
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    fileurl={article.mergedScript}
                                    title={article.title}
                                />
                                <hr />
                                <h5 className="fw-bold d-flex align-items-center"><MdPreview className="me-2" />View Supplementary File</h5>
                                <button className="btn btn-primary ms-4 mt-1" onClick={() => setModalShow(true)}>
                                    <GrDocumentPdf />
                                </button>
                                <PDFViewer
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    fileurl={article.mergedScript}
                                    title={article.title}
                                />
                            </div>
                        </div>
                        : <Navigate to="/dashboard/view-submission" />}
                </div>
                : <Loading />}
        </>
    );
}

export default ViewJournalArticle;