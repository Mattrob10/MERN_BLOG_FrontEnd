import React from 'react';

export default function AuthForm(props) {
  const {
    handleChange,
    handleSubmit,
    btnText,
    errMsg,
    showConfirmPassword = true,
    inputs: { username, password, confirmPassword },
  } = props;

  return (
    <form onSubmit={handleSubmit} id="auth-form">
      <input
        type="text"
        value={username}
        name="username"
        onChange={handleChange}
        placeholder="👤 Username"
      />
      <input
        type="password"
        value={password}
        name="password"
        onChange={handleChange}
        placeholder="🔐 Password"
      />
      {showConfirmPassword && (
        <input
          type="password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          placeholder="Confirm Password"
        />
      )}
      <button className="form-btn">{btnText}</button>
      <p id="errMsg">{errMsg}</p>
    </form>
  );
}