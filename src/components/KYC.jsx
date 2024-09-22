import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './KYC.css';

function KYCComponent() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [customerAddress, setCustomerAddress] = useState('');
  const [name, setName] = useState('');
  const [dob, setDOB] = useState('');
  const [nationality, setNationality] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    // Load web3
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      window.ethereum.enable();
    } else {
      console.error('Please install MetaMask to interact with Ethereum');
    }
  }, []);

  useEffect(() => {
    // Load contract
    async function loadContract() {
      if (!web3) return; // Check if web3 is initialized
      const abi = [
        {
          inputs: [],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'customerAddress',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'name',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'dob',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'nationality',
              type: 'string',
            },
          ],
          name: 'KYCAdded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'customerAddress',
              type: 'address',
            },
          ],
          name: 'KYCApproved',
          type: 'event',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_address',
              type: 'address',
            },
            {
              internalType: 'string',
              name: '_name',
              type: 'string',
            },
            {
              internalType: 'string',
              name: '_dob',
              type: 'string',
            },
            {
              internalType: 'string',
              name: '_nationality',
              type: 'string',
            },
          ],
          name: 'addKYC',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_address',
              type: 'address',
            },
          ],
          name: 'approveKYC',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'customers',
          outputs: [
            {
              internalType: 'address',
              name: 'addr',
              type: 'address',
            },
            {
              internalType: 'string',
              name: 'name',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'dob',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'nationality',
              type: 'string',
            },
            {
              internalType: 'bool',
              name: 'isKYCApproved',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_address',
              type: 'address',
            },
          ],
          name: 'isCustomerKYCApproved',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ];
      const address = '0x225f5a3DFE23Ec1D927AF24005059b25f423ED8A'; // Replace with your contract address
      const contractInstance = new web3.eth.Contract(abi, address);
      setContract(contractInstance);
    }
    loadContract();
  }, [web3]); // Reload contract if web3 changes

  const addKYC = async () => {
    try {
      if (!web3) {
        throw new Error('Web3 instance is not initialized');
      }

      if (!contract) {
        throw new Error('Contract instance is not initialized');
      }

      const accounts = await web3.eth.getAccounts();
      if (!accounts || !accounts.length) {
        throw new Error('No Ethereum accounts available');
      }

      // Check if network supports EIP-1559
      const chainId = await web3.eth.getChainId();
      if (chainId !== 2221) {
        throw new Error('Network does not support EIP-1559');
      }

      // Call contract method
      await contract.methods
        .addKYC(customerAddress, name, dob, nationality)
        .send({ from: accounts[0] });
      setResult('KYC information added successfully!');
    } catch (error) {
      console.error(error);
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>KYC Contract</h1>
      <label htmlFor="customerAddress">Customer Address:</label>
      <input
        type="text"
        id="customerAddress"
        value={customerAddress}
        onChange={(e) => setCustomerAddress(e.target.value)}
      />
      <br />
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label htmlFor="dob">Date of Birth:</label>
      <input
        type="date"
        id="dob"
        value={dob}
        onChange={(e) => setDOB(e.target.value)}
      />
      <br />
      <label htmlFor="nationality">Nationality:</label>
      <input
        type="text"
        id="nationality"
        value={nationality}
        onChange={(e) => setNationality(e.target.value)}
      />
      <br />
      <button onClick={addKYC}>Add KYC</button>
      <br />
      <div id="result">{result}</div>
    </div>
  );
}

export default KYCComponent;
