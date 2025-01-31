'use client'


import React from 'react';
import Executive from '../components/executive/Executive';
import ArtRacingSimulator from '../components/ArtRacingSimulator/ArtRacingSimulator';
import GamingEntertainmentZone from '../components/gamingentertainmentzone/GamingEntertainmentZone';
import PremiumLoungeSetting from '../components/premiumloungesetting/PremiumLoungeSetting';
import ExclusiveOfferongs from '../components/exclusiveofferings/ExclusiveOfferings';
import GroupGathering from '../components/groupgathering/GroupGathering';
import FlexiblePackages from '../components/flexiblepackages/FlexiblePackages';
import ExperienceSection from '../components/experiencesection/ExperienceSection.jsx'


const Page = () => {
  

  
  return (
    <div className='w-full'>
      <Executive />
    {/* <div className="w-full ">
      <Coaching />
      <Newsletter />
    </div> */}

<div className="w-full flex justify-center">
          <ExperienceSection />
        </div>
        {/* <div className="w-full flex justify-center">
          <ArtRacingSimulator />
        </div>

        <div className="w-full flex justify-center">
          <GamingEntertainmentZone />
        </div>
        <div className="w-full flex justify-center">
          <PremiumLoungeSetting />
        </div>
        <div className="w-full flex justify-center">
          <ExclusiveOfferongs />
        </div> */}
        <div className="w-full flex justify-center">
          <GroupGathering />
        </div>

        <div className="w-full flex justify-center">
          <FlexiblePackages />
        </div>
  </div>
  );
}

export default Page;


