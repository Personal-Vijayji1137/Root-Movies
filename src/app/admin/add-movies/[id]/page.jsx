"use server"
import { Root_Movies_DB } from "@/app/layout";
import EditMoviePanel from "./components/details";
import { unstable_noStore as noStore } from 'next/cache';
export default async function AddAct({ params }) {
  noStore();
  const {id} = await params;
  const [result,links] = await Promise.all([
    Root_Movies_DB(
      `SELECT * FROM movie WHERE movie_id = ?`,
      [id]
    ),
    Root_Movies_DB(
      `SELECT * FROM movie_links WHERE movie_id = ?`,
      [id]
    )
  ])
  if (result.length == 0) {
    return <></>
  }
  return (
    <EditMoviePanel data={result[0]} links={links}/>
  );
}