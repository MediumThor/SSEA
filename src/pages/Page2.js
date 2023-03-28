import React from 'react';
import StyledDiv from '../components/StyledDiv';
import './css/Page2.css';
import styled from 'styled-components';


const Page2 = () => {
    return (
        <>
            <TitleBox className="title-container">
                <h1>Welcome to Page 2</h1>
            </TitleBox>
            <StyledDiv>
                {/* Add your content here */}
            </StyledDiv>
        </>
    );
};

export default Page2;

const TitleBox = styled.div`
{
    margin-top: 120px;
  }
`;