'use client';

import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
// import slide from '../../../public/assets/images/slide1.png';
// import slide1 from '../../../public/assets/images/slide2.png';
// import slide2 from '../../../public/assets/images/dome/pic-101.jpg';
// import slide3 from '../../../public/assets/images/dome/pic-102.jpg';

// Custom Arrow components
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
    <div className="slider-wrapper h-auto py-[40px] lg:py-[80px]">
      <h1 className="text-[32px] md:text-[54px] mb-4 text-white font-black text-center font-orbitron">{t('WHAT_TO_EXPECT')}</h1>
      <div className="slider-container py-4 relative">
        <Slider {...settings}>
          <div className="slide">
            <Image src="/assets/images/dome/slide1.png" alt="Slide1" width={1400} height={569} />
          </div>
          <div className="slide">
            <Image src="/assets/images/dome/slide2.png" alt="Slide2" width={1400} height={569} />
          </div>
          <div className="slide">
            <Image src="/assets/images/dome/pic-101.jpg" alt="Slide3" width={1400} height={569} />
          </div>
          <div className="slide">
            <Image src="/assets/images/dome/pic-102.jpg" alt="Slide4" width={1400} height={569} />
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
  );
};

export default FullWidthSlider;

