"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const PricingTable = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const simulatorSessions = [
    { duration: "20’", price: "95 SAR" },
    { duration: "40’", price: "170 SAR" },
    { duration: "60’", price: "250 SAR" },
  ];

  const groupRacing = [
    { duration: "40’", price: "140 SAR" },
    { duration: "60’", price: "200 SAR" },
  ];

  // const handleClick = () => {
  //   router.push("/normal");
  // };

  return (
    <div className={`flex flex-col items-center justify-center px-2 mb-8 py-[40px] ${i18n.language === 'ar' ? 'rtl' : ''}`}>
      <div className=" md:max-w-7xl py-4 md:py-16 lg:py-16">
        
        {/* Simulator Sessions Table */}
        <h3 className="text-[30px] md:text-[40px] lg:text-[40px] text-[#C09E5F] text-start md:text-center lg:text-center font-black font-orbitron pb-4 px-6 leading-normal">
          {t("simulatorSessions.title")}
        </h3>
        <div className="w-[390px] md:w-[1200px] lg:w-[1200px] overflow-x-auto8 px-6">
          <table className="w-full border-collapse border border-[#C09E5F] text-center">
            <thead>
              <tr className="bg-[#022F29] ">
                <th className="border text-[#C09E5F] border-[#C09E5F] text-[20px] md:text-[32px] font-orbitron px-6 py-4">Duration</th>
                <th className="border text-[#C09E5F] border-[#c09e5f] text-[20px] md:text-[32px] font-orbitron px-6 py-4">Price per person</th>
          
              </tr>
            </thead>
            <tbody>
              {simulatorSessions.map((session, index) => (
                <tr key={index} className="hover:bg-[#022F29] transition duration-300">
                  <td className="border text-[#C09E5F] border-[#c09e5f] text-[24px] font-orbitron px-4 py-4">{session.duration}</td>
                  <td className="border text-[#C09E5F] border-[#c09e5f] text-[24px] font-orbitron px-4 py-4">{session.price}</td>
                  {/* <td className="border border-[#c09e5f] px-4 py-2">
                    <button 
                      onClick={handleClick} 
                      className="bg-[#c09e5f] text-[#002718] px-3 py-1 rounded-md hover:bg-[#e3ce90] transition">
                      {t("bookNow")}
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-[30px] md:text-[40px] lg:text-[40px] text-[#C09E5F] text-center md:text-center lg:text-center font-black font-orbitron pb-4 px-6 leading-normal pt-[8px] ">
          {t("groupRacing.title")}
        </h3>
        <div className="w-[390px] md:w-[1200px] lg:w-[1200px] overflow-x-auto">
          <table className="w-full border-collapse border border-[#C09E5F] text-center">
            <thead>
              <tr className="bg-[#022F29]">
                <th className="border text-[#C09E5F] border-[#C09E5F] text-[20px] md:text-[32px] font-orbitron px-6 py-4">Duration</th>
                <th className="border text-[#C09E5F] border-[#C09E5F] text-[20px] md:text-[32px] font-orbitron px-6 py-4">Price per person</th>
                {/* <th className="border border-[#c09e5f] px-4 py-2">{t("actions")}</th> */}
              </tr>
            </thead>
            <tbody>
              {groupRacing.map((race, index) => (
                <tr key={index} className="hover:bg-[#022F29] transition duration-300">
                  <td className="border text-[#C09E5F] border-[#c09e5f] text-[24px] px-4 py-4">{race.duration}</td>
                  <td className="border text-[#C09E5F] border-[#c09e5f] text-[24px]  px-4 py-4">{race.price}</td>
                  {/* <td className="border border-[#c09e5f] px-4 py-2">
                    <button 
                      onClick={handleClick} 
                      className="bg-[#c09e5f] text-[#002718] px-3 py-1 rounded-md hover:bg-[#e3ce90] transition">
                      {t("bookNow")}
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default PricingTable;
