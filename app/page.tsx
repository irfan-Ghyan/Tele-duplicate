'use client';

import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
// import Content from './components/content/Content';
// import Dome from './components/dome/Dome';
import ReserveSeat from './components/reserveseat/ReserveSeat';
import Corprate from './components/corporate/Corprate';
// import Training from './components/training/Training';
// import Testimonial from './components/testimonial/Testimonial';
// import Faq from './components/faq/Faq';
import BookNow from './components/booknow/BookNow'; 
import Newsletter from './components/newsletter/Newsletter';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
const Dome = React.lazy(() => import('./components/dome/Dome'));
const Training = React.lazy(() => import('./components/training/Training'));
const Content = React.lazy(() => import('./components/content/Content'));
const Testimonial = React.lazy(() => import('./components/testimonial/Testimonial'));
const Faq = React.lazy(() => import('./components/faq/Faq'));

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
      <Suspense fallback={<p>This is loading .....</p>}>
        <div className="w-full px-4 md:px-8">
          <Content />
        </div>
        </Suspense>
        {/* <div className="w-full">
          <ReserveSeat />
        </div> */}
        <Suspense fallback={<p>This is loading .....</p>}>
        <div className="w-full">
          <Dome />
        </div>
        </Suspense>
        {/* <div className="w-full max-w-7xl md:px-8">
          <Corprate />
        </div> */}
        <Suspense fallback={<p>This is loading .....</p>}>
        <div className="w-full">
          <Training />
        </div>
        </Suspense>
        <Suspense fallback={<p>This is loading .....</p>}>
        <div className="w-full bg-[#063828]">
          <Testimonial />
        </div>
        </Suspense>
        <Suspense fallback={<p>This is loading .....</p>}>
        <div className="w-full max-w-7xl md:px-8">
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

