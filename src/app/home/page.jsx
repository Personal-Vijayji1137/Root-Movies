import { Root_Movies_DB } from "../layout";
import Banner from "./components/banners";
import Movies from "./components/movies";
import Styles from "./components/style.module.css"
export default async function Home() {
    const [banner,latestadded] = await Promise.all([
        Root_Movies_DB(`
            SELECT * FROM movie WHERE movie_id = ?
        `,[5]),
        Root_Movies_DB(`
            SELECT poster_url, movie_id, title FROM movie WHERE is_published = true ORDER BY created_at DESC LIMIT 20 OFFSET 0
        `),
    ])
    return (
        <>
            <Banner data={banner[0]}/>
            <div className={Styles.CrousalBanner}>
                <Movies data={latestadded} />
                <Movies data={latestadded} />
                <Movies data={latestadded} />
                <Movies data={latestadded} />
                <Movies data={latestadded} />
                <Movies data={latestadded} />
                <Movies data={latestadded} />
            </div>
        </>
    )
}