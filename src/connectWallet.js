import detectEthereumProvider from '@metamask/detect-provider';

export async function connectWallet() {
    const provider = await detectEthereumProvider();

    if (provider) {
        try {
            // Request account access
            const accounts = await provider.request({ method: 'eth_requestAccounts' });

            // Get the connected account
            const account = accounts[0];

            return { success: true, account };
        } catch (error) {
            console.error('User denied account access');
            return { success: false, error: 'User denied account access' };
        }
    } else {
        console.error('No Ethereum browser extension detected');
        return { success: false, error: 'No Ethereum browser extension detected' };
    }
}
