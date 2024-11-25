'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';


const DomePit = () => {
  const { t } = useTranslation();
  const [pitEntries, setPitsEntries] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = "http://192.168.70.205:8000/api/content/sections/Dome";
      const response = await fetch(url);
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
  
        if (data.success) {
          const faqSection = data.data.sections.find((section) => section.title === "PIT Stop");
  
          if (faqSection) {
            const faqData = faqSection.section_fields.reduce((acc, field, index, fields) => {
              if (field.key.startsWith("title")) {
                const descriptionField = fields.find((f, i) => i > index && f.key === "description");
                if (descriptionField) {
                  acc.push({
                    title: field.value,
                    description: descriptionField.value,
                    imageUrl: field.imageUrl || "", 
                  });
                }
              }
              return acc;
            }, []);
  
            setPitsEntries(faqData.reverse());
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
     <Head>
      <link rel="preload" href="/assets/images/dome/S-dome4.jpg" as="image" />
    </Head>
    <div className="relative w-full max-w-full overflow-hidden h-[750px] sm:h-[600px] md:h-[500px] lg:h-[600px] xl:h-[785px] bg-cover bg-right lg:bg-center px-4" style={{ backgroundImage: "url('/assets/images/dome/s-dome12.jpg')" }}>
      <div className='w-full bg-[#002718] bg-opacity-60 lg:bg-opacity-0 md:bg-opacity-0 xl:bg-opacity-0 px-4'>
 <div className="bottom-0 px-4 md:flex md:flex-col md:pr-6 py-[25px] lg:py-[100px] max-w-7xl mx-auto mt-[200px] sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0">
   <div className=' px-4 flex flex-col justify-between md:mt-[36px] md:mb-[41px]'>
     {pitEntries.map((pit, index) => (
       <div key={index} className='py-[15px] lg:py-[30px] lx:pt-[70px] lg:mt-[0px]'>
           {/* <h4 className='text-[34px] xl:text-[35px] text-[#D008A6] font-bold font-jura drop-shadow-4xl'>{dome.subtitle}</h4> */}
         <h1 className='text-[34px] md:text-[54px] text-[#e3ce90] font-black font-orbitron drop-shadow-4xl'>{pit.title}</h1>
         <p className='md:w-[400px] lg:w-[550px] xl:w-[600px] md:text-[14px] lg:text-[18px] text-[#e3ce90] font-bold font-jura mt-6 text-balance drop-shadow-4xl text-justify'>{pit.description}</p>
       </div>
     ))}
     <div className="flex items-start m-bottom">
     <div className='py-10'>
       <Link href="/menu"  className="button-slanted w-[233px] lg:w-[233px] h-[44px] px-8 py-6 button font-jura font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#002718] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
       <span className='button-slanted-content'>{t('VIEW_MENU')}</span>
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

export default DomePit;