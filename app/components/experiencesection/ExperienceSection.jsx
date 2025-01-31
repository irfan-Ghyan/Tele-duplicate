"use client";

import React from "react";
import { FaCar, FaGamepad, FaCouch, FaCoffee } from "react-icons/fa";

const ExperienceSection = () => {
  const features = [
    {
      // icon: <FaCar className="text-[50px] text-[#e3ce90]" />,
      title: "State-of-the-Art Racing Simulator",
      description: "Feel the adrenaline rush with our premium simulator—perfect for friendly competition or solo adventures.",
    },
    {
      // icon: <FaGamepad className="text-[50px] text-[#e3ce90]"/>,
      title: "Gaming & Entertainment Zone",
      description: "Gather your group for hours of fun with racing simulators, a PS5, and two large TVs all in a sleek, luxurious setting.",
    },
    {
      // icon: <FaCouch className="text-[50px] text-[#e3ce90]" />,
      title: "Premium Lounge Setting",
      description: "Designed with elegance and comfort in mind, the Executive Lounge offers plush seating, ambient lighting, and a contemporary vibe for any occasion.",
    },
    {
      // icon: <FaCoffee className="text-[50px] text-[#e3ce90]" />,
      title: "Exclusive F&B Offerings",
      description: "Share moments over handcrafted mocktails, barista-quality specialty coffee, and gourmet light bites curated to enhance your experience.",
    },
  ];

  return (
    <div className="flex flex-col justify-center">
      <h2 className="font-orbitron text-[24px] lg:text-[34px] text-[#c09e5f] font-black mb-4 text-center">
        Experience the Ultimate Entertainment
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl w-full pt-4">
        {features.map((feature, index) => (
          <div key={index} className="bg-[#002718] shadow-lg rounded-lg flex flex-col items-center px-10 py-10">
            {feature.icon}
            <h3 className="text-[18px] lg:text-[24px] text-[#c09e5f] font-black font-orbitron mt-2">{feature.title}</h3>
            <p className="text-[#e3ce90] text-[14px] lg:text-[18px] font-bold font-jura mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
