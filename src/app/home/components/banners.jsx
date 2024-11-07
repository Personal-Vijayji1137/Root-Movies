import Image from "next/image"
import Link from "next/link"
import Styles from "./style.module.css"
import Movies from "./movies"
import RootGetCustomImagesURL from "@/app/CommonFunctions"
export default async function Banner({data}) {
    return (
        <div className={Styles.Banner}>
            <img src={await RootGetCustomImagesURL(data.poster_url,1500)} alt="" />
            <div>
                <div className={Styles.BgImageName}>
                    <div>
                        <img src={await RootGetCustomImagesURL(data.name_image_url,500)} alt="" />
                        <div id={Styles.AboutMovie}>
                            <div>{data.release_year}</div>
                            <span></span>
                            <div>{data.type}</div>
                            <span></span>
                            <div>{data.language}</div>
                            <span></span>
                            <div>{data.ua}</div>
                        </div>
                        <p>{data.description}</p>
                        <div id={Styles.Cast}>
                            <div>Cast :- </div>
                            <div>Vijay</div>
                            <span>|</span>
                            <div>Raman</div>
                            <span>|</span>
                            <div>Raju</div>
                        </div>
                    </div>
                </div>
                <div className={Styles.BottonBanner}>
                    <div>
                        <Link href={`/home/${data.movie_id}/${data.title.split(" ").join("_")}`}>Watch Now</Link>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}