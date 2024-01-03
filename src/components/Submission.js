import React  from 'react';
import AuthorRow from './AuthorRow';
import KeyWords from './KeyWords';

const JournalSubmissionForm = () => {

    return (
        <div className="d-flex justify-content-center align-items-center">
            <form className="" action="" method="">
                {/* Title of the Journal Paper */}
                <div className="row mb-3">
                    <label htmlFor="input-title" className="col-sm-2 col-form-label fw-bold text-white">Title</label>
                    <div className="col-sm-10">
                        <input type="text" name="journal-title" className="form-control" id="input-title"
                            placeholder="Title of the Journal Paper..." required />
                    </div>
                </div>
                {/* Abstract of the Journal Paper */}
                <div className="row mb-3">
                    <label htmlFor="input-abstract" className="col-sm-2 col-form-label fw-bold text-white">Abstract</label>
                    <div className="col-sm-10">
                        <textarea name="journal-abstract" id="input-abstract" cols="" rows="10" spellCheck="true"
                            className="form-control" placeholder="Describe something about your journal paper..."
                            required></textarea>
                    </div>
                </div>
                {/* Keywords of the Journal Paper */}
                <KeyWords />
                {/* File Upload */}
                <div className="row mb-3">
                    <label htmlFor="input-attachment" className="col-sm-2 col-form-label fw-bold text-white">Upload File
                        <span>&#40;.pdf,
                            .docx&#41;</span></label>
                    <div className="col-sm-10">
                        <input type="file" name="journal-attachment" className="form-control" id="input-attachment"
                            accept=".pdf, .docx" required />
                    </div>
                </div>
                {/* Author */}
                <AuthorRow />
                {/* Submit button */}
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-warning pe-5 ps-5 fw-bold">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default JournalSubmissionForm;