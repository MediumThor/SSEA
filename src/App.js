import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import WalletConnectButton from './WalletConnectButton';
import { connectWallet } from './connectWallet';
import { useWallet } from './WalletContext';
import Navbar from './pages/NavBar';

function App() {

  const { account, setAccount } = useWallet();


  const handleConnectWallet = async () => {
    const result = await connectWallet();
    if (result.success) {
      console.log('Connected account:', result.account);
    } else {
      console.error('Error:', result.error);
    }
  };


  return (

    <Router>
      {account ? (


        <nav>
          <ul>
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
        </nav>



      ) : (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      )}




      <Routes>

        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
      </Routes>
    </Router>

  );
}

export default App;
