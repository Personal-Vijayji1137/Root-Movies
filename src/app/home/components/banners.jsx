import Image from "next/image"
import Link from "next/link"
import Styles from "./style.module.css"
import Movies from "./movies"
export default async function Banner() {
    return (
        <div className={Styles.Banner}>
            <img src="https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/4777/1730131864777-i" alt="" />
            <div>
                <div className={Styles.BgImageName}>
                    <div>
                        <img src="https://img10.hotstar.com/image/upload/f_auto,h_148/sources/r1/cms/prod/5466/1730131845466-t" alt="" />
                        <div id={Styles.AboutMovie}>
                            <div>2024</div>
                            <span></span>
                            <div>5 Season</div>
                            <span></span>
                            <div>Hindi</div>
                            <span></span>
                            <div>U/A 13+</div>
                        </div>
                        <p>Hanuman descends into Patal Loka to save the divine princes. As he navigates this mysterious world, Ahiravan unleashes his cataclysmic plan.</p>
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
                        <Link href="/">Watch Now</Link>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}