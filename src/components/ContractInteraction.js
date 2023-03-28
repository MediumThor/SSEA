import React, { useState, useEffect } from 'react';
import { useWallet } from '../WalletContext';
import { ethers } from 'ethers';
import ArcJSON from '../abis/arcanum-core/ArcanumERC20.sol/ArcanumERC20.json';

const ContractInteraction = () => {
    const { provider } = useWallet();
    const [contract, setContract] = useState(null);
    const [decimals, setDecimals] = useState(null);
    const [name, setName] = useState(null);
    const [totalSupply, setTotalSupply] = useState(null);

    const contractAddress = '0xfe89A92A4093eA17083514ea9CE685fEDB00a90F';

    useEffect(() => {
        if (provider) {
            const newContract = new ethers.Contract(contractAddress, ArcJSON.abi, provider);
            setContract(newContract);
        }
    }, [provider]);

    useEffect(() => {
        const fetchData = async () => {
            if (contract) {
                const decimalsResult = await contract.decimals();
                setDecimals(decimalsResult.toString());

                const nameResult = await contract.name();
                setName(nameResult);

                const totalSupplyResult = await contract.totalSupply();
                setTotalSupply(totalSupplyResult.toString());
            }
        };

        fetchData();
    }, [contract]);

    return (
        <div>
            {name && <div>Name: {name}</div>}
            {decimals && <div>Decimals: {decimals}</div>}
            {totalSupply && <div>Total Supply: {totalSupply}</div>}
        </div>
    );
};

export default ContractInteraction;
