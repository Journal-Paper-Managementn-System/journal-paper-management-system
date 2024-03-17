import Reviewer from '../../services/reviewerService';
import { toast } from 'react-toastify';
import { useAuth } from '../../store/AuthContext';
import { useEffect, useState } from 'react';

function AddReviewer() {
    const { token } = useAuth();
    const [reviewerList, setReviewerList] = useState([{}]);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const responseData = await Reviewer.addReviewer({
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            affiliation: e.target.affiliation.value
        }, token);
        if (responseData.success) {
            toast.success(responseData.message);
            getReviewerList();
        } else {
            toast.error(responseData.message);
        }
        e.target.reset();
    }

    const getReviewerList = async () => {
        const responseData = await Reviewer.getReviewerList(token);
        if (responseData.success) {
            setReviewerList(responseData.data);
        } else {
            toast.error(responseData.message);
        }
    }

    useEffect(() => {
        getReviewerList();
    }, []);

    return (
        <>
            <h2 className="text-center fw-bold">Add Reviewer</h2>
            <hr />
            <form className='border p-3' onSubmit={handleOnSubmit}>
                <table className="table table-bordered text-center table-responsive">
                    <thead>
                        <tr>
                            <th><label htmlFor="first-name">First Name</label></th>
                            <th><label htmlFor="last-name">Last Name</label></th>
                            <th><label htmlFor="email">Email</label></th>
                            <th><label htmlFor="affiliation">Affiliation</label></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name='firstName'
                                    id='first-name'
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name='lastName'
                                    id='last-name'
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="email"
                                    className="form-control"
                                    name='email'
                                    id='email'
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name='affiliation'
                                    id='affiliation'
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary px-5 fw-bold">Add Reviewer</button>
                </div>
            </form>
            <div className="row mt-5 mx-3 border p-3 rounded-2">
                <label htmlFor="reviewer-file" className='col-md-2 col-form-label fs-5 fw-bold'>Upload CSV File</label>
                <div className="col-md-8 d-flex align-items-center">
                    <input type="file" accept='.csv' id='reviewer-file' className='form-control' />
                </div>
                <button className="btn btn-primary col-md-2 px-5 fw-bold">Add Reviewer</button>
            </div>
            <h2 className="text-center mt-4 fw-bold">List of Reviewers</h2>
            <hr />
            <table className='table table-bordered text-center table-responsive'>
                <thead className='table-dark'>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Affiliation</th>
                    </tr>
                </thead>
                <tbody>
                    {reviewerList.map((reviewer, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{reviewer.firstName}</td>
                            <td>{reviewer.lastName}</td>
                            <td>{reviewer.email}</td>
                            <td>{reviewer.affiliation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default AddReviewer;