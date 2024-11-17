"use client"
import React, { useState } from 'react';
import axios from 'axios';
import styles from "./signup.module.css"
import { CreateAccountFunction } from '../page';
import { generatePresignedUrl } from '@/app/server/uploadimages';
import RootGetCustomImagesURL from '@/app/CommonFunctions';
function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile_picture, set_profile_picture_url] = useState("");
  const [picture, set_picture_url] = useState("data:image/png;base64,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");
  const [error, setError] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await CreateAccountFunction(username, email, password, profile_picture);
    if(data){
      setError("Account Successfully Created ...");
      setEmail("")
      setUsername("")
      setPassword("")
      set_profile_picture_url("")
      set_picture_url("data:image/png;base64,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")
    }else{
      setError("Something went wrong ...")
    }
  };
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    const presignedUrl = await generatePresignedUrl();
    if (!presignedUrl) {
      return;
    }
    try {
      const response = await axios.put(`${presignedUrl.url}`, file, {
        headers: {
          'Content-Type': file.type,
        },
        timeout: 10000
      });
      const Image_URL = await RootGetCustomImagesURL(presignedUrl.fileName, 70);
      set_picture_url(Image_URL);
      set_profile_picture_url(presignedUrl.fileName);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Create to Your Account</h2>
        <form onSubmit={handleLogin}>
          <img src={picture} alt="Profile" className={styles.ProfilePicture} />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="file"
            placeholder="Select Profile Pic .."
            onChange={handleImageUpload}
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

export default SignUpPage;
