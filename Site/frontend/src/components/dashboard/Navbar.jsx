import React from 'react';
import { useAuth } from '../../context/authContext';

// Import the CSS file
import '../../customStyles.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    return (
        <div className="navbar">
          <p>Welcome {user.name}</p>
          <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Navbar;