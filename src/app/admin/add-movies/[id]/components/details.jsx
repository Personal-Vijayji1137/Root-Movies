"use client"
import AddMovies from '@/app/server/add-movies';
import Styles from "../../style.module.css"
import { useState } from 'react';
import UploadImageToS3 from '@/app/server/uploadimages';
import UploadVideosToS3 from '@/app/server/uploadvideos';
import { contentTypes, movieCategories, movieLanguagesInIndia } from '../../page';
export default function EditMoviePanel({ data, links }) {
    const [form, setForm] = useState({
        title: data.title,
        description: data.description,
        release_year: data.release_year,
        duration: data.duration,
        type: data.type,
        language: data.language,
        ua: data.ua,
        poster_url: data.poster_url,
        name_image_url: data.name_image_url,
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
            <h1>Update Movie</h1>
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
                        <input type="number" name="release_year" value={form.release_year} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Duration:</label>
                        <input type="text" name="duration" value={form.duration} onChange={handleChange} />
                    </div>
                    <div>
                        <label>UA:</label>
                        <input type="text" name="ua" value={form.ua} onChange={handleChange} />
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
                        <input type="text" name="poster_url" value={form.poster_url} onChange={handleChange} />
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
            <UploadMovie moviename={data.title} id={data.movie_id} links={links} />
        </div>
    );
}
export function UploadMovie({ moviename, id, links }) {
    const [url, setUrl] = useState("");
    const [videoQuality, setVideoQuality] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url || !videoQuality) {
            alert("Please fill in all the fields.");
            return;
        }
        if (url == "Please wait uploading ...") return;
        try {
            setUrl("Please wait uploading ...")
            const res = await UploadVideosToS3(url, moviename, +videoQuality, id);
            alert(JSON.stringify(res));
            setUrl(res.fileName);
        } catch (error) {
            console.log(error);
            alert("An error occurred while uploading the movie.");
        }
    };

    return (
        <>
            <div className={Styles.Qualitycontainer}>
                <h1>Movie Quality</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label>Video URL:</label>
                            <input type="text" name="title" value={url} onChange={(e) => setUrl(e.target.value)} required />
                        </div>
                        <div>
                            <label>Video Quality:</label>
                            <select name="video_quality" value={videoQuality} onChange={(e) => setVideoQuality(e.target.value)} required>
                                <option value="">Select Video Quality</option>
                                <option value="480">480p</option>
                                <option value="720">720p</option>
                                <option value="1080">1080p</option>
                            </select>
                        </div>
                        <div>
                            <label>Click To Upload</label>
                            <button type="submit">Upload Quality</button>
                        </div>
                    </div>
                    <div>
                        {links.map((item, index) => {
                            return <div key={index}>
                                <label>Video Quality : {item.quality}p</label>
                                <input value={item?.url || ""} readOnly />
                            </div>
                        })}
                    </div>
                </form>
            </div>
        </>
    );
}