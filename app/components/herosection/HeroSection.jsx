'use client'

import Image from "next/image"
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Page() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const hiddenRoutes = [
    '/experiencedetails',
    '/experience',
    '/upcomingevents',
    '/dome',
    '/education',
    '/corporateevents',
    '/enquiry-form',
    '/terms&conditions',
    '/privacy',
    '/menu',
  ];

  const shouldHideBannersAndBackground = hiddenRoutes.includes(pathname);

  const scrollToSection = () => {
    const targetSection = document.getElementById('target-section');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative mt-[80px] md:mt-[0px] lg:mt-[0px]">
      <div className="absolute inset-0 z-0 ">
        <Image
          src="/assets/images/herosectionbg.png"
          alt="Luxury racing simulators"
          fill
          priority
        />
      </div>

      <div className="container mx-auto relative z-10 flex flex-col md:items-start justify-center h-[430px] md:h-[1200px] lg:h-[1200px] px-4 md:px-8 ">
        <h1 className="text-[34px] md:text-[101px] font-black font-orbitron text-[#C09E5F] leading-none hidden sm:block">
          LUXURY
          <br />
          SIM RACING
          <br />
          IN RIYADH
        </h1>
        <h1 className="block sm:hidden text-[34px] md:text-[101px] font-black font-orbitron text-[#C09E5F] leading-none">
          LUXURY SIM
          <br />
           RACING IN RIYADH     
        </h1>

        <p className="font-bold font-jura text-white text-opacity-80 text-[16px] md:text-[30px] lg:text-[30px] leading-normal md:leading-[32px] w-full md:w-[796px] py-4 md:py-8 lg:py-8">
          The Ultimate Adrenaline Rush body - Unleash your inner racer at TeleiosX, Riyadh&apos;s premier luxury sim
          racing and esports venue.
        </p>

        <div className="flex py-8 md:py-0 lg:py-0">
          <p className="font-bold font-jura text-[#C09E5F] text-[20px] md:text-[30px] lg:text-[30px] leading-[32px] pt-2 ">Ready to race?</p>
          <Link href="/bookracingexperience" className="button-slanted w-[162px] h-[51px] font-jura text-[16px] text-white font-bold leading-[24px] bg-[#F13936] cursor-pointer rounded-tl-lg rounded-br-lg flex items-center justify-center mx-2 md:mx-8 lg:mx-8">
            BOOK NOW
          </Link>
        </div>

        {/* Scroll Indicator */}
        {pathname === '/' && (
          <>
            <button
              className={`absolute bottom-10 md:bottom-20 lg:bottom-20 xl:bottom-20 left-1/2 transform -translate-x-1/2 z-[999] p-2 rounded-full hover:opacity-80 transition ${
                isScrolled ? "opacity-0 translate-y-5" : "opacity-100"
              } 
              hidden sm:block`} // Ensuring the button is hidden on mobile and shown on larger screens
              onClick={scrollToSection}
            >
              <Image
                src="/assets/images/dome/arrowdpown.png"
                width={40}
                height={40}
                alt="Scroll Down"
                priority
              />
            </button>
          </>
        )}
      </div>
    </main>
  );
}
