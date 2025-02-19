'Use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const Corprate = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState(""); 
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const url = `${baseUrl}/api/content/getMainVideo`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch video data.");
        }

        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setVideoUrl(data.data[0].url);
        } else {
          console.error("No video data available.");
        }
      } catch (error) {
        console.error("Error fetching video:", error.message);
      }
    };

    fetchVideo();
  }, []);

  return (
    <div className="w-full md:px-4 lg:px-[0px] xl:px-[0px] max-w-full overflow-hidden">
      <div className='flex flex-col justify-between'>
        <div className='mt-10 md:mt-10'>
          <div className="w-full relative" style={{ paddingBottom: '56.25%', height: 0 }}>
            <video
              ref={videoRef}
              preload="auto"
              className="absolute w-full h-full object-cover z-0"
              onClick={handlePlayPause}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              src={videoUrl}
            >
              <source src={videoUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="w-[49px] h-[33px] md:w-[99px] md:h-[69px] bg-gradient-to-r from-[#7E51F8] to-[#cc0aa9] p-2 flex items-center justify-center"
                  onClick={handlePlayPause}
                >
                  <Image src="/assets/video/play.png" width={40} height={40} alt='play'/>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corprate;
