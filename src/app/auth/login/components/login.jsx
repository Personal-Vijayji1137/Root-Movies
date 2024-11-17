"use client"
import React, { useState } from 'react';
import styles from "./login.module.css"
import { LoginFunction } from '../page';
import Loader from '@/app/loader';
import { useRouter } from 'next/navigation'
function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [load,setload] =useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Username and password are required!');
    } else {
      setload(true);
      const data = await LoginFunction(username, password);
      if (data) {
        router.push('/home')
        setError('Login Success, Please wait. Redirecting ...');
      } else {
        setError('Something is wrong ...');
      }
      setload(false);
    }
  };

  return (
    <>
      {load && <Loader />}
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
    </>
  );
}

export default LoginPage;
