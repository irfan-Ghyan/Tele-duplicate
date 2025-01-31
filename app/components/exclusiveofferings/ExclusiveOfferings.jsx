
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import doha from '../../../public/assets/images/events/img2.png';
import whatsapp from '../../../public/assets/images/whatsapp.png';
import RaceResultsPopup from '../raceresultspopup/RaceResultsPopup';
import { useTranslation } from 'react-i18next';

const ExclusiveOfferings = () => {
    const { t } = useTranslation();
  const [dynamicContent, setDynamicContent] = useState({
    title: 'Gaming & Entertainment Zone',
    description: 'Gather your group for hours of fun with racing simulators,a PS5 and two large TVs all in a sleek, luxurious setting.',
  });


  const updateDynamicContent = (newTitle, newDescription) => {
    setDynamicContent({
      title: newTitle,
      description: newDescription,
    });
  };

  return (
    <div className="w-full max-w-full lg:overflow-hidden xl:h-[700px] px-4 bg-cover bg-center flex items-center justify-center mx-auto">
      <div className="inset-0 bg-transparent flex flex-col items-center justify-center md:flex-col md:pr-6">
        <div className="flex flex-col justify-between pt-[20px] py-[30px] items-center">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8 lg:mb-0 w-full max-w-7xl">
            <div className="w-full flex justify-center lg:hidden mb-6">
              <Image
                src={doha}
                width={520}
                height={566}
                alt="lounge"
                className="h-[460px] w-[430px]] xl:h-[566px] xl:w-[520px]"
              />
            </div>
            <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center md:text-left mb-6 lg:mb-0">
              <h1 className="text-[24px] lg:text-[34px] text-[#c09e5f] font-black font-orbitron">
                {t('exclusive.title')}
              </h1>
              <p className="w-[340px] md:w-[550px] xl:w-[600px] md:text-[14px] lg:text-[18px] text-[#e3ce90] font-bold font-jura mt-6">
                {t('exclusive.description')}
              </p>
              {/* <div className="md:flex py-10 gap-x-4 flex-col lg:flex-row items-center lg:items-start">
                <div>
                  <button
                    onClick={openRaceResultsPopup}
                    className="button-slanted w-[233px] h-[44px] px-8 py-6 button font-jura font-bold buton border-[1px] border-[#c09e5f] hover:bg-gradient-to-r to-[#063828] from-[#002718] text-[#c09e5f] hover:text-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center hover:border-0"
                  >
                    <span className="button-slanted-content">RACE RESULTS</span>
                  </button>
                </div>
                <div className="mt-4 md:mt-[0px] lg:mt-[0px] xl:mt-[0px]">
                  <Link
                    href="HTTPS://wa.me/971566628585"  target="_blank" rel="noopener noreferrer"
                    className="button-slanted w-[233px] h-[44px] px-4 py-6 button text-white font-jura font-bold bg-[#1DB054] flex items-center justify-center rounded-tl-lg rounded-br-lg"
                  >
                    <span className="button-slanted-content md:text-[14px] lg:text-[18px] text-white font-bold font-jura">
                      BOOK THROUGH
                    </span>
                    <Image
                      src={whatsapp}
                      alt="WhatsApp"
                      width={24}
                      height={24}
                      className="w-[24px] h-[24px] ml-2"
                    />
                  </Link>
                </div>
              </div> */}
            </div>
            <div className="lg:w-1/2 flex justify-center lg:justify-end hidden lg:flex">
              <Image
                src={doha}
                width={520}
                height={566}
                alt="lounge"
                className="h-[460px] w-[430px] xl:h-[566px] xl:w-[520px]"
              />
            </div>
          </div>
        </div>
      </div>
      {/* {isRaceResultsPopupOpen && <RaceResultsPopup onClose={closeRaceResultsPopup} />} */}
    </div>
  );
};

export default ExclusiveOfferings;

