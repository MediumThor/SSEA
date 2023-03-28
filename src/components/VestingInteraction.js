import React, { useState, useEffect } from 'react';
import { useWallet } from '../WalletContext';
import { ethers } from 'ethers';
import ProjectLumberjackJSON from '../abis/ProjectLumberjack.json';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const VestingInteraction = () => {
    const { provider, account } = useWallet();
    const [contract, setContract] = useState(null);
    const [userTokenCount, setUserTokenCount] = useState(null);
    const [mintCount, setMintCount] = useState(1);
    const [totalMinted, setTotalMinted] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const contractAddress = '0x6D0bBe712147AC2475Efa6c691Bb31028e9f9D6B';
    const MINT_PRICE = 1; // 1 AVAX

    const [isOwner, setIsOwner] = useState(false);
    const [newBaseTokenURI, setNewBaseTokenURI] = useState('');
    const [claimableTokens, setClaimableTokens] = useState(null);

    useEffect(() => {
        console.log('contract:', contract);
        console.log('account:', account);


        const fetchClaimableTokens = async () => {
            if (contract && account) {
                const balance = await contract.balanceOf(account);
                let totalClaimable = ethers.BigNumber.from(0);

                for (let i = 0; i < balance; i++) {
                    const tokenId = await contract.tokenOfOwnerByIndex(account, i);
                    const claimableAmount = await contract.claimablePayout(tokenId);
                    totalClaimable = totalClaimable.add(claimableAmount);
                }

                setClaimableTokens(totalClaimable);
            }
        };

        fetchClaimableTokens();
    }, [contract, account]);


    const updateClaimableTokens = async () => {
        if (contract && account) {
            const balance = await contract.balanceOf(account);
            let totalClaimable = 0;

            for (let i = 0; i < balance; i++) {
                const tokenId = await contract.tokenOfOwnerByIndex(account, i);
                const claimableAmount = await contract.claimablePayout(tokenId);
                totalClaimable += claimableAmount.toNumber();
            }

            setClaimableTokens(totalClaimable);
        }
    };

    const handleClaim = async () => {
        if (contract && account) {
            const signer = provider.getSigner();
            const contractWithSigner = contract.connect(signer);

            try {
                const tx = await contractWithSigner.claimAll();
                // Wait for the transaction to be confirmed
                await provider.waitForTransaction(tx.hash);
                // Update claimable tokens after claiming and transaction confirmation
                updateClaimableTokens();
                // Show an alert with the transaction hash instead of the modal
                alert(`Tokens claimed successfully! Transaction hash: ${tx.hash}`);
            } catch (error) {
                console.error('Error claiming tokens:', error);
            }
            window.dispatchEvent(new Event('tokensClaimed'));

        }
    };

    useEffect(() => {
        updateClaimableTokens();
    }, [contract, account]);

    useEffect(() => {
        const checkOwnership = async () => {
            if (contract && account) {
                const owner = await contract.owner();
                setIsOwner(account === owner);
            }
        };

        checkOwnership();
    }, [contract, account]);

    const updateBaseTokenURI = async () => {
        if (contract && account && isOwner) {
            const signer = provider.getSigner();
            const contractWithSigner = contract.connect(signer);

            await contractWithSigner.setBaseTokenURI(newBaseTokenURI);
        }
    };

    useEffect(() => {
        if (provider) {
            const newContract = new ethers.Contract(contractAddress, ProjectLumberjackJSON.abi, provider);
            setContract(newContract);
        }
    }, [provider]);

    useEffect(() => {
        const fetchTokenCount = async () => {
            if (contract && account) {
                const tokenCountResult = await contract.balanceOf(account);
                setUserTokenCount(tokenCountResult.toString());
            }
        };

        const fetchTotalMinted = async () => {
            if (contract) {
                const totalMintedResult = await contract.totalSupply();
                setTotalMinted(totalMintedResult.toString());
            }
        };

        fetchTokenCount();
        fetchTotalMinted();
    }, [contract, account]);

    const handleMint = async () => {
        if (contract && account) {
            const signer = provider.getSigner();
            const contractWithSigner = contract.connect(signer);

            const totalAmount = ethers.utils.parseEther((MINT_PRICE * mintCount).toString());

            await contractWithSigner.mint(mintCount, { value: totalAmount });
            setShowModal(true);
            setUserTokenCount((prev) => prev + mintCount);
            setTotalMinted((prev) => prev + mintCount);
        }
    };

    const increaseMintCount = () => {
        if (mintCount < 10) setMintCount(mintCount + 1);
    };

    const decreaseMintCount = () => {
        if (mintCount > 1) setMintCount(mintCount - 1);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {userTokenCount && <div>Number of Tokens: {userTokenCount}</div>}
            <div>Total Minted: {totalMinted} / 1000</div>
            <div>
                <button onClick={decreaseMintCount}>-</button>
                <span>{mintCount}</span>               <button onClick={increaseMintCount}>+</button>
            </div>
            <button onClick={handleMint}>Mint {mintCount} Token(s)</button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Token Minted</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You have successfully minted {mintCount} token(s)!
                    Please wait to view.
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleCloseModal}>Close</button>
                </Modal.Footer>
            </Modal>
            {isOwner && (
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <h3>Update Image URL (Owner only)</h3>
                    <input
                        type="text"
                        value={newBaseTokenURI}
                        onChange={(e) => setNewBaseTokenURI(e.target.value)}
                        placeholder="New image URL"
                    />
                    <button onClick={updateBaseTokenURI}>Update URL</button>
                </div>
            )}
            {claimableTokens !== null && (
                <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <div>Claimable tokens: {parseFloat(ethers.utils.formatEther(claimableTokens)).toFixed(9)}</div>
                    <button onClick={handleClaim}>Claim tokens</button>
                </div>
            )}
        </div>
    );
};

export default VestingInteraction;


