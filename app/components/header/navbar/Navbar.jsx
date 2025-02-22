'use client';

import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { switchLanguage } from '../../../utils/language.js';
import { useTranslation } from 'react-i18next';

const Navbar = ({ isTopBannerVisible }) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuEventsOpen, setMenuEventsOpen] = useState(false);
  const [menuAboutOpen, setMenuAboutOpen] = useState(false);
  const [navbarBg, setNavbarBg] = useState('bg-opacity-0');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isExperienceDropdownOpen, setIsExperienceDropdownOpen] = useState(false);
  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileExperienceDropdownOpen, setIsMobileExperienceDropdownOpen] = useState(false);
  const [isMobileEventsDropdownOpen, setIsMobileEventsDropdownOpen] = useState(false);
  const [isMobileAboutDropdownOpen, setIsMobileAboutDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null)
  const { t, i18n } = useTranslation();

  const hiddenRoutes = [
    '/experience',
    '/dome',
    '/watchparties',
    '/privateevents',
    '/f&b',
    '/enquiry-form',
    '/terms&conditions',
    '/privacy',
    '/menu',
    '/experiencedetails',
  ];
  const isHiddenRoute = hiddenRoutes.includes(pathname);



  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleLanguageDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleExperienceDropdown = () => {
    setIsExperienceDropdownOpen(!isExperienceDropdownOpen);
    setIsEventsDropdownOpen(false);
    setIsAboutDropdownOpen(false);
  };
  const toggleEventsDropdown = () => {
    setIsEventsDropdownOpen(!isEventsDropdownOpen);
    setIsExperienceDropdownOpen(false);
    setIsAboutDropdownOpen(false);
  };
  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
    setIsExperienceDropdownOpen(false);
    setIsEventsDropdownOpen(false);
  };
  const toggleMobileExperienceDropdown = () => {
    setIsMobileExperienceDropdownOpen(!isMobileExperienceDropdownOpen);
    setIsMobileEventsDropdownOpen(false);
    setIsMobileAboutDropdownOpen(false);
  };
  const toggleMobileEventsDropdown = () => {
    setIsMobileEventsDropdownOpen(!isMobileEventsDropdownOpen);
    setIsMobileExperienceDropdownOpen(false);
    setIsMobileAboutDropdownOpen(false);
  };
  const toggleMobileAboutDropdown = () => {
    setIsMobileAboutDropdownOpen(!isMobileAboutDropdownOpen);
    setIsMobileExperienceDropdownOpen(false);
    setIsMobileEventsDropdownOpen(false);
  };
  
  const closeMenu = () => {
    setMenuOpen(false);
    setIsMobileExperienceDropdownOpen(false);
    setIsMobileEventsDropdownOpen(false);
    setIsMobileAboutDropdownOpen(false);
    setIsExperienceDropdownOpen(false);
    setIsEventsDropdownOpen(false);
    setIsAboutDropdownOpen(false);
  };
  
  const handleLanguageChange = (lng) => {
    setSelectedLanguage(lng);
    i18n.changeLanguage(lng);
    switchLanguage(lng);
    setIsDropdownOpen(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 40) {
      setNavbarBg('bg-[#063828] lg:bg-[#063828]');
    } else {
      setNavbarBg('bg-opacity-0');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, isHiddenRoute]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDynamicMeta = () => {
    switch (pathname) {
      case '/experience':
        return {
          title: 'Experiences | Teleios Dome',
          description: 'Discover exciting racing experiences at Teleios Dome. Book your seat now!',
        };
      case '/venue':
        return {
          title: 'Venue | Teleios Dome',
          description: 'Explore the ultimate immersive experience at Teleios Dome.',
        };
      case '/watchparties/':
        return {
          title: 'Watch Parties | Teleios Dome',
          description: 'Host your next corporate event or celebration at Teleios Dome.',
        };
      case '/privateevents':
        return {
          title: 'Public Events | Teleios Dome',
          description: 'Host your next corporate event or celebration at Teleios Dome.',
        };
      case '/f&b':
        return {
          title: 'F & B | Teleios Dome',
          description: 'Learn and grow with our education programs at Teleios Dome.',
        };
      default:
        return {
          title: 'Teleios Dome',
          description: 'Welcome to Teleios Dome, your premier destination for racing and events.',
        };
    }
  };

  const { title, description } = getDynamicMeta();

  // const handleLanguageChange = (lng) => {
  //   i18n.changeLanguage(lng);
  //   switchLanguage(lng);
  // };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Helmet>
      <nav
        className={`fixed ${
          isTopBannerVisible ? 'top-0' : 'top-0'
        } w-full z-40 transition-all duration-300 px-[20px] md:px-[20px] lg:px-[20px] xl:px-[40px] py-[5px]  ${navbarBg} navbar`}
      >
        <div className="flex justify-between items-center w-full h-[84px] py-4">
          <div className="flex items-center">
            <Link href="/" onClick={closeMenu} className="flex items-center">
              <Image
                src="/assets/images/dome/logo2.png"
                alt="Logo"
                width={185}
                height={30}
                priority={true}
                className="hidden xl:block sm:w-[100px] sm:h-[52px] md:w-[165px] md:h-[60px] lg:w-[180px] lg:h-[30px] xl:w-[180px] xl:h-[30px]"
              />
              <Image
                src="/assets/images/dome/logo1.png"
                alt="Logo Responsive"
                width={185}
                height={120}
                priority={true}
                className="block xl:hidden sm:w-[100px] sm:h-[52px] md:w-[170px] md:h-[92px] lg:w-[165px] lg:h-[92px]"
              />
            </Link>
          </div>

      
        
          <div className="flex-grow hidden xl:flex justify-center space-x-4 md:space-x-6 lg:space-x-8 ">
          <Link
              href="/"
              className="font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1 ml-4"
              onClick={closeMenu}
            >
              {t('HOME')}
            </Link>
            {/* <Link
              href="/experience"
              className="font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1 ml-4"
              onClick={closeMenu}
            >
              {t('EXPERIENCES')}
            </Link> */}

             {/* Experience Dropdown */}
             <div className="relative" ref={dropdownRef}>
              <button
                className="block font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1 ml-4 flex items-center"
                onClick={toggleExperienceDropdown}
              >
                {t('EXPERIENCES')}
        
              </button>

              {isExperienceDropdownOpen && (
                <div className="absolute left-0 mt-2 w-[160px] bg-[#063828]">
                  <Link href="/experience" className="block px-4 py-2 font-jura text-[12px] lg:text-[14px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90]" onClick={closeMenu}>
                    {t('BOOK NOW')}
                  </Link>
                  <Link href="/executivelounge" className="block px-4 py-2 font-jura text-[12px] lg:text-[14px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90]" onClick={closeMenu}>
                    {t('EXECUTIVE LOUNGE')}
                  </Link>
                  <Link href="/f&b" className="block px-4 py-2 font-jura text-[12px] lg:text-[14px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90]" onClick={closeMenu}>
                    {t('F&B')}
                  </Link>
                </div>
              )}
            </div>


             <div className="relative" ref={dropdownRef}>
              <button
                className="block font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1 ml-4 flex items-center"
                onClick={toggleEventsDropdown}
              >
                {t('EVENTS')}
        
              </button>

              {isEventsDropdownOpen && (
                <div className="absolute left-0 mt-2 w-[160px] bg-[#063828]">
                  <Link href="/watchparties" className="block px-4 py-2 font-jura text-[12px] lg:text-[14px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90]" onClick={closeMenu}>
                    {t('watchparties')}
                  </Link>
                  <Link href="/privateevents" className="block px-4 py-2 font-jura text-[12px] lg:text-[14px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90]" onClick={closeMenu}>
                    {t('privateevents')}
                  </Link>
                  <Link href="/corporateevents" className="block px-4 py-2 font-jura text-[12px] lg:text-[14px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90]" onClick={closeMenu}>
                    {t('corporateevents')}
                  </Link>
                </div>
              )}
            </div>


            <div className="relative" ref={dropdownRef}>
              <button
                className="block font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1 ml-4 flex items-center"
                onClick={toggleAboutDropdown}
              >
                {t('ABOUT')}
        
              </button>

              {isAboutDropdownOpen && (
                <div className="absolute left-0 mt-2 w-[160px] bg-[#063828]">
                  <Link href="/teleiosx" className="block px-4 py-2 font-jura text-[12px] lg:text-[14px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90]" onClick={closeMenu}>
                    {t('VENUE')}
                  </Link>
                </div>
              )}
            </div>
        
          </div>

          <div className="relative ml-[31px] mr-[31px]" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center focus:outline-none"
            >
              <div className='flex flex-col'>
              <Image
                src="/assets/images/dome/globe.png"
                alt="Language Icon"
                width={20}
                height={20}
                className="cursor-pointer"
              />
              <span className="font-jura text-[#C09E5F] text-[12px] font-bold mt-1">
                {selectedLanguage === 'en' ? 'EN' : 'العربية'}
              </span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-12 left-[-24px] bg-[#063828] border border-[#C09E5F] shadow-md rounded-md w-12">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className="w-full px-3 py-2 text-left text-[12px] font-jura hover:text-[#063828] hover:bg-[#C09E5F]"
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('ar')}
                  className="w-full px-3 py-2 text-left text-[12px] font-jura hover:text-[#063828] hover:bg-[#C09E5F]"
                >
                  العربية
                </button>
              </div>
            )}
          </div>
         
          <div className="hidden xl:flex items-center">
            <Link
              href="/experience"
              className="button-slanted w-[80px] md:w-[142px] lg:w-[142px] h-[42px] font-jura text-[16px] font-normal leading-[24px] bg-gradient-to-r cursor-pointer from-[#df2a27e3] to-[#df2a27] text-white transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center"
            >
              <span className="button-slanted-content">{t('BOOK NOW')}</span>
            </Link>
          </div>

          


          <div className="xl:hidden">
            <button onClick={toggleMenu} className="text-[#c09e5f] text-4xl">
              {menuOpen ? (
                <Image
                  src="/assets/images/dome/navbarclose.png"
                  className="h-[30px] w-[30px]"
                  alt="close"
                  width={30}
                  height={30}
                />
              ) : (
                '☰'
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div ref={menuRef} className="mx-8 xl:hidden bg-[#063828] absolute right-0 top-full w-[300px]">
            <div className="flex flex-col items-start px-4 py-4">
            <Link
                href="/"
                className="block w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura "
                onClick={closeMenu}
              >
                {t('HOME')}
              </Link>

              {/* <Link
                href="/experience"
                className="block w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura hover:text-[#063828]"
                onClick={closeMenu}
              >
                {t('EXPERIENCES')}
              </Link> */}

               <button
                onClick={toggleMobileExperienceDropdown}
                className="block w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura hover:text-[#e3ce90] "
              >
                {t('EXPERIENCES')}
              </button>

              {isMobileExperienceDropdownOpen && (
                <div className="pl-4">
                  <Link href="/experience" className="block px-4 py-2 text-[#c09e5f] text-[14px] hover:bg-[#C09E5F] hover:text-[#e3ce90] " onClick={closeMenu}>
                    {t('BOOK NOW')}
                  </Link>
                  <Link href="/executivelounge" className="block px-4 py-2 text-[#c09e5f] text-[14px] hover:bg-[#C09E5F] hover:text-[#e3ce90] " onClick={closeMenu}>
                    {t('EXECUTIVE LOUNGE')}
                  </Link>
                  <Link href="/f&b" className="block px-4 py-2 text-[#c09e5f] text-[14px] hover:bg-[#C09E5F] hover:text-[#e3ce90] " onClick={closeMenu}>
                    {t('F&B')}
                  </Link>
                </div>
              )}


              <button
                onClick={toggleMobileEventsDropdown}
                className="block w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura hover:text-[#e3ce90] "
              >
                {t('EVENTS')}
              </button>

              {isMobileEventsDropdownOpen && (
                <div className="pl-4">
                  <Link href="/watchparties" className="block px-4 py-2 text-[#c09e5f] text-[14px] hover:text-[#e3ce90] " onClick={closeMenu}>
                    {t('watchparties')}
                  </Link>
                  <Link href="/privateevents" className="block px-4 py-2 text-[#c09e5f] text-[14px] hover:text-[#e3ce90] " onClick={closeMenu}>
                    {t('privateevents')}
                  </Link>
                  <Link href="/corporateevents" className="block px-4 py-2 text-[#c09e5f] text-[14px] hover:text-[#e3ce90] " onClick={closeMenu}>
                    {t('corporateevents')}
                  </Link>
                </div>
              )}

              <button
                onClick={toggleMobileAboutDropdown}
                className="block w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura hover:text-[#e3ce90] "
              >
                {t('ABOUT')}
              </button>

              {isMobileAboutDropdownOpen && (
                <div className="pl-4">
                  <Link href="/teleiosx" className="block px-4 py-2 text-[#c09e5f] text-[14px] hover:text-[#e3ce90] " onClick={closeMenu}>
                    {t('VENUE')}
                  </Link>
                </div>
              )}
            
          
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
