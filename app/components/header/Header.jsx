

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
  const [videoUrl, setVideoUrl] = useState(""); 

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

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const url = `${baseUrl}/api/content/getMainVideo`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch video data.");
        }

        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setVideoUrl(data.data[0].url);
        } else {
          console.error("No video data available.");
        }
      } catch (error) {
        console.error("Error fetching video:", error.message);
      }
    };

    fetchVideo();
  }, []);

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
        {pathname === '/' && videoUrl && (
          <video
            preload="auto"
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover z-0"
            src={videoUrl}
          >
            <source src={videoUrl} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}

        {pathname === '/' && (
          <div className="absolute inset-0 bg-[#002718] bg-opacity-80 z-0"></div>
        )}

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
