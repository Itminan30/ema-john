import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { AuthContext } from '../Providers/AuthProvider';

library.add( faGoogle )

const Login = () => {
    // A state for showing password
    const [show, setShow] = useState(false);
    // A state for managing and showing errors
    const [userError, setUserError] = useState('');
    // Getting the userSignin function from context api
    const {userSignin, setUser} = useContext(AuthContext);
    // useNavigate hook
    const navigate = useNavigate();
    // using useLocation() to get previous routes location
    const location = useLocation();
    // from location the "from" is retrieved
    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        // Getting data from login form
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        
        // Calling userSignin function to authenticate the user
        userSignin(email, password)
        .then(result => {
            const loggedInUser = result.user;
            setUser(loggedInUser);
            setUserError('');
            form.reset();
            navigate(from, {replace: true});
            console.log("Log in successful");
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
            setUserError(errorMessage);
        })
    }
    return (
        <div className='card w-5/12 border flex-shrink-0 mx-auto my-10 shadow-xl shadow-orange-100'>
            <h2 className='card-body text-4xl font-bold text-center'>
                Login
            </h2>

            <form onSubmit={handleLogin} className='card-body'>
                <div className='form-control'>
                    <label className="label">
                        <span className="label-text font-semibold">Your Email:</span>
                    </label>

                    <input type="email" name='email' placeholder="Email" className="input input-bordered" required />
                </div>
                <div className='form-control'>
                    <label className="label">
                        <span className="label-text font-semibold">Your Password:</span>
                    </label>

                    <input type={!show ? "password" : "text"} name='password' placeholder="Password" className="input input-bordered" required />
                    <span className='hover:cursor-pointer ml-1' onClick={() => {setShow(!show)}}>
                        <small>
                            {
                                show ? <span>Hide Password</span> : <span>Show Password</span>
                            }
                        </small>
                    </span>
                    <label className="label">
                        <Link className="label-text-alt text-slate-500 link link-hover">Forgot password?</Link>
                    </label>

                    <label className="label">
                        <span className="label-text-alt text-slate-500 link link-hover">
                            New to Ema-john? <Link to='/signup' className='text-orange-400 link-hover'>Create New Account</Link>
                        </span>
                    </label>
                    <p className='text-error'>{userError}</p>
                </div>
                <div className="form-control mt-3">
                    <button className="btn bg-orange-200 border-none hover:bg-orange-300 text-slate-900">Login</button>
                </div>

                <div className="divider text-slate-400">OR</div>

                <div className="form-control">
                    <button className="btn bg-white text-slate-500 hover:bg-white hover:text-slate-900">
                        <FontAwesomeIcon icon="fa-brands fa-google" size='lg' pull='left'/>
                        Continue with Google
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;