import React, { useState } from 'react'
import AuthorTable from './AuthorTable';
import KeyWords from './KeyWords';

function AddSubmission() {
    const supportedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const [file,setFile] = useState("");
    const handleFile = (evt) =>{
        // Add the mime type checking in here
    }
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center p-2 submission-wrapper overflow-auto">
            <form className="submission-data-form" action="/" method="post">
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
                            placeholder="Title of the Journal..." required />
                    </div>
                </div>
                {/* Abstract of the Journal */}
                <div className="row mb-3">
                    <label htmlFor="input-abstract" className="col-sm-2 col-form-label fw-bold fs-5">Abstract</label>
                    <div className="col-sm-10">
                        <textarea name="journal-abstract" id="input-abstract" cols="" rows="10" spellCheck="true"
                            className="form-control" placeholder="Describe something about your journal..."
                            required></textarea>
                    </div>
                </div>
                {/* Keywords of the Journal */}
                <KeyWords />
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
                {/* Author */}
                <AuthorTable />
                {/* Submit button */}
                {/* <div className="d-flex justify-content-end"> */}
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-warning pe-5 ps-5 fw-bold">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddSubmission
