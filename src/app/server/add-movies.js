"use server"
import { Root_Movies_DB } from "@/app/layout";
import { unstable_noStore as noStore } from 'next/cache';
export default async function AddMovies(formData) {
  noStore();
    const {title, description, release_year, duration, type, category, language, ua, poster_url, name_image_url} = formData;
    try {
      await Root_Movies_DB(
        `INSERT INTO movie (title, description, release_year, duration, type, category, language, ua, poster_url, name_image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, description, release_year, duration, type, category, language, ua, poster_url, name_image_url]
      );
      return({ success:true, message: 'Movie added successfully!' });
    } catch (error) {
        console.log(error);
      return{ success:false,message: 'Failed to add movie', error };
    }
}
export async function UpdateMovies(formData, id) {
  noStore();
    const {title, description, release_year, duration, type, category, language, ua, poster_url, name_image_url} = formData;
    try {
      const result = await Root_Movies_DB(
        `UPDATE movie SET title = ?, description = ?, release_year = ?, duration = ?, type = ?, category = ?, language = ?, ua = ?, poster_url = ?, name_image_url = ? WHERE movie_id = ?`,
        [title, description, release_year, duration, type, category, language, ua, poster_url, name_image_url, id]
      );
      return({ message: 'Movie updated successfully!' });
    } catch (error) {
        console.log(error);
      return{ message: 'Failed to update movie', error };
    }
}


export async function GetMovie(id) {
  noStore();
  try {
    const result = await Root_Movies_DB(
      `SELECT * FROM movie WHERE movie_id = ?`,
      [id]
    );
    console.log(result);
    return({ message: 'Movie added successfully!', data: result });
  } catch (error) {
      console.log(error);
    return{ message: 'Failed to add movie', error };
  }
}