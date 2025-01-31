'use client';

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const CorporateEvent = () => {
  const { t } = useTranslation();

    const domes = [
      { title: t('Corporate_Events_Heading'), description: t('Corporate_Events_Description') },
    ];

    
  return (
    <>
     <Head>
      <link rel="preload" href="/assets/images/experience/corbg.jpg" as="image" />
    </Head>
    <div className="relative w-full max-w-full overflow-hidden h-[850px] sm:h-[600px] md:h-[560px] lg:h-[700px] xl:h-[785px] bg-cover bg-right lg:bg-right  px-4 md:px-0 " style={{ backgroundImage: "url('/assets/images/experience/corbg.jpg')" }}>
 <div className="bg-[#002718] bg-opacity-80  xl:bg-opacity-0 px-4 md:flex md:flex-col md:pr-6  py-[20px] lg:py-[80px] xl:py-[80px] max-w-7xl mx-auto mt-[200px] sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 ">
   <div className='px-4 flex flex-col justify-between md:mt-[36px] md:mb-[41px]'>
     {domes.map((dome, index) => (
       <div key={index} className='py-[15px] lg:py-[50px] md:w-[400px] lg:w-[700px] xl:w-[700px] '>
           {/* <h4 className='text-[34px] xl:text-[35px] text-[#D008A6] font-bold font-jura drop-shadow-4xl'>{dome.subtitle}</h4> */}
         <h1 className='text-[34px] md:text-[54px] text-[#c09e5f] font-black font-orbitron drop-shadow-4xl'>{dome.title}</h1>
         <p className='md:text-[14px] lg:text-[18px] text-[#c09e5f] font-black font-jura mt-6 text-balance drop-shadow-4xl lg:leading-10 xl:leading-10 text-justify'>{dome.description}</p>
       </div>
     ))}
     {/* <div className="flex items-start m-bottom">
     <div className='py-10'>
       <Link href="/experience"  className="button-slanted w-[200px] lg:w-[233px] h-[44px] px-8 py-6 button font-jura font-bold bg-gradient-to-r from-[#7E51F8] to-[#D007A6] text-white ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
       <span className='button-slanted-content'>VIEW OPTIONS</span>
       </Link>
     </div>
   </div> */}
   </div>
   
 </div>
</div>
</>
  )
}

export default CorporateEvent;

