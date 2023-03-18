import React, { useState } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';

const WalletConnectButton = () => {
    const [account, setAccount] = useState('');

    const connectWallet = async () => {
        const provider = new WalletConnectProvider({
            rpc: {
                43114: process.env.REACT_APP_AVAX_RPC_URL, // AVAX Mainnet
                43113: process.env.REACT_APP_FUJI_RPC_URL, // AVAX Fuji Testnet
            },
        });

        await provider.enable();

        const web3Provider = new JsonRpcProvider.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        const signerAddress = await signer.getAddress();

        setAccount(signerAddress);
    };

    return (
        <div>

            {account ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <p>Please connect your wallet</p>
            )}

            {account && <p>Connected: {account}</p>}
        </div>
    );
};

export default WalletConnectButton;