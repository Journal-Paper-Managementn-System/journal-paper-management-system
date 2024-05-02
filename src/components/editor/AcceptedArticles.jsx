import React, { useEffect, useState } from 'react'
import { FaDownload } from 'react-icons/fa6';
import { useAuth } from '../../store/AuthContext';
import PDFViewer from '../fileviewer/PDFViewer';
import { Button } from 'react-bootstrap';
import { GrDocumentPdf } from 'react-icons/gr';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../services/helper';
import { ColorRing } from 'react-loader-spinner';
import zipService from '../../services/zipService';
import { useJournal } from '../../store/JournalContext';

function AcceptedArticles() {
    const { token } = useAuth();
    const { acceptedArticles } = useJournal();
    const [modalShow, setModalShow] = useState(false);
    const [loader, setLoader] = useState(false);

    const handleDownload = async () => {
        // Download the accepted articles
        setLoader(true);
        const files = { files: acceptedArticles.map(article => article.mergedScript) };
        const response = await zipService.createZip(files, token);
        if (response.success) {
            const link = document.createElement('a');
            link.href = `${BASE_URL}/articles/zip-files/${response.filename}`;
            link.setAttribute('download', response.filename);
            link.click();
            toast.success("Articles download started...");
        } else {
            toast.error("Failed to download articles...");
        }
        // console.log(response);
        setLoader(false);
    }

    return (
        <div className='p-4'>
            {!acceptedArticles || acceptedArticles.length === 0 ? <h2 className='fw-bold'>There are no accepted articles...</h2> :
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
                                {acceptedArticles.map((article, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className='text-start'>
                                            {article.title}
                                        </td>
                                        <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <Button variant="primary" onClick={() => setModalShow(prevState => ({ ...prevState, [index]: true }))}>
                                                <GrDocumentPdf />
                                            </Button>
                                            <PDFViewer
                                                show={modalShow[index]}
                                                onHide={() => setModalShow(prevState => ({ ...prevState, [index]: false }))}
                                                fileurl={article.mergedScript}
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