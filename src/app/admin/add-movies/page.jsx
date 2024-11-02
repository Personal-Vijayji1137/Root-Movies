"use client"
import AddMovies from '@/app/server/add-movies';
import Styles from "./style.module.css"
import { useState } from 'react';
import UploadImageToS3 from '@/app/server/uploadimages';
export default function AdminPanel() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    release_year: '',
    duration: '',
    type: '',
    language: '',
    ua: '',
    poster_url: '',
    name_image_url: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await AddMovies(form);
      setForm({ title: '', description: '', release_year: '', duration: '', type: '', language: '', ua: '', poster_url: '', name_image_url: '' });
    } catch (error) {
      console.error(error);
      alert('Error adding movie');
    }
  };

  return (
    <div className={Styles.container}>
      <h1>Add a Movie</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={form.title} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />

        <label>Release Year:</label>
        <input type="number" name="release_year" value={form.release_year} onChange={handleChange} />

        <label>Duration:</label>
        <input type="text" name="duration" value={form.duration} onChange={handleChange} />

        <label>Type:</label>
        <input type="text" name="type" value={form.type} onChange={handleChange} />

        <label>Language:</label>
        <input type="text" name="language" value={form.language} onChange={handleChange} />

        <label>UA:</label>
        <input type="text" name="ua" value={form.ua} onChange={handleChange} />

        <label>Poster URL:</label>
        <input type="text" name="poster_url" value={form.poster_url} onChange={handleChange} />
        <span onClick={async () => {
          if(form.profile_url == "")return;
          const ImageName = form.poster_url
          setForm({ ...form, poster_url: 'Uploading ...' })
          const key = await UploadImageToS3(ImageName);
          setForm({ ...form, poster_url: key })
        }
        }>Upload Image</span>

        <label>Name Image URL:</label>
        <input type="text" name="name_image_url" value={form.name_image_url} onChange={handleChange} />
        <span onClick={async () => {
          if(form.name_image_url == "")return;
          const ImageName = form.name_image_url
          setForm({ ...form, name_image_url: 'Uploading ...' })
          const key = await UploadImageToS3(ImageName);
          setForm({ ...form, name_image_url: key })
        }
        }>Upload Image</span>

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}