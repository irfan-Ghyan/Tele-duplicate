


// 'use client';

// import { usePathname } from 'next/navigation';
// import TopBanner from '../header/top/TopBanner';
// import Navbar from './navbar/Navbar';
// // import BottomBanner from '../header/bottom/Bottombanner';
// import { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
// import Image from 'next/image';
// import Corprate from '../../components/corporate/Corprate';

// const Header = () => {
//   const pathname = usePathname();
//   const [isTopBannerVisible, setIsTopBannerVisible] = useState(true);
//   const [showCorpratePopup, setShowCorpratePopup] = useState(false); // State to control Corprate popup visibility

//   const hiddenRoutes = [
//     '/experiencedetails',
//     '/experience',
//     '/upcomingevents',
//     '/dome',
//     '/education',
//     '/corporateevents',
//     '/enquiry-form',
//     '/terms&conditions',
//     '/privacy',
//     '/menu',
//   ];

//   const shouldHideBannersAndBackground = hiddenRoutes.includes(pathname);

//   useEffect(() => {
//     if (shouldHideBannersAndBackground) {
//       setIsTopBannerVisible(false);
//     }
//   }, [pathname, shouldHideBannersAndBackground]);

//   const handleCloseTopBanner = () => {
//     setIsTopBannerVisible(false);
//   };

//   const handlePlayButtonClick = () => {
//     setShowCorpratePopup(true); // Show the Corprate component as a popup
//   };

//   const handleClosePopup = () => {
//     setShowCorpratePopup(false); // Close the Corprate popup
//   };

//   // Scroll to target section when down arrow is clicked
//   const scrollToSection = () => {
//     const targetSection = document.getElementById('target-section'); 
//     if (targetSection) {
//       targetSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Header | Teleios Dome</title>
//         <meta
//           name="description"
//           content="Explore thrilling experiences at Teleios Dome with exciting speed challenges, group races, and VIP experiences."
//         />
//         <meta property="og:title" content="Teleios Dome Experiences" />
//         <meta
//           property="og:description"
//           content="Get on the most thrilling seat at Teleios Dome. Experience the excitement of speed, challenge your friends in group races, or enjoy a tailored VIP experience."
//         />
//         <meta property="og:image" content="/assets/images/header-bg.jpg" />
//       </Helmet>
//       <div
//         className={`relative max-w-full overflow-hidden ${
//           shouldHideBannersAndBackground ? 'h-[100px]' : 'bg-header-bg bg-cover bg-center min-h-screen'
//         } text-white flex flex-col justify-between`}
//       >

//          {/* Add a video background if not hiding banners and backgrounds */}
//   {!shouldHideBannersAndBackground && (
//     <video
//       autoPlay
//       loop
//       muted
//       playsInline
//       className="absolute w-full h-full object-cover z-0"
//     >
//       <source src="/assets/video/dome.mp4" type="video/mp4" />

//     </video>
//   )}

//         {/* Overlay Background */}
//         {!shouldHideBannersAndBackground && (
//           <div className="absolute inset-0 bg-[#11072C] bg-opacity-30 z-0"></div>
//         )}

//         {/* Video Play Button
//         {!shouldHideBannersAndBackground && (
//           <button
//             className="absolute bottom-40 sm:top-20 md:top-20 lg:top-20 xl:top-20 right-0 md:right-10 lg:right-10 xl:right-10 z-20 p-2 rounded-full hover:opacity-80 transition"
//             onClick={handlePlayButtonClick}
//           >
//             <div className="flex">
//               <h1 className="mt-5 text-[24px] text-white font-black font-orbitron">
//                 Watch
//               </h1>
//               <Image src="/assets/video/play.png" width={80} height={80} alt="Play Video" />
//             </div>
//           </button>
//         )} */}

// {!shouldHideBannersAndBackground && (
//   <div className="absolute inset-0 z-10"></div>
// )}

