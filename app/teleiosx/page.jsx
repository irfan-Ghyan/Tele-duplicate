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
import AboutTeleiosX from '../components/aboutteleiosx/AboutTeleiosX';
import AboutVenue from '../components/aboutvenue/AboutVenue';
import AboutSimulator from '../components/aboutsimulator/AboutSimulator'

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

          <AboutTeleiosX />
          <AboutVenue />
        {/* <div className="w-full">
       <TeleiosxFeatures />
       </div> */}

      <AboutSimulator />

       <SimulatorShowCase />

       <HowToReachUs />
       <div className="w-full max-w-7xl mx-auto md:px-8">
        <Faq />
      </div>
    </>
  );
};

export default Page;

