'use client'

import React from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import DomeData from '../components/domedata/DomeData';
import DomeVip from '../components/domevip/DomeVip';
import DomePit from '../components/domepit/DomePit';
import DomeCustomize from '../components/domecustomize/DomeCustomize';
import DomeLounge from '../components/domelounge/DomeLounge';
import { useTranslation } from 'react-i18next';


const Page = () => {
  const { t } = useTranslation();

  

  return (
    <>
      <Helmet>
        <title>{t('DOME')} | {t('Thrill of racing on our cutting-edge simulators')}</title>
        <meta
          name="description"
          content={t('Explore the Teleios Dome, from factory visits to thrilling racing experiences, and engage in immersive learning adventures.')}
        />
        <meta property="og:title" content={`${t('DOME')} | Teleios Dome`} />
        <meta
          property="og:description"
          content={t('Discover education at Teleios Dome, including factory tours and exciting racing experiences that offer immersive learning for participants.')}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/images/dome/overview.png" />
      </Helmet>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-center xl:px-80 lg:px-40 sm:px-4">
          <div className="text-center p-6 text-[#002718] lg:py-[80px] lg:pb-[100px] lg:pt-[50px]">
            <h1 className="font-orbitron text-[34px] lg:text-[54px] text-[#002718] font-black mb-4">
              {t('DOME')}
            </h1>
            <p className="text-[#002718] font-jura text-[18px] font-bold lg:px-[40px] xl:px-[65px] text-justify">
              {t('Explore education at Teleios Dome, from factory visits to thrilling racing experiences, engaging participants in immersive learning adventures.')}
            </p>
          </div>
        </div>

       <DomeData />
        <DomeVip />
        <DomePit />
        <div className="w-full max-w-7xl px-4 py-10 lg:py-20">
          <DomeCustomize />
          <DomeLounge />
        </div>
      </div>
    </>
  );
};

export default Page;

