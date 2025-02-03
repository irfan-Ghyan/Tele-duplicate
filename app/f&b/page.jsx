'use client';

import React from 'react';
import { Helmet } from 'react-helmet-async';
import EducationData from '../components/educationdata/EducationData';
import DrivingData from '../components/drivingdata/DrivingData';
import WhyteleiosData from '../components/whyteleios/WhyteleiosData';
import FullwidthSlider from '../components/slider/FullwidthSilder';
import Form from '../components/form/Form';
import { useTranslation } from 'react-i18next';
import FoodMenu from '../components/foodmenu/FoodMenu';
import Link from 'next/link';

const Page = () => {
  const { t, i18n } = useTranslation();
  

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Helmet>
        <title>{t('F&B ')}</title>
        <meta
          name="description"
          content={t("Food and beverages bring joy to life, uniting people over delicious meals and refreshing drinks. Whether it's a cozy coffee, a sweet treat, or a hearty dish, they create moments of comfort and celebration, making every gathering special.")}
        />
        <meta property="og:title" content={t("FOOD & BEVERAGE | Teleios Dome")} />
        <meta
          property="og:description"
          content={t("Food and beverages bring joy to life, uniting people over delicious meals and refreshing drinks. Whether it's a cozy coffee, a sweet treat, or a hearty dish, they create moments of comfort and celebration, making every gathering special.!")}
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen flex flex-col items-center ">
        <div className="flex items-center justify-center xl:px-20 sm:px-4">
          <div className="text-justify p-6 text-[#c09e5f] max-w-7xl lg:pt-[50px] ">
            <h1 className="font-orbitron text-center text-[34px] lg:text-[54px] text-[#c09e5f] font-black mb-4 ">{t('f&b.title')}</h1>
            <p className="text-[#e3ce90] text-center font-jura text-[14px] lg:text-[18px] font-bold px-[8px] pb-10">
              {t("f&b.description")}
            </p>
          </div>
           
            
        </div>
        {/* <div className="w-full">
          <EducationData />
        </div> */}
        {/* <div className="w-full">
          <DrivingData />
        </div> */}
        {/* <div className="w-full bg-[#063828]">
          <WhyteleiosData /> 
        </div>*/}
        <div className="w-full">
          <FullwidthSlider />
        </div>
        {/* <div className="w-full max-w-7xl px-4 md:px-8 mx-auto">
          <Form />
        </div> */}
        {/* <div className='w-full px-4 max-w-7xl md:px-8 mx-auto py-20'>
        <FoodMenu />
        
        </div> */}

      </div>
    </>
  );
};

export default Page;
