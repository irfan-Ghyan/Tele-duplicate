'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import bahrain from '../../../public/assets/images/events/img3.png';
import { useTranslation } from 'react-i18next';

const PremiumLoungeSetting = () => {
const { t } = useTranslation();
  const [dynamicContent, setDynamicContent] = useState({
    title: 'PREMIUM LOUNGE SETTING', 
    description: 'Designed with elegance and comfort in mind, the Executive Lounge offers plush seating, ambient lighting, and a contemporary vibe for any occasion.', 
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
          <div className="flex flex-col lg:flex-row lg:space-x-8 mb-10 lg:mb-0 w-full max-w-7xl items-center">
          <div className="lg:w-1/2 flex lg:justify-left hidden lg:flex">
              <Image
                src={bahrain}
                width={520}
                height={566}
                alt="lounge"
                className="h-[460px] w-[430px] xl:h-[566px] xl:w-[520px]"
              />
            </div>
            <div className="lg:w-1/2 flex justify-center lg:hidden mb-6">
              <Image
                src={bahrain}
                width={520}
                height={566}
                alt="lounge"
                className="h-[460px] w-[430px] xl:h-[566px] xl:w-[520px]"
              />
            </div>
            <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center md:text-left mb-6 lg:mb-0">
              <h1 className="text-[24px] lg:text-[34px] text-[#c09e5f] font-black font-orbitron">
                {t('premium.title')}
              </h1>
              <p className="w-[340px] md:w-[550px] xl:w-[600px] md:text-[14px] lg:text-[18px] text-[#e3ce90] font-bold font-jura mt-6">
                {t('premium.description')}
              </p>
              {/* <div className="py-10">
                <div>
                  <Link
                    href="/explore"
                    className="button-slanted w-[300px] md:w-[475px] h-[44px] px-4 py-6 button font-jura font-boldbuton border-[1px] border-[#c09e5f] hover:bg-gradient-to-r hover:from-[#e3ce90] hover:to-[#c09e5f] text-[#c09e5f] hover:text-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center hover:border-0"
                  >
                    <span className="button-slanted-content md:text-[14px] lg:text-[18px] text-[#c09e5f] hover:text-[#002718] font-bold font-jura">
                      LEARN MORE ABOUT VIRTUAL GP
                    </span>
                  </Link>
                </div>
              </div> */}
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumLoungeSetting;




