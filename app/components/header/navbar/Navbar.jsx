// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { Helmet } from 'react-helmet-async';
// import Link from 'next/link';
// import Image from 'next/image';
// import { usePathname } from 'next/navigation';
// // import logo from '../../../../public/assets/images/logo.png';
// // import closenavbar from '../../../../public/assets/icons/navbarclose.png';
// // import Dropdown from '../dropdwon/Dropdown';
// import { switchLanguage } from '../../../utils/language.js';
// import { useTranslation } from 'react-i18next';

// const Navbar = ({ isTopBannerVisible }) => {
//   const pathname = usePathname();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [navbarBg, setNavbarBg] = useState('bg-opacity-0');
//   const menuRef = useRef(null);
//   const { t, i18n } = useTranslation();

//   const hiddenRoutes = ['/experience', '/dome', '/watchparties',  '/privateevents', '/f&b', '/enquiry-form', '/terms&conditions', '/privacy', '/menu', '/experiencedetails'];
//   const isHiddenRoute = hiddenRoutes.includes(pathname);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   // const handleScroll = () => {
//   //   if (window.scrollY > 40 && isHiddenRoute) {
//   //     setNavbarBg('bg-[#063828] lg:bg-[#063828]');
//   //   } else if (window.scrollY > window.innerHeight) {
//   //     setNavbarBg('bg-[#063828] lg:bg-[#063828]');
//   //   } else {
//   //     setNavbarBg('bg-opacity-0');
//   //   }
//   // };

