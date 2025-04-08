'use client'

import React from 'react';
import CorporateEvents from "../components/corporateevents/CorporateEvnets";
import PrivateEventsSection from "../components/privateeventssection/PrivateEventsSection";
import ForBooking from "../components/forbooking/Forbooking";

const Page = () => {

  
  return (
    <>
      <div 
        className="
          w-full h-[675px] md:h-[1000px] bg-cover bg-center bg-no-repeat overflow-hidden 
          bg-[url('/assets/images/events/eventsbgmobile.jpg')] 
          md:bg-[url('/assets/images/events/eventsbg.jpg')]
        "
      >
        <PrivateEventsSection />
      </div>
      <CorporateEvents />
      <ForBooking />
    </>
  );
}

export default Page;

