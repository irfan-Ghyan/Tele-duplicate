

"use client"

import React from "react"
import { Helmet } from 'react-helmet-async';
import Head from 'next/head';
import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, DollarSign } from "lucide-react"
import { useTranslation } from 'react-i18next';
import Link from "next/link";

export default function RacingExperienceCards() {
  const [openDropdown, setOpenDropdown] = useState(null) 

  const { t } = useTranslation();

  const toggleDropdown = (id) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(id);
    }
  };

  const experiences = [
    {
      id: "race",
      title: "RACE",
      description:
        "Break your fear or sharpen your skills in an exhilarating session. Feel the circuit and test your reflexes in an intense race, also challenge your friends in a competitive group race.",
      buttonText: "BOOK RACE",
      image: "/assets/images/experience/card1.png",
      pricing: [
        { duration: "20'", price: "95 SAR" },
        { duration: "40'", price: "170 SAR" },
        { duration: "60'", price: "250 SAR" },
      ],
    },
    {
      id: "group-race",
      title: "GROUP RACE",
      description:
        "Experience the thrill of racing as a team! Feel the energy of the circuit and combine your reflexes in an intense group race, challenging your friends and pushing your limits together for the win.",
      buttonText: "BOOK GROUP RACE",
      image: "/assets/images/experience/card2.png",
      pricing: [
        { duration: "30'", price: "150 SAR" },
        { duration: "60'", price: "280 SAR" },
        { duration: "90'", price: "400 SAR" },
      ],
    },
    {
      id: "vip-bays",
      title: "VIP BAYS",
      description:
        "Immerse yourself in exclusive racing and luxury entertainment in a VIP bay with a dedicated lounge space and high-tech simulators.",
      description1:
        "Designed for small groups who love to compete, watch live sporting events, or simply relax in a premium setting.",
      buttonText: "BOOK VIP BAYS",
      image: "/assets/images/experience/card3.png",
      pricing: [
        { duration: "1 hour", price: "350 SAR" },
        { duration: "2 hours", price: "650 SAR" },
        { duration: "4 hours", price: "1200 SAR" },
      ],
    },
    {
      id: "vip-suite",
      title: "VIP SUITE",
      description:
        "A premium space designed for special events, corporate gatherings, team-building activities, and exclusive meetups.",
      description1:
        "Our VIP Suites feature spacious meeting rooms, comfortable seating, and state-of-the-art racing simulators—offering the perfect blend of business and adrenaline-fueled excitement.",
      buttonText: "BOOK VIP SUITE",
      image: "/assets/images/experience/card4.png",
      pricing: [
        { duration: "2 hours", price: "800 SAR" },
        { duration: "4 hours", price: "1500 SAR" },
        { duration: "Full day", price: "3000 SAR" },
      ],
    },
  ]

  return (
    <>
      <Helmet>
        <title>{t('Experiences | Racing simulators and all-inclusive access')}</title>
        <meta
          name={t('description')}
          content={t(
            'Explore various racing experiences at Teleios Dome, from beginner sessions to exclusive VIP experiences. Enjoy adrenaline-packed moments tailored to your level of skill.'
          )}
        />
      </Helmet>

      <Head>
        <link rel="preload" href="/assets/images/experience/exbg.png" as="image" />
        <link rel="preload" href="/assets/images/experience/mintue1.jpg" as="image" />
      </Head>

      <div className="container mx-auto mb-[20px] md:mb-[100px] lg:mb-[100px]">
  <div className="flex items-center justify-center px-4 py-4 md:py-16 lg:py-16">
    <div className=" text-[#e3ce90]">
      <h1 className="font-orbitron text-center text-[34px] lg:text-[54px] text-[#C09E5F] font-black mb-4">
        {t('Exp_heading')}
      </h1>
      <p className="text-[#fff] font-jura text-[18px] md:text-center lg:text-center font-bold px-0 lg:px-[20px] xl:px-[20px] opacity-[80%]">
        {t('Exp_des')}
      </p>
    </div>
  </div>

  {/* Flex container for buttons */}
  <div className="flex flex-col md:flex-row lg:flex-row gap-4 justify-center p-4 bg-[#003330]">
    {experiences.map((exp) => (
      <div
        key={exp.id}
        className="relative border border-[#C09E5F] overflow-hidden flex flex-col h-full"
        style={{ backgroundColor: "rgba(0, 51, 48, 0.9)" }}
      >
        <div className="absolute inset-0 z-0 w-full h-[286px]">
          <Image src={exp.image || "/placeholder.svg"} alt={exp.title} fill style={{ objectFit: "cover" }} />
        </div>

        <div className="relative z-10 flex flex-col sm:w-full md:w-[360px] md:h-[644px] lg:w-[360px] lg:h-[644px]">
          {openDropdown === exp.id ? (
            <div className="bg-red-600 text-white">
              <div className="grid grid-cols-2">
                <div className="p-2 font-bold border-b border-r border-red-400">Duration</div>
                <div className="p-2 font-bold border-b border-red-400">Price Per Person</div>

                {exp.pricing.map((price, index) => (
                  <React.Fragment key={index}>
                    <div className="p-2 border-r border-red-400">{price.duration}</div>
                    <div className="p-2">{price.price}</div>
                  </React.Fragment>
                ))}
              </div>
              <button
                onClick={() => toggleDropdown(exp.id)}
                className="w-full flex justify-center p-2 hover:bg-red-700 transition-colors"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => toggleDropdown(exp.id)}
              className="bg-red-600 text-white p-2 self-end gap-2 mx-2 border border-[ #C09E5F] rounded-b-2xl w-[55px] h-[97px]"
            >
              <Image src="/assets/images/experience/Saudi_Riyal_icon.png" alt="icon" width={50} height={50} className="w-[32px] h-[32px] top-0"/>
              <ChevronDown className="h-[32px] w-[32px] mt-2" />
            </button>
          )}

          <div className="p-4 pt-0 md:mt-[120px] lg:mt-[120px] flex-grow">
            <h2 className="text-[48px] font-black font-orbitron text-[#C09E5F]">{exp.title}</h2>
            <p className="text-white font-bold font-jura text-[16px] mb-4">{exp.description}</p>
            <p className="text-white font-bold font-jura text-[16px] mb-4">{exp.description1}</p>
          </div>
          <div className="p-4 pt-0 mb-6">
            <Link href="/normal" className="button-slanted w-[250px] h-[47px] mx-auto font-jura text-[16px] font-bold leading-[24px] bg-gradient-to-r cursor-pointer from-[#df2a27e3] to-[#df2a27] text-white transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
              {exp.buttonText}
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </>
  )
}
