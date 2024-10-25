'use client';

import React from 'react';
// import Link from 'next/link';

import Image from 'next/image';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
// import customize from '../../../public/assets/images/dome/customize-1.png';

const DomeCustomize= () => {

  const { t } = useTranslation();
  const domes = [
    { title: t('SIM_CONFIGURATOR'), description: t('SIM_CONFIGURATOR_DEC') },
  ];

  return (
    <>
     <Head>
      <link rel="preload" href="/assets/images/dome/customize-1.png" as="image" />
    </Head>
    <div className="w-full max-w-full lg:overflow-hidden lg:h-[700px] bg-cover bg-center px-4 md:px-0" >
 <div className="inset-0 bg-transparent flex md:flex-col md:pr-6">
    
   <div className='flex flex-col justify-between py-[30px]'>
    
        <div className='lg:flex items-center justify-between'>
        <div className='order-1 lg:order-2 lg:w-1/2 '>
        <Image src="/assets/images/dome/customize-1.png" width={520} height={566}  alt="customize" className=" h-[350px] lg:h-[566px] xl:h-[566px] w-[516px]  priority={true}" />
        </div>
        {domes.map((dome, index) => (
        <div key={index} className='order-1 lg:order-2 lg:w-1/2  px-0 md:px-4 lg:px-4 xl:px-4'>
            <div  className=' flex flex-col justify-center flex-grow-4 '>
                {/* <h4 className='text-[34px] xl:text-[35px] text-[#D008A6] font-bold font-jura'>{dome.subtitle}</h4> */}
                <h1 className='text-[24px] md:text-[38px] text-white font-black font-orbitron mt-6'>{dome.title}</h1>
                <p className='md:w-[400px] lg:w-[550px] xl:w-[600px] md:text-[14px] lg:text-[18px] text-white font-bold font-jura mt-6 text-justify'>{dome.description}</p>
            </div>
            {/* <div className='py-10'>
            <Link href="https://feverup.com/m/187813" target="_blank" rel="noopener noreferrer" className="button-slanted w-[233px] h-[44px] px-8 py-6 button font-jura font-bold bg-gradient-to-r from-[#7E51F8] to-[#D007A6] text-white ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
            <span className='button-slanted-content'>BOOK NOW</span>
            </Link>
            </div> */}
        </div>
         ))}
        </div>
   
      
   </div>
   
 </div>
</div>
</>
  )
}

export default DomeCustomize;