import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from './WalletContext';
import './Navbar.css';

const Navbar = () => {
    const { account, connectWallet, disconnectWallet } = useWallet();

    // ...

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

    // ...


    const handleDisconnectWallet = () => {
        disconnectWallet();
        window.location.reload();
        alert('Please disconnect your wallet from the site using the MetaMask interface to terminate the connection.');
    };

    return (
        <div className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/page1">Page 1</Link>
                </li>
                <li>
                    <Link to="/page2">Page 2</Link>
                </li>
                <li>
                    <Link to="/page3">Page 3</Link>
                </li>
            </ul>
            <div>
                {account ? (
                    <>
                        <span>Connected: {account}</span>
                        <button onClick={handleDisconnectWallet}>Disconnect Wallet</button>
                    </>
                ) : (
                    <button onClick={handleConnectWallet}>Connect Wallet</button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
