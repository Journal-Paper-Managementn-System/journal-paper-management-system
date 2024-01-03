import React, { useState } from 'react';

const AuthorRow = () => {
    const [authors, setAuthors] = useState([{ firstName: '', lastName: '', email: '', address: '', firstAuthor: false, secondAuthor: false, correspondingAuthor: false }]);

    const addAuthorRow = () => {
        setAuthors([...authors, { firstName: '', lastName: '', email: '', address: '', firstAuthor: false, secondAuthor: false, correspondingAuthor: false }]);
    };

    const removeAuthorRow = (index) => {
        const newAuthors = [...authors];
        newAuthors.splice(index, 1);
        setAuthors(newAuthors);
    };

    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        const newAuthors = [...authors];
        newAuthors[index][name] = value;
        setAuthors(newAuthors);
    };

    const handleCheckboxChange = (event, index) => {
        const { name, checked } = event.target;
        const newAuthors = [...authors];
        newAuthors[index][name] = checked;
        setAuthors(newAuthors);
    };

    return (
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
                            <th scope="col">Affiliation</th>
                            <th scope="col">First Author</th>
                            <th scope="col">Second Author</th>
                            <th scope="col">Coresponding Author</th>
                            <th scope="col"><button type="button" className="btn btn-warning fw-bold" onClick={addAuthorRow}>+</button></th>
                        </tr>
                    </thead>
                    <tbody id="author-body">
                        {authors.map((author, index) => (
                            <tr key={index} className='align-middle text-center'>
                                <th scope="row">{index + 1}</th>
                                <td><input type="text" name="firstName" value={author.firstName} onChange={(e) => handleInputChange(e, index)} className="form-control" /></td>
                                <td><input type="text" name="lastName" value={author.lastName} onChange={(e) => handleInputChange(e, index)} className="form-control" /></td>
                                <td><input type="email" name="email" value={author.email} onChange={(e) => handleInputChange(e, index)} className="form-control" /></td>
                                <td><input type="text" name="address" value={author.address} onChange={(e) => handleInputChange(e, index)} className="form-control" /></td>
                                <td><input type="checkbox" name="firstAuthor" checked={author.firstAuthor} onChange={(e) => handleCheckboxChange(e, index)} /></td>
                                <td><input type="checkbox" name="secondAuthor" checked={author.secondAuthor} onChange={(e) => handleCheckboxChange(e, index)} /></td>
                                <td><input type="checkbox" name="correspondingAuthor" checked={author.correspondingAuthor} onChange={(e) => handleCheckboxChange(e, index)} /></td>
                                <td className="text-center"><button type="button" className="btn btn-danger fw-bold" onClick={() => removeAuthorRow(index)} disabled={authors.length === 1}>-</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AuthorRow;