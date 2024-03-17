import { Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { useParams } from 'react-router-dom';
import ViewJournalArticle from '../journal/ViewJournalArticle';

function ViewSubmission() {
    const { journalAData } = useAuth();
    const { journalId } = useParams();

    return (
        <>
            {!!journalId ? <ViewJournalArticle /> :
                <div>
                    {journalAData.success ? (
                        <section className="preloader-section p-4">
                            <div className="journal-lists">
                                <table className="table table-striped table-bordered">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Created At</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {journalAData.data.map((journal, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <p>
                                                        <Link to={`/dashboard/view-submission/${journal._id}`} state={{articlesData: journalAData.data}}>{journal.title}</Link>
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>{new Date(journal.createdAt).toDateString()}</p>
                                                </td>
                                                <td>
                                                    <p className={journal.status === "pending"? "text-warning" + " fw-bold text-capitalize": (journal.status === "rejected"? "text-danger": "text-info") + " fw-bold text-capitalize"}>
                                                        {journal.status}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </section>
                    ) : (<h3 className='p-4'>{journalAData.message}</h3>)}
                </div>}
        </>
    );
}

export default ViewSubmission;
