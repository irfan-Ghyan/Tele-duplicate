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
import TeleiosxFeatures from '../components/teleiosxfeatures/TeleiosxFeatures';
import SimulatorShowCase from '../components/simulatorshowcase/SimulatorShowCase';
import HowToReachUs from '../components/howtoreachus/HowToReachUs';
import Faq from '../components/faq/Faq';


const Page = () => {
  const { t } = useTranslation();


  return (
    <>
      <Helmet>
        <title>{t('VENUE')} | {t('Thrill of racing on our cutting-edge simulators')}</title>
        <meta
          name="description"
          content={t('Explore the Teleios Dome, from factory visits to thrilling racing experiences, and engage in immersive learning adventures.')}
        />
        <meta property="og:title" content={`${t('VENUE')} | Teleios Dome`} />
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
              {t('Venue.description')}
            </p>
            <br/>
            <p className="text-[#e3ce90] font-jura text-[18px] font-bold lg:px-[40px] xl:px-[65px] text-justify">
              {t('Venue.description1')}
            </p>
          
          </div>
        </div>
        {/* <div className="w-full">
       <TeleiosxFeatures />
       </div> */}

       <SimulatorShowCase />

       <HowToReachUs />
       <div className="w-full max-w-7xl md:px-8">
        <Faq />
      </div>
      </div>
    </>
  );
};

export default Page;

