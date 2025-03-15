'use client'


import React from 'react';
import CorporateEvents from "../components/corporateevents/CorporateEvnets";
import PrivateEventsSection from "../components/privateeventssection/PrivateEventsSection";
import ForBooking from "../components/forbooking/Forbooking";


const Page = () => {

  
  return (
    <>
    <div className='w-full bg-cover bg-center bg-no-repeat overflow-hidden' style={{ backgroundImage: 'url(/assets/images/events/herosectionbg.png)' }}>
        <PrivateEventsSection />
        </div>
     <CorporateEvents />
    <ForBooking />
  </>
  );
}

export default Page;