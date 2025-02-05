'use client'

import React from 'react';
import { Helmet } from 'react-helmet-async'; 
import PrivateEvent from '../components/privateevent/PrivateEvent.jsx';
import CorporateBuilding from '../components/corporatebuilding/CorporateBuilding.jsx';
import CorporateConference from '../components/corporateConference/CorporateConference.jsx';
import CorporateNetworking from '../components/corporateNetworking/CorporateNetworking.jsx'
import Venues from '../components/venues/Venues.jsx';
// import Partners from '../components/partners/Partners';
import Celebrations from '../components/celebrations/Celebrations.jsx';
import GetTouchForm from '../components/getintouchform/GetTocuhForm.jsx';
import { useTranslation } from 'react-i18next';
import OfferEvent from '../components/offerevent/OfferEvent.jsx';
import OccasionEvent from '../components/occasionevent/OccasionEvent.jsx';
import HowItsWorks from '../components/howitworks/HowItWorks.jsx';


const Page = () => {

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Private Events | Celebrate in Style, Create Unforgettable Memories</title>
        <meta
          name="description"
          content="Make your special day truly extraordinary at TeleiosX. Whether it’s a birthday party, a festive gathering, or any milestone celebration, our venue transforms into a playground of excitement, luxury, and personalized touches. "
        />
        <meta property="og:title" content="Celebrate in Style, Create Unforgettable Memories | Teleios Dome" />
        <meta
          property="og:description"
          content="Make your special day truly extraordinary at TeleiosX. Whether it’s a birthday party, a festive gathering, or any milestone celebration,"
        />
        <meta property="og:type" content="website" />
        {/* <link rel="canonical" href="/corporateevents" /> */}
      </Helmet>

      <div className="flex flex-col items-center">
        <div className="px-4 max-w-7xl">
          <div className="text-center p-6 text-[#c09e5f] lg:py-[80px] lg:pb-[100px] lg:pt-[50px]">
            <h1 className="font-orbitron text-[30px] lg:text-[54px] text-[#c09e5f] font-black mb-4">
            {t('Celebrate_Events_Heading')}
            </h1>
            <p className="md:text-[14px] lg:text-[18px] text-[#e3ce90] font-black font-jura mt-6 text-justify">
            {t('Celebrate_Events_Description')}
                </p>
          </div>
        </div>
        <div className="w-full">
          <PrivateEvent />
        </div>
        <div className="w-full">
          <OfferEvent />
        </div>
        <div className="w-full">
          <OccasionEvent />
        </div>

        <div className="w-full">
          <HowItsWorks />
        </div>
       
      </div>
    </>
  );
};

export default Page;
