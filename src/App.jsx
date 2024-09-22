import React, { useState, useEffect } from 'react';
import './App.css';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkNetwork } from './utils/checkNetwork';
import { toastObj } from './utils/toastObj';
import FlipperContract from './contracts/Counter.json';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import BlockchainSection from './components/BlockchainSection';
import Design from './components/Design';
import Login from './components/Logins';
import Transaction from './components/Transaction';
import SignUps from './components/SignUps';
import Kyc from './components/KYC';
// import SignInSide from './components/SignInSide';
// import Detail from './components/Detail';

const FlipperContractAddress = FlipperContract.address;
const FlipperContractABI = FlipperContract.abi;

const NETWORK_ID = '2221';

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [val, setVal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [SignUporLogIn, setSignUporLogIn] = useState(true);

  const handleAuthChange = (value, username) => {
    setIsAuthenticated(value);
    setUsername(username);
  };

  const checkExtension = async () => {
    if (window.ethereum == undefined) {
      toast.info('No Wallet Detected!', toastObj);
      return false;
    }
    await initializeProviderAndSigner();
    return true;
  };

  const initializeProviderAndSigner = async () => {
    let _provider = new ethers.providers.Web3Provider(window.ethereum);
    let _signer = _provider.getSigner(0);
    setProvider(_provider);
    setSigner(_signer);
  };

  const getValue = async () => {
    const factoryContract = new ethers.Contract(
      FlipperContractAddress,
      FlipperContractABI,
      signer
    );

    try {
      const result = await factoryContract.getValue();
      console.log(result);
      setVal(result);
      toast('Fetched Successfully!', toastObj);
    } catch (error) {
      console.log(error);
      toast(error, toastObj);
    }
  };

  const toggleValue = async () => {
    const factoryContract = new ethers.Contract(
      FlipperContractAddress,
      FlipperContractABI,
      signer
    );

    try {
      toast('Transaction Initiated!', toastObj);
      const result = await factoryContract.toggleValue();
      await getValue();
      toast('Transaction Successful!', toastObj);
    } catch (error) {
      toast(error, toastObj);
    }
  };

  const connectWallet = async () => {
    console.log(checkNetwork(NETWORK_ID));
    if (checkExtension() && (await checkNetwork(NETWORK_ID)) == true) {
      console.log('frick yea');
      const [selectedAddress] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setSelectedAddress(selectedAddress);
      console.log(selectedAddress);
      setIsWalletConnected(true);

      await window.ethereum.on('accountsChanged', ([newAddress]) => {
        toast(`Account Changed to ${newAddress}`, toastObj);
        setSelectedAddress(newAddress);
        console.log('account changed');
      });
      return;
    }
    toast(
      `Connect to Network Name: Kava EVM Testnet
        New RPC URL: https://evm.testnet.kava.io
        Chain ID: 2221
        Currency Symbol: KAVA
        Explorer URL: https://explorer.testnet.kava.io`,
      toastObj
    );
  };

  useEffect(() => {
    if (isWalletConnected) {
      toast('Wallet Connected Successfully!', toastObj);
      getValue();
    }
  }, [isWalletConnected]);

  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/home" element={<BlockchainSection />} />
          <Route path="/design" element={<Design />} />
          <Route path="/signup" element={<SignUps />} />
          <Route path="/login" element={<Login />} />
          <Route path='/transaction' element={<Transaction/>} />
          {/* <Route path="/transfer" element={<Transfer />} /> */}
          <Route path="/kyc" element={<Kyc />} />
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </>
  );
}

export default App;