// {/* Play Button for video popup or other interactions */}
// <button
//   className="absolute bottom-40 md:top-20 lg:top-20 xl:top-20 right-2 md:right-10 lg:right-10 xl:right-10 z-30 p-2 rounded-full hover:opacity-80 transition"
//   onClick={handlePlayButtonClick}
// >
//   <div className="flex">
//     {/* <h1 className="mt-5 text-[24px] text-white font-black font-orbitron">
//       Watch and Listen
//     </h1> */}
//     <Image src="/assets/video/play.png" width={80} height={80} alt="Play Video" />
//   </div>
// </button>

//         {/* Down Arrow Button - Only show on the home page */}
//         {pathname === '/' && (
//           <button
//             className="absolute bottom-10 md:bottom-20 lg:bottom-20 xl:bottom-20 left-1/2 transform -translate-x-1/2 z-20 p-2 rounded-full hover:opacity-80 transition"
//             onClick={scrollToSection}
//           >
//             <Image
//               src="/assets/images/dome/arrowdpown.png" 
//               width={40}
//               height={40}
//               alt="Scroll Down"
//             />
//           </button>
//         )}

//         {/* Corprate Component Popup */}
//         {showCorpratePopup && (
//           <div className="fixed inset-0 bg-[#11072C] bg-opacity-100 z-50 flex items-center justify-center p-4">
//             <div className="relative w-full max-w-7xl bg-white px-4 py-4 rounded-lg max-w-custom">
//               <button
//                 className="absolute top-2 right-2 text-black text-2xl"
//                 onClick={handleClosePopup}
//               >
//                 &times;
//               </button>
//               <Corprate />
//             </div>
//           </div>
//         )}

//         {/* Content */}
//         <div className={`relative z-10 xl:py-[32px] ${isTopBannerVisible ? '' : 'pt-0'}`}>
//           {!shouldHideBannersAndBackground && isTopBannerVisible && (
//             <TopBanner onClose={handleCloseTopBanner} />
//           )}
//           <Navbar isTopBannerVisible={isTopBannerVisible} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;





// 'use client';

// import { usePathname } from 'next/navigation';
// import TopBanner from '../header/top/TopBanner';
// import Navbar from './navbar/Navbar';
// import { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
// import Image from 'next/image';
// import Corprate from '../../components/corporate/Corprate';
// import Head from 'next/head';

// const Header = () => {
//   const pathname = usePathname();
//   const [isTopBannerVisible, setIsTopBannerVisible] = useState(true);
//   const [showCorpratePopup, setShowCorpratePopup] = useState(false);
//   const [isNavbarBgVisible, setIsNavbarBgVisible] = useState(false);
//   const [isVideoLoaded, setIsVideoLoaded] = useState(false); 
//   const [showImage, setShowImage] = useState(true); // New state to control image display

//   const hiddenRoutes = [
//     '/experiencedetails',
//     '/experience',
//     '/upcomingevents',
//     '/dome',
//     '/education',
//     '/corporateevents',
//     '/enquiry-form',
//     '/terms&conditions',
//     '/privacy',
//     '/menu',
//   ];

//   const shouldHideBannersAndBackground = hiddenRoutes.includes(pathname);

//   useEffect(() => {
//     if (shouldHideBannersAndBackground) {
//       setIsTopBannerVisible(false);
//     }
//   }, [pathname, shouldHideBannersAndBackground]);

//   useEffect(() => {
//     // Hide the image and show the video after 2 seconds
//     const timer = setTimeout(() => {
//       setShowImage(false);
//     });

//     return () => clearTimeout(timer); // Cleanup timeout on unmount
//   }, []);

//   const handleCloseTopBanner = () => {
//     setIsTopBannerVisible(false);
//   };

//   const handlePlayButtonClick = () => {
//     setShowCorpratePopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowCorpratePopup(false);
//   };

//   const scrollToSection = () => {
//     const targetSection = document.getElementById('target-section');
//     if (targetSection) {
//       targetSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   useEffect(() => {
//     if (pathname !== '/') {
//       const handleScroll = () => {
//         if (window.scrollY > 50) {
//           setIsNavbarBgVisible(true);
//         } else {
//           setIsNavbarBgVisible(false);
//         }
//       };

//       window.addEventListener('scroll', handleScroll);
//       return () => {
//         window.removeEventListener('scroll', handleScroll);
//       };
//     }
//   }, [pathname]);

