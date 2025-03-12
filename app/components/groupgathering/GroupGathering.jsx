"use client";

import React from "react";
import { useTranslation } from 'react-i18next';
import Image from "next/image";

const GroupGathering = () => {
    const { t } = useTranslation();

  return (
    <div className="w-full max-w-full lg:overflow-hidden px-4 bg-cover bg-center flex items-center justify-center mx-auto ">
      <div className="inset-0 bg-transparent flex flex-col md:flex-col md:pr-6 mt-8 xl:my-24">
            <div className="flex flex-col justify-center  ">
            <h2 className="font-orbitron text-[24px] lg:text-[34px] text-[#c09e5f] font-black text-center">
                {t('group.heading')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full items-center pt-4">
            
                <div className="group bg-[#00352F] border border-[#C09E5F] duration-300 flex flex-col items-center h-[500px] overflow-hidden">
                  <div className="relative object-cover transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-2">
                    <Image 
                        src="/assets/images/60mn.jpg" 
                        alt="Gamepad" 
                        className="w-full h-[300px] " 
                        width={500}
                        height={300}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#063828] to-transparent opacity-100"></div>
                  </div>
                    <div className="p-6 flex-grow text-center">
                        <h3 className="text-[18px] lg:text-[24px] text-[#c09e5f] font-black font-orbitron">{t('group.title')}</h3>
                        <p className="text-[14px] lg:text-[14px] text-[#e3ce90] font-bold font-jura mt-6">{t('group.description')}</p>
                    </div>
                </div>
                
                <div className="group bg-[#00352F] border border-[#C09E5F] duration-300 flex flex-col items-center h-[500px] overflow-hidden">
                  <div className="relative object-cover transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-2">
                    <Image 
                        src="/assets/images/events/Stage.png" 
                        alt="Stage" 
                        className="w-full h-[300px]  " 
                        layout="responsive"
                        width={500}
                        height={300}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#063828] to-transparent opacity-100"></div>
                    </div>
                    <div className="p-6 flex-grow text-center">
                        <h3 className="text-[18px] lg:text-[24px] text-[#c09e5f] font-black font-orbitron">{t('group.title1')}</h3>
                        <p className="md:text-[14px] lg:text-[14px] text-[#e3ce90] font-bold font-jura mt-6">{t('group.description1')}</p>
                    </div>
                </div>
                
                <div className="group bg-[#00352F] border border-[#C09E5F] flex flex-col items-center h-[500px] duration-300 overflow-hidden">
                <div className="relative object-cover transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-2">
                    <Image 
                        src="/assets/images/celebrations.png" 
                        alt="Celebrations" 
                        className="w-full h-[300px] "
                        width={500}
                        height={300}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#063828] to-transparent opacity-100"></div>
                    </div>
                    <div className="p-6 flex-grow text-center">
                        <h3 className="text-[18px] lg:text-[24px] text-[#c09e5f] font-black font-orbitron">{t('group.title2')}</h3>
                        <p className="md:text-[14px] lg:text-[14px] text-[#e3ce90] font-bold font-jura mt-6">{t('group.description2')}</p>
                    </div>
                </div>
            
            </div>
            </div>
        </div>
    </div>
  );
};

export default GroupGathering;
