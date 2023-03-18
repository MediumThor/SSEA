import { Link } from 'react-router-dom';
import { useWallet } from './WalletContext';
import './Navbar.css';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [nativeTokenBalance, setNativeTokenBalance] = useState(null);
    const {
        account,
        connectWallet,
        disconnectWallet,
        getNativeTokenBalance,
    } = useWallet();

    useEffect(() => {
        const fetchBalance = async () => {
            if (account) {
                const balance = await getNativeTokenBalance(account);
                setNativeTokenBalance(balance);
            } else {
                setNativeTokenBalance(null);
            }
        };

        fetchBalance();
    }, [account, getNativeTokenBalance]);

    const handleConnectWallet = async () => {
        try {
            await connectWallet();
            console.log('Connected account:', account);
            localStorage.removeItem('walletDisconnected');
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDisconnectWallet = () => {
        disconnectWallet();
        window.location.reload();
        alert(
            'Please disconnect your wallet from the site using the MetaMask interface to terminate the connection.'
        );
    };

    const shortenAddress = (address) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <div className="navbar">
            <ul></ul>
            <div className="account-info">
                {account ? (
                    <>
                        {nativeTokenBalance && (
                            <div className="balance-display">
                                Native Token Balance: {nativeTokenBalance}
                            </div>
                        )}
                        <Account className="shortened-account"><a>{shortenAddress(account)}</a></Account>
                        <WalletButton className="wallet-button" onClick={handleDisconnectWallet}>
                            Disconnect Wallet
                        </WalletButton>
                    </>
                ) : (
                    <WalletButton className="wallet-button" onClick={handleConnectWallet}>
                        Connect Wallet
                    </WalletButton>
                )}
            </div>
        </div>
    );
};

export default Navbar;

const WalletButton = styled.button`
  &.wallet-button {
    background-color: #fff;
    color: #000;
    border: none;
    border-radius: 0;
    padding: 10px 20px;
    font-size: 16px;
    font-family: 'Orbitron';
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.9);
    transition: box-shadow 0.3s ease, background-color 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
      box-shadow: 0 6px 8px rgba(0, 0, 0, 1);
    }
  }
`;

const Account = styled.div`
{
    font-family: 'Orbitron';

  }
`;