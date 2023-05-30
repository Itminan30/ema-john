import React, { useContext } from 'react';
import { AuthContext } from '../components/Providers/AuthProvider';
import Login from '../components/Login/Login';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <div className='mt-20'>
            <h3 className='text-center font-semibold text-3xl text-slate-600'>Loading...</h3>
        </div>
    }

    if(user){
        return children;
    }
    return (
        <Navigate to='/login' state={{from: location}} replace></Navigate>
    );
};

export default PrivateRoute;