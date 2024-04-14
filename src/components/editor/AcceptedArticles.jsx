import React, { useEffect, useState } from 'react'
import { FaDownload } from 'react-icons/fa6';
import { useAuth } from '../../store/AuthContext';
import PDFViewer from '../fileviewer/PDFViewer';
import { Button } from 'react-bootstrap';
import { GrDocumentPdf } from 'react-icons/gr';
import Download from '../../services/downloadService';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../services/helper';
import { ColorRing } from 'react-loader-spinner';

function AcceptedArticles() {
    const { user, journalData, getArticles, token } = useAuth();
    const [articles, setArticles] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [loader, setLoader] = useState(false);

    /**
     * Retrieves journal articles for the current user.
     * @returns {Promise<void>} A Promise that resolves when the articles are retrieved.
     */
    const getJournalArticles = async () => {
        /**
         * Finds the journal ID based on the editor ID.
         *
         * @param {Object[]} journalData - The array of journals.
         * @param {string} user._id - The editor ID.
         * @returns {string} The journal ID.
         */
        if (journalData.length === 0) return;
        const journal = journalData.find((journal) => journal.editorId === user._id);
        if (journal !== undefined) {
            const response = await getArticles(journal._id);
            if (response.success) {
                setArticles(response.data.filter(article => article.finalStatus === 'accepted'));
            }
        }
    };

    const handleDownload = async () => {
        // Download the articles
        setLoader(true);
        const files = { files: articles.map(article => article.file) };
        const response = await Download.downloadArticles(files, token);
        if (response.success) {
            const link = document.createElement('a');
            link.href = `${BASE_URL}/journals/zip/${response.filename}`;
            link.setAttribute('download', response.filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success("Articles download started...");
        } else {
            toast.error("Failed to download articles...");
        }
        setLoader(false);
    }

    useEffect(() => {
        // Call the function to get the articles
        getJournalArticles();
    }, []);

    return (
        <div className='p-4'>
            {!articles || articles.length === 0 ? <h2 className='fw-bold'>There are no articles...</h2> :
                <>
                    <h2 className='text-center fw-bold'>Accepted Articles</h2>
                    <hr />
                    <div className="table-responsive">
                        <table className='table table-bordered table-striped table-hover text-center'>
                            <thead className='table-dark'>
                                <tr>
                                    <th>#</th>
                                    <th style={{ width: "60rem" }}>Title</th>
                                    <th>Submission Date</th>
                                    <th>View Article</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map((article, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className='text-start'>
                                            {article.title}
                                        </td>
                                        <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <Button variant="primary" onClick={() => setModalShow(index, true)}>
                                                <GrDocumentPdf />
                                            </Button>
                                            <PDFViewer
                                                show={modalShow === index}
                                                onHide={() => setModalShow(index, false)}
                                                fileurl={article.file}
                                                title={article.title}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary d-flex align-items-center fw-semibold fs-5" onClick={handleDownload}>
                            {loader ?
                                <>
                                    <ColorRing height={40} width={40} colors={['#fff', '#fff', '#fff', '#fff', '#fff']} />
                                    Generating Articles...
                                </> :
                                <>
                                    <FaDownload className='me-2' />
                                    Download Articles
                                </>
                            }
                        </button>
                    </div>
                </>
            }
        </div>
    )
}

export default AcceptedArticles;