//   return (
//     <>
//       <Helmet>
//         <title>Header | Teleios Dome</title>
//         <meta
//           name="description"
//           content="Explore thrilling experiences at Teleios Dome with exciting speed challenges, group races, and VIP experiences."
//         />
//         <meta property="og:title" content="Teleios Dome Experiences" />
//         <meta
//           property="og:description"
//           content="Get on the most thrilling seat at Teleios Dome. Experience the excitement of speed, challenge your friends in group races, or enjoy a tailored VIP experience."
//         />
//         <meta property="og:image" content="/assets/images/header-bg.jpg" />
//       </Helmet>

//       <Head>
//         <link rel="preload" href="/assets/video/dome.mp4" as="video" />
//         <link rel="preload" href="/assets/images/herobg.jpg" as="image" />
//       </Head>

//       <div
//         className={`relative max-w-full overflow-hidden ${pathname === '/' ? ' bg-header-bg bg-cover bg-center min-h-screen' : 'h-[140px] '}`}
//       >
//         {pathname === '/' && (
//           <>
//             {/* Display image for 2 seconds before showing the video */}
//             {showImage ? (
//               <Image
//                 src="/assets/images/herobg.jpg" // Ensure correct path
//                 layout="fill"
//                 objectFit="cover"
//                 alt="Hero Image"
//               />
//             ) : (
//               <video
//                 preload="auto"
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//                 className={`absolute w-full h-full object-cover z-0 ${isVideoLoaded ? 'visible' : 'hidden'}`}
//                 onCanPlayThrough={() => setIsVideoLoaded(true)}
//               >
//                 <source src="/assets/video/dome.mp4" type="video/mp4" />
//               </video>
//             )}
//           </>
//         )}

//         {pathname === '/' && (
//           <div className="absolute inset-0 bg-[#11072C] bg-opacity-30 z-0"></div>
//         )}

//         {pathname === '/' && (
//           <button
//             className="absolute bottom-40 md:top-20 lg:top-20 xl:top-20 right-2 md:right-10 lg:right-10 xl:right-10 z-30 p-2 rounded-full hover:opacity-80 transition"
//             onClick={handlePlayButtonClick}
//           >
//             <div className="flex">
//               <Image src="/assets/video/play.png" width={80} height={80} alt="Play Video" />
//             </div>
//           </button>
//         )}

//         {pathname === '/' && (
//           <button
//             className="absolute bottom-10 md:bottom-20 lg:bottom-20 xl:bottom-20 left-1/2 transform -translate-x-1/2 z-20 p-2 rounded-full hover:opacity-80 transition"
//             onClick={scrollToSection}
//           >
//             <Image
//               src="/assets/images/dome/arrowdpown.png"
//               width={40}
//               height={40}
//               alt="Scroll Down"
//             />
//           </button>
//         )}

//         {showCorpratePopup && (
//           <div className="fixed inset-0 bg-[#11072C] bg-opacity-100 z-50 flex items-center justify-center p-4">
//             <div className="relative w-full max-w-7xl bg-white px-4 py-4 rounded-lg max-w-custom">
//               <button
//                 className="absolute top-2 right-2 text-black text-2xl"
//                 onClick={handleClosePopup}
//               >
//                 &times;
//               </button>
//               <Corprate />
//             </div>
//           </div>
//         )}

//         <div className={`relative z-10 xl:py-[32px] ${isTopBannerVisible ? '' : 'pt-0'}`}>
//           {!shouldHideBannersAndBackground && isTopBannerVisible && (
//             <TopBanner onClose={handleCloseTopBanner} />
//           )}
//           <Navbar isTopBannerVisible={isTopBannerVisible} isNavbarBgVisible={isNavbarBgVisible} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;



'use client';

import { usePathname } from 'next/navigation';
import TopBanner from '../header/top/TopBanner';
import Navbar from './navbar/Navbar';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Image from 'next/image';
import Corprate from '../../components/corporate/Corprate';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { switchLanguage } from '../../utils/language.js';

