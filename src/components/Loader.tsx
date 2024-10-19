import React from 'react';
import '@/styles/Loader.scss';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader" aria-label="Loading" role="progressbar"></div>
        </div>
    );
};

export default Loader;