import React, { useState } from 'react'

const KeyWords = ({ keywords, setKeywords }) => {
    const maxKeys = 6;
    const [keyNumb, setKeyNumb] = useState(maxKeys);
    const [keyValue, setKeyValue] = useState('');
    const [showWarning, setShowWarning] = useState(false);

    const keyChange = (event) => {
        const newKeywords = event.target.value.split(',').filter(keyword => keyword.trim() !== '');
        if (newKeywords.length <= maxKeys || event.nativeEvent.data === null) {
            setKeyValue(event.target.value);
            setKeywords(newKeywords.slice(0, maxKeys));
            setKeyNumb(maxKeys - newKeywords.length);
            // Hide warning message if the user removes a keyword
            setShowWarning(false);
        } else {
            // Show warning message if the user tries to add more keywords
            setShowWarning(true);
        }
    }

    return (
        <div className="row mb-3">
            <label htmlFor="input-keywords" className="col-sm-2 col-form-label fw-bold fs-5">Keywords</label>
            <div className="col-sm-8">
                <input type="text" name="journal-keywords" className="form-control" value={keyValue} onChange={keyChange}
                    spellCheck="false" placeholder="Add a comma after each keywords..." required id="input-keywords" />
                {/* Show when reached the max keywords */}
                {showWarning && <p className='text-danger'>Maximum keywords reached!</p>}
                {/* Contains the keywords */}
                <div>
                    {keywords.map((keyword, index) => (
                        <div key={index} className='btn btn-secondary me-2 my-2'>
                            {keyword}
                        </div>
                    ))}
                </div>
            </div>
            <div className="key-counts col-sm-2 fw-bold mt-2">
                <span>{keyNumb}</span>&nbsp;remaining.
            </div>
        </div>
    )
}

export default KeyWords;