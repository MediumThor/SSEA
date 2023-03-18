import React from 'react';
import { useWallet } from '../WalletContext';

const Page3 = () => {
    const { account } = useWallet();

    return (
        <div>
            <h1>Page 3</h1>
            {account ? (
                <p>Connected account: {account}</p>
            ) : (
                <p>Please connect your wallet</p>
            )}
        </div>
    );
};

export default Page3;