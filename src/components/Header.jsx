import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
const Header = () => {
  return (
    <nav class="Header Header-expand-lg bg-body-tertiary-inline">
      <div class="collapse Header-collapse" id="HeaderNav">
        <ul class="Header-nav">
          <li class="nav-item">
            <Link to="/home" class="nav-link" id="aeonixnav">
              BlockFusion
            </Link>
          </li>

          <li class="nav-item">
            <Link class="nav-link " to="/design">
              Design{' '}
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/transaction">
              Transaction
            </Link>
          </li>

          <li class="nav-item">
            <Link class="nav-link" href="/signup">
              Sign Up
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/login">
              Log In
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to="/aboutus">
              Connect
            </Link> 
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
