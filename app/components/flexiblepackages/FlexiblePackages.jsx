"use client";

import React from "react";
import { useRouter } from "next/navigation";

const FlexiblePackages = () => {
  const router = useRouter();

  const vipBays = [
    { duration: "60’", price: "400 SAR" },
    { duration: "90’", price: "500 SAR" },
    { duration: "120’", price: "600 SAR" },
  ];

  const vipSuite = [
    { duration: "60’", price: "800 SAR" },
    { duration: "90’", price: "1000 SAR" },
    { duration: "120’", price: "1200 SAR" },
  ];

  const handleNavigation = () => {
    router.push("/vip");
  };

  const handleNavigation1 = () => {
    router.push("/lounge");
  };

  return (
    <div className="xl:flex xl:flex-col p-6 mb-40">
      <h2 className="text-[18px] lg:text-[34px] xl:text-[54px] font-bold text-[#c09e5f] mb-6 text-center ">
        Flexible Packages For Groups
      </h2>

      <div className="w-full mt-4 max-w-7xl ">

        <div className="bg-[#002718] shadow-md rounded-lg p-10 mx-4">
          <h3 className="text-[18px] lg:text-[24px] text-[#c09e5f] font-black font-orbitron mb-4">
            VIP Bays at TeleiosX
          </h3>
          <div className="xl:grid xl:grid-cols-3 gap-4 text-center ">
            {vipBays.map((packageItem, index) => (
              <div
                key={index}
                onClick={handleNavigation}
                className="xl:w-[360px] px-10 py-2 rounded-lg bg-[#e3ce90] text-[#002718] cursor-pointer  mb-4 lg:mb-0 xl:mb-0"
              >
                <p className="text-[18px] lg:text-[24px] text-[#002718] font-black font-orbitron mt-2">{packageItem.duration}</p>
                <p className="text-[14px] lg:text-[18px] text-[#002718] font-bold font-jura mt-2">{packageItem.price}</p>
              </div>
            ))}
          </div>
        </div>


        <div className="bg-[#002718] shadow-md rounded-lg p-10 mx-4 mt-4">
          <h3 className="text-[18px] lg:text-[24px] text-[#c09e5f] font-black font-orbitron mb-4">
            VIP Suite at TeleiosX
          </h3>
          <div className=" text-center xl:grid xl:grid-cols-3 gap-4">
            {vipSuite.map((packageItem, index) => (
              <div
                key={index}
                onClick={handleNavigation1}
                className="px-10 py-2 rounded-lg bg-[#e3ce90] text-[#002718] cursor-pointer mb-4 lg:mb-0 xl:mb-0"
              >
                <p className="text-[18px] lg:text-[24px] text-[#002718] font-black font-orbitron mt-2">{packageItem.duration}</p>
                <p className="text-[14px] lg:text-[18px] text-[#002718] font-bold font-jura mt-2">{packageItem.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlexiblePackages;
