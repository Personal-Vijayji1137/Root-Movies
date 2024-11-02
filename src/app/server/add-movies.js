"use server"
import { Root_Movies_DB } from "@/app/layout";
export default async function AddMovies(formData) {
    const {title, description, release_year, duration, type, language, ua, poster_url, name_image_url} = formData;
    try {
      const result = await Root_Movies_DB(
        `INSERT INTO movie (title, description, release_year, duration, type, language, ua, poster_url, name_image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, description, release_year, duration, type, language, ua, poster_url, name_image_url]
      );
      console.log(result);
      return({ message: 'Movie added successfully!', movieId: result[0].insertId });
    } catch (error) {
        console.log(error);
      return{ message: 'Failed to add movie', error };
    }
}