import React, { useState } from 'react';
import Web3 from 'web3';

const WalletInfo = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getBalance = async () => {
    try {
      const web3 = new Web3(process.env.REACT_APP_INFURA_PROJECT_ID);
      const weiBalance = await web3.eth.getBalance(walletAddress);
      const ethBalance = web3.utils.fromWei(weiBalance, 'ether');
      setBalance(ethBalance);
    } catch (error) {
      setErrorMessage('An error occurred while fetching the balance.');
    }
  };

  return (
    <div className="wallet-info-wrapper">
      <input
        className="input"
        type="text"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        placeholder="Enter wallet address"
      />
      <button className="button" onClick={getBalance}>
        Get Balance
      </button>
      {balance && <label>Balance: {balance} ETH</label>}
      {errorMessage && <label>{errorMessage}</label>}
    </div>
  );
};

export default WalletInfo;
