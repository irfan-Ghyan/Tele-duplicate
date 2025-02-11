
'use client';

import React from 'react';
import UpcomingEvents from '../components/upcomingevents/UpcomingEvents';
import PremierLeague from '../components/premierleague/PremierLeague';
import PremierLeagueDoha from '../components/premierleaguedoha/PremierLeagueDoha';
import BahrainParty from '../components/bahrainparty/BahrainParty';
import { useTranslation } from 'react-i18next';

const Page = () => {
    const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center xl:px-40 lg:px-20 sm:px-4 ">
        <div className="text-center text-[#c09e5f] pb-[20px] lg:pt-[40px]">
          <h1 className="font-orbitron text-[34px] lg:text-[54px] text-[#c09e5f] font-black mb-4">{t('event_title')}</h1>
          <p className="text-[#e3ce90] font-jura text-[16px] lg:text-[18px] font-bold lg:px-[40px] xl:px-[65px] text-justify max-w-7xl px-4 sm:px-0">
          {t('event_description')} {t('event_description1')}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <UpcomingEvents />
        {/* <div className="w-full flex justify-center">
          <PremierLeague />
        </div>
        <div className="w-full flex justify-center">
          <PremierLeagueDoha />
        </div>
        <div className="w-full flex justify-center">
          <BahrainParty />
        </div> */}
      </div>
    </div>
  );
}

export default Page;