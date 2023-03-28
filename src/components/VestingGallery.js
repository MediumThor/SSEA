import React, { useState, useEffect } from 'react';
import { useWallet } from '../WalletContext';
import { ethers } from 'ethers';
import ProjectLumberjackJSON from '../abis/ProjectLumberjack.json';
import Carousel from 'react-bootstrap/Carousel';
import "./VestingGallery.css"
import styled from 'styled-components';

const VestingGallery = () => {
    const { provider, account } = useWallet();
    const [contract, setContract] = useState(null);
    const [ownedTokens, setOwnedTokens] = useState([]);
    const [selectedTokenId, setSelectedTokenId] = useState(null);
    const [vestedTokens, setVestedTokens] = useState({});

    const contractAddress = '0x6D0bBe712147AC2475Efa6c691Bb31028e9f9D6B';

    useEffect(() => {
        if (provider) {
            const newContract = new ethers.Contract(
                contractAddress,
                ProjectLumberjackJSON.abi,
                provider
            );
            setContract(newContract);
        }
    }, [provider]);

    useEffect(() => {
        const fetchTokens = async () => {
            if (contract && account) {
                const balance = await contract.balanceOf(account);
                const tokens = [];
                const vested = {};

                for (let i = 0; i < balance; i++) {
                    const tokenId = await contract.tokenOfOwnerByIndex(account, i);
                    const tokenStr = tokenId.toString();
                    tokens.push(tokenStr);

                    const totalVested = await contract.vestedAmount(tokenId);
                    vested[tokenStr] = totalVested.toString();
                }

                setOwnedTokens(tokens);
                setVestedTokens(vested);
                setSelectedTokenId(tokens[0]);
            }
        };

        fetchTokens();
    }, [contract, account]);

    useEffect(() => {
        const updateVestedTokens = async () => {
            if (contract && account) {
                const newVested = {};

                for (const tokenId of ownedTokens) {
                    const totalVested = await contract.vestedAmount(tokenId);
                    newVested[tokenId] = totalVested.toString();
                }

                setVestedTokens(newVested);
            }
        };

        const handleTokensClaimed = () => {
            updateVestedTokens();
        };

        window.addEventListener('tokensClaimed', handleTokensClaimed);

        return () => {
            window.removeEventListener('tokensClaimed', handleTokensClaimed);
        };
    }, [contract, account, ownedTokens]);


    useEffect(() => {
        if (contract && account) {
            const onTransfer = async (from, to, tokenId) => {
                if (to === account) {
                    const tokenStr = tokenId.toString();
                    const totalVested = await contract.vestedAmount(tokenId);
                    setVestedTokens((prevState) => ({
                        ...prevState,
                        [tokenStr]: totalVested.toString(),
                    }));
                    setOwnedTokens((prevState) => [...prevState, tokenStr]);
                }
            };

            contract.on('Transfer', onTransfer);

            return () => {
                contract.off('Transfer', onTransfer);
            };
        }
    }, [contract, account]);

    const renderTokenImages = () => {
        return ownedTokens.map((tokenId, index) => (
            <Carousel.Item key={index} onClick={() => setSelectedTokenId(tokenId)}>
                <img

                    className="d-block w-100"
                    src={`https://bonsaiavax.mypinata.cloud/ipfs/QmUfkNeWSVyBCEHgzXat9YjbWYBMbw4G63qxGJkpbogBnC/${tokenId}.png`} // Replace with the correct image URL based on tokenId
                    alt={`Token #${tokenId}`}
                />
                <Carousel.Caption>
                    {selectedTokenId && (
                        <>
                            <div>Total vested tokens: {vestedTokens[selectedTokenId]}</div>
                        </>
                    )}
                    <p>Token ID: {tokenId}</p>
                </Carousel.Caption>
            </Carousel.Item>
        ));
    };

    return (


        <div>

            <Carousel height={200} indicators={false}>{renderTokenImages()}</Carousel>
        </div>
    );
};

export default VestingGallery;



