"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PricingTable = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const simulatorSessions = [
    { duration: "20’", price: "95 SAR", image: "/assets/images/dome/bg-3.png" },
    { duration: "40’", price: "170 SAR", image: "/assets/images/dome/bg-4.png" },
    { duration: "60’", price: "250 SAR", image: "/assets/images/dome/bg-5.png" },
  ];

  const groupRacing = [
    { duration: "40’", price: "140 SAR", image: "/assets/images/dome/S5.JPG" },
    { duration: "60’", price: "200 SAR", image: "/assets/images/dome/pic-103.jpg" },
  ];

  const handleClick = () => {
    router.push("/normal");
  };

  return (
    <div className={`flex flex-col items-center justify-center px-6 mt-4 md:mt-20 lg:mt-20 pb-[40px] ${i18n.language === 'ar' ? 'rtl' : ''}`}>
      <div className="xl:flex xl:flex-col w-full max-w-7xl">
        
        <div className="px-0 md:px-10 lg:px-20 mb-2">
          <h3 className="text-[18px] md:text-[34px] text-[#c09e5f] text-center font-black font-orbitron pb-[10px]">
            {t("simulatorSessions.title")}
          </h3>
          <div className="lg:grid lg:grid-cols-3 gap-4 text-center py-4">
            {simulatorSessions.map((session, index) => (
              <button
                key={index}
                className="p-0 mt-4 bg-[#e3ce90] hover:bg-[#c09e5f] transition duration-300 flex flex-col w-full"
                onClick={handleClick}
              >
                <div className="w-full h-40 md:h-60 lg:h-60 relative">
                  <Image 
                    src={session.image} 
                    alt={`Simulator ${index + 1}`} 
                    layout="fill"
                    objectFit="cover"
                    className=""
                  />
                </div>
             
                <div className="w-full p-4 flex flex-col justify-center items-center h-32 text-center">
                  <p className="text-[24px] lg:text-[34px] font-black font-orbitron text-[#002718]">
                    {t("simulatorSessions.duration", { duration: session.duration })}
                  </p>
                  <p className="text-[18px] lg:text-[18px] text-jura text-[#002718]">
                    {t("simulatorSessions.price", { price: session.price })}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="px-0 md:px-10 lg:px-20 mb-40 lg:my-20">
          <h3 className="text-[24px] md:text-[34px] text-[#c09e5f] font-black text-center font-orbitron pb-[10px]">
            {t("groupRacing.title")}
          </h3>
          <div className="lg:grid lg:grid-cols-2 gap-4 text-center h-[400px]">
            {groupRacing.map((race, index) => (
              <button
                key={index}
                className="p-0 mt-4 bg-[#e3ce90] hover:bg-[#c09e5f] transition duration-300 flex flex-col w-full"
                onClick={handleClick}
              >
                <div className="w-full h-40 md:h-60 lg:h-60 relative">
                  <Image 
                    src={race.image} 
                    alt={`Group Racing ${index + 1}`} 
                    layout="fill"
                    objectFit="cover"
                    className=""
                  />
                </div>
                <div className="w-full p-4 flex flex-col justify-center items-center h-32 text-center">
                  <p className="text-[24px] lg:text-[34px] font-black font-orbitron text-[#002718]">
                    {t("groupRacing.duration", { duration: race.duration })}
                  </p>
                  <p className="text-[18px] lg:text-[18px] text-jura text-[#002718]">
                    {t("groupRacing.price", { price: race.price })}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PricingTable;
