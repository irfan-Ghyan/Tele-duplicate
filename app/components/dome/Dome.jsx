'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import leftArrow from '../../../public/assets/images/dome/left-arrow.png';
import rightArrow from '../../../public/assets/images/dome/righ-arrow.png';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { getImageCall} from '../../utils/api';


const Dome = () => {
  const [domes, setDomes] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const url = `${baseUrl}/api/content/sections/Home`;
        const response = await fetch(url);
      
        if (!response.ok) {
          throw new Error("Failed to fetch data from the server");
        }

        const data = await response.json();
        const domeSection = data?.data?.sections.find((section) => section.title === "Dome");

        if (domeSection) {
          const groupedSlides = domeSection.section_fields.reduce((acc, field) => {
            const match = field.key.match(/(title|description)(\d*)/);
            if (match) {
              const [, type, index] = match;
              if (!acc[index]) acc[index] = {};
              acc[index][type] = field.value;
            }
            return acc;
          }, {});
         
          const slidesArray = Object.values(groupedSlides);

 
          const imagesResponse = await getImageCall(`${baseUrl}/api/content/getImages/Dome` );
          

          const imagesData = await imagesResponse.json();
         
          if (imagesData.success) {
           
            const images = imagesData.data.map((image) => image.url);
            
            let copies = Array(images.length).fill(slidesArray)
            const updatedDomes = copies.map((slide, index) => {
      
              return {
              ...(slide[0]),
              imageUrl: images[index],
            }});
            
            setDomes(updatedDomes);
            
          } else {
            throw new Error("Failed to fetch images from the server");
          }
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



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


  

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768); // Adjust as needed
  };

  handleResize();
  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
}, []);



  return (
    <>
      <Head>
        <link rel="preload" href="/assets/images/dome/teleiosx-s1.png" as="image" />
      </Head>
      <div className="relative w-full h-[700px] xl:h-[1000px] overflow-hidden flex justify-center items-center">
      
        {loading && <p className="text-[#e3ce90] text-xl">{t('LOADING')}</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && domes.map((dome, index) => (
         <div 
         key={index}
         className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
           index === currentSlide ? 'opacity-100' : 'opacity-0'
         } ${isMobile ? 'bg-[#002718]' : ''}`} 
         style={{
           backgroundImage: `url(${dome.imageUrl})`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat',
         }}
       >
            <div className="absolute inset-0 bg-[#002718] bg-opacity-80 md:bg-opacity-0 lg:bg-opacity-0 xl:bg-opacity-0 "></div>
              <div className="relative flex items-end justify-center h-full max-w-7xl mx-auto pb-[80px]">
                <div className='w-full p-8 lg:mb-[100px] pb-[100px]'>
                <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row  '>
                  <div className='w-full md:w-2/3 lg:w-2/3 '>
                <h2 className=" text-[64px] md:text-[54px] lg:text-[54px] text-[#C09E5F] font-black font-orbitron ">
                {t('dome.title')}
                </h2>
                <p className="text-[18px] text-opacity-[80%] leading-[20px] mb-8 text-[#FFFFFF] font-jura lg:w-[410px] md:w-[410px]">
                {t('dome.description')} 
                </p>
                <p className="text-[18px] text-opacity-[80%] leading-[20px] mb-4 text-[#FFFFFF] font-jura lg:w-[410px] md:w-[410px] ">
                {t('dome.description1')} 
                </p>
              {/* <div className='hidden md:block w-full md:w-1/3 lg:w-1/3 flex justify-start items-start md:justify-end md:items-end lg:justify-end lg:items-end mt-[20px] md:mt-[40px] lg:mt-[40px]'>
                <Link
                  href="/venue"
                  className="w-[233px] h-[51px] px-8 py-6 button-slanted font-jura leading-[24px] bg-[#C09E5F] font-bold text-[#002718]  rounded-tl-lg rounded-br-lg flex items-center justify-center transition duration-300"
                >
                  <span className="button-slanted-content font-jura text-[16px] font-bold">{t('Discover TeleiosX')}</span>
                </Link>
                </div> */}
                
              <div className="flex py-8 md:py-0 lg:py-0 block lg:hidden">
              <p className="font-bold font-jura text-[#C09E5F] text-[20px] md:text-[30px] lg:text-[30px] leading-[32px] pt-2 ">Ready to race?</p>
              <Link href="/bookracingexperience" className="button-slanted w-[162px] h-[51px] font-jura text-[16px] text-white font-bold leading-[24px] bg-[#F13936] cursor-pointer rounded-tl-lg rounded-br-lg flex items-center justify-center mx-2 md:mx-8 lg:mx-8">
                BOOK NOW
              </Link>
              </div>
                  </div>
                </div>
                </div>
                
                <div className="absolute">
                  {domes.map((_, index) => (
                    <button
                    key={`indicator-${index}`} 
                      onClick={() => setCurrentSlide(index)}
                      className={`p-[1px] w-[28px] md:w-[28px] lg:w-[28px] xl:w-[39px] h-[4px] ${index === currentSlide ? 'bg-[#C09E5F] rounded-[20px] mr-2' : 'bg-white hover:shadow-black-700 bg-opacity-[26%] rounded-[20px] hover:bg-opacity-100 mr-2'}`}
                    />
                  ))}
                </div>
              
              </div>
    
            {/* <button
              onClick={prevSlide}
              className="absolute top-[50%] left-0 xl:left-20 transform -translate-y-1/2 z-10"
            >
              <Image src={leftArrow} alt="Previous" width={20} height={20} className="w-5 h-5 lg:w-10 lg:h-10" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-[50%] right-0 xl:right-20 transform -translate-y-1/2 z-10"
            >
              <Image src={rightArrow} alt="Next" width={20} height={20} className="w-5 h-5 lg:w-10 lg:h-10" />
            </button>
   */}
          
           
          </div>
        ))}
      </div>
    </>
  );
};

export default Dome;
