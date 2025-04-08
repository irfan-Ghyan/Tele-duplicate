'use client'


import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import Coaching from '../components/coaching/Coaching';
import Newsletter from '../components/newsletter/Newsletter';
import RacingExperienceCards from '../components/racingexperiencecard/RacingExperiencedCard';
import PriceTable from '../components/pricetable/PricingTable';
import { sendGTMEvent } from '@next/third-parties/google';



const Page = () => {
    useEffect(()=>{
      try {
        sendGTMEvent({ event: 'book_racing_experience_page_visit', value: 'book racing experiences page visit' });
      } catch (error) {
        console.error('Error sending GTM event:', error);
      }
    }, [])
  return (
    <div className='w-full'>
      <RacingExperienceCards />
      <PriceTable />
     
   

  </div>
  );
}

export default Page;