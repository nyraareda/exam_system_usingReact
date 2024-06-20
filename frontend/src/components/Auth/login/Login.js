import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../api';

import Nav from '../Nav';
import ButtonPrimary from '../../buttons/ButtonPrimary';
import InputForm from '../../form/InputForm';

import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: '',
    password: '',
    error: ''
  });

  const changeLogin = (prop, val) => {
    setState(prevState => ({
      ...prevState,
      [prop]: val
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    
    try {
      const data = await login(email, password);
      console.log('Login successful', data);

      if (data && data.role) {
        // Save role to localStorage
        localStorage.setItem('userRole', data.role);

        if (data.role === 'user') {
          navigate('/student-dashboard'); 
        } else if (data.role === 'admin') {
          navigate('/teacher-dashboard');
        } else {
          throw new Error('Invalid role');
        }
      } else {
        throw new Error('Role not provided');
      }
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        error: error.message
      }));
    }
  };

  return (
    <div className="Login">
      <Nav />
      <div className="login-form-wrap">
        <form onSubmit={handleLogin} className="login-form">
          <div className="title">Sign in</div>
          <div className="form-wrap">
            <InputForm
              tabIndex={1}
              value={state.email}
              onChange={(val) => changeLogin('email', val)}
              label="Email"
              placeholder="Enter your email"
            />
            <InputForm
              tabIndex={2}
              value={state.password}
              onChange={(val) => changeLogin('password', val)}
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          {state.error && <div className="error">{state.error}</div>}
          <div className="forgot">Forgot?</div>
          <div className="login-btn">
            <ButtonPrimary type="submit">Sign in</ButtonPrimary>
          </div>
          <div className="goto-register">
            Don't have an account? <Link to="/register">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
