import React from 'react';
import '@/styles/pagination/PerPageSelector.scss'

const PerPageSelector = ({ options, value, onChange }) => {
    return (
        <div className="per-page-selector">
            {options.map(option => (
                <button
                    key={option}
                    className={`option-button ${value === option ? 'selected' : ''}`}
                    onClick={() => onChange(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default PerPageSelector;