import React from 'react';
import StyledDiv from '../components/StyledDiv';
import './css/Page1.css';
import styled from 'styled-components';
import ArcanaChef from '../components/ArcanaChef';

const Page1 = () => {
    return (
        <div className="page-container">

            <TitleBox className="title-container">
                <h1>ArcanaChef Dashboard</h1>
            </TitleBox>
            <StyledDiv>
                <ArcanaChef />
                {/* Add your content here */}
            </StyledDiv>
        </div>
    );
};

export default Page1;


const TitleBox = styled.div`
{
    margin-top: 120px;
  }
`;
