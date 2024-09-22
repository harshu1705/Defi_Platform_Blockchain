// import React, { useState } from 'react';
// import './SignUps.css';

// const SignUp = (props) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [password2, setPassword2] = useState('');
//   const [Name, setName] = useState('');
//   const [Email, setEmail] = useState('');

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   // const handleNameChange = (e) => {
//   //   setName(e.target.value);
//   // };

//   // const handleEmailChange = (e) => {
//   //   setEmail(e.target.value);
//   // };

//   // const handlePassword2Change = (e) => {
//   //   setPassword2(e.target.value);
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Basic form validation
//     if (password !== password2) {
//       alert('Passwords do not match');
//       return;
//     }
//     console.log('Username:', username);
//     console.log('Password:', password);
//     console.log('Name:', Name);
//     console.log('Email:', Email);
//     // Add your frontend logic here (e.g., form submission handling)
//   };

//   return (
//     <div className="signup-container">
//       <h2 className="signup-title">Sign Up</h2>
//       <form onSubmit={handleSubmit} className="signup-form">
//         {/* Input fields */}
//         <label htmlFor="username-input">Username:</label>
//         <input
//           type="text"
//           id="username-input"
//           value={username}
//           onChange={handleUsernameChange}
//           className="input-field"
//         />

//         <label htmlFor="password-input">Password:</label>
//         <input
//           type="password"
//           id="password-input"
//           value={password}
//           onChange={handlePasswordChange}
//           className="input-field"
//         />

//         {/* <label htmlFor="password-input2">Confirm Password:</label>
//         <input
//           type="password"
//           id="password-input2"
//           value={password2}
//           onChange={handlePassword2Change}
//           className="input-field"
//         />

//         <label htmlFor="name-input">Name:</label>
//         <input
//           type="text"
//           id="name-input"
//           value={Name}
//           onChange={handleNameChange}
//           className="input-field"
//         />

//         <label htmlFor="email-input">Email:</label>
//         <input
//           type="email"
//           id="email-input"
//           value={Email}
//           onChange={handleEmailChange}
//           className="input-field"
//         /> */}

//         {/* Submit button */}
//         <button type="submit" className="signup-button" func = {SignUp}>
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;
import React, { useState } from 'react';
import './SignUps.css';
import { ethers } from 'ethers'; // Import ethers.js

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = '0x225f5a3DFE23Ec1D927AF24005059b25f423ED8A'; // Replace with your contract address
      const contractABI = [
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'username',
              type: 'string',
            },
          ],
          name: 'UserSignedUp',
          type: 'event',
        },
        {
          inputs: [
            {
              internalType: 'string',
              name: '_username',
              type: 'string',
            },
            {
              internalType: 'string',
              name: '_password',
              type: 'string',
            },
          ],
          name: 'signUp',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ];
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Call the signUp function of the contract
      const transaction = await contract.signUp(username, password);
      await transaction.wait(); // Wait for the transaction to be mined

      // Reset form fields
      setUsername('');
      setPassword('');
      setPassword2('');
      setError('');
      alert('User signed up successfully!');
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {/* Input fields */}
        <label htmlFor="username-input">Username:</label>
        <input
          type="text"
          id="username-input"
          value={username}
          onChange={handleUsernameChange}
          className="input-field"
        />

        <label htmlFor="password-input">Password:</label>
        <input
          type="password"
          id="password-input"
          value={password}
          onChange={handlePasswordChange}
          className="input-field"
        />

        <label htmlFor="password-input2">Confirm Password:</label>
        <input
          type="password"
          id="password-input2"
          value={password2}
          onChange={handlePassword2Change}
          className="input-field"
        />

        {/* Error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Submit button */}
        <button type="submit" className="signup-button" func = {SignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;