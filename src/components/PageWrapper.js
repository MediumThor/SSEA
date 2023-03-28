import React from 'react';
import './PageWrapper.css';

const StyledDiv = ({ children }) => {
    return <div className="styled-wrapper">{children}</div>;
};

export default StyledDiv;