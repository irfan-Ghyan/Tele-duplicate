'use client';

import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
// import Content from './components/content/Content';
// import Dome from './components/dome/Dome';
import ReserveSeat from './components/reserveseat/ReserveSeat';
import Corprate from './components/corporate/Corprate';
import BookNow from './components/booknow/BookNow'; 
import Newsletter from './components/newsletter/Newsletter';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

const Dome = React.lazy(() => import('./components/dome/Dome'));
const OfferSpecials = React.lazy(() => import('./components/offerspecials/OfferSpecials'));
const Content = React.lazy(() => import('./components/content/Content'));
const Testimonial = React.lazy(() => import('./components/testimonial/Testimonial'));
const HowToReachUs = React.lazy(() => import('./components/howtoreachus/HowToReachUs'));
const Faq = React.lazy(() => import('./components/faq/Faq'));
const HeroSection = React.lazy(() => import('./components/herosection/HeroSection'))


// import { ReactGoogleReviews } from "./components/ReactGoogleReviews/ReactGoogleReviews";
// import GoogleReviews from "./components/googlereviews/GoogleReviews";

const Home = () => {
const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>Home | Trilling seat at Teleios Dome</title>
        <meta
          name="description"
          content="Welcome to Teleios Dome - the ultimate immersive entertainment experience for racing enthusiasts. Enjoy our state-of-the-art simulators, stylish lounges, and private events."
        />
        <meta property="og:title" content="Home | Teleios Dome" />
        <meta
          property="og:description"
          content="Experience the thrill at Teleios Dome with our immersive simulators, VIP areas, and private events. Perfect for races, corporate gatherings, and personal celebrations."
        />
        <meta property="og:type" content="website" />
        {/* <link rel="canonical" href="/" /> */}
      </Helmet>
      
      <main className="flex flex-col min-h-screen items-center overflow-x-hidden">
      <Suspense fallback={<p className='text-white'>loading .....</p>}>
        <div className="w-full">
          <HeroSection />
        </div>
        </Suspense>
      <Suspense fallback={<p className='text-white'></p>}>
        <div className="w-full px-4 md:px-8">
          <Content />
        </div>
        </Suspense>
        {/* <div className="w-full">
          <ReserveSeat />
        </div> */}

        <Suspense fallback={<p className='text-white'></p>}>
        <div className="w-full">
          <Dome />
        </div>
        </Suspense>
        {/* <div className="w-full max-w-7xl md:px-8">
          <Corprate />
        </div> */}
         {/* <Suspense fallback={<p className='text-white'> This is loading .....</p>}>
        <div className="w-full">
          <OfferSpecials />
        </div>
        </Suspense> */}
        {/* <Suspense fallback={<p className='text-white'> This is loading .....</p>}>
        <div className="w-full">
          <Offers />
        </div>
        </Suspense> */}
        <Suspense fallback={<p className='text-white'></p>}>
        <div className="w-full bg-[#00352F]">
          <Testimonial />
        </div>
        </Suspense>
        <Suspense fallback={<p className='text-white'></p>}>
        <div className="w-full bg-[#00352F]">
          <HowToReachUs />
        </div>
        </Suspense>
        <Suspense fallback={<p className='text-white'></p>}>
        <div className="w-full max-w-7xl">
          <Faq />
        </div>
        </Suspense>
        {/* <div className="w-full max-w-7xl md:px-8">
          <Newsletter />
        </div> */}
    
        
      </main>
    </>
  );
};

export default Home;

