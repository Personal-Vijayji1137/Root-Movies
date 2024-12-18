"use server"
import { Root_Movies_DB } from "@/app/layout";
import Styles from "../components/style.module.css"
import { unstable_noStore as noStore } from 'next/cache';
import Link from "next/link";
import jwt from "jsonwebtoken"
import RootGetCustomImagesURL from "@/app/CommonFunctions";
import VideoPlayer from "./player";
import GeneratePresignedUrls from "@/app/server/generatePresignedUrl";
export default async function AddAct({ params, searchParams }) {
    noStore();
    const { movie } = await params;
    if (movie[2] && movie[2] == "watch") {
        try {
            const { token } = await searchParams;
            const decodedToken = jwt.verify(token, process.env.ROOT_SECRET_KEY_FOR_TOKEN_USES);
            const quary = decodedToken.videoParams.split("&");
            let KeyArray = [];
            for(let a = 0;a<quary.length;a++){
                const aaaa = quary[a].split("=");
                console.log("Token is valid", aaaa);
                if(aaaa[0] == 'Qu480'){
                    KeyArray.push({ quality: 480, key: aaaa[1] });
                }else if(aaaa[0] == 'Qu720'){
                    KeyArray.push({ quality: 720, key: aaaa[1] });
                }else if(aaaa[0] == 'Qu1080'){
                    KeyArray.push({ quality: 1080, key: aaaa[1] });
                }
            }
            const videoSources = await GeneratePresignedUrls(KeyArray);
            return <VideoPlayer videoSources={videoSources} name={(KeyArray[0].key).split("/")[0]} />
        } catch (error) {
            console.error("Token is invalid", error);
            return <div>Invalid token. Please try again.</div>;
        }
    }
    const [result, links] = await Promise.all([
        Root_Movies_DB(
            `SELECT * FROM movie WHERE movie_id = ?`,
            [movie[0]]
        ),
        Root_Movies_DB(
            `SELECT * FROM movie_links WHERE movie_id = ?`,
            [movie[0]]
        )
    ]);
    const videoParams = links.map((item) => `Qu${item.quality}=${item.url}`).join("&");
    const expiration = Math.floor(Date.now() / 1000) + 2 * 60;
    const claims = {
        exp: expiration,
        videoParams,
    };
    const token = jwt.sign(claims, process.env.ROOT_SECRET_KEY_FOR_TOKEN_USES);
    const data = result[0];
    return <div className={Styles.Banner}>
        <img src={await RootGetCustomImagesURL(data.poster_url, 1500)} alt="" />
        <div style={{ height: '100dvh' }}>
            <div className={Styles.BgImageName}>
                <div>
                    <img src={await RootGetCustomImagesURL(data.name_image_url, 500)} alt="" />
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
                    <Link href={`/home/${movie[0]}/${movie[1]}/watch?token=${token}`}>Watch Now</Link>
                </div>
                <div></div>
            </div>
        </div>
    </div>
}