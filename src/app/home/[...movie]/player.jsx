"use client";
import Styles from "./player.module.css";
import { useEffect, useRef } from 'react';
import fluidPlayer from 'fluid-player';
export default function VideoPlayer({ videoSources, name }) {
  const videoRef = useRef(null);
  const playerInitialized = useRef(false);
  useEffect(() => {
    if (videoRef.current && !playerInitialized.current) {
      fluidPlayer(videoRef.current.id, {
        layoutControls: {
          autoplay: true,
          muted: true,
          allowTheatre: false,
          playbackRateEnabled: true,
          title: name,
          controlForwardBackward:{
            show:true
          },
          controlBar: {
            autoHideTimeout: 3,
            animated: true,
            autoHide:true,
            playbackRates:['x2', 'x1.5', 'x1', 'x0.5']
          },
        },
        vastOptions: {
          adList: [
            {
              roll: 'preRoll',
              vastTag: 'https://vast.yomeno.xyz/vast?spot_id=1423324',
            },
          ],
        },
      });
      playerInitialized.current = true;
    }
  }, []);
  return (
    <div className={Styles.VideoPlayer}>
      <video
        ref={videoRef}
        id="RootVideoId"
        controls
        preload="auto"
      >
        {videoSources.map((item, index)=>{
          return <source key={index} src={item.url} type="video/mp4" title={`${item.quality}`} />
        })}
      </video>
    </div>
  );
}