const Header = () => {
  
    const { t } = useTranslation();
  const pathname = usePathname();
  const [isTopBannerVisible, setIsTopBannerVisible] = useState(true);
  const [showCorpratePopup, setShowCorpratePopup] = useState(false);
  const [isNavbarBgVisible, setIsNavbarBgVisible] = useState(false); 

  const handleLanguageChange = (lng) => {
    switchLanguage(lng);
  };

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

  useEffect(() => {
    if (shouldHideBannersAndBackground) {
      setIsTopBannerVisible(false);
    }
  }, [pathname, shouldHideBannersAndBackground]);

  const handleCloseTopBanner = () => {
    setIsTopBannerVisible(false);
  };

  const handlePlayButtonClick = () => {
    setShowCorpratePopup(true);
  };

  const handleClosePopup = () => {
    setShowCorpratePopup(false); 
  };

  const scrollToSection = () => {
    const targetSection = document.getElementById('target-section');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (pathname !== '/') {
      const handleScroll = () => {
        if (window.scrollY > 50) { 
          setIsNavbarBgVisible(true);
        } else {
          setIsNavbarBgVisible(false);
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [pathname]);

  return (
    <>
    <div className="language-switcher">
        <button onClick={() => handleLanguageChange('en')}>English</button>
        <button onClick={() => handleLanguageChange('ar')}>العربية</button>
      </div>
      <Helmet>
        <title>{t('Header | Teleios Dome')}</title>
        <meta
          name={t("description")}
          content={t("Explore thrilling experiences at Teleios Dome with exciting speed challenges, group races, and VIP experiences.")}
        />
        <meta property={t("og:title")} content="Teleios Dome Experiences" />
        <meta
          property={t("og:description")}
          content={t("Get on the most thrilling seat at Teleios Dome. Experience the excitement of speed, challenge your friends in group races, or enjoy a tailored VIP experience.")}
        />
        <meta property="og:image" content="/assets/images/header-bg.jpg" />
      </Helmet>

      <Head>
        <link rel="preload" href="/assets/video/dome.mp4" as="video" />
      </Head>

      <div
      
        className={`relative max-w-full overflow-hidden ${pathname === '/' ? ' bg-header-bg bg-cover bg-center min-h-screen' : 'h-[140px] '
          } text-white flex flex-col justify-between`}
      >

        {pathname === '/' && (
    
          <video
            preload="auto"
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover z-0"
          >
            <source src="/assets/video/dome.webm" type="video/webm" />
          </video>
        )}

        {/* Overlay Background */}
        {pathname === '/' && (
          <div className="absolute inset-0 bg-[#002718] bg-opacity-60 z-0 "></div>
        )}

        {/* Play Button for video popup or other interactions - ONLY ON HOME PAGE */}
        {pathname === '/' && (
          <button
            className="absolute bottom-40 md:top-20 lg:top-20 xl:top-20 right-2 md:right-10 lg:right-10 xl:right-10 z-30 p-2 rounded-full hover:opacity-80 transition"
            onClick={handlePlayButtonClick}
          >
            <div className="flex">
              <Image src="/assets/video/play.png" width={80} height={80} alt="Play Video" />
            </div>
          </button>
        )}

        {/* Down Arrow Button - Only show on the home page */}
        {pathname === '/' && (
          <button
            className="absolute bottom-10 md:bottom-20 lg:bottom-20 xl:bottom-20 left-1/2 transform -translate-x-1/2 z-20 p-2 rounded-full hover:opacity-80 transition"
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
        )}

        {/* Corprate Component Popup */}
        {showCorpratePopup && (
          <div className="fixed inset-0 bg-[#002718] bg-opacity-100 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-7xl bg-white px-4 py-4 rounded-lg max-w-custom">
              <button
                className="absolute top-2 right-2 text-black text-2xl"
                onClick={handleClosePopup}
              >
                &times;
              </button>
              <Corprate />
            </div>
          </div>
        )}

        {/* Content */}
        <div className={`relative z-10 xl:py-[32px] ${isTopBannerVisible ? '' : 'pt-0'}`}>
          {!shouldHideBannersAndBackground && isTopBannerVisible && (
            <TopBanner onClose={handleCloseTopBanner} />
          )}
          <Navbar isTopBannerVisible={isTopBannerVisible} isNavbarBgVisible={isNavbarBgVisible} />
        </div>
      </div>
    </>
  );
};

export default Header;

