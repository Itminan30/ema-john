import React, { useContext } from 'react';
import './Header.css'
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const Header = () => {
    // Using context api to get user and logOut function
    const { user, logOut, setUser } = useContext(AuthContext);

    // Function for logging out user
    const handleLogout = () => {
        logOut()
        .then(result => {
            console.log("Log Out successfull");
            setUser(null);
        })
        .catch(error => {
            console.log(error.message);
            console.log(error);
        })
    }

    return (
        <nav className='header sticky top-0 z-10'>
            <img src={logo} alt="" />
            <div>
                <Link to='/'>Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/manageinventory">Manage Inventory</Link>
                {
                    user ?
                        <button onClick={handleLogout} className='btn ml-3'>Log Out</button> :
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                }
            </div>
        </nav>
    );
};

export default Header;