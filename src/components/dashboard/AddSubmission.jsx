import React, { useState } from 'react'
import AuthorTable from './AuthorTable';
import KeyWords from './KeyWords';
import Journal from "../../services/journalService";
import { useNavigate } from 'react-router-dom';

function AddSubmission() {
    const [keywords, setKeywords] = useState([]);
    const [authors, setAuthors] = useState([{ firstName: '', lastName: '', email: '', affiliation: '', firstAuthor: false, secondAuthor: false, correspondingAuthor: false }]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const journalData = { userId: "65c91d92665c91128a5e6b52", title: event.target['journal-title'].value, abstract: event.target['journal-abstract'].value, keywords: keywords, file: event.target['journal-attachment'].files[0].name, authors: authors }
        const responseData = await Journal.addJournal(journalData);
        console.log(event.target['journal-attachment'].files[0]);
        console.log(responseData);
        if (responseData.success) {
            navigate('/dashboard/view-submission');
        } else {
            alert(responseData.message);
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-2 submission-wrapper overflow-auto">
            <form className="submission-data-form" action="/" method="post" onSubmit={handleSubmit}>
                {/* <h2>Journal Submission</h2> */}
                <div className="row">
                    <div className="col-sm overflow-auto">
                        <h2>Journal Submission</h2>
                    </div>
                </div>
                {/* Title of the Journal */}
                <div className="row mb-3">
                    <label htmlFor="input-title" className="col-sm-2 col-form-label fw-bold fs-5">Title</label>
                    <div className="col-sm-10">
                        <input type="text" name="journal-title" className="form-control" id="input-title"
                            placeholder="Title of the Article..." required />
                    </div>
                </div>
                {/* Abstract of the Journal */}
                <div className="row mb-3">
                    <label htmlFor="input-abstract" className="col-sm-2 col-form-label fw-bold fs-5">Abstract</label>
                    <div className="col-sm-10">
                        <textarea name="journal-abstract" id="input-abstract" cols="" rows="10" spellCheck="true"
                            className="form-control" placeholder="Describe something about your article..."
                            required></textarea>
                    </div>
                </div>
                {/* Keywords of the Journal */}
                <KeyWords keywords={keywords} setKeywords={setKeywords} />
                {/* File Upload */}
                <div className="row mb-3">
                    <label htmlFor="input-attachment" className="col-sm-2 col-form-label fw-bold fs-5">Upload File
                        <span>&#40;.pdf,
                            .docx&#41;</span></label>
                    <div className="col-sm-10">
                        <input type="file" name="journal-attachment" className="form-control" id="input-attachment"
                            accept=".pdf, .docx" required />
                    </div>
                </div>
                {/* Authors */}
                <AuthorTable authors={authors} setAuthors={setAuthors} />
                {/* Submit button */}
                {/* <div className="d-flex justify-content-end"> */}
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-warning pe-5 ps-5 fw-bold">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddSubmission;
