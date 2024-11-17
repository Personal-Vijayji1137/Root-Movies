"use server"
import { Root_Movies_DB } from "@/app/layout";
import EditMoviePanel from "./components/details";
import { unstable_noStore as noStore } from 'next/cache';
import RootGetCustomImagesURL from "@/app/CommonFunctions";
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
  const image_url = await RootGetCustomImagesURL(result[0].poster_url, 200);
  return (
    <EditMoviePanel image_url={image_url} data={result[0]} movie_id={id} links={links}/>
  );
}