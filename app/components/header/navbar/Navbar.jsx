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
  const [navbarBg, setNavbarBg] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isExperienceDropdownOpen, setIsExperienceDropdownOpen] = useState(false);
  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileExperienceDropdownOpen, setIsMobileExperienceDropdownOpen] = useState(false);
  const [isMobileEventsDropdownOpen, setIsMobileEventsDropdownOpen] = useState(false);
  const [isMobileAboutDropdownOpen, setIsMobileAboutDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
 const buttonRef = useRef(null);
  

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

// States for dropdowns
const [openDropdown, setOpenDropdown] = useState(null);

// Refs for click detection
const navbarRef = useRef(null);


// Close all dropdowns
const closeAllDropdowns = () => {
  setOpenDropdown(null);
};




// Click outside handler
useEffect(() => {
  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target) ) {
      closeMenu();
      setIsDropdownOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);



  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       dropdownRef.current && !dropdownRef.current.contains(event.target) && 
  //       buttonRef.current && !buttonRef.current.contains(event.target)
  //     ) {
  //       closeMenu();
  //       setIsDropdownOpen(false);
        
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);
  

const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
  setOpenDropdown(openDropdown === "dropdown" ? null : "dropdown");
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
    closeAllDropdowns();
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
      setNavbarBg('bg-[#00352F] lg:bg-[#00352F]');
    } else {
      setNavbarBg('');
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
      <nav ref={navbarRef}
        className={`fixed bg-[#00352F] h-[80px] ${
          isTopBannerVisible ? 'top-0' : 'top-0'
        } w-full z-40 transition-all duration-300 px-[20px] md:px-[20px] lg:px-[20px] xl:px-[40px] py-[5px]  ${navbarBg} navbar` }
      >
        <div className="flex justify-between items-center container mx-auto h-[84px] py-4">
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

      
        
          <div ref={dropdownRef} className="flex-grow hidden xl:flex justify-center space-x-4 md:space-x-6 lg:space-x-8 ">
          <Link
              href="/"
              className={`font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1 ${selectedLanguage === 'ar' ? 'ml-[36px]' : 'ml-4'}`}
              onClick={closeMenu}
            >
              {t('HOME')}
            </Link>
   

             {/* Experience Dropdown */}
             <div className="relative" ref={dropdownRef} >
              <Link
                className="block font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1 ml-4 flex items-center"
                href="/experience" 
              >
                {t('EXPERIENCES')}
        
              </Link>


            </div>


             <div className="relative" ref={dropdownRef} >
              <Link
                className="block font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1 ml-4 flex items-center"
                // onClick={toggleEventsDropdown}
                href="/events" 
              
              >
                {t('EVENTS')}
        
              </Link>

              {/* {isEventsDropdownOpen && (
                <div className="absolute left-4 right-0 mt-2 w-[180px] bg-[#00352F] py-2 ">
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
              )} */}
            </div>


            <div className="relative" ref={dropdownRef}>
              <Link
                className="block font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1 ml-4 flex items-center"
                href="/teleiosx"
              >
                {t('ABOUT')}
        
              </Link>

              {/* {isAboutDropdownOpen && (
                <div className="absolute left-4 right-0 mt-2 w-[180px] bg-[#00352F] py-2">
                  <Link href="/teleiosx" className="block px-4 py-2 font-jura text-[12px] lg:text-[14px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90]" onClick={closeMenu}>
                    {t('VENUE')}
                  </Link>
                </div>
              )} */}
            </div>
        
          </div>

          <div className="relative ml-[31px] mr-[31px]" ref={dropdownRef}>
            <button 
            ref={buttonRef}
              onClick={toggleDropdown}
              className="flex items-center focus:outline-none hidden sm:block "
            >
              <div className='flex flex-col'>
              <Image
                src="/assets/images/dome/globe.png"
                alt="Language Icon"
                width={20}
                height={20}
                className="cursor-pointer"
              />
              <span className="font-jura text-[#C09E5F] text-[12px] font-bold mt-1 ">
                {selectedLanguage === 'en' ? 'EN' : 'العربية'}
              </span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div ref={dropdownRef} className="absolute top-12  left-[-24px] bg-[#00352F] border border-[#C09E5F] shadow-md rounded-md w-12  ">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className="w-full px-3 py-2 text-left text-[12px] font-jura hover:text-[#00352F] hover:bg-[#C09E5F]"
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('ar')}
                  className="w-full px-3 py-2 text-left text-[12px] font-jura hover:text-[#00352F] hover:bg-[#C09E5F]"
                >
                  العربية
                </button>
              </div>
            )}
          </div>
         
      

          <div className="xl:hidden">
            <button onClick={toggleMenu} className="text-[#c09e5f] text-4xl mx-4">
              {menuOpen ? (
                <Image
                  src="/assets/images/dome/navbarclose.png"
                  className="h-[24px] w-[24px]"
                  alt="close"
                  width={24}
                  height={24}
                />
              ) : (
                '☰'
              )}
            </button>
          </div>

          <div className=" xl:flex items-center">
            <Link
              href="/bookracingexperience"
              className="button-slanted w-[109px] md:w-[142px] lg:w-[142px] h-[42px] font-jura text-[16px] font-bold leading-[24px] bg-gradient-to-r cursor-pointer from-[#df2a27e3] to-[#df2a27] text-white transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center"
            >
              <span className="button-slanted-content font-jura text-[16px] font-bold">{t('BOOK NOW')}</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div ref={menuRef} className="mx-8 xl:hidden bg-[#00352F] absolute right-0 top-full w-[300px]">
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

               <Link
                // onClick={toggleMobileExperienceDropdown}
                href="/experience"
                className="block w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura hover:text-[#e3ce90] "
                onClick={closeMenu}
              >
                {t('EXPERIENCES')}
              </Link>


              <Link
                // onClick={toggleMobileEventsDropdown}
                 href="/events"
                className="block w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura hover:text-[#e3ce90] "
                onClick={closeMenu}
              >
                {t('EVENTS')}
              </Link>


              <Link
               href="/teleiosx" 
                className="block w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura hover:text-[#e3ce90]" 
                onClick={closeMenu}
               
              >
                {t('ABOUT')}
              </Link>

              {isMobileAboutDropdownOpen && (
                <div className="pl-4">
                  <Link href="/teleiosx" className="block px-4 py-2 text-[#c09e5f] text-[14px] hover:text-[#e3ce90] " >
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
