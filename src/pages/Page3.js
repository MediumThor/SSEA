import React from 'react';
import { useWallet } from '../WalletContext';

const Page3 = () => {
    const { account } = useWallet();

    return (
        <div>
            <h1>Page 3</h1>

        </div>
    );
};

export default Page3;