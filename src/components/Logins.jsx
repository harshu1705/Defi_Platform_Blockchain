import React, { useState } from 'react';
import './Logins.css'; // You can create your own CSS file for styling
import Swal from 'sweetalert';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic form validation
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }
    console.log('Username:', username);
    console.log('Password:', password);
    // Add your login logic here (e.g., API call to authenticate user)

    // Simulate successful login (for demo purposes)
    setTimeout(() => {
      // Show SweetAlert notification after successful login
      Swal({
        title: 'Login Successful!',
        text: 'Welcome back, ' + username + '!',
        icon: 'success',
        button: 'OK',
      });
      // Reset input fields after successful login
      setUsername('');
      setPassword('');
    }, 1000); // Adjust the delay as needed
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Log In</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {/* Username input */}
        <label htmlFor="username-input">Username:</label>
        <input
          type="text"
          id="username-input"
          value={username}
          onChange={handleUsernameChange}
          className="input-field"
        />

        {/* Password input */}
        <label htmlFor="password-input">Password:</label>
        <input
          type="password"
          id="password-input"
          value={password}
          onChange={handlePasswordChange}
          className="input-field"
        />

        {/* Submit button */}
        <button type="submit" className="login-button">
          Log In
        </button>
      <p className="signup-text">
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
      </form>
    </div>
  );
};

export default Login;