//   const handleScroll = () => {
//     if (window.scrollY > 40) {
//       setNavbarBg('bg-[#063828] lg:bg-[#063828]');
//     } else {
//       setNavbarBg('bg-opacity-0');
//     }
//   };
  

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [pathname, isHiddenRoute]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         closeMenu();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const getDynamicMeta = () => {
//     switch (pathname) {
//       case '/experience':
//         return {
//           title: 'Experiences | Teleios Dome',
//           description: 'Discover exciting racing experiences at Teleios Dome. Book your seat now!',
//         };
//       case '/venue':
//         return {
//           title: 'Venue | Teleios Dome',
//           description: 'Explore the ultimate immersive experience at Teleios Dome.',
//         };
//         case '/watchparties/':
//         return {
//           title: 'Watch Parties | Teleios Dome',
//           description: 'Host your next corporate event or celebration at Teleios Dome.',
//         };
//       case '/privateevents':
//         return {
//           title: 'Public Events | Teleios Dome',
//           description: 'Host your next corporate event or celebration at Teleios Dome.',
//         };
//       case '/f&b':
//         return {
//           title: ' F & B | Teleios Dome',
//           description: 'Learn and grow with our education programs at Teleios Dome.',
//         };
//       default:
//         return {
//           title: 'Teleios Dome',
//           description: 'Welcome to Teleios Dome, your premier destination for racing and events.',
//         };
//     }
//   };

//   const { title, description } = getDynamicMeta();

  
//   const handleLanguageChange = (lng) => {
//     i18n.changeLanguage(lng);
//     switchLanguage(lng);
//   };


//   return (
//     <>
//       <Helmet>
//         <title>{title}</title>
//         <meta name="description" content={description} />
//         <meta property="og:title" content={title} />
//         <meta property="og:description" content={description} />
//         <meta property="og:type" content="website" />
//       </Helmet>
//       <nav
//         className={`fixed ${isTopBannerVisible ? 'top-9' : 'top-0'
//           } w-full z-40 transition-all duration-300 px-[10px] md:px-[20px] lg:px-[20px] xl:px-[40px] py-[5px] ${navbarBg} navbar`}
//       // style={{
//       //   backgroundImage:
//       //     pathname === '/experience'
//       //       ? 'url(/assets/images/experience/exbg.png)'
//       //       : 'none',
//       //   backgroundSize: 'cover',
//       //   backgroundPosition: 'center',
//       // }}
//       >
//         <div className="flex justify-between items-center w-full h-auto">
   
//           <div className="flex items-center">
//             <Link href="/" onClick={closeMenu}>
//               <Image
//                 src="/assets/images/dome/logo.png"
//                 alt="Logo"
//                 width={185}
//                 height={120}
//                 priority={true}
//                 className="sm:w-[100px] sm:h-[52px] md:w-[185px] md:h-[92px] lg:w-[165px] lg:h-[92px] xl:w-[185px] xl:h-[120px]"
//               />
//             </Link>
//           </div>
//           <div className="flex-grow hidden xl:flex justify-center space-x-6 md:space-x-5 lg:space-x-5 ">
//             <Link
//               href="/experience"
//               className=" font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1 ml-4"
//               onClick={closeMenu}
//             >
//               {t('EXPERIENCES')}
//             </Link>
//             <Link
//               href="/venue"
//               className="font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1"
//               onClick={closeMenu}
//             >
//              {t('VENUE')}
//             </Link>
//             <Link href="/watchparties" className="font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1" onClick={closeMenu}>
//             {t('WATCH PARTIES')}
//               </Link>
//             <Link
//               href="/privateevents"
//               className="text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold font-jura text-[#c09e5f] hover:text-[#e3ce90] mt-1"
//               onClick={closeMenu}
//             >
//               {t('PRIVATE EVENTS')}
//             </Link>
//             <Link
//               href="/f&b"
//               className="font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1"
//               onClick={closeMenu}
//             >
//               {t('F & B')}
//             </Link>
//             {/* <Link href="/other" className="text-white font-jura text-[12px] md:text-[14px] lg:text-[14px] font-normal lg:font-bold hover:text-[#A72CCF] mt-1" onClick={closeMenu}>
//                 OTHER
//               </Link>
//               <Dropdown/> */}
//           </div>
//           <div className="language-switcher mx-2">
//         <button onClick={() => handleLanguageChange('en')} className='px-2 font-jura font-[12px] hover:text-[#c09e5f] hover:border-b-2 hover:border-[#c09e5f]'>EN</button>
//         <button onClick={() => handleLanguageChange('ar')} className='px-2 font-jura font-[12px] hover:text-[#c09e5f] hover:border-b-2 hover:border-[#c09e5f]'>العربية</button>
//       </div>
          
//           <div className="hidden xl:flex items-center">
//             <Link
//              href="/experience"
//               className="button-slanted w-[80px] md:w-[142px] h-[39px] font-jura font-normal md:font-bold bg-gradient-to-r cursor-pointer from-[#df2a27e3] to-[#df2a27] text-white transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center"
//             >
//               <span className="button-slanted-content"> {t('BOOK NOW')}</span>
//             </Link>
//           </div>
        
          
//           <div className="xl:hidden">
//             <button onClick={toggleMenu} className="text-[#c09e5f] text-4xl">
//               {menuOpen ? (
//                 <Image src="/assets/images/dome/navbarclose.png" className="h-[30px] w-[30px]" alt="close" width={30} height={30} />
//               ) : (
//                 '☰'
//               )}
//             </button>
//           </div>
//         </div>
//         {menuOpen && (
//           <div
//             ref={menuRef}
//             className=" mx-8 xl:hidden bg-[#002718] absolute right-0 top-full "
//           >
//             <div className=" flex flex-col items-start px-4 py-4">
//               <Link
//                 href="/experience"
//                 className="block w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura hover:text-[#063828]"
//                 onClick={closeMenu}
//               >
//                 {t('EXPERIENCES')}
//               </Link>
//               <Link
//                 href="/venue"
//                 className="block w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura hover:text-[#063828]"
//                 onClick={closeMenu}
//               >
//                 {t('VENUE')}
//               </Link>
//               <Link href="/watchparties" className="w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura hover:text-[#063828]" onClick={closeMenu}>
//                 {('WATCH PARTIES')}
//               </Link>
//               <Link
//                 href="/privateevents"
//                 className="block w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura hover:text-[#063828]"
//                 onClick={closeMenu}
//               >
//                 {t('PRIVATE EVENTS')}
//               </Link>
//               <Link
//                 href="/f&b"
//                 className="block w-full text-left px-4 py-4 text-[#c09e5f] font-jura text-[14px] font-bold hover:text-[#063828]"
//                 onClick={closeMenu}
//               >
//                 {t('F&B')}
//               </Link>
//               {/* <Link href="/other" className="text-left px-4 py-4 text-white font-jura text-[14px] font-bold hover:text-[#A72CCF" onClick={closeMenu}>
//                 OTHER
//               </Link>
//               <Dropdown /> */}
//             </div>
//           </div>
//         )}
//         {/* Conditionally render the heading only for the /experience route */}
//         {/* {pathname === '/experience' && (
//           <div className="text-center text-white py-20">
//             <h1 className="font-orbitron text-[34px] lg:text-[54px] font-black mb-4">
//               EXPERIENCES
//             </h1>
//           </div>
//         )} */}
//       </nav>
//     </>
//   );
// };

// export default Navbar;



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
  const [navbarBg, setNavbarBg] = useState('bg-opacity-0');
  const menuRef = useRef(null);
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
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

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    switchLanguage(lng);
  };

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
        } w-full z-40 transition-all duration-300 px-[10px] md:px-[20px] lg:px-[20px] xl:px-[40px] py-[5px] ${navbarBg} navbar`}
      >
        <div className="flex justify-between items-center w-full h-auto">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" onClick={closeMenu} className="flex items-center">
              {/* Desktop Logo */}
              <Image
                src="/assets/images/dome/logo.png"
                alt="Logo"
                width={185}
                height={120}
                priority={true}
                className="hidden xl:block sm:w-[100px] sm:h-[52px] md:w-[165px] md:h-[60px] lg:w-[165px] lg:h-[92px] xl:w-[185px] xl:h-[120px]"
              />
              {/* Responsive (Mobile) Logo */}
              <Image
                src="/assets/images/dome/logo1.png"
                alt="Logo Responsive"
                width={185}
                height={120}
                priority={true}
                className="block xl:hidden sm:w-[100px] sm:h-[52px] md:w-[185px] md:h-[92px] lg:w-[165px] lg:h-[92px]"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex-grow hidden xl:flex justify-center space-x-6 md:space-x-5 lg:space-x-5 ">
            <Link
              href="/experience"
              className="font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1 ml-4"
              onClick={closeMenu}
            >
              {t('EXPERIENCES')}
            </Link>
            <Link
              href="/executivelounge"
              className="font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1"
              onClick={closeMenu}
            >
              {t('executivelounge')}
            </Link>
            <Link
              href="/watchparties"
              className="font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1"
              onClick={closeMenu}
            >
              {t('watchparties')}
            </Link>
            <Link
              href="/venue"
              className="font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1"
              onClick={closeMenu}
            >
              {t('VENUE')}
            </Link>
            <Link
              href="/watchparties"
              className="font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1"
              onClick={closeMenu}
            >
              {t('watchparties')}
            </Link>
            <Link
              href="/privateevents"
              className="text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold font-jura text-[#c09e5f] hover:text-[#e3ce90] mt-1"
              onClick={closeMenu}
            >
              {t('privateevents')}
            </Link>
            <Link
              href="/f&b"
              className="font-jura text-[12px] md:text-[14px] lg:text-[18px] font-normal lg:font-bold text-[#c09e5f] hover:text-[#e3ce90] mt-1"
              onClick={closeMenu}
            >
              {t('f&b')}
            </Link>
            {/* Additional Links or Dropdowns can be added here */}
          </div>

          {/* Language Switcher */}
          <div className="language-switcher mx-2">
            <button
              onClick={() => handleLanguageChange('en')}
              className="px-2 font-jura text-[12px] hover:text-[#c09e5f] hover:border-b-2 hover:border-[#c09e5f]"
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange('ar')}
              className="px-2 font-jura text-[12px] hover:text-[#c09e5f] hover:border-b-2 hover:border-[#c09e5f]"
            >
              العربية
            </button>
          </div>

          {/* Book Now Button */}
          <div className="hidden xl:flex items-center">
            <Link
              href="/experience"
              className="button-slanted w-[80px] md:w-[142px] h-[39px] font-jura font-normal md:font-bold bg-gradient-to-r cursor-pointer from-[#df2a27e3] to-[#df2a27] text-white transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center"
            >
              <span className="button-slanted-content">{t('BOOK NOW')}</span>
            </Link>
          </div>

          {/* Hamburger Menu for Mobile */}
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
          <div ref={menuRef} className="mx-8 xl:hidden bg-[#002718] absolute right-0 top-full w-[400px]">
            <div className="flex flex-col items-start px-4 py-4">
              <Link
                href="/experience"
                className="block w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura hover:text-[#063828]"
                onClick={closeMenu}
              >
                {t('EXPERIENCES')}
              </Link>
              <Link
                href="/executivelounge"
                className="w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura hover:text-[#063828]"
                onClick={closeMenu}
              >
                {t('executivelounge')}
              </Link>
              <Link
                href="/watchparties"
                className="w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura hover:text-[#063828]"
                onClick={closeMenu}
              >
                {t('watchparties')}
              </Link>
              <Link
                href="/venue"
                className="block w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura hover:text-[#063828]"
                onClick={closeMenu}
              >
                {t('VENUE')}
              </Link>
            
              <Link
                href="/privateevents"
                className="block w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura hover:text-[#063828]"
                onClick={closeMenu}
              >
                {t('privateevents')}
              </Link>
              <Link
                href="/f&b"
                className="block w-full text-left px-4 py-4 text-[#c09e5f] text-[14px] font-bold font-jura hover:text-[#063828]"
                onClick={closeMenu}
              >
                {t('f&b')}
              </Link>
              {/* Additional Links or Dropdowns can be added here */}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
