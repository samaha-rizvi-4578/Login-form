import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
// Placeholder Image URL
//const placeholderImageUrl = 'D:/OneDrive - FAST National University/samaha/MERN/login-form/frontend/src/bg.jpg';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const handleSubmit = (event) => {
        debugger
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        if (
            validationErrors.email === undefined &&
            validationErrors.password === undefined
        ) {
            debugger          
            //console.log("yarrrrrr");
            axios
                .post('http://localhost:8081/login', values)
                .then(res => {
                    debugger
                    if(res.data === "Success"){
                        navigate('/home');
                    }
                    else{
                        debugger
                        alert("Not Record Exist");
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    return (
        <div 
            className='d-flex justify-content-center align-items-center' 
            style={{
                backgroundImage: `url('https://i.pinimg.com/originals/8c/c9/e2/8cc9e20a1bfa04d3041b21e9f2bba001.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                imageRendering: 'smooth'
            }}
        >
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-In</h2>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            onChange={handleInput}
                            name='email'
                            className='form-control rounded-0'
                        />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            onChange={handleInput}
                            name='password'
                            className='form-control rounded-0'
                        />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button className='btn btn-success w-100 rounded-0' >Login</button>
                    <p>You agree to our terms and conditions.</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
