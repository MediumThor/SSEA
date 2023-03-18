import React from 'react';
import { useWallet } from '../WalletContext';

const Page2 = () => {
    const { account } = useWallet();

    return (
        <div>
            <h1>Page 2</h1>

        </div>
    );
};

export default Page2;