import React, { useEffect } from 'react'

function ErrorElement() {
    useEffect(() => {
        // Reload the page
        window.location.reload();
    }, []);

    return (
        <div>
            <h3 className='fw-bold text-center'>Something went wrong. Reloading...</h3>
        </div>
    )
}

export default ErrorElement;