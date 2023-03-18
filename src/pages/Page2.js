import React from 'react';
import { useWallet } from '../WalletContext';

const Page2 = () => {
    const { account } = useWallet();

    return (
        <div>
            <h1>Page 2</h1>
            {account ? (
                <p>Connected account: {account}</p>
            ) : (
                <p>Please connect your wallet</p>
            )}
        </div>
    );
};

export default Page2;