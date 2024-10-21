'use client';

import React, { useState } from 'react';
import Link from 'next/link';
// import useCorporateData from '../useCorporateData';
import Image from 'next/image';

const Corprate = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  // const { corporates, loading } = useCorporateData();

  const handlePlayPause = () => {
    const video = document.getElementById('video');
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  // if (loading) {
  //   return <div className='text-white'>Loading...</div>;
  // }

  return (
    <div className="w-full md:px-4 lg:px-[0px] xl:px-[0px] max-w-full overflow-hidden  ">
      {/* <div className='border-solid border-b-[1px] border-white border-opacity-50 text-end'>
        <h1 className='text-[14px] text-white opacity font-normal font-orbitron pb-4'>CORPORATE EVENTS</h1>
      </div> */}
      <div className='flex flex-col justify-between '>
  
          {/* <div >
            <h1 className='text-[32px] md:text-[54px] text-white font-black font-orbitron'>
            CORPORATE EVENTS & CELEBRATION 
            </h1>
            <p className='text-[14px] md:text-[18px] text-white font-bold font-jura mt-6'>
            From Corporate milestones to personal celebrations, Teleios Dome is your premier destination for private events Whether you&apos;re planning a corporate gathering, product launch, team-building session, or personal celebration, our versatile venue and dedicated team ensure an unforgettable experience tailored to your needs.
            </p>
          </div> */}

        <div className='mt-10 md:mt-10'>
          <div className="w-full relative" style={{ paddingBottom: '56.25%', height: 0 }}>
            <video
              id="video"
              className="absolute top-0 left-0 w-full h-full"
              onClick={handlePlayPause}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/assets/video/dome.webm" type="video/mp4"  preload="auto" />
            </video>
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="w-[49px] h-[33px] md:w-[99px] md:h-[69px] bg-gradient-to-r from-[#7E51F8] to-[#cc0aa9] p-2 flex items-center justify-center"
                  onClick={handlePlayPause}
                >
                  {/* <span className="text-white md:text-[40px] ">▶</span> */}
                      <Image src="/assets/video/play.png" width={40} height={40} alt='play'/>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex items-center justify-between">
      </div>
      <div className="flex justify-center">
        <div className='py-8 button-slanted'>
          <Link href="/corporateevents" className="w-[200px] h-[34px] lg-[233px] lg:h-[44px] px-8 py-3 bg-opacity-50 buton border-[1px] border-white font-jura font-bold text-white hover:bg-gradient-to-r ml-2 hover:from-[#D007A6] hover:to-[#7E51F8] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
            <span className='button-slanted-content'>FIND OUT MORE</span>
          </Link>
        </div>
      </div> */}
    </div>
  );
};

export default Corprate;
