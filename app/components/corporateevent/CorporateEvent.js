'use client';

import React from 'react';
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

      <div 
        className="relative w-full max-w-full overflow-hidden h-auto md:h-[600px] lg:h-[700px] xl:h-[785px]"
      >
        <div
          className="hidden md:block absolute inset-0 w-full bg-cover bg-right "
          style={{ backgroundImage: "url('/assets/images/experience/corbg.jpg')" }}
        ></div>

        <img
          src="/assets/images/dome/S1.png"
          alt="Corporate Event"
          className="block md:hidden w-full h-[400px] object-cover"
        />
        <div className="relative bg-[#002718] bg-opacity-80 xl:bg-opacity-0 px-4 md:flex md:flex-col md:pr-6 py-[20px] lg:py-[80px] xl:py-[80px] max-w-7xl mx-auto mt-0 z-10">
          <div className="relative px-4 flex flex-col justify-between md:mt-[36px] md:mb-[41px]">
            {domes.map((dome, index) => (
              <div
                key={index}
                className="py-[15px] lg:py-[50px] md:w-[400px] lg:w-[700px] xl:w-[700px] text-center md:text-left z-10"
              >
                <h1 className="text-[34px] md:text-[54px] text-[#c09e5f] font-black font-orbitron drop-shadow-4xl">
                  {dome.title}
                </h1>
                <p className="md:text-[14px] lg:text-[18px] text-[#e3ce90] font-black font-jura mt-6 text-balance drop-shadow-4xl lg:leading-10 xl:leading-10 text-justify">
                  {dome.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CorporateEvent;
