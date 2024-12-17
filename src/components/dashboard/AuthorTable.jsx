import React from 'react';

const AuthorRow = ({ authors, setAuthors }) => {

    // Function to add a new author row
    const addAuthorRow = () => {
        setAuthors([...authors, { firstName: '', lastName: '', email: '', affiliation: '', correspondingAuthor: false, firstAuthor: false, otherAuthor: false }]);
    };

    // Function to remove an author row
    const removeAuthorRow = (index) => {
        const newAuthors = [...authors];
        newAuthors.splice(index, 1);
        setAuthors(newAuthors);
    };

    // Function to handle input changes in the author row
    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        const newAuthors = [...authors];
        newAuthors[index][name] = value;
        setAuthors(newAuthors);
    };

    // Function to handle checkbox changes in the author row
    const handleCheckboxChange = (event, index) => {
        const { name, checked } = event.target;
        const newAuthors = [...authors];
        newAuthors[index][name] = checked;
        setAuthors(newAuthors);
    };

    return (
        <div className="row mb-3">
            <label htmlFor="input-authors" className="col-sm-2 col-form-label">Author{"(s)"} <span className="required-field">*</span></label>
            <div className="col-sm-10 table-responsive">
                <table className="table table-bordered">
                    <thead className='align-middle'>
                        <tr className="text-center">
                            <th scope="col">List No.</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email Id</th>
                            <th scope="col">Affiliation</th>
                            <th scope="col">Corresponding Author</th>
                            <th scope="col">First Author</th>
                            <th scope="col">Other Author</th>
                            <th scope="col"><button type="button" className="btn btn-primary fw-bold px-3" onClick={addAuthorRow}>+</button></th>
                        </tr>
                    </thead>
                    <tbody id="author-body">
                        {authors.map((author, index) => (
                            <tr key={index} className='align-middle text-center'>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder='First Name'
                                        style={{ width: "10rem" }}
                                        value={author.firstName}
                                        onChange={(e) => handleInputChange(e, index)} className="form-control"
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder='Last Name'
                                        style={{ width: "10rem" }}
                                        value={author.lastName}
                                        onChange={(e) => handleInputChange(e, index)} className="form-control"
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder='Email Id'
                                        style={{ width: "15rem" }}
                                        value={author.email}
                                        onChange={(e) => handleInputChange(e, index)} className="form-control"
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="affiliation"
                                        placeholder='Affiliation'
                                        style={{ width: "10rem" }}
                                        value={author.affiliation}
                                        onChange={(e) => handleInputChange(e, index)} className="form-control"
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        name="correspondingAuthor"
                                        checked={author.correspondingAuthor}
                                        onChange={(e) => handleCheckboxChange(e, index)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        name="firstAuthor"
                                        checked={author.firstAuthor}
                                        onChange={(e) => handleCheckboxChange(e, index)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        name="otherAuthor"
                                        checked={author.otherAuthor}
                                        onChange={(e) => handleCheckboxChange(e, index)}
                                    />
                                </td>

                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-danger fw-bold px-3"
                                        onClick={() => removeAuthorRow(index)}
                                        disabled={authors.length === 1}
                                    >
                                        -
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AuthorRow;