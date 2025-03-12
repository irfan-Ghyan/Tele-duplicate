'use client'


import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import Experience from '../components/experience/Experience';
import Coaching from '../components/coaching/Coaching';
import Newsletter from '../components/newsletter/Newsletter';
import RacingExperienceCards from '../components/racingexperiencecard/RacingExperiencedCard';
import PriceTable from '../components/pricetable/PricingTable';



const Page = () => {
  
  return (
    <div className='w-full'>
      <RacingExperienceCards />
      <PriceTable />
     
   

  </div>
  );
}

export default Page;