// 'use client';

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image'; 
// import leftArrow from '../../../public/assets/images/dome/left-arrow.png'; 
// import rightArrow from '../../../public/assets/images/dome/righ-arrow.png'; 
// import Head from 'next/head';
// import { useTranslation } from 'react-i18next';

// const Dome = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const { t } = useTranslation();
//   const domes = [
//     { title: t('VENUES_BRANDING'), imageUrl: '/assets/images/dome/bg-6.png' },
//     { title: t('VENUES_BRANDING'), imageUrl: '/assets/images/dome/bg-5.png' },
//     { title: t('VENUES_BRANDING'), imageUrl: '/assets/images/dome/bg-7.png' },
//     { title: t('VENUES_BRANDING'), imageUrl: '/assets/images/dome/bg-8.jpg' },
//     { title: t('VENUES_BRANDING'), imageUrl: '/assets/images/dome/bg-2.png' },
//     { title: t('VENUES_BRANDING'), imageUrl: '/assets/images/dome/bg-1.png' },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === (domes?.length ?? 0) - 1 ? 0 : prev + 1));
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [domes]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev === (domes?.length ?? 0) - 1 ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? (domes?.length ?? 0) - 1 : prev - 1));
//   };

//   if (!domes || domes.length === 0) {
//     return <div>No data available</div>;
//   }

//   return (
//     <>
//      <Head>
//       <link rel="preload" href="/assets/images/dome/bg-6.png" as="image" />
//       <link rel="preload" href="/assets/images/dome/bg-5.png" as="image" />
//       <link rel="preload" href="/assets/images/dome/bg-7.png" as="image" />
//       <link rel="preload" href="/assets/images/dome/bg-8.jpg" as="image" />
//       <link rel="preload" href="/assets/images/dome/bg-2.png" as="image" />
//       <link rel="preload" href="/assets/images/dome/bg-1.png" as="image" />

//     </Head>
//     <div className="relative w-full h-[600px] lg:h-[1000px] max-w-full overflow-hidden flex">
//       {domes.map((dome, index) => (
//         <div
//           key={index}
//           className={`absolute w-full h-full transition-opacity lg:p-20 sm:p-4 duration-1000 ease-in-out ${
//             index === currentSlide ? 'opacity-100' : 'opacity-0'
//           }`}
//           style={{
//             backgroundImage: `url(${dome.imageUrl})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         >
//           <div className="flex flex-col px-4 lg:px-40 padding-px items-start justify-end h-full bg-opacity-50 pb-10 max-w-7xl md:px-8 mx-auto">
//             <h2 className="text-[24px] drop-shadow-lg md:text-[54px] text-[#c09e5f] font-black font-orbitron w-[400px]">
//               {dome.title}
//             </h2>
//           </div>

//           {/* Arrow Navigation */}
//           <button
//             onClick={prevSlide}
//             className="absolute top-[50%]  left-0 lg:left-20 transform -translate-y-1/2 z-10"
//           >
//             <Image src={leftArrow} alt="Previous" width={20} height={20} className='w-5 h-5 lg:w-10 lg:h-10' />
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute top-[50%]  right-0 lg:right-20 transform -translate-y-1/2 z-10"
//           >
//             <Image src={rightArrow} alt="Next" width={20} height={20} className='w-5 h-5 lg:w-10 lg:h-10' />
//           </button>

//           <div className="absolute bottom-6 lg:bottom-20 left-2/4 transform -translate-x-1/2 flex space-x-4 max-w-7xl md:px-8 mx-auto">
//             {domes.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`p-[2px] w-[45px] md:w-[100px] lg:w-[145px] xl:w-[190px] ${
//                   index === currentSlide ? 'bg-[#c09e5f]' : 'bg-[#c09e5f] bg-opacity-50 hover:bg-opacity-100'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//     </>
//   );
// };

// export default Dome;


'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; 
import leftArrow from '../../../public/assets/images/dome/left-arrow.png'; 
import rightArrow from '../../../public/assets/images/dome/righ-arrow.png'; 
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const Dome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();
  const domes = [
    { title: t('VENUES_BRANDING'), imageUrl: '/assets/images/dome/bg-6.png' },
    { title: t('VENUES_BRANDING'), imageUrl: '/assets/images/dome/bg-5.png' },
    { title: t('VENUES_BRANDING'), imageUrl: '/assets/images/dome/bg-7.png' },
    { title: t('VENUES_BRANDING'), imageUrl: '/assets/images/dome/bg-8.jpg' },
    { title: t('VENUES_BRANDING'), imageUrl: '/assets/images/dome/bg-2.png' },
    { title: t('VENUES_BRANDING'), imageUrl: '/assets/images/dome/bg-1.png' },
  ];

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

  if (!domes || domes.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <>
      <Head>
        <link rel="preload" href="/assets/images/dome/bg-6.png" as="image" />
        <link rel="preload" href="/assets/images/dome/bg-5.png" as="image" />
        <link rel="preload" href="/assets/images/dome/bg-7.png" as="image" />
        <link rel="preload" href="/assets/images/dome/bg-8.jpg" as="image" />
        <link rel="preload" href="/assets/images/dome/bg-2.png" as="image" />
        <link rel="preload" href="/assets/images/dome/bg-1.png" as="image" />
      </Head>
      <div className="relative w-full h-[600px] lg:h-[1000px] max-w-full overflow-hidden flex">
        {domes.map((dome, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity lg:p-20 sm:p-4 duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${dome.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Transparent Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80"></div>

            {/* Content */}
            <div className="relative flex flex-col px-4 lg:px-40 padding-px items-start justify-end h-full bg-transparent pb-10 max-w-7xl md:px-8 mx-auto">
              <h2 className="text-[24px] drop-shadow-lg md:text-[54px] text-[#c09e5f] font-black font-orbitron w-[400px]">
                {dome.title}
              </h2>
            </div>

            {/* Arrow Navigation */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 lg:left-20 transform -translate-y-1/2 z-20"
            >
              <Image src={leftArrow} alt="Previous" width={20} height={20} className='w-5 h-5 lg:w-10 lg:h-10' />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 lg:right-20 transform -translate-y-1/2 z-20"
            >
              <Image src={rightArrow} alt="Next" width={20} height={20} className='w-5 h-5 lg:w-10 lg:h-10' />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 lg:bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4 max-w-7xl md:px-8 mx-auto z-20">
              {domes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`p-[2px] w-[45px] md:w-[100px] lg:w-[145px] xl:w-[190px] ${
                    idx === currentSlide
                      ? 'bg-[#c09e5f]'
                      : 'bg-[#c09e5f] bg-opacity-50 hover:bg-opacity-100'
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
