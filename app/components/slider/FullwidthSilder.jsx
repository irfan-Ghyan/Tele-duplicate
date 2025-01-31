'use client';

import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const CustomPrevArrow = ({ onClick }) => (
  
  <button
    className="absolute left-0 lg:left-20 transform -translate-y-1/2 z-10 "
    style={{ top: '50%' }}
    onClick={onClick}
  >
    <Image src="/assets/images/dome/left-arrow.png" alt="Previous"  width={20} height={20} className='w-5 h-5 lg:w-10 lg:h-10' />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute  right-0 lg:right-20 transform -translate-y-1/2 z-10"
    style={{ top: '50%' }}
    onClick={onClick}
  >
    <Image src="/assets/images/dome/righ-arrow.png" alt="Next" width={20} height={20} className='w-5 h-5 lg:w-10 lg:h-10' />
  </button>
);

const FullWidthSlider = () => {
  const menuPdfUrl = "/Food_Menu.pdf";
  const { t } = useTranslation();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    centerMode: true,
    centerPadding: '20%',
    appendDots: dots => (
      <div
        style={{
          bottom: '-50px',
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div className="custom-dot"></div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: '10%',
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '5%',
        }
      }
    ]
  };

  return (
    <>
    <div className="mt-4 text-start mb-10 max-w-7xl mx-auto">
    <p className="text-[#e3ce90] font-jura text-[14px] lg:text-[18px] text-justify font-bold px-[8px] py-10 ">{t('WHAT_TO_EXPECT')}</p>
    <Link 
        href={menuPdfUrl} 
        download="Food_Menu.pdf" 
        className="px-4 py-2 bg-[#c09e5f] text-[#002718] rounded-lg font-bold hover:bg-[#e3ce90]"
    >
        Download Menu PDF
    </Link>
</div>
    <div className="slider-wrapper h-auto py-10 ">
     
      <div className="slider-container py-4 relative mb-20">
        <Slider {...settings}>
         
          <div className="slide">
            <Image src="/assets/images/dome/slide2.png" alt="Slide2" width={1400} height={569} />
          </div>

          <div className="slide">
            <Image src="/assets/images/dome/slide2.png" alt="Slide2" width={1400} height={569} />
          </div>

          <div className="slide">
            <Image src="/assets/images/dome/slide2.png" alt="Slide2" width={1400} height={569} />
          </div>
          <div className="slide">
            <Image src="/assets/images/dome/slide2.png" alt="Slide2" width={1400} height={569} />
          </div>
        
        </Slider>
      </div>

      <style jsx>{`
        .slider-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding-bottom: 50px;
        }
        .slider-container {
          position: relative;
          width: 100%;
        }
        .slide {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
        }
        :global(.slick-dots) {
          position: absolute;
          bottom: -30px;
          width: 100%;
          display: flex !important;
          justify-content: center;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        :global(.slick-dots li) {
          margin: 0 5px;
        }
        :global(.custom-dot) {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: white;
          border: 1px solid #ccc;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        :global(.slick-dots li.slick-active .custom-dot) {
          width: 14px;
          height: 14px;
          opacity: 1;
          background: white;
        }
      `}</style>
    </div>
    </>
  );
};

export default FullWidthSlider;

