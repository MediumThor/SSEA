import React from 'react';
import ReactDOM from 'react-dom';
import { WalletProvider } from './WalletContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
