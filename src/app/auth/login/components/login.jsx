"use client"
import React, { useState } from 'react';
import styles from "./login.module.css"
import { LoginFunction } from '../page';
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async(e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Username and password are required!');
    } else {
      const data = await LoginFunction(username,password);
      setError('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button
            type="submit"
            className={styles.button}
          >
            Login
          </button>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
