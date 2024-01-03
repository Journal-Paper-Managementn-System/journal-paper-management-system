import React from 'react';

const AuthorHeader = () => {
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
                            <th scope="col"><button type="button" className="btn btn-warning fw-bold" onClick={props.addAuthorRow}
                            >+</button></th>
                        </tr>
                    </thead>
                    <tbody id="author-body">
                        <AuthorRow disabled={true} />
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default AuthorHeader;