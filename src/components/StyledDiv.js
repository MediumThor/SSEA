import React from 'react';
import './StyledDiv.css';

const StyledDiv = ({ children }) => {
    return <div className="styled-div">{children}</div>;
};

export default StyledDiv;