import React, { useState } from 'react';
import Journal from '../../services/journalService';

function JournalPosts() {
    const [loading, setLoading] = useState(true);

    const [journalData, setJournalData] = useState([]);

    const fetchJournalData = async () => {
        const journalData = await Journal.getJournal();
        setJournalData(journalData);
        setLoading(false);
    }

    return (
        <section className="preloader-section">
            <div className="container">
                { journalData.map((journal, index) => (
                    <div key={journal._id} className="journal-lists">
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
                                    <td>{index + 1}</td>
                                    <td>
                                        <p>
                                            <Link to={`/journal/${journal._id}`}>{journal.title}</Link>
                                        </p>
                                    </td>
                                    <td>
                                        <p>{new Date(journal.createdAt).toDateString()}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </section>
    )
}

JournalPosts.propTypes = {}

export default JournalPosts
