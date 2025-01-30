'use client'

import React from 'react';
import { Helmet } from 'react-helmet-async';
import DomeData from '../components/domedata/DomeData';
import DomeVip from '../components/domevip/DomeVip';
import DomePit from '../components/domepit/DomePit';
import DomeCustomize from '../components/domecustomize/DomeCustomize';
import DomeLounge from '../components/domelounge/DomeLounge';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';


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
      <div className="w-full flex flex-col items-center justify-center ">
        <div className="flex items-center justify-center sm:px-4 max-w-7xl">
          <div className="text-center p-6 text-[#c09e5f] lg:py-[80px] lg:pb-[100px] lg:pt-[50px]">
            <h1 className="font-orbitron text-[34px] lg:text-[54px] text-[#c09e5f] font-black mb-4">
              {t('VENUE')}
            </h1>
            <p className="text-[#e3ce90] font-jura text-[18px] font-bold lg:px-[40px] xl:px-[65px] text-justify">
              {t('Explore education at Teleios Dome, from factory visits to thrilling racing experiences, engaging participants in immersive learning adventures.')}
            </p>
              <br/>
            <p className="text-[#e3ce90] font-jura text-[18px] font-bold lg:px-[40px] xl:px-[65px] text-justify">
              {t('Step into a space crafted to thrill and inspire. From cutting-edge racing simulators that put you in the driver’sseat to expansive screens broadcasting the biggest events, every detail is designed to captivate.')}
            </p>
            <br/>
            <br/>
            <Link href=""><h2 className="font-orbitron text-[24px] lg:text-[34px] text-[#c09e5f] font-black mb-4">Features</h2></Link>
            <p className="text-[#e3ce90] font-jura text-[18px] font-bold lg:px-[40px] xl:px-[65px] text-justify">
              {t('The ultimate destination for luxury entertainment. Where the thrill of racing meets the sophistication of Riyadh’s most dynamic venue.')}
            </p>
            <br/>
            <p className="text-[#e3ce90] font-jura text-[18px] font-bold lg:px-[40px] xl:px-[65px] text-justify">
              {t('Take the driver’s seat in the state of the art simulators, experience speed, luxury, and entertainment on another level, and immerse yourself in an environment built for you. Watch the race when you are part of one, and feel the adrenaline. ')}
            </p>
            <br/>
            <p className="text-[#e3ce90] font-jura text-[18px] font-bold lg:px-[40px] xl:px-[65px] text-justify">
              {t('For those who demand more, our exclusive lounge areas offer the perfect escape, private, luxurious, and designed for comfort.')}
            </p>
            <br/>
            <p className="text-[#e3ce90] font-jura text-[18px] font-bold lg:px-[40px] xl:px-[65px] text-justify">
              {t('Whether you are here to play, race or simply experience the best Riyadh has to offer, TeleiosX redefines what it means to entertain.')}
            </p>
          </div>
        </div>

       {/* <DomeData />
        <DomeVip />
        <DomePit />
        <div className="w-full max-w-7xl px-4 py-10 lg:py-20">
          <DomeCustomize />
          <DomeLounge />
        </div> */}
      </div>
    </>
  );
};

export default Page;

