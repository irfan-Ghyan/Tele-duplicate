import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
// import useWhyteleiosData from '../useWhyteleiosData';

const WhyteleiosData = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const domes = [
    {  imageUrl: '/assets/images/education/edu1.png' },
    {  imageUrl: '/assets/images/education/edu2.png' },
    {  imageUrl: '/assets/images/education/edu3.png' },
   
  ];


  useEffect(() => {
    if (domes.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % domes.length);
      }, 3000); 

      return () => clearInterval(interval);
    }
  }, [domes]);

  const scrollToSection = () => {
    const targetSection = document.getElementById('target-section');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
    <Head>
     <link rel="preload" href="/assets/images/education/edu1.png" as="image" />
     <link rel="preload" href="/assets/images/education/edu2.png" as="image" />
     <link rel="preload" href="/assets/images/education/edu3.png" as="image" />
   </Head>
    <div className="max-w-7xl px-4 md:px-8 mx-auto">
      <div className="inset-0 px-4 md:pr-6 py-[34px] md:py-[100px]">
        <h1 className="text-[24px] md:text-[54px] text-white font-black text-center font-orbitron">
          DISCOVER TELEIOS UNFORGETTABLE EDUCATIONAL EXPERIENCES
        </h1>

        <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start ">
          <div className="order-2 lg:order-1 flex flex-col lg:items-start lg:text-left w-full lg:w-1/2 lg:pr-8 lg:py-0 ">
            <div className="py-[40px]">
              <h2 className="text-[23px] text-white font-bold font-orbitron ">
                Why Teleios?
              </h2>
              <p className="w-full xl:w-[600px] md:text-[14px] lg:text-[18px] text-white font-bold font-jura py-6 pr-6 leading-18 text-justify">
              Students are eager to learn about technology, and Teleios Factory provides a unique opportunity to dive into the world of racing simulators. They’ll discover how these advanced machines are built—from raw materials and electronics to the finished product, ready to race. As part of the experience, students will also attend a presentation on how Teleios began, the company's future plans, and the importance of marketing and networking in growing a successful business.<br/><br/>

The experience continues at Teleios Dome, where students can test drive the simulators and feel the excitement of high-speed racing. For some, it may be their first driving experience—a safe and exhilarating introduction to the world of motorsport. For others, it's a thrilling way to engage with cutting-edge technology.<br/><br/>

This comprehensive program is both educational and exciting, guaranteed to spark discussions and leave a lasting impression on students.
              </p>
              <button
                onClick={scrollToSection}
                className="button-slanted w-[200px] lg:w-[233px] h-[44px] px-8 py-6 button font-jura font-bold bg-gradient-to-r from-[#7E51F8] to-[#D007A6] text-white ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center"
              >
                <span className="button-slanted-content">ENQUIRY NOW</span>
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2 w-full lg:w-1/2 flex justify-center lg:justify-end lg:py-0 overflow-hidden relative">
            {domes.length > 0 && (
              <Image
                src={domes[currentIndex].imageUrl}
                width={520}
                height={566}
                alt={domes[currentIndex].title}
                className="w-full lg:w-auto lg:max-w-sm xl:max-w-md h-auto transition-opacity duration-1000 ease-in-out  mt-[40px]"
                priority={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default WhyteleiosData;

