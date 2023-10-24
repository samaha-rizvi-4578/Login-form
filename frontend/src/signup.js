import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Validation from './SignupValidation';
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate(); // Use useNavigate hook

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        debugger
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        if (
            validationErrors.name === undefined &&
            validationErrors.email === undefined &&
            validationErrors.password === undefined
        ) {
            debugger
            console.log(values);
            axios
                .post('http://localhost:8081/signup', values)
                .then((res) => {
                    debugger
                    navigate('/login'); // Navigate to '/login'
                    debugger
                })
                .catch((err) => console.log(err));
        }
    };
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
            <h2>Sign-Up</h2>
            <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name'><strong>Name</strong></label> 
                    <input type='text' placeholder='Enter Full Name' onChange={handleInput}  name='name' className='form-control rounded-0' />
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label> 
                    <input type='email' placeholder='Enter Email' onChange={handleInput} name='email' className='form-control rounded-0' />
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' onChange={handleInput} name='password' placeholder='Create Password' className='form-control rounded-0' />
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'>Signup</button>
                <p>You agree to our terms and conditions.</p> 
                <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
            </form>
        </div>
    </div>
    );
}

export default Signup;