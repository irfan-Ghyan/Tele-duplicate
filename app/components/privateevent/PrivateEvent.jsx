'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const PrivateEvent = () => {
  const { t, i18n } = useTranslation();

  const eventDetails = [
    {
      title: t('privateEvent.title'),
      cards: [
        {
          image: "/assets/images/dome/bg6.png",
          heading: t('privateEvent.exclusivity.heading'),
          description: t('privateEvent.exclusivity.description')
        },
        {
          image: "/assets/images/dome/bg-1.png",
          heading: t('privateEvent.customizable.heading'),
          description: t('privateEvent.customizable.description')
        },
        {
          image: "/assets/images/dome/bg-2.png",
          heading: t('privateEvent.entertainment.heading'),
          description: t('privateEvent.entertainment.description')
        }
      ]
    }
  ];

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Head>
        <link rel="preload" href="/assets/images/experience/corbg.jpg" as="image" />
      </Head>


      <div className={`w-full px-4 md:px-0 max-w-7xl mx-auto ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="px-0 md:px-4 lg:px-4 xl:px-4 flex flex-col max-w-7xl mx-auto">
          {eventDetails.map((section, index) => (
            <div key={index} className="py-[15px]">
              <h1 className="text-[24px] md:text-[34px] text-[#c09e5f] font-black font-orbitron mb-6 text-center">
                {section.title}
              </h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {section.cards.map((card, idx) => (
                  <div 
                    key={idx} 
                    className="group relative grid h-[35rem] max-w-lg flex-col items-end justify-center overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2"
                  >

                    <div 
                      className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-cover bg-center transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-2"
                      style={{ backgroundImage: `url(${card.image})` }}
                    >
                      <div className="absolute inset-0 h-full w-full bg-black bg-opacity-50 transition-all duration-300 ease-in-out group-hover:bg-opacity-70"></div>
                    </div>

                    <div className="relative p-6 px-6 py-14 md:px-8 bg-gradient-to-t from-[#002718] via-[#002718] transition-all duration-300 ease-in-out opacity-100 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0">
                      <h3 className="text-[#e3ce90] font-black text-[24px] font-orbitron md:text-xl mb-3">{card.heading}</h3>
                      <p className="text-[#e3ce90] font-bold font-jura text-[18px] md:text-base">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PrivateEvent;
