import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { AuthContext } from '../Providers/AuthProvider';

library.add(faGoogle)

const Signup = () => {
    // State for managing and showing errors
    const [userError, setUserError] = useState('');
    // Using context to get userSignup function
    const {userSignup} = useContext(AuthContext);


    const handleSignup = event => {
        // Getting data from the signup form
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPass = form.confirmPassword.value;

        // Checking Password Strength and matching password
        setUserError('');
        if (password !== confirmPass) {
            setUserError("Password didn't match");
            return;
        }
        else if(password.length < 6) {
            setUserError("Password should be atleast 6 character and above");
            return;
        }
        setUserError('');

        // Calling userSignup to create a new user with email and password
        userSignup(email, password)
        .then(result => {
            const signedUser = result.user;
            console.log(signedUser);
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
                Sign Up
            </h2>

            <form onSubmit={handleSignup} className='card-body'>
                <div className='form-control'>
                    <label className="label">
                        <span className="label-text font-semibold">Your Name:</span>
                    </label>

                    <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
                </div>
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

                    <input type="password" name='password' placeholder="Password" className="input input-bordered" required />
                </div>
                <div className='form-control'>
                    <label className="label">
                        <span className="label-text font-semibold">Confirm Password:</span>
                    </label>

                    <input type="password" name='confirmPassword' placeholder="Confirm Password" className="input input-bordered" required />

                    <label className="label">
                        <span className="label-text-alt text-slate-500 link link-hover">
                            Already have an account? <Link to='/login' className='text-orange-400 link-hover'>Login</Link>
                        </span>
                    </label>
                    <p className='text-error'>{userError}</p>
                </div>
                <div className="form-control mt-3">
                    <button className="btn bg-orange-200 border-none hover:bg-orange-300 text-slate-900">Signup</button>
                </div>

                <div className="divider text-slate-400">OR</div>

                <div className="form-control">
                    <button className="btn bg-white text-slate-500 hover:bg-white hover:text-slate-900">
                        <FontAwesomeIcon icon="fa-brands fa-google" size='lg' pull='left' />
                        Continue with Google
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signup;