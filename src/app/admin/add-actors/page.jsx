"use client"
import Styles from "../add-movies/style.module.css"
import { useState } from 'react';
import AddActors from '@/app/server/add-actors';
import UploadImageToS3 from "@/app/server/uploadimages";
import UploadVideosToS3 from "@/app/server/uploadvideos";
export default function AddAct() {
  const [form, setForm] = useState({
    name: '',
    bio: '',
    dob: '',
    profile_url: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await AddActors(form);
      setForm({ name: '', bio: '', dob: '', profile_url: '', });
    } catch (error) {
      console.error(error);
      alert('Error adding movie');
    }
  };

  return (
    <div className={Styles.container}>
      <h1>Add a Actor</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />

        <label>Bio:</label>
        <textarea name="bio" value={form.bio} onChange={handleChange} required />

        <label>DOB:</label>
        <input type="date" name="dob" value={form.dob} onChange={handleChange} />

        <label>Picture:</label>
        <input type="text" name="profile_url" value={form.profile_url} onChange={handleChange} />
        <span onClick={async () => {
          if (form.profile_url == "") return;
          const ImageName = form.profile_url
          setForm({ ...form, profile_url: 'Uploading ...' })
          const key = await UploadVideosToS3(ImageName);
          setForm({ ...form, profile_url: key })
        }
        }>Upload Image</span>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}