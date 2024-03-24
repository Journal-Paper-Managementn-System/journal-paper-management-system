import { Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { useParams } from 'react-router-dom';
import ViewJournalArticle from '../journal/ViewJournalArticle';

function ViewSubmission() {
    const { articleData } = useAuth();
    const { journalId } = useParams();

    return (
        <>
            {!!journalId ? <ViewJournalArticle /> :
                <div className='p-4'>
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
                                            <Link to={`/dashboard/view-submission/${journal._id}`} state={{ articlesData: articleData.data }} className="txt-container text-start" style={{ width: "20rem" }}>{journal.title}</Link>
                                        </td>
                                        <td>
                                            {new Date(journal.createdAt).toLocaleString()}
                                        </td>
                                        <td>
                                            {/* {journal.reviewers.map((reviewer, index) => {
                                                <p key={index}>{reviewer.comments}</p>
                                            })} */}
                                        </td>
                                        <td>{journal.editorComments}</td>
                                        <td>
                                            <p className={journal.status === "pending" ? "text-warning" + " fw-bold text-capitalize" : (journal.status === "rejected" ? "text-danger" : "text-info") + " fw-bold text-capitalize"}>
                                                {journal.status}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (<h3 className='p-4'>{articleData.message}</h3>)}
                </div>}
        </>
    );
}

export default ViewSubmission;
