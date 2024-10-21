// Testimonial.js
'use client';

import React, { useRef, useState } from 'react';
import Logos from './logos/Logos';
import Image from 'next/image';
import leftArrow from '../../../public/assets/icons/left.png';
import rightArrow from '../../../public/assets/icons/right.png';

export default function Partners() {
  const scrollContainerRef = useRef(null);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const partners = [
    { title: '', description: '', imageUrl: '/assets/images/logo-s1.png' },
    { title: '', description: '', imageUrl: '/assets/images/logo-s2.png' },
    { title: '', description: '', imageUrl: '/assets/images/logo-s3.png' },
    { title: '', description: '', imageUrl: '/assets/images/logo-s4.png' },
    { title: '', description: '', imageUrl: '/assets/images/logo-s1.png' },
    { title: '', description: '', imageUrl: '/assets/images/logo-s2.png' },
    { title: '', description: '', imageUrl: '/assets/images/logo-s3.png' },
    { title: '', description: '', imageUrl: '/assets/images/logo-s4.png' },
  ];


  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300 + 16, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -(300 + 16), behavior: 'smooth' });
    }
  };

  const goToEvent = (index) => {
    setCurrentEventIndex(index);
    const scrollX = index * 300;
    scrollContainerRef.current.scrollLeft = scrollX;
  };

  return (
    <div className='w-full max-w-full overflow-hidden px-4 relative md:pr-6 padding-px lg:px-40 py-[40px] md:py-[50px] lg:py-[100px]'>
      <div className="mx-auto py-8">
        <div className='border-solid border-b-[1px] border-white border-opacity-50 text-end'></div>
        <div className='md:flex md:justify-between'>
          <div>
            <h1 className='text-[34px] mt-6 md:text-[54px] text-white font-black font-orbitron'>OUR PARTNERS</h1>
          </div>
          <div className="top-buttons items-center">
            <div className='mt-[20px] md:mt-[0px] w-65 h-45'>
              <button
                onClick={scrollPrev}
                className="button-slanted  cursor-pointer flex items-center justify-center px-6 py-4 border-[0.5px] border-opacity-30 border-white font-jura font-bold text-white hover:bg-gradient-to-r ml-2 hover:from-[#D00746] hover:to-[#7E51F8] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0"
              >
                <Image src={leftArrow} alt="arrow" width={12} height={11} />
              </button>
            </div>
            <div className='mt-[20px] md:mt-[0px] w-65 h-45'>
              <button
                onClick={scrollNext}
                className="button-slanted cursor-pointer flex items-center justify-center px-6 py-4 border-[0.5px] border-opacity-30 border-white font-jura font-bold text-white hover:bg-gradient-to-r ml-2 hover:from-[#D00746] hover:to-[#7E51F8] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0"
              >
                <Image src={rightArrow} alt="arrow" width={12} height={11} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-automd:py-12">
      <div className="scroll-container flex justify-between overflow-hidden my-6" ref={scrollContainerRef}>
      {partners.map((partner, index) => (
        <div key={index} className="card-wrapper3">
          <Logos
            title={partner.title}
            description={partner.description}
            imageUrl={partner.imageUrl}
          />
          {index === 0 && (
            <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2 flex mb-4">
              {partners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToEvent(idx)}
                  className={`bg-[#ffffff] opacity-${currentEventIndex === idx ? 100 : 30} hover:opacity-100 w-2 h-2 rounded-full flex justify-center items-center mx-1`}
                  style={{ transition: 'opacity 0.3s' }}
                >
                </button>
              ))}
            </div>
          )}
        </div>
          ))}
        </div>
      </div>
    </div>
  );
}
