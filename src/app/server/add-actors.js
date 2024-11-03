"use server"
import { Root_Movies_DB } from "@/app/layout";
import { unstable_noStore as noStore } from 'next/cache';
export default async function AddActors(formData) {
  noStore();
    const {name,bio,dob,profile_url	} = formData;
    try {
      const result = await Root_Movies_DB(
        `INSERT INTO actor (name, bio, dob, profile_url) VALUES (?, ?, ?, ?)`,
        [name,bio,dob,profile_url]
      );
      return({ message: 'Actor added successfully!', movieId: result[0].insertId });
    } catch (error) {
        console.log(error);
      return{ message: 'Failed to add movie', error };
    }
}