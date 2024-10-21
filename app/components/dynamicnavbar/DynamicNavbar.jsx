'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/assets/images/logo.png';
import Dropdown from '../../components/header/dropdwon/Dropdown';
import closenavbar from '../../../public/assets/icons/navbarclose.png';

const DynamicNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <nav className="bg-opacity-0 my-6 px-4 w-full top-0 z-50 navbar">
      <div className="mx-auto p-x lg:px-40 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image src={logo} alt="Logo" className="h-[42px] w-[155px] width={155} height={42}" />
        </div>
        <div>
          <button className="button-slanted xl:hidden button book-btn ml-2 w-[100px] md:w-[142px] h-[39px] font-jura cursor-pointer md:font-bold bg-gradient-to-r from-[#7E51F8] to-[#D007A6] text-white transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
            BOOK NOW
          </button>
        </div>
        <div className="hidden xl:flex space-x-6 md:space-x-2 lg:space-x-4 mt-2 ml-2">
          <Link href="/" className="text-white font-jura text-[12px] lg:text-[14px] font-normal lg:font-bold hover:text-[#A72CCF]">
            EXPERIENCS
          </Link>
          <Link href="/dome" className="text-white font-jura text-[12px] lg:text-[14px] font-normal lg:font-bold hover:text-[#A72CCF]">
            DOME
          </Link>
          <Link href="/" className="text-white font-jura text-[12px] lg:text-[14px] font-normal lg:font-bold hover:text-[#A72CCF]">
            UPCOMING EVENTS
          </Link>
          <Link href="/" className="text-white text-[12px] lg:text-[14px] font-normal lg:font-bold font-jura hover:text-[#A72CCF]">
            COPORATE & CELEBRATION EVENTS
          </Link>
          <Link href="/" className="text-white font-jura text-[12px] lg:text-[14px] font-normal lg:font-bold hover:text-[#A72CCF]">
            EDUCATION
          </Link>
          <Link href="/" className="text-white font-jura text-[12px] lg:text-[14px] font-normal lg:font-bold hover:text-[#A72CCF]">
            OTHER
          </Link>
          <Dropdown />
        </div>
        <div className="hidden xl:block">
          <button className="button-slanted w-[80px] md:w-[142px] button h-[39px] font-jura font-normal md:font-bold bg-gradient-to-r cursor-pointer from-[#7E51F8] to-[#D007A6] text-white ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
            BOOK NOW
          </button>
        </div>
        <div className="xl:hidden">
          <button onClick={toggleMenu} className="text-white text-3xl">
            {menuOpen ? <Image src={closenavbar} className="h-[25px] w-[25px]" alt='close' /> : '☰'}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="xl:hidden bg-[#ce21b7] lg:w-1/2 w-full">
          <div className="flex flex-col items-start px-4 py-2">
            <Link href="/" className="block w-full text-left px-4 py-2 text-white font-jura text-[14px] font-bold hover:text-[#A72CCF]">
              EXPERIENCS
            </Link>
            <Link href="/" className="block w-full text-left px-4 py-2 text-white font-jura text-[14px] hover:text-[#A72CCF]">
              DOME
            </Link>
            <Link href="/" className="block w-full text-left px-4 py-2 text-white font-jura font-bold text-[14px] hover:text-[#A72CCF]">
              UPCOMING EVENTS
            </Link>
            <Link href="/" className="block w-full text-left px-4 py-2 text-white text-[14px] font-bold font-jura hover:text-[#A72CCF]">
              COPORATE & CELEBRATION EVENTS
            </Link>
            <Link href="/" className="block w-full text-left px-4 py-2 text-white font-jura text-[14px] font-bold hover:text-[#A72CCF]">
              EDUCATION
            </Link>
            <Link href="/" className="block w-full text-left px-4 py-2 text-white font-jura font-bold text-[14px] hover:text-[#A72CCF]">
              OTHER
            </Link>
            <Dropdown />
          </div>
        </div>
      )}
    </nav>
      <div className="flex items-center justify-center py-[100px] xl:px-40 lg:px-20 sm:px-4">
        <div className="text-center p-6 text-white">
          <h1 className="font-orbitron text-[68px] text-white font-black mb-4">DOME</h1>
          <p className="text-white font-jura text-[18px] font-bold lg:px-[40px] xl:px-[80px]">
            Explore education at Teleios Dome, from factory visits to thrilling racing experiences, engaging participants in immersive learning adventures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DynamicNavbar;
