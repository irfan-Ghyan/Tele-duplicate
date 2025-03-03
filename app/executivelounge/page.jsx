'use client'


import React from 'react';
import Executive from '../components/executive/Executive';
import ArtRacingSimulator from '../components/ArtRacingSimulator/ArtRacingSimulator';
import GamingEntertainmentZone from '../components/gamingentertainmentzone/GamingEntertainmentZone';
import PremiumLoungeSetting from '../components/premiumloungesetting/PremiumLoungeSetting';
import ExclusiveOfferongs from '../components/exclusiveofferings/ExclusiveOfferings';
import GroupGathering from '../components/groupgathering/GroupGathering';
import FlexiblePackages from '../components/flexiblepackages/FlexiblePackages';
import ExperienceSection from '../components/experiencesection/ExperienceSection.jsx';
import Link from 'next/link';
import { useTranslation } from "react-i18next";

const Page = () => {
  
const { t, i18n } = useTranslation();
  
  return (
    <div className='w-full '>
      <Executive />
    {/* <div className="w-full ">
      <Coaching />
      <Newsletter />
    </div> */}
        <div className="w-full flex flex-col justify-center">
        <div className=" flex items-center justify-center max-w-7xl mx-auto my-[20px] ">
            <Link
              href="/experience"
              className="button-slanted w-[242px] h-[55px] font-jura font-normal md:font-bold bg-gradient-to-r cursor-pointer from-[#df2a27e3] to-[#df2a27] text-white transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center"
            >
              <span className="button-slanted-content font-jura text-[24px] font-bold leading-[24px]">{t('BOOK NOW')}</span>
            </Link>
          </div>
          <ArtRacingSimulator />
          <GroupGathering />
        </div>


        <div className="w-full flex justify-center">
          <FlexiblePackages />
        </div>
  </div>
  );
}

export default Page;


