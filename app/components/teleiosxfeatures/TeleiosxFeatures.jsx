// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import Head from 'next/head';
// import { useTranslation } from 'react-i18next';

// const TeleiosxFeatures= () => {
//   const { t } = useTranslation();

//     const domes = [
//       { title: t('Teleios_Heading'), description: t('Teleios_Descrption'), description1: t('Teleios_Descrption1'), description2: t('Teleios_Descrption2'), description3: t('Teleios_Descrption3'), },
//     ];

    
//   return (
//     <>
//      <Head>
//       <link rel="preload" href="/assets/images/experience/corbg.jpg" as="image" />
//     </Head>
//     <div className="relative w-full max-w-full overflow-hidden h-auto bg-cover bg-right lg:bg-right  px-4 md:px-0 " style={{ backgroundImage: "url('/assets/images/dome/S-dome4.jpg')" }}>
//  <div className="bg-[#002718] bg-opacity-80  xl:bg-opacity-0 px-4 md:flex md:flex-col md:pr-6  py-[20px] lg:py-[80px] xl:py-[80px] max-w-7xl mx-auto mt-[200px] sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 ">
//    <div className='px-4 flex flex-col justify-between md:mt-[36px] md:mb-[41px] max-w-7xl'>
//      {domes.map((dome, index) => (
//        <div key={index} className='py-[15px] lg:py-[50px] md:w-[400px] lg:w-[700px] xl:w-[700px] '>
//            {/* <h4 className='text-[34px] xl:text-[35px] text-[#D008A6] font-bold font-jura drop-shadow-4xl'>{dome.subtitle}</h4> */}
//          <h1 className='text-[24px] md:text-[34px] text-[#c09e5f] font-black font-orbitron drop-shadow-4xl'>{dome.title}</h1>
//          <p className='md:text-[14px] lg:text-[18px] text-[#e3ce90] font-black font-jura mt-6 text-justify'>{dome.description}</p>
//          <p className='md:text-[14px] lg:text-[18px] text-[#e3ce90] font-black font-jura mt-6 text-justify'>{dome.description1}</p>
//          <p className='md:text-[14px] lg:text-[18px] text-[#e3ce90] font-black font-jura mt-6 text-justify'>{dome.description2}</p>
//          <p className='md:text-[14px] lg:text-[18px] text-[#e3ce90] font-black font-jura mt-6 text-justify'>{dome.description3}</p>
//        </div>
//      ))}

//    </div>
   
//  </div>
// </div>
// </>
//   )
// }

// export default TeleiosxFeatures;


'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const TeleiosxFeatures = () => {
  const { t } = useTranslation();

  const domes = [
    {
      title: t('Teleios_Heading'),
      description: t('Teleios_Descrption'),
      description1: t('Teleios_Descrption1'),
      description2: t('Teleios_Descrption2'),
      description3: t('Teleios_Descrption3'),
    },
  ];

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Head>
        <link rel="preload" href="/assets/images/experience/corbg.jpg" as="image" />
      </Head>

      <div
        className={`relative w-full max-w-full overflow-hidden h-auto bg-cover bg-right lg:bg-right md:px-0`}
        style={!isSmallScreen ? { backgroundImage: "url('/assets/images/dome/S-dome4.jpg')" } : {}}
      >

 
        {isSmallScreen && (
          <div className="w-full">
            <img
              src="/assets/images/dome/S6.JPG"
              alt="Small Screen Image"
              className="w-full h-[300px]"
            />
          </div>
        )}

        <div className=" bg-opacity-80 xl:bg-opacity-0 px-4 md:flex md:flex-col md:pr-6 py-[20px] lg:py-[80px] xl:py-[80px] max-w-7xl mx-auto sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0">
          <div className="px-4 flex flex-col justify-between md:mt-[36px] md:mb-[41px] max-w-7xl">
            {domes.map((dome, index) => (
              <div key={index} className="py-[15px] lg:py-[50px] md:w-[400px] lg:w-[700px] xl:w-[700px]">
                <h1 className="text-[24px] md:text-[34px] text-[#c09e5f] font-black font-orbitron drop-shadow-4xl">{dome.title}</h1>
                <p className="md:text-[14px] lg:text-[18px] text-[#e3ce90] font-black font-jura mt-6 text-justify">{dome.description}</p>
                <p className="md:text-[14px] lg:text-[18px] text-[#e3ce90] font-black font-jura mt-6 text-justify">{dome.description1}</p>
                <p className="md:text-[14px] lg:text-[18px] text-[#e3ce90] font-black font-jura mt-6 text-justify">{dome.description2}</p>
                <p className="md:text-[14px] lg:text-[18px] text-[#e3ce90] font-black font-jura mt-6 text-justify">{dome.description3}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default TeleiosxFeatures;
