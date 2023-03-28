import React from 'react';
import StyledDiv from '../components/StyledDiv';
import './css/HomePage.css';
import styled from 'styled-components';
import ContractInteraction from '../components/ContractInteraction';


const HomePage = () => {
    return (
        <>
            <TitleBox className="title-container">
                <h1>Welcome to the Home Page</h1>
            </TitleBox>
            <StyledDiv>
                <ContractInteraction />
                {/* Add your content here */}
            </StyledDiv>
        </>
    );
};

export default HomePage;

const TitleBox = styled.div`
{
    margin-top: 120px;
  }
`;
