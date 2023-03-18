import React from 'react';
import { useWallet } from '../WalletContext';

const Page1 = () => {
    const { account } = useWallet();

    return (
        <div>
            <h1>Page 1</h1>

        </div>
    );
};

export default Page1;