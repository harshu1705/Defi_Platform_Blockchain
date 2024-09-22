import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function TransferComponent() {
  const [web3, setWeb3] = useState(null);
  const [simpleTransferContract, setSimpleTransferContract] = useState(null);
  const [transactionLoggerContract, setTransactionLoggerContract] = useState(null);
  const [amount, setAmount] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [result, setResult] = useState('');
  const [account, setAccount] = useState('');

  useEffect(() => {
    async function loadWeb3() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          // Request account access if needed
          await window.ethereum.send('eth_requestAccounts');
          // Accounts now exposed
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error(error);
          setResult('User denied account access');
        }
      } else {
        console.error('Please install MetaMask to interact with Ethereum');
      }
    }

    async function loadContracts() {
      // Load SimpleTransfer contract
      const simpleTransferABI = [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "balances",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "deposit",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address payable",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
      const simpleTransferAddress = '0x384FEEBCD986ca6B80ee978A218EDbEdEeac72B8'; // Replace with your SimpleTransfer contract address
      const simpleTransferContractInstance = new web3.eth.Contract(simpleTransferABI, simpleTransferAddress);
      setSimpleTransferContract(simpleTransferContractInstance);

      // Load TransactionLogger contract
      const transactionLoggerABI = [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "balances",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "deposit",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address payable",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
      const transactionLoggerAddress = '0x225f5a3DFE23Ec1D927AF24005059b25f423ED8A'; // Replace with your TransactionLogger contract address
      const transactionLoggerContractInstance = new web3.eth.Contract(transactionLoggerABI, transactionLoggerAddress);
      setTransactionLoggerContract(transactionLoggerContractInstance);
    }

    loadWeb3();
    loadContracts();
  }, []);

  const deposit = async () => {
    try {
      await simpleTransferContract.methods.deposit().send({ from: account, value: web3.utils.toWei(amount, 'ether') });
      setResult('Deposit successful!');
    } catch (error) {
      console.error(error);
      setResult(`Error: ${error.message}`);
    }
  };

  const transfer = async () => {
    try {
      await simpleTransferContract.methods.transfer(toAddress, web3.utils.toWei(amount, 'ether')).send({ from: account });
      setResult('Transfer successful!');
      // Log transaction
      await transactionLoggerContract.methods.addTransaction(account, toAddress, web3.utils.toWei(amount, 'ether')).send({ from: account });
    } catch (error) {
      console.error(error);
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Simple Transfer App</h1>
      {account ? (
        <>
          <p>Connected Account: {account}</p>
          <label htmlFor="amount">Amount:</label>
          <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <br />
          <label htmlFor="toAddress">To Address:</label>
          <input type="text" id="toAddress" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
          <br />
          <button onClick={deposit}>Deposit</button>
          <button onClick={transfer}>Transfer</button>
          <br />
          <div id="result">{result}</div>
        </>
      ) : (
        <p>Please connect to MetaMask</p>
      )}
    </div>
  );
}

export default TransferComponent;
