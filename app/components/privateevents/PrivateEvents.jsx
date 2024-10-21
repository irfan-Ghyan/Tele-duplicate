'use client';

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const PrivateEvents = () => {
  const trainings = [
    {
      title: 'Private Events',
      description:
        'Host an unforgettable private event at Teleios Dome, where you and your guests can experience the thrill of racing together in a professional level venue. Whether it\'s a corporate event, birthday party, or team-building exercise, we offer fully customizable packages tailored to your needs. Enjoy exclusive access to our simulators, lounge area, and personalized support to ensure your event is a winning experience.',
    },
  ];

  return (
    <>
     <Head>
        <link rel="preload" href="/assets/images/experience/S6-new1.jpg" as="image" />
      </Head>
    <div className="w-full max-w-full overflow-hidden lg:h-[750px] xl:h-[850px] bg-cover bg-left xl:bg-center px-4 sm:px-0 md:px-0 lg:px-0 xl:px-0" style={{ backgroundImage: "url('/assets/images/experience/S6-new1.jpg')" }}>
      <div className='w-full px-4 bg-[#11072C] bg-opacity-60 xl:bg-opacity-0'>
      <div className="inset-0 flex flex-col md:flex-row md:items-center md:justify-end px-4 md:pr-6 py-[20px] mt-[240px] sm:mt-[0px] md:mt-[0px] lg:mt-[0px] xl:mt-[0px] sm:pt-[100px] md:pt-[100px] lg:py-[100px] md:px-8  max-w-7xl mx-auto ">
        <div className="w-full flex flex-col text-end">
          <div className="border-solid border-b-[1px] border-white border-opacity-20">
            <h1 className="text-[14px] text-white font-normal font-orbitron pb-4 mt-10 md:mt-0">Private</h1>
          </div>
          <div className="flex flex-col justify-between md:mt-[36px] md:mb-[41px] md:items-end lg:items-end xl:items-end">
            {trainings.map((training, index) => (
              <div key={index} className="py-[30px] text-left">
                <h1 className="text-[34px] md:text-[54px] text-white font-black font-orbitron">{training.title}</h1>
                <p className="md:w-[400px] lg:w-[550px] xl:w-[600px] md:text-[14px] lg:text-[18px] text-white font-black font-jura mt-6 leading-7 text-justify">
                  {training.description}
                </p>
              </div>
            ))}
            <div className="flex justify-center lg:justify-start m-bottom">
          <div className='pt-4 pb-10'>
            <Link href="HTTPS://wa.me/971566628585" target="_blank" rel="noopener noreferrer" className="button-slanted w-[200px] lg:w-[233px] h-[44px] px-8 py-6 button font-jura font-bold border-[1px] border-white hover:bg-gradient-to-r hover:from-[#7E51F8] hover:to-[#D007A6] hover:border-0 text-white ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
            <span className='button-slanted-content'>ENQUIRE NOW</span>
            </Link>
          </div>
        </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default PrivateEvents;

