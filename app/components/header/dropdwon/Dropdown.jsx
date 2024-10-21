import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dropdownIconClosed from '../../../../public/assets/icons/close.png';
import dropdownIconOpen from '../../../../public/assets/icons/open.png';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left mt-[1px]" ref={dropdownRef}>
      <div className='ml-4 md:ml-2'>
        <button
          type="button"
          className="inline-flex justify-center w-full text-sm font-jura font-bold text-white focus:outline-none hover:text-[#A72CCF]"
          onClick={toggleDropdown}
        >
          LOCATIONS
          <Image
            src={isOpen ? dropdownIconOpen : dropdownIconClosed}
            alt="Dropdown Icon"
            width={20}
            height={20}
            className="ml-4"
          />
        </button>
      </div>

      {isOpen && (
        <div className="w-[217px] h-[118px] origin-top-right absolute ml-[0px] lg:ml-[16px] left-0 mt-2 shadow-lg bg-[#11072C] ring-1 ring-[#11072C] ring-opacity-5 focus:outline-none">
          <div className="lg:ml-[16px] py-1">
            <Link href="/SaudArabia" className="block px-4 py-2 text-sm  text-white font-jura font-bold text-[14px] hover:text-[#A72CCF]" onClick={handleLinkClick}>
              Saudi Arabia
            </Link>
            <Link href="/UAE" className="block px-4 py-2 text-sm  text-white font-jura font-bold text-[14px] hover:text-[#A72CCF]" onClick={handleLinkClick}>
              United Arab Emirates
            </Link>
            <Link href="/Qatar" className="block px-4 py-2 text-sm  text-white font-jura font-bold text-[14px] hover:text-[#A72CCF]" onClick={handleLinkClick}>
              Qatar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;


