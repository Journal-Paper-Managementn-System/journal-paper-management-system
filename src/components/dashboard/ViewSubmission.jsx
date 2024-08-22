import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ViewJournalArticle from '../journal/ViewJournalArticle';
import { useArticle } from '../../store/ArticleContext';
import parse from 'html-react-parser';

function ViewSubmission() {
    const { articleData } = useArticle();
    const { articleId } = useParams();

    return (
        <>
            {!!articleId ? <ViewJournalArticle articleId={articleId} /> :
                <div className='p-4 table-responsive'>
                    {articleData.success ? (
                        <table className="table table-striped table-bordered table-hover text-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Submission Date</th>
                                    <th>Review Comments</th>
                                    <th>Editor Comments</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articleData.data.map((journal, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {/* Link to view the journal article */}
                                            <Link to={`/dashboard/view-submission/${journal._id}`} state={{ isEditor: false }} className="txt-container text-start" style={{ width: "20rem" }}>{journal.title}</Link>
                                        </td>
                                        <td>
                                            {/* Display the submission date */}
                                            {new Date(journal.createdAt).toLocaleString()}
                                        </td>
                                        <td>
                                            {/* Display review comments if the journal has been accepted or rejected */}
                                            {["accepted", "rejected"].includes(journal.finalStatus) ? journal.reviewers.map((reviewer, index) => (
                                                <div key={index}>{parse(reviewer.comments)}</div>
                                            )) : "N/A"}
                                        </td>
                                        <td>
                                            {/* Display editor comments if the journal has been accepted or rejected */}
                                            {["accepted", "rejected"].includes(journal.finalStatus) ? journal.editorComments : "N/A"}
                                        </td>
                                        <td>
                                            {/* Display the status of the journal */}
                                            <p className={journal.status === "submitted" ? "text-warning" + " fw-bold text-capitalize" : (journal.status === "rejected" ? "text-danger" : "text-primary") + " fw-bold text-capitalize"}>
                                                {journal.status}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (<h3 className='p-2'>{articleData.message}</h3>)}
                </div>}
        </>
    );
}

export default ViewSubmission;
