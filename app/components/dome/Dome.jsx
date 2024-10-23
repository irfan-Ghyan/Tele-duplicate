'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import useDomeData from '../../components/useDomeData';
import leftArrow from '../../../public/assets/images/dome/left-arrow.png'; 
import rightArrow from '../../../public/assets/images/dome/righ-arrow.png';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const Dome = () => {
  // const { domes, loading } = useDomeData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = React.useRef(null);
  const domes = [
    { title: 'DOME', description: 'The ultimate immersive entertainment experience for racing enthusiasts happens at Teleios Dome. State-of-the-art racing simulators, stylish lounge, VIP area, conference space, and gaming area await. Whether you are here for exhilarating races or social gatherings, Teleios Dome delivers an unforgettable experience.', imageUrl: '/assets/images/dome/S1.png' },
    { title: 'DOME', description: 'The ultimate immersive entertainment experience for racing enthusiasts happens at Teleios Dome. State-of-the-art racing simulators, stylish lounge, VIP area, conference space, and gaming area await. Whether you are here for exhilarating races or social gatherings, Teleios Dome delivers an unforgettable experience.', imageUrl: '/assets/images/dome/SS2.jpg' },
    { title: 'DOME', description: 'The ultimate immersive entertainment experience for racing enthusiasts happens at Teleios Dome. State-of-the-art racing simulators, stylish lounge, VIP area, conference space, and gaming area await. Whether you are here for exhilarating races or social gatherings, Teleios Dome delivers an unforgettable experience.', imageUrl: '/assets/images/dome/S3.jpg' },
    { title: 'DOME', description: 'The ultimate immersive entertainment experience for racing enthusiasts happens at Teleios Dome. State-of-the-art racing simulators, stylish lounge, VIP area, conference space, and gaming area await. Whether you are here for exhilarating races or social gatherings, Teleios Dome delivers an unforgettable experience.', imageUrl: '/assets/images/dome/S4.jpg' },
    { title: 'DOME', description: 'The ultimate immersive entertainment experience for racing enthusiasts happens at Teleios Dome. State-of-the-art racing simulators, stylish lounge, VIP area, conference space, and gaming area await. Whether you are here for exhilarating races or social gatherings, Teleios Dome delivers an unforgettable experience.', imageUrl: '/assets/images/dome/S5.JPG' },
    { title: 'DOME', description: 'The ultimate immersive entertainment experience for racing enthusiasts happens at Teleios Dome. State-of-the-art racing simulators, stylish lounge, VIP area, conference space, and gaming area await. Whether you are here for exhilarating races or social gatherings, Teleios Dome delivers an unforgettable experience.', imageUrl: '/assets/images/dome/S6.JPG' },
  ];
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === (domes?.length ?? 0) - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [domes]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === (domes?.length ?? 0) - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? (domes?.length ?? 0) - 1 : prev - 1));
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!domes || domes.length === 0) {
  //   return <div>No data available</div>;
  // }


  return (

    <>
    <Head>
        <link rel="preload" href="/assets/images/dome/S1.png" as="image" />
    </Head>
    <div className="relative w-full h-[700px] xl:h-[1000px] overflow-hidden flex justify-center items-center">
      {domes.map((dome, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${dome.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          
       <div className="absolute inset-0 bg-[#11072C] bg-opacity-60 lg:bg-opacity-30%"></div>
          <div className="relative flex flex-col items-start justify-end h-full p-9 max-w-7xl mx-auto pb-40">
            <h2 className="text-[32px] md:text-[54px] mb-4 text-white font-black font-orbitron ">{t('dome.title')}</h2>
            <p className="text-[18px] mb-4 text-white font-jura font-black leading-7 text-justify">{t('dome.description')}</p>
            <Link
              href="/dome"
              className="w-[220px] lg:w-[233px] h-[44px] px-8 py-6 button-slanted font-jura font-bold bg-gradient-to-r from-[#7E51F8] to-[#D007A6] text-white rounded-tl-lg rounded-br-lg flex items-center justify-center transition duration-300"
            >
              <span className='button-slanted-content'>{t('Discover the Dome')}</span>
            </Link>
          </div>
          {/* <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4">
            {domes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`p-[1px] w-[45px] md:w-[100px] lg:w-[145px] xl:w-[190px] ${
                  index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-100'
                }`}
              />
            ))}
          </div> */}

          {/* Arrow Navigation */}
          <button
            onClick={prevSlide}
            className="absolute top-[50%]  left-0 xl:left-20 transform -translate-y-1/2 z-10"
          >
            <Image src={leftArrow} alt="Previous" width={20} height={20} className='w-5 h-5 lg:w-10 lg:h-10' />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-[50%]  right-0 xl:right-20 transform -translate-y-1/2 z-10"
          >
            <Image src={rightArrow} alt="Next" width={20} height={20} className='w-5 h-5 lg:w-10 lg:h-10' />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-20 left-2/4 transform -translate-x-1/2 flex space-x-4 max-w-7xl md:px-8 mx-auto">
            {domes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`p-[2px] w-[45px] md:w-[100px] lg:w-[145px] xl:w-[190px] ${
                  index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-100'
                }`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Dome;

