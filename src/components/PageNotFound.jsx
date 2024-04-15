import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div style={{ height: "100vh" }} className='d-flex align-items-center justify-content-center flex-wrap'>
            <div class="text-center px-4">
                <h1 class="fw-bold">404 - Page Not Found</h1>
                <p class="fs-5">
                    The page you are looking for might have been removed, had its name changed or is temporarily unavailable.
                </p>
                <Link href="/" class="btn btn-primary">Back to Homepage</Link>
            </div>
        </div>
    )
}

export default PageNotFound;