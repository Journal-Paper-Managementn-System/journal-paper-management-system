import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
            <RotatingLines color="#000" />
        </div>
    )
}

export default Loading;