import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../assests/logo.png'
export default function Navbar(props) {
  const { logout, token } = props;
  const location = useLocation();

  return (
    <div className='navbar'>
      <div className='logo'><img src={logo} alt=""/></div>
      {token && (
        <div className='profile-links'>
          <Link to='/' id="public-link" className={location.pathname === '/' ? 'active' : ''}>Profile</Link>
          <Link to='/public' id="public-link" className={location.pathname === '/public' ? 'active' : ''}>Public</Link>
        </div>
      )}
      {token ? (
        <div className='logout'>
          <button onClick={logout} id='logout-btn'>
            Logout
          </button>
        </div>
      ) : (
        <div className='login'>
          <Link to='/auth'>Login</Link>
        </div>
      )}
    </div>
  );
}
