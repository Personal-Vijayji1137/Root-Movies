import { Root_Movies_DB } from "@/app/layout";
import Styles from "./styles.module.css"
import ToggleSwitch from "./ToggleSwitch";
import Link from "next/link";
import RootGetCustomImagesURL from "@/app/CommonFunctions";
export default async function ProductTable() {
  const result = await Root_Movies_DB(`SELECT movie_id, poster_url, title, release_year, type, language FROM movie ORDER BY created_at DESC LIMIT 20 OFFSET 0`);
  return (
    <>
      <div className={Styles.productTable}>
        <table>
          <thead>
            <tr>
              <th>Poster</th>
              <th>Name</th>
              <th>Year</th>
              <th>Type</th>
              <th>Language</th>
              <th>Published</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {result.map(async (item, index) => (
              <tr key={index}>
                <td><img src={await RootGetCustomImagesURL(item.poster_url, 70)} alt="Profile" className={Styles.MoviePoster} /></td>
                <td>{item.title}</td>
                <td>{item.release_year}</td>
                <td>{item.type}</td>
                <td>{item.language}</td>
                <td><ToggleSwitch /></td>
                <td><Link href={`/admin/add-movies/${item.movie_id}`} style={{ textDecoration: 'none', color: '#000', fontSize: '20px', padding: '0 20px' }}>&#9776;</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={Styles.pagination}>
        <button>Previous</button>
        <span>Page 3 of 11</span>
        <button>Next</button>
      </div>
    </>
  );
}