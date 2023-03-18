import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';


const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const _provider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(_provider);

                const signer = _provider.getSigner();
                const _account = await signer.getAddress();
                setAccount(_account);
            }
        };

        if (account === null) {
            init();
        }
    }, [account]);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const _provider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(_provider);

                const signer = _provider.getSigner();
                const _account = await signer.getAddress();
                setAccount(_account);
            } catch (error) {
                console.error('Failed to connect wallet:', error);
            }
        } else {
            console.error('Ethereum is not detected in your browser');
        }
    };

    return (
        <WalletContext.Provider value={{ provider, account, connectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);
