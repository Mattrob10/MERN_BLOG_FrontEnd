import React, { useState, useContext } from 'react';
import AuthForm from './AuthForm.js';
import { UserContext } from '../context/UserProvider.js';

const initInputs = { username: '', password: '', confirmPassword: '' };

export default function Auth() {
  const [inputs, setInputs] = useState(initInputs);
  const [toggle, setToggle] = useState(false);

  const { signup, login, errMsg, resetAuthErr } = useContext(UserContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function toggleForm() {
    setToggle((prev) => !prev);
    resetAuthErr();
  }

  function handleSignup(e) {
    e.preventDefault();
    if (inputs.password === inputs.confirmPassword) {
      signup({ username: inputs.username, password: inputs.password });
    } else {
      alert('Passwords do not match!');
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    login({ username: inputs.username, password: inputs.password });
  }

  return (
    <>
      <div className="auth-container">
        <h1>⛰ Bloggin</h1>
        {!toggle ? (
          <>
            <AuthForm
              handleChange={handleChange}
              handleSubmit={handleSignup}
              inputs={inputs}
              btnText="Sign up"
              errMsg={errMsg}
            />
            <p onClick={toggleForm} id="member">
              Already a member...<span id="toggle-msg">LOGIN</span>
            </p>
          </>
        ) : (
          <>
            <AuthForm
              handleChange={handleChange}
              handleSubmit={handleLogin}
              inputs={inputs}
              btnText="Login"
              errMsg={errMsg}
              showConfirmPassword={false}
            />
            <p onClick={toggleForm} id="member">
              Not a member...<span id="toggle-msg"> REGISTER</span>{' '}
            </p>
          </>
        )}
      </div>
    </>
  );
}