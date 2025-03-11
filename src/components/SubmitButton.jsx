// SubmitButton.jsx
import React from 'react';

const SubmitButton = ({ label, className }) => {
    return (
        <button type="submit" className={className}>
            {label}
        </button>
    );
};

export default SubmitButton;