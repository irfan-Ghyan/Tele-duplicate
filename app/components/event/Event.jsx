'use client';

import React, { useRef, useState} from 'react';
import EventCard from '../eventcard/EventCard';
import Link from 'next/link';
import Image from 'next/image';
import leftArrow from '../../../public/assets/icons/left.png';
import rightArrow from '../../../public/assets/icons/right.png';
import useEventData from '../../components/useEventData';

const Experience = () => {
  const scrollContainerRef = useRef(null);
  const { events, loading } = useEventData();
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  



  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 273 + 16, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -(273 + 16), behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const goToEvent = (index) => {
    setCurrentEventIndex(index);
    const scrollX = index * 300;
    scrollContainerRef.current.scrollLeft = scrollX;
  };

  return (
    <div className="w-full px-4 lg:px-[0px] xl:px-[0px] md:pr-6 relative py-[40px] md:py-[50px] lg:py-[100px]">
      <div className='border-solid border-b-[1px] border-white border-opacity-50 text-end'>
        <h1 className='text-[14px] text-white font-normal font-orbitron pb-4'>EVENTS</h1>
      </div>
      <div className='md:flex justify-between mt-[36px] lg:mb-[41px]'>
      <div className=''>
        <h1 className='text-[32px] md:text-[54px] text-white font-black font-orbitron mb-4'>
          UPCOMING EVENTS
        </h1>
      </div>
      <div className="flex top-buttons items-center">
          <div className='mt-8 md:mt-0 hidden lg:flex w-65 h-45'>
            <button
              onClick={scrollPrev}
              className="button-slanted cursor-pointer flex items-center justify-center px-4 py-3 border-[0.5px] border-opacity-30 border-white font-jura font-bold text-white hover:bg-gradient-to-r ml-2 hover:from-[#D00746] hover:to-[#7E51F8] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0"
            >
              <Image src={leftArrow} alt="arrow" width={24} height={24}  />
            </button>
          </div>
          <div className='mt-8 md:mt-0 hidden lg:flex w-65 h-45'>
            <button
              onClick={scrollNext}
              className=" button-slanted cursor-pointer flex items-center justify-center px-4 py-3 border-[0.5px] border-opacity-30 border-white font-jura font-bold text-white hover:bg-gradient-to-r ml-2 hover:from-[#D00746] hover:to-[#7E51F8] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0"
            >
              <Image src={rightArrow} alt="arrow" width={24} height={24} />
            </button>
          </div>
      </div>
        </div>
        <div className='flex flex-col'>
        <div className="scroll-container flex justify-between overflow-hidden my-6" ref={scrollContainerRef}>
      {events.map((event, index) => (
        <div key={index} className="card-wrapper1">
          <EventCard
            title={event.title}
            description={event.description}
            imageUrl={event.imageUrl}
            date={event.date}
          />
          {index === 0 && (
            <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2 flex mb-4">
              {events.map((_, idx) => (
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
      <div className="flex justify-center">
        <div className='pt-4 button-slanted'>
          <Link href="/explore" className="w-[200px] h-[34px] lg-[233px] lg:h-[44px] px-8 py-3 bg-opacity-50 buton border-[1px] border-white font-jura font-bold text-white hover:bg-gradient-to-r ml-2 hover:from-[#D00746] hover:to-[#7E51F8] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
            <span className='button-slanted-content'>SEE MORE</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Experience;
