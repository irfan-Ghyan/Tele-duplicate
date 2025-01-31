"use client";

import React from "react";

const PricingTable = () => {
  const simulatorSessions = [
    { duration: "20’", price: "95 SAR" },
    { duration: "40’", price: "170 SAR" },
    { duration: "60’", price: "250 SAR" },
  ];

  const groupRacing = [
    { duration: "40’", price: "140 SAR" },
    { duration: "60’", price: "200 SAR" },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 lg:py-[80px] lg:pb-[100px] lg:pt-[50px ">
      <h2 className="text-[24px] lg:text-[34px] font-bold text-[#e3ce90] mb-6">Session Pricing</h2>


      <div className="flex w-full max-w-7xl ">

        <div className="p-10 mb-6 bg-[#002718] rounded-lg mx-10">
          <h3 className="text-xl font-black text-[#e3ce90] mb-4">Simulator Sessions (Up to 3 People)</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            {simulatorSessions.map((session, index) => (
              <div key={index} className="p-4 rounded-lg bg-[#e3ce90]">
                <p className="text-[14px] lg:text-[18px] text-jura text-[#002718]">{session.duration}</p>
                <p className="text-[14px] lg:text-[18px] text-jura text-[#002718]">{session.price} per person</p>
              </div>
            ))}
          </div>
        </div>


        <div className="bg-[#002718] rounded-lg p-10 mb-6">
          <h3 className="text-xl font-black text-[#e3ce90] mb-4">Group Racing (4+ People)</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            {groupRacing.map((race, index) => (
              <div key={index} className="p-4 bg-[#e3ce90] rounded-lg">
                <p className="text-lg font-medium text-jubtron text-[#002718]">{race.duration}</p>
                <p className="text-[14px] lg:text-[18px] text-jura text-[#002718]">{race.price} per person</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
