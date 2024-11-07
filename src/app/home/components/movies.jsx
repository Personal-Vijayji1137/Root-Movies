import Link from "next/link"
import Styles from "./style.module.css"
import RootGetCustomImagesURL from "@/app/CommonFunctions"
export default async function Movies({ data }) {
    return (
        <div className={Styles.Clrousal}>
            <div>
                <div>Latest Movies</div>
                <div>View All</div>
            </div>
            <div>
                {data.map(async(item,index)=>{
                    return <Link href={`/home/${item.movie_id}/${item.title.split(" ").join("_")}`} key={index}>
                        <img src={await RootGetCustomImagesURL(item.poster_url,300)} alt={item.name}/>
                    </Link>
                })}
            </div>
        </div>
    )
}