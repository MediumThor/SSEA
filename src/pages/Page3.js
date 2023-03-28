import React from 'react';
import StyledDivVesting from '../components/StyledDivVesting';
import './css/Page3.css';
import styled from 'styled-components';
import VestingInteraction from '../components/VestingInteraction';
import VestingGallery from '../components/VestingGallery';


const Page3 = () => {
    return (
        <>
            <TitleBox className="title-container">
                <h1>Project Lumberjack</h1>
            </TitleBox>
            <StyledDivVesting>

                <VestingBox>
                    <VestingGallery />
                </VestingBox>
                <VestingInteraction />


                {/* Add your content here */}
            </StyledDivVesting>
        </>
    );
};

export default Page3;

const TitleBox = styled.div`
{
    margin-top: 120px;
  }
`;

const VestingBox = styled.div`
{
    display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  
    justify-content: center;
  }
`;