// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import leftArrow from '../../../public/assets/images/dome/left-arrow.png';
// import rightArrow from '../../../public/assets/images/dome/righ-arrow.png';
// import Head from 'next/head';
// import { useTranslation } from 'react-i18next';

// const Dome = () => {
//   const [domes, setDomes] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const sliderRef = React.useRef(null);
//   const { t, i18n } = useTranslation();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const url = "http://192.168.70.205:8000/api/content/sections/Home";
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         const sections = data?.data?.sections || [];

//         const domeSection = sections.find(section => section.title === "Dome");

//         if (domeSection) {
//           const domeSlides = domeSection.section_fields.map(field => ({
//             title: field.key === 'title' ? field.value : 'DOME',
//             description: field.key === 'description' ? field.value : 'Default description',
//             imageUrl: field.key === 'imageUrl' ? field.value : '/assets/images/dome/default.jpg',
//           }));
//           setDomes(domeSlides);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

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

//   return (
//     <>
//       <Head>
//         <link rel="preload" href="/assets/images/dome/S1.png" as="image" />
//       </Head>
//       <div className="relative w-full h-[700px] xl:h-[1000px] overflow-hidden flex justify-center items-center">
//         {domes.map((dome, index) => (
//           <div
//             key={index}
//             className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
//               index === currentSlide ? 'opacity-100' : 'opacity-0'
//             }`}
//             style={{
//               backgroundImage: `url(${dome.imageUrl})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//             }}
//           >
//             <div className="absolute inset-0 bg-[#002718] bg-opacity-60 lg:bg-opacity-30%"></div>
//             <div className="relative flex flex-col items-start justify-end h-full p-9 max-w-7xl mx-auto pb-40">
//               <h2 className="text-[32px] md:text-[54px] mb-4 text-[#e3ce90] font-black font-orbitron">{dome.title}</h2>
//               <p className="text-[18px] mb-4 text-[#c09e5f] font-jura font-black leading-7 text-justify">{dome.description}</p>
//               <Link
//                 href="/dome"
//                 className="w-[220px] lg:w-[233px] h-[44px] px-8 py-6 button-slanted font-jura font-bold bg-gradient-to-r from-[#e3ce90] to-[#c09e5f] text-white rounded-tl-lg rounded-br-lg flex items-center justify-center transition duration-300"
//               >
//                 <span className="button-slanted-content">{t('Discover the Dome')}</span>
//               </Link>
//             </div>

//             {/* Arrow Navigation */}
//             <button
//               onClick={prevSlide}
//               className="absolute top-[50%] left-0 xl:left-20 transform -translate-y-1/2 z-10"
//             >
//               <Image src={leftArrow} alt="Previous" width={20} height={20} className="w-5 h-5 lg:w-10 lg:h-10" />
//             </button>
//             <button
//               onClick={nextSlide}
//               className="absolute top-[50%] right-0 xl:right-20 transform -translate-y-1/2 z-10"
//             >
//               <Image src={rightArrow} alt="Next" width={20} height={20} className="w-5 h-5 lg:w-10 lg:h-10" />
//             </button>

//             {/* Slide Indicators */}
//             <div className="absolute bottom-20 left-2/4 transform -translate-x-1/2 flex space-x-4 max-w-7xl md:px-8 mx-auto">
//               {domes.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentSlide(index)}
//                   className={`p-[2px] w-[45px] md:w-[100px] lg:w-[145px] xl:w-[190px] ${
//                     index === currentSlide ? 'bg-white ml-4' : 'bg-white bg-opacity-50 hover:bg-opacity-100 ml-4'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Dome;


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

const Dome = () => {
  const [domes, setDomes] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = React.useRef(null);
  const { t, i18n } = useTranslation();
  const [slides, setSlides] = useState([]); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://192.168.70.205:8000/api/content/sections/Home";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data)

        const domeSection = data?.data?.sections.find(section => section.title === "Dome");

        if (domeSection) {
          // Group fields by index (e.g., title1, description1)
          const groupedSlides = domeSection.section_fields.reduce((acc, field) => {
            const match = field.key.match(/(title|description)(\d*)/); // Match "title1", "description1"
            if (match) {
              const [, type, index] = match;
              if (!acc[index]) acc[index] = {};
              acc[index][type] = field.value;
            }
            return acc;
          }, {});

          // Convert groupedSlides into an array
          const slidesArray = Object.values(groupedSlides);
          setDomes(slidesArray);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-[#002718] bg-opacity-60 lg:bg-opacity-30%"></div>
            <div className="relative flex flex-col items-start justify-end h-full p-9 max-w-7xl mx-auto pb-40">
              <h2 className="text-[32px] md:text-[54px] mb-4 text-[#e3ce90] font-black font-orbitron">
                {dome.title}
              </h2>
              <p className="text-[18px] mb-4 text-[#c09e5f] font-jura font-black leading-7 text-justify">
                {dome.description}
              </p>
              <Link
                href="/dome"
                className="w-[220px] lg:w-[233px] h-[44px] px-8 py-6 button-slanted font-jura font-bold bg-gradient-to-r from-[#e3ce90] to-[#c09e5f] text-[#002718]  rounded-tl-lg rounded-br-lg flex items-center justify-center transition duration-300"
              >
                <span className="button-slanted-content">{t('Discover the Dome')}</span>
              </Link>
            </div>
  
          
            <button
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
  
            {/* Slide Indicators */}
            <div className="absolute bottom-20 left-2/4 transform -translate-x-1/2 flex space-x-4 max-w-7xl md:px-8 mx-auto">
              {domes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`p-[2px] w-[45px] md:w-[100px] lg:w-[145px] xl:w-[190px] ${
                    index === currentSlide ? 'bg-[#e3ce90] ml-4' : 'bg-white bg-opacity-50 hover:bg-opacity-100 ml-4'
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


