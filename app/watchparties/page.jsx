
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
      <div className="flex items-center justify-center px-4 lg:px-20 xl:px-40">
        <div className="text-center p-6 text-[#c09e5f] pt-[80px] pb-[40px] lg:pb-[100px] lg:pt-[50px]">
          <h1 className="font-orbitron text-[34px] lg:text-[54px] text-[#c09e5f] font-black mb-4">{t('event_title')}</h1>
          <p className="text-[#c09e5f] font-jura text-[14px] lg:text-[18px] lg:font-bold lg:px-[40px] xl:px-[80px]">
          {t('event_description')} <br/> {t('event_description1')}
          </p>
        </div>
      </div>
      {/* <div className="w-full flex flex-col items-center">
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
      </div> */}
    </div>
  );
}

export default Page;