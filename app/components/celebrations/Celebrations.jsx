
'use client';

import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import slide from '../../../public/assets/images/dome/pic-7.jpg';
import slide1 from '../../../public/assets/images/dome/pic-100.jpg';
import slide2 from '../../../public/assets/images/dome/Birthday1.jpg';
import slide3 from '../../../public/assets/images/dome/pic-6.jpg';
import slide4 from '../../../public/assets/images/dome/pic-93.jpg';
import slide5 from '../../../public/assets/images/dome/pic-184.png';
import leftArrow from '../../../public/assets/images/dome/left-arrow.png'; 
import rightArrow from '../../../public/assets/images/dome/righ-arrow.png';

const Celebrations = () => {
  const sliderRef = React.useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: '20%',
    appendDots: dots => (
      <div style={{ bottom: '-50px' }}>
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    customPaging: i => <div className="custom-dot"></div>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: '10%',
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '5%',
        },
      },
    ],
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="slider-wrapper h-auto py-[40px]">
      <h1 className="text-[32px] md:text-[54px] mb-4 text-white font-black text-center font-orbitron">
        CELEBRATIONS
      </h1>
      <p className="text-[14px] md:text-[18px] mb-4 text-center text-white font-black text-balance font-jura px-[40px]">
        Celebrate in style at Teleios Dome. Our high-tech yet cozy atmosphere, top-notch amenities, and state-of-the-art racing simulators create an unforgettable backdrop for any occasion. From birthdays and stag dos to graduations and beyond, we will tailor an experience your guests will never forget.
      </p>
      <div className="slider-container py-4 relative">
        <Slider ref={sliderRef} {...settings}>
          <div className="slide">
            <Image src={slide} alt="Slide1" width={1400} height={569} />
          </div>
          <div className="slide">
            <Image src={slide1} alt="Slide2" width={1400} height={569} />
          </div>
          <div className="slide">
            <Image src={slide2} alt="Slide3" width={1400} height={569} />
          </div>
          <div className="slide">
            <Image src={slide3} alt="Slide4" width={1400} height={569} />
          </div>
          <div className="slide">
            <Image src={slide4} alt="Slide5" width={1400} height={569} />
          </div>
          <div className="slide">
            <Image src={slide5} alt="Slide6" width={1400} height={569} />
          </div>
        </Slider>

        {/* Custom Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-0 lg:left-20 transform -translate-y-1/2 z-10"
          style={{ top: '50%' }}
        >
          <Image src={leftArrow} alt="Previous" width={40} height={40} className='w-5 h-5 lg:w-10 lg:h-10'/>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0 lg:right-20 transform -translate-y-1/2 z-10 "
          style={{ top: '50%' }}
          >
          <Image src={rightArrow} alt="Next" width={40} height={40} className='w-5 h-5 lg:w-10 lg:h-10'/>
        </button>
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
        .left-arrow,
        .right-arrow {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5);
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Celebrations;
