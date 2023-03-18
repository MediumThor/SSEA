import React from 'react';
import { useWallet } from '../WalletContext';

const Page1 = () => {
    const { account } = useWallet();

    return (
        <div>
            <h1>Page 1</h1>
            {account ? (
                <p>Connected account: {account}</p>
            ) : (
                <p>Please connect your wallet</p>
            )}
        </div>
    );
};

export default Page1;