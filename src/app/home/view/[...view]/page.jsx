'use server'
import Link from "next/link";
import Image from "next/image";
import { Root_Movies_DB } from "@/app/layout";
import Styles from "./view.module.css"
import RootGetCustomImagesURL from "@/app/CommonFunctions";
export default async function Page({ params }){
    const data = await Root_Movies_DB(`
        SELECT poster_url, movie_id, title FROM movie ORDER BY created_at DESC LIMIT 50 OFFSET 0
    `);
    return(
        <>
        <div style={{backgroundColor:'#000'}}>
            <div className='m-5'>
                <div className={Styles.viewgrid}>
                    {data.map(async(item)=>{
                        return <div key={item.ID}>
                            <Link href={`/home/${item.movie_id}/${item.title.split(" ").join("_")}`}><img className={Styles.Images} src={await RootGetCustomImagesURL(item.poster_url,300)} alt={item.title} title={item.title}/></Link>
                        </div>
                    })}
                </div>
            </div>
        </div>
        {/* <div className={Styles.Button}>
            <Link className="bg-red-700 p-2 rounded-md m-3 text-center" style={{ width: '100px' }} href={back}>{page === 1 ? 'First Page' : 'Back'}</Link>
            <button className="bg-red-700 p-2 rounded-md m-3" style={{ width: '60px' }} disabled>{page}</button>
            <Link className="bg-red-700 p-2 rounded-md m-3 text-center" style={{ width: '100px' }} href={next}>{Data.length < 50 ? 'Last Page' : 'Next'}</Link>
        </div> */}
        </>
    )
}