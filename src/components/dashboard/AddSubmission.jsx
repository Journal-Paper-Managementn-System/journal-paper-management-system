import React, { useState } from 'react'
import AuthorTable from './AuthorTable';
import KeyWords from './KeyWords';
import Article from "../../services/articleService";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from "../../store/AuthContext";
import { ThreeDots } from 'react-loader-spinner';
import MailService from '../../services/mailService';
import './submission.css';
import PDFMerger from 'pdf-merger-js';

// Component for adding a new submission
function AddSubmission() {
    // State variables
    const [lettersCount, setLettersCount] = useState(0); // Count of letters in the abstract
    const [abstract, setAbstract] = useState(''); // Abstract of the submission
    const [keywords, setKeywords] = useState([]); // Keywords for the submission
    const [loader, setLoader] = useState(false); // Loader state
    const [authors, setAuthors] = useState([{ firstName: '', lastName: '', email: '', affiliation: '', correspondingAuthor: false, firstAuthor: false, otherAuthor: false }]); // Authors of the submission
    const navigate = useNavigate(); // Navigation hook
    const totalLettersCount = 2000; // Maximum allowed letters in the abstract
    const { user, getArticleData, journalData, token } = useAuth(); // Auth context
    const { journalId } = useParams(); // Journal ID from URL parameters

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const supportedFileTypes = ['pdf', 'docx'];
        const menuscript = event.target['menuscript'].files[0];
        const coverLetter = event.target['cover-letter'].files[0];
        const supplementaryFile = event.target['supplementary-file'].files[0];
        // Check if the file type is supported
        if (!supportedFileTypes.includes(menuscript.name.split('.').pop())) {
            return toast.error('Please upload a valid file type for the menuscript');
        }
        // Check if the file type is supported
        if (!supportedFileTypes.includes(coverLetter.name.split('.').pop())) {
            return toast.error('Please upload a valid file type for the cover letter');
        }
        // Check if the file size is less than 10MB
        if (supplementaryFile.size > 10485760) {
            return toast.error('Supplementary file size should be less than 10MB');
        }
        setLoader(true);
        const formData = new FormData();
        const merger = new PDFMerger();
        // Merge the cover letter and menuscript
        await merger.add(coverLetter);
        await merger.add(menuscript);
        const mergedScript = await merger.saveAsBlob();
        // Append form data
        formData.append('menuscript', menuscript);
        formData.append('coverLetter', coverLetter);
        formData.append('supplementaryFile', supplementaryFile);
        formData.append('mergedScript', new File([mergedScript], `merged-${Date.now()}.pdf`));
        formData.append('title', event.target['journal-title'].value);
        formData.append('abstract', abstract);
        formData.set('keywords', JSON.stringify(keywords));
        formData.set('authors', JSON.stringify(authors));
        formData.append('userId', user._id.toString());
        formData.append('journalId', event.target['journal-list'].value);
        // Call the service to add the journal article
        const responseData = await Article.addArticle(formData, token);
        const emailReceivers = authors.map(author => author.email)
        emailReceivers.push(user.email);
        if (responseData.success) {
            // If successful, send a mail and navigate to the view submission page
            await MailService.sendMail({
                mailFrom: "Journal Submission",
                mailTo: emailReceivers,
                mailSubject: "Journal Submitted Successfully",
                mailText: "Your journal has been submitted successfully. You will be notified once it is reviewed.",
                mailHtml: `
                    <div>
                        <p>Your journal <b>${event.target['journal-title'].value}</b> has been submitted successfully.</p>
                        <br>
                        <p>You will be notified once it is reviewed.</p>
                    </div>
                `
            });
            getArticleData();
            navigate('/dashboard/view-submission');
            toast.success(responseData.message);
            setLoader(false);
        } else {
            // If not successful, show an error toast
            toast.error(responseData.message);
        }
    }

    // Function to handle changes in the abstract
    const handleOnChange = (event) => {
        if (event.target.value.length <= totalLettersCount) {
            setAbstract(event.target.value);
            setLettersCount(event.target.value.length);
        }
    }

    return (
        // Main container for the form
        <div className="d-flex justify-content-center align-items-center p-2 submission-wrapper">

            {/* Form for submitting a journal article */}
            <form className="submission-data-form" encType='multipart/form-data' onSubmit={handleSubmit}>
                <h2>Article Submission</h2>

                {/* Journal names */}
                <div className="row mb-3">
                    <label htmlFor="journal-list" className="col-sm-2 col-form-label">Journal <span className="required-field">*</span></label>
                    <div className="col-sm-10">
                        {/* If a journal ID is provided, show a disabled select with the journal title */}
                        {!!journalId ?
                            <select className="form-control" disabled name='journal-list'>
                                <option value={journalId}>{journalData.find(item => item._id === journalId).title}</option>
                            </select>
                            :
                            // Else, show a select with all available journals
                            <select name="journal-list" id="journal-list" className="form-select" defaultValue="selectJournal" required>
                                <option value="selectJournal" disabled>Select Journal</option>
                                {
                                    journalData.map((journal, index) => (
                                        <option key={index} value={journal._id}>
                                            {journal.title}
                                        </option>
                                    ))
                                }
                            </select>
                        }
                    </div>
                </div>

                {/* Title of the Journal Article */}
                <div className="row mb-3">
                    <label htmlFor="input-title" className="col-sm-2 col-form-label">Title <span className="required-field">*</span></label>
                    <div className="col-sm-10">
                        <input type="text" name="journal-title" className="form-control" id="input-title"
                            placeholder="Title of the Article..." required />
                    </div>
                </div>

                {/* Abstract of the Journal Article */}
                <div className="row mb-3">
                    <label htmlFor="input-abstract" className="col-sm-2 col-form-label">Abstract <span className="required-field">*</span></label>
                    <div className="col-sm-10">
                        <textarea
                            name="journal-abstract"
                            id="input-abstract"
                            cols=""
                            rows="10"
                            spellCheck="true"
                            className="form-control"
                            placeholder="Describe something about your article..."
                            value={abstract}
                            onChange={handleOnChange}
                            required
                        ></textarea>
                        {/* Counter for the number of letters in the abstract */}
                        <div className="d-flex justify-content-end my-1">
                            <span className='badge bg-success'>{lettersCount} / {totalLettersCount}</span>
                        </div>
                    </div>
                </div>

                {/* Keywords of the Journal Article */}
                <KeyWords keywords={keywords} setKeywords={setKeywords} />

                {/* Upload MenuScript */}
                <div className="row mb-3">
                    <label htmlFor="menuscript" className="col-sm-2 col-form-label">Menuscript
                        <span>{" ("}.pdf,
                            .docx{")"}</span><span className="required-field">*</span></label>
                    <div className="col-sm-10">
                        <input type="file" name="menuscript" className="form-control" id="menuscript"
                            accept=".pdf, .docx" required />
                    </div>
                </div>

                {/* Upload Cover Letter */}
                <div className="row mb-3">
                    <label htmlFor="cover-letter" className="col-sm-2 col-form-label">Cover Letter
                        <span>{" ("}.pdf,
                            .docx{")"}</span><span className="required-field">*</span></label>
                    <div className="col-sm-10">
                        <input type="file" name="cover-letter" className="form-control" id="cover-letter"
                            accept=".pdf, .docx" required />
                    </div>
                </div>

                {/* Upload Supplementary File */}
                <div className="row mb-3">
                    <label htmlFor="supplementary-file" className="col-sm-2 col-form-label">Supplementary File <span className="required-field">*</span>
                    </label>
                    <div className="col-sm-10">
                        <input type="file" name="supplementary-file" className="form-control" id="supplementary-file" required />
                        <p className='m-0' hidden={true}>{"Maximum file size should be 10MB"}</p>
                    </div>
                </div>

                {/* Authors */}
                <AuthorTable authors={authors} setAuthors={setAuthors} />

                {/* Submit button */}
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-warning pe-5 ps-5 fw-bold">
                        {/* Show a loader while the form is being submitted */}
                        {loader ? <ThreeDots
                            color="#fff"
                            height={22}
                            width={54}
                        /> : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddSubmission;