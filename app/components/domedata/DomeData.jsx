'use client';

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const DomeData = () => {

    const domes = [
      { title: 'GAMING ROOM', description: 'Experience the thrill of racing on our cutting-edge simulators in the gaming area. With 19 state-of-the-art simulators, gear up for an adrenaline-fueled adventure like no other' },
    ];
  return (
    <>
     <Head>
      <link rel="preload" href="/assets/images/dome/S-dome4.jpg" as="image" />
    </Head>
    
    <div className="relative w-full max-w-full overflow-hidden h-[750px] sm:h-[600px] md:h-[500px] lg:h-[600px] xl:h-[785px] bg-cover  bg-right lg:bg-center px-4 md:px-0" style={{ backgroundImage: "url('/assets/images/dome/S-dome4.jpg')" }}>
      <div className='w-full bg-[#11072C] bg-opacity-60 lg:bg-opacity-0 md:bg-opacity-0 xl:bg-opacity-0 px-4'>
 <div className="bottom-0 px-4 md:flex md:flex-col md:pr-6 py-[25px] lg:py-[100px] max-w-7xl mx-auto mt-[200px] sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0">
   <div className='px-4 flex flex-col justify-between md:mt-[36px] md:mb-[41px]'>
     {domes.map((dome, index) => (
       <div key={index} className='py-[15px] lg:py-[30px] xl:pt-[70px] lg:mt-[0px] '>
           {/* <h4 className='text-[34px] xl:text-[35px] text-[#D008A6] font-bold font-jura drop-shadow-4xl'>{dome.subtitle}</h4> */}
         <h1 className='text-[34px] md:text-[54px] text-white font-black font-orbitron drop-shadow-4xl'>{dome.title}</h1>
         <p className='md:w-[400px] lg:w-[550px] xl:w-[600px] md:text-[14px] lg:text-[18px] text-white font-bold font-jura mt-6 text-balance drop-shadow-4xl text-justify'>{dome.description}</p>
       </div>
     ))}
     <div className="flex items-start m-bottom">
     <div className='py-10'>
       <Link href="/experience"  className="button-slanted w-[200px] lg:w-[233px] h-[44px] px-8 py-6 button font-jura font-bold bg-gradient-to-r from-[#7E51F8] to-[#D007A6] text-white ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
       <span className='button-slanted-content'>VIEW OPTIONS</span>
       </Link>
     </div>
   </div>
   </div>
   
 </div>
 </div> 
</div>
</>
  )
}

export default DomeData;