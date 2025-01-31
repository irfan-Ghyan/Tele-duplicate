"use client";

import React from "react";
import { FaGamepad, FaUsers, FaTv } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const GroupGathering = () => {
    const { t } = useTranslation();


  return (
    <div className="w-full max-w-full lg:overflow-hidden px-4 bg-cover bg-center flex items-center justify-center mx-auto ">
      <div className="inset-0 bg-transparent flex flex-col md:flex-col md:pr-6 xl:my-24">
            <div className="flex flex-col justify-center  ">
            <h2 className="text-[18px] lg:text-[34px] xl:text-[54px] font-bold text-[#c09e5f] mb-6 text-center">
                {t('group.heading')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full items-center ">
            
                <div  className="bg-[#002718] shadow-lg rounded-lg p-6 text-center flex flex-col ">
                <FaGamepad className="text-[100px] text-[#e3ce90]" />
                    <h3 className="text-[18px] lg:text-[24px] text-[#c09e5f] font-black font-orbitron">{t('group.title')}</h3>
                    <p className="text-[14px] lg:text-[18px] text-[#e3ce90] font-bold font-jura mt-6">{t('group.description')}</p>
                </div>
                <div className="bg-[#002718] shadow-lg rounded-lg p-6 text-center flex flex-col items-center">
                <FaUsers className="text-[100px] text-[#e3ce90]" />
                <h3 className="text-[18px] lg:text-[24px] text-[#c09e5f] font-black font-orbitron">{t('group.title1')}</h3>
                <p className="md:text-[14px] lg:text-[18px] text-[#e3ce90] font-bold font-jura mt-6">{t('group.description1')}</p>
                </div>
                <div className="bg-[#002718] shadow-lg rounded-lg p-6 text-center flex flex-col items-center">
                <FaTv className="text-[100px] text-[#e3ce90]" />
                <h3 className="text-[18px] lg:text-[24px] text-[#c09e5f] font-black font-orbitron">{t('group.title2')}</h3>
                <p className="md:text-[14px] lg:text-[18px] text-[#e3ce90] font-bold font-jura mt-6">{t('group.description2')}</p>
            </div>
            
            </div>
            </div>
            </div>
    </div>
  );
};

export default GroupGathering;
