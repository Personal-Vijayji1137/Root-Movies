import Banner from "./components/banners";
import Movies from "./components/movies";
import Styles from "./components/style.module.css"
export default async function Home() {
    const data = [
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
        { image: "https://img10.hotstar.com/image/upload/l_discovery:PP:usp_callouts_on_artwork:New_Season:New_Season_Vertical/fl_relative,w_1.0/c_crop,fl_relative,w_1.0,h_1.0/fl_layer_apply/f_auto,q_90,w_256/sources/r1/cms/prod/4871/1730131824871-v", name: "Testing", movie_id: 23 },
    ];
    return (
        <>
            <Banner />
            <div className={Styles.CrousalBanner}>
                <Movies data={data} />
                <Movies data={data} />
                <Movies data={data} />
                <Movies data={data} />
                <Movies data={data} />
                <Movies data={data} />
                <Movies data={data} />
            </div>
        </>
    )
}