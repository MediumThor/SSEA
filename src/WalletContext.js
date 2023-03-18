import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);
    const [nativeTokenBalance, setNativeTokenBalance] = useState(0);

    useEffect(() => {
        const init = async () => {
            if (window.ethereum && localStorage.getItem('walletDisconnected') !== 'true') {
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

    const disconnectWallet = () => {
        setAccount(null);
        setProvider(null);
        localStorage.setItem('walletDisconnected', 'true');
    };

    const getNativeTokenBalance = async () => {
        if (provider && account) {
            const balance = await provider.getBalance(account);
            setNativeTokenBalance(balance);
        }
    };

    useEffect(() => {
        if (account) {
            getNativeTokenBalance();
        }
    }, [provider, account]);

    return (
        <WalletContext.Provider
            value={{
                provider,
                account,
                nativeTokenBalance,
                connectWallet,
                disconnectWallet,
                getNativeTokenBalance,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);
