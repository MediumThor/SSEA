import React from 'react';
import ContractInteraction from './';
import ArcanaChefJSON from '../abis/staking-positions/ArcanaChef.sol/ArcanaChef.json';

const ExampleComponent = () => {

    //ArcanaChef
    const contractAddress = '0x35E88decB505eA2e45E978D7Ee2abEd9Be254348';

    return (
        <ContractInteraction contractAddress={contractAddress} contractABI={ArcanaChefJSON.abi} />
    );
};

export default ExampleComponent;