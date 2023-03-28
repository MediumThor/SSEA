import React, { useState, useEffect } from 'react';
import { useWallet } from '../WalletContext';
import { ethers } from 'ethers';
import ArcanaChefJSON from '../abis/staking-positions/ArcanaChef.sol/ArcanaChef.json';

const ArcanaChef = () => {
    const { provider } = useWallet();
    const [contract, setContract] = useState(null);
    const [decimals, setDecimals] = useState(null);
    const [name, setName] = useState(null);
    const [totalSupply, setTotalSupply] = useState(null);

    const contractAddress = '0x35E88decB505eA2e45E978D7Ee2abEd9Be254348';

    useEffect(() => {
        if (provider) {
            const newContract = new ethers.Contract(contractAddress, ArcanaChefJSON.abi, provider);
            setContract(newContract);
        }
    }, [provider]);

    useEffect(() => {
        const fetchData = async () => {
            if (contract) {
                const decimalsResult = await contract.rewardsToken();
                setDecimals(decimalsResult.toString());

                const nameResult = await contract.totalWeight();
                setName(nameResult);

                const totalSupplyResult = await contract.totalRewardAdded();
                setTotalSupply(totalSupplyResult.toString());
            }
        };

        fetchData();
    }, [contract]);

    return (
        <div>
            {name && <div> totalWeight: {name}</div>}
            {decimals && <div> rewardsToken: {decimals}</div>}
            {totalSupply && <div> totalRewardAdded: {totalSupply}</div>}
        </div>
    );
};

export default ArcanaChef;
