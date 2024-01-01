import React, { useState } from 'react';

const JournalSubmissionForm = () => {

    const addAuthorRow = () => {
        // Define the HTML string for a new author row
        let authorRowString = `
            <th scope="row" class="text-center"></th>
            <td><input type="text" name="first-name" id="input-fname" class="form-control"></td>
            <td><input type="text" name="last-name" id="input-lname" class="form-control"></td>
            <td><input type="email" name="author-email" id="input-email" class="form-control"></td>
            <td><input type="text" name="author-address" id="input-address" class="form-control"></td>
            <td class="text-center"><button type="button" class="btn btn-danger fw-bold remove-author-row">-</button></td>
        `;

        // Add the new row to the DOM
        document.getElementById('author-body').insertAdjacentHTML('beforeend', authorRowString);

        let removeAuthorRow = document.getElementsByClassName('remove-author-row');
        // console.log(removeAuthorRow);
        let authorBody = document.getElementById('author-body');

        // Enable the remove button if the number of authors is greater than 1
        if (authorBody.children.length > 1) {
            removeAuthorRow[0].disabled = false;
        }

        for (let item of removeAuthorRow) {
            item.addEventListener('click', (e) => {
                // Remove the row from the DOM
                e.target.parentElement.parentElement.remove();
                for (let element of authorBody.children) {
                    // Update the row numbers after removing a row
                    element.children[0].textContent = element.rowIndex;
                };
                // disable button if the number of authors is 1
                if (authorBody.children.length === 1) {
                    removeAuthorRow[0].disabled = true;
                }
            });
        };


        for (let element of authorBody.children) {
            // Update the row numbers after adding a new row
            element.children[0].textContent = element.rowIndex;
        };
    };


    const maxKeys = 6;
    const [keyNumb, setKeyNumb] = useState(maxKeys);
    const [keyValue, setKeyValue] = useState('');

    function handleInput(event) {
        const containerElement = document.getElementById('keywordContainer');
        containerElement.innerHTML = '';
        const keywords = event.target.value.split(',');
        console.log(keywords);
        console.log(keywords.length);
        keywords.forEach(keyword => {
            if (keyword.trim() !== '') {
                const block = document.createElement('div');
                block.className = 'btn btn-secondary me-2 my-2';
                block.textContent = keyword;
                setKeyNumb(maxKeys - keywords.length + 1);
                containerElement.appendChild(block);
                if (containerElement.children.length > maxKeys) {
                    containerElement.children[maxKeys].remove();
                }
            }
        });
    }

    function keyChange(event) {
        if (event.nativeEvent.data === null) {
            // Hide warning message if the user removes a keyword
            setKeyValue(event.target.value);
            document.getElementById('keywords-warning').style.display = 'none';
        } else if (keyValue.split(',').length <= maxKeys) {
            setKeyValue(event.target.value);
        } else {
            // Show warning message if the user tries to add more keywords
            document.getElementById('keywords-warning').style.display = 'block';
        }
    }

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
                <div className="row mb-3">
                    <label htmlFor="input-keywords" className="col-sm-2 col-form-label fw-bold text-white">Keywords</label>
                    <div className="col-sm-8">
                        <input type="text" name="journal-keywords" className="form-control" value={keyValue} onInput={handleInput} onChange={keyChange}
                            spellCheck="false" placeholder="Add a comma after each keywords..." required id="input-keywords"/>
                        {/* Show when reached the max keywords */}
                        <p id="keywords-warning">Maximum keywords reached!</p>
                        {/* Contains the keywords */}
                        <div id="keywordContainer"></div>
                    </div>
                    <div className="key-counts col-sm-2 fw-bold mt-2 text-white">
                        <span>{keyNumb}</span>&nbsp;remaining.
                    </div>
                </div>
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
                <div className="row mb-3">
                    <label htmlFor="input-authors" className="col-sm-2 col-form-label fw-bold text-white">Author&#40;s&#41;</label>
                    <div className="col-sm-10">
                        <table className="table table-bordered">
                            <thead className='align-middle'>
                                <tr className="text-center">
                                    <th scope="col">List No.</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email Id</th>
                                    <th scope="col">Address</th>
                                    <th scope="col"><button type="button" className="btn btn-warning fw-bold" onClick={addAuthorRow}
                                    >+</button></th>
                                </tr>
                            </thead>
                            <tbody id="author-body">
                                <tr>
                                    <th scope="row" className="text-center">1</th>
                                    <td><input type="text" name="author-fname" id="input-fname" className="form-control" /></td>
                                    <td><input type="text" name="author-lame" id="input-lname" className="form-control" /></td>
                                    <td><input type="email" name="author-email" id="input-email" className="form-control" /></td>
                                    <td><input type="text" name="author-address" id="input-address" className="form-control" />
                                    </td>
                                    <td className="text-center"><button type="button"
                                        className="btn btn-danger fw-bold remove-author-row" disabled>-</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Submit button */}
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-warning pe-5 ps-5 fw-bold">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default JournalSubmissionForm;