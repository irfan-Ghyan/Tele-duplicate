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


const Page = () => {

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Corporate Events | Teleios Dome for your next Corporate Event</title>
        <meta
          name="description"
          content="Plan your next corporate event or celebration at Teleios Dome. Explore our venues, corporate events, and celebration services tailored to your needs."
        />
        <meta property="og:title" content="Corporate Events & Celebrations | Teleios Dome" />
        <meta
          property="og:description"
          content="Discover Teleios Dome, the premier destination for corporate events and celebrations. Book your event at our versatile venues today."
        />
        <meta property="og:type" content="website" />
        {/* <link rel="canonical" href="/corporateevents" /> */}
      </Helmet>

      <div className="min-h-screen flex flex-col items-center">
        <div className="xl:px-40 lg:px-20 sm:px-4">
          <div className="text-center p-6 text-[#c09e5f] lg:py-[80px] lg:pb-[100px] lg:pt-[50px]">
            <h1 className="font-orbitron text-[34px] lg:text-[54px] text-[#c09e5f] font-black mb-4">
            {t('Private_Events')}
            </h1>
          </div>
        </div>
        <div className="w-full">
          <PrivateEvent />
        </div>
        <div className='flex w-full'> 
        {/* <div className="w-full md:flex lg:flex">
          <CorporateBuilding />
     
          <CorporateNetworking />
       
          <CorporateConference />
        </div> */}
        </div>
        {/* <div className="w-full">
          <Venues />
        </div> */}
        {/* <div className="w-full max-w-7xl px-4 md:px-8 mx-auto">
          <Partners />
        </div> */}
        {/* <div className="w-full mt-10">
          <Celebrations />
        </div> */}
        {/* <div className="w-full max-w-7xl px-4 md:px-8 mx-auto py-10">
          <GetTouchForm />
        </div> */}
      </div>
    </>
  );
};

export default Page;
