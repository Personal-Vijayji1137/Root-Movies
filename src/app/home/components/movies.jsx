import Link from "next/link"
import Styles from "./style.module.css"
export default async function Movies({ data }) {
    return (
        <div className={Styles.Clrousal}>
            <div>
                <div>Latest Movies</div>
                <div>View All</div>
            </div>
            <div>
                {data.map((item,index)=>{
                    return <Link href={`/home/${item.movie_id}/${item.name.split(" ").join("_")}`} key={index}>
                        <img src={item.image} alt={item.name}/>
                    </Link>
                })}
            </div>
        </div>
    )
}