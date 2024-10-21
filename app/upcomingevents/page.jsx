
'use client';

import React from 'react';
import UpcomingEvents from '../components/upcomingevents/UpcomingEvents';
import PremierLeague from '../components/premierleague/PremierLeague';
import PremierLeagueDoha from '../components/premierleaguedoha/PremierLeagueDoha';
import BahrainParty from '../components/bahrainparty/BahrainParty';

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex items-center justify-center px-4 lg:px-20 xl:px-40">
        <div className="text-center p-6 text-white pt-[80px] pb-[40px] lg:pb-[100px] lg:pt-[50px]">
          <h1 className="font-orbitron text-[34px] lg:text-[54px] text-white font-black mb-4">UP COMING EVENTS</h1>
          <p className="text-white font-jura text-[14px] lg:text-[18px] lg:font-bold lg:px-[40px] xl:px-[80px]">
            Explore education at Teleios Dome, from factory visits to thrilling racing<br/>experiences, engaging participants in immersive learning adventures.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <UpcomingEvents />
        <div className="w-full flex justify-center">
          <PremierLeague />
        </div>
        <div className="w-full flex justify-center">
          <PremierLeagueDoha />
        </div>
        <div className="w-full flex justify-center">
          <BahrainParty />
        </div>
      </div>
    </div>
  );
}

export default Page;