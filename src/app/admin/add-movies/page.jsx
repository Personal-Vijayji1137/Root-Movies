"use client"
import AddMovies from '@/app/server/add-movies';
import Styles from "./style.module.css"
import { useState } from 'react';
import UploadImageToS3 from '@/app/server/uploadimages';
import Loader from '@/app/loader';
export const movieLanguagesInIndia = [
  "Hindi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Bengali",
  "Marathi",
  "Gujarati",
  "Punjabi",
  "Odia",
  "Assamese",
  "Rajasthani",
  "Bhojpuri",
  "Konkani",
  "Tulu",
  "Manipuri",
  "Maithili",
  "Santali",
  "Sindhi",
  "Dogri",
  "Sanskrit",
  "Khasi",
  "Mizo",
  "Nagpuri",
  "Haryanvi",
  "Chhattisgarhi"
];
export const movieCategories = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Historical",
  "Horror",
  "Musical",
  "Mystery",
  "Political",
  "Romantic",
  "Science Fiction",
  "Sports",
  "Suspense",
  "Thriller",
  "War",
  "Western",
  "Superhero",
  "Psychological",
  "Noir",
  "Period Drama",
  "Satire",
  "Tragedy",
  "Paranormal",
  "Spy",
  "Dance",
  "Martial Arts",
  "Heist",
  "Road",
  "Coming of Age",
  "Social",
  "Epic",
  "Experimental",
  "Silent Film"
];
export const contentTypes = [
  "Movie",
  "Web Series",
  "TV Series",
  "Short Film",
  "Documentary",
  "Docuseries",
  "Miniseries",
  "Reality Show",
  "Talk Show",
  "Game Show",
  "Anthology Series",
  "Sitcom",
  "Stand-Up Special",
  "Sketch Comedy",
  "Animated Series",
  "News Program",
  "Variety Show",
  "Live Performance",
  "Educational Video",
  "Mockumentary",
  "Infotainment",
  "Featurette",
  "Music Video",
  "Telefilm",
  "Interactive Series",
  "Public Service Announcement",
  "Web Documentary",
  "Lifestyle Show",
  "Cooking Show",
  "Sports Broadcast",
  "Vlog Series",
  "Fan Film",
  "Behind-The-Scenes",
  "Digital Short",
  "Experimental Film",
  "Audio-Visual Art"
];
export default function AdminPanel() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    release_year: '',
    duration: '',
    type: '',
    category: '',
    language: '',
    ua: 'U/A ',
    poster_url: '',
    name_image_url: '',
  });
  const [load,setload] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setload(true);
    try {
      const data = await AddMovies(form);
      if(data.success){
        setload(false);
        setForm({ title: '', description: '', release_year: '', duration: '', type: '', category: '', language: '', ua: 'U/A ', poster_url: '', name_image_url: '' });
      }
      else{
        setload(false);
      }
    } catch (error) {
      setload(false);
    }
  };

  return (
    <>
      {load && <Loader />}
      <div className={Styles.container}>
        <h1>Add New Movie</h1>
        <form onSubmit={handleSubmit}>
          <div className={Styles.DivContainer}>
            <div>
              <label>Title:</label>
              <input type="text" name="title" value={form.title} onChange={handleChange} required />
            </div>
            <div>
              <label>Description:</label>
              <textarea name="description" value={form.description} onChange={handleChange} required />
            </div>
          </div>
          <div className={Styles.SecondContainer}>
            <div>
              <label>Release Year:</label>
              <input type="number" name="release_year" value={form.release_year} onChange={handleChange} required/>
            </div>
            <div>
              <label>Duration:</label>
              <input type="text" name="duration" value={form.duration} onChange={handleChange} required/>
            </div>
            <div>
              <label>UA:</label>
              <input type="text" name="ua" value={form.ua} onChange={handleChange} required/>
            </div>
          </div>
          <div className={Styles.SecondContainer}>
            <div>
              <label>Type:</label>
              <select name="type" value={form.type} onChange={handleChange} required>
                <option value="">Select Type</option>
                {contentTypes.map((item, index) => {
                  return <option value={item} key={index}>{item}</option>
                })}
              </select>
            </div>
            <div>
              <label>Language:</label>
              <select name="language" value={form.language} onChange={handleChange} required>
                <option value="">Select Language</option>
                {movieLanguagesInIndia.map((item, index) => {
                  return <option value={item} key={index}>{item}</option>
                })}
              </select>
            </div>
            <div>
              <label>Category:</label>
              <select name="category" value={form.category} onChange={handleChange} required>
                <option value="">Select Type</option>
                {movieCategories.map((item, index) => {
                  return <option value={item} key={index}>{item}</option>
                })}
              </select>
            </div>
          </div>
          <div className={Styles.ThirdContainer}>
            <label>Poster URL:</label>
            <div>
              <input type="text" name="poster_url" value={form.poster_url} onChange={handleChange} required/>
              <span onClick={async () => {
                if (form.profile_url == "") return;
                const ImageName = form.poster_url
                setForm({ ...form, poster_url: 'Uploading ...' })
                const key = await UploadImageToS3(ImageName);
                setForm({ ...form, poster_url: key.fileName })
              }
              }>Upload Image</span>
            </div>
          </div>
          <div className={Styles.ThirdContainer}>
            <label>Name Image URL:</label>
            <div>
              <input type="text" name="name_image_url" value={form.name_image_url} onChange={handleChange} />
              <span onClick={async () => {
                if (form.name_image_url == "") return;
                const ImageName = form.name_image_url
                setForm({ ...form, name_image_url: 'Uploading ...' })
                const key = await UploadImageToS3(ImageName);
                setForm({ ...form, name_image_url: key.fileName })
              }
              }>Upload Image</span>
            </div>
          </div>
          <button type="submit">Add Movie</button>
        </form>
      </div>
    </>
  );
}