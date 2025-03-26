'use client'


import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';

import Coaching from '../components/coaching/Coaching';
import Newsletter from '../components/newsletter/Newsletter';
import PriceTable from '../components/pricetable/PricingTable';
import RacingExperienceCards from '../components/racingexperiencecard/RacingExperiencedCard';
import Offer from '../components/offers/Offers';
import CoffeeBar from '../components/coffeebar/CoffeeBar';
import  MeetingRoomsSection from '../components/meetingroom/MeetingRoom'



const Page = () => {
  

  
  return (
    <div className='w-full'>
     
      <RacingExperienceCards />
      {/* <Offer /> */}
      <CoffeeBar />
      <MeetingRoomsSection />
    {/* <div className="w-full ">
      <Coaching />
      <Newsletter />
    </div> */}

  </div>
  );
}

export default Page;


