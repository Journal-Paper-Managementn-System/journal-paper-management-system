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

// Component for adding a new submission
function AddSubmission() {
    // State variables
    const [lettersCount, setLettersCount] = useState(0); // Count of letters in the abstract
    const [abstract, setAbstract] = useState(''); // Abstract of the submission
    const [keywords, setKeywords] = useState([]); // Keywords for the submission
    const [loader, setLoader] = useState(false); // Loader state
    const [authors, setAuthors] = useState([{ firstName: '', lastName: '', email: '', affiliation: '', firstAuthor: false, secondAuthor: false, correspondingAuthor: false }]); // Authors of the submission
    const navigate = useNavigate(); // Navigation hook
    const totalLettersCount = 1000; // Maximum allowed letters in the abstract
    const { user, getArticleData, journalData } = useAuth(); // Auth context
    const { journalId } = useParams(); // Journal ID from URL parameters
    const accessToken = sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken"); // Access token

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoader(true);
        const formData = new FormData();
        // Append form data
        formData.append('journal-attachment', event.target['journal-attachment'].files[0]);
        formData.append('title', event.target['journal-title'].value);
        formData.append('abstract', abstract);
        formData.set('keywords', JSON.stringify(keywords));
        formData.set('authors', JSON.stringify(authors));
        formData.append('userId', user._id.toString());
        formData.append('journalId', event.target['journal-list'].value);
        // Call the service to add the journal article
        const responseData = await Article.addArticle(formData, accessToken);
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
            navigate('/dashboard/view-submission');
            toast.success(responseData.message);
            getArticleData();
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
                    <label htmlFor="journal-list" className="col-sm-2 col-form-label fw-bold fs-5">Journal</label>
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
                                {journalData.map((journal, index) => (
                                    <option key={index} value={journal._id}>{journal.title}</option>
                                ))}
                            </select>
                        }
                    </div>
                </div>
                {/* Title of the Journal Article */}
                <div className="row mb-3">
                    <label htmlFor="input-title" className="col-sm-2 col-form-label fw-bold fs-5">Title</label>
                    <div className="col-sm-10">
                        <input type="text" name="journal-title" className="form-control" id="input-title"
                            placeholder="Title of the Article..." required />
                    </div>
                </div>
                {/* Abstract of the Journal Article */}
                <div className="row mb-3">
                    <label htmlFor="input-abstract" className="col-sm-2 col-form-label fw-bold fs-5">Abstract</label>
                    <div className="col-sm-10">
                        <textarea name="journal-abstract" id="input-abstract" cols="" rows="10" spellCheck="true"
                            className="form-control" placeholder="Describe something about your article..."
                            required
                            value={abstract}
                            onChange={handleOnChange}
                        ></textarea>
                        {/* Counter for the number of letters in the abstract */}
                        <div className="d-flex justify-content-end my-1">
                            <span className='badge bg-success'>{lettersCount} / {totalLettersCount}</span>
                        </div>
                    </div>
                </div>
                {/* Keywords of the Journal Article */}
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