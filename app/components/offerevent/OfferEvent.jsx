


// 'use client';

// import React, { useState, useEffect } from 'react';
// import Head from 'next/head';
// import { useTranslation } from 'react-i18next';

// const OfferEvent = () => {
//   const { t, i18n } = useTranslation();

//   const eventDetails = [
//     {
//       title: t('offerEvent.title'),
//       cards: [
//         {
//           image: "/assets/images/dome/bg-3.png",
//           heading: t('offerEvent.vipBays.heading'),
//           description: t('offerEvent.vipBays.description')
//         },
//         {
//           image: "/assets/images/dome/bg-5.png",
//           heading: t('offerEvent.vipSuite.heading'),
//           description: t('offerEvent.vipSuite.description')
//         },
//         {
//           image: "/assets/images/dome/bg-6.png",
//           heading: t('offerEvent.festiveDecor.heading'),
//           description: t('offerEvent.festiveDecor.description')
//         },
//         {
//           image: "/assets/images/dome/pic-100.jpg", 
//           heading: t('offerEvent.fbPackages.heading'),
//           description: t('offerEvent.fbPackages.description')
//         },
//         {
//           image: "/assets/images/dome/S66.png",
//           heading: t('offerEvent.bigScreens.heading'),
//           description: t('offerEvent.bigScreens.description')
//         }
//       ]
//     }
//   ];

//   return (
//     <>
//       <Head>
//         <link rel="preload" href="/assets/images/experience/corbg.jpg" as="image" />
//       </Head>

//       <div className={`w-full px-4 md:px-0 py-6 lg:py-12 max-w-7xl mx-auto ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
//         <div className="px-0 md:px-4 lg:px-4 flex flex-col max-w-7xl mx-auto">
//           {eventDetails.map((section, index) => (
//             <div key={index} className="py-4">
//               <h1 className="text-[24px] md:text-[34px] text-[#c09e5f] font-black font-orbitron mb-6 text-center">
//                 {section.title}
//               </h1>
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 ">
//                 {section.cards.map((card, idx) => (
//                   <div 
//                     key={idx} 
//                     className="  relative flex flex-col md:flex-row w-full bg-[#002718] shadow-sm border border-[#002718] rounded-lg overflow-hidden"
//                   >
//                     <div className=" relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
//                       <img 
//                         src={card.image} 
//                         alt={card.heading} 
//                         className="h-full w-full rounded-md md:rounded-lg object-cover"
//                       />
//                     </div>
//                     <div className="p-6">

//                       <h3 className="text-[#c09e5f] text-[24px] font-orbitron font-bold">
//                         {card.heading}
//                       </h3>
//                       <p className=" text-[#e3ce90] text-[14px] font-jura font-[14px]">
//                         {card.description}
//                       </p>

//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default OfferEvent;


'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const OfferEvent = () => {
  const { t, i18n } = useTranslation();

  const eventDetails = [
    {
      title: t('offerEvent.title'),
      cards: [
        {
          image: "/assets/images/dome/bg-3.png",
          heading: t('offerEvent.vipBays.heading'),
          description: t('offerEvent.vipBays.description')
        },
        {
          image: "/assets/images/dome/bg-5.png",
          heading: t('offerEvent.vipSuite.heading'),
          description: t('offerEvent.vipSuite.description')
        },
        {
          image: "/assets/images/dome/bg-6.png",
          heading: t('offerEvent.festiveDecor.heading'),
          description: t('offerEvent.festiveDecor.description')
        },
        {
          image: "/assets/images/dome/pic-100.jpg", 
          heading: t('offerEvent.fbPackages.heading'),
          description: t('offerEvent.fbPackages.description')
        },
        {
          image: "/assets/images/dome/S66.png",
          heading: t('offerEvent.bigScreens.heading'),
          description: t('offerEvent.bigScreens.description')
        }
      ]
    }
  ];

  return (
    <>
      <Head>
        <link rel="preload" href="/assets/images/experience/corbg.jpg" as="image" />
      </Head>

      <div className={`w-full px-4 md:px-0 py-6 lg:py-12 max-w-7xl mx-auto ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="px-0 md:px-4 lg:px-4 flex flex-col max-w-7xl mx-auto">
          {eventDetails.map((section, index) => (
            <div key={index} className="py-4">
              <h1 className="text-[24px] md:text-[34px] text-[#c09e5f] font-black font-orbitron mb-6 text-center">
                {section.title}
              </h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                {section.cards.map((card, idx) => (
                  <div 
                    key={idx} 
                    className="group relative flex flex-col md:flex-row w-full bg-[#002718] shadow-sm rounded-lg"
                  >
                    {/* Image with Hover Zoom & Rotate Effect */}
                    <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
                      <Image
                        src={card.image} 
                        alt={card.heading} 
                        className="h-full w-full rounded-md md:rounded-lg object-cover transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-2"
                        width={400}
                        height={400}
                      />
                    </div>

                    {/* Text with Slide-up and Fade-in Effect */}
                    <div className="p-6 transition-all duration-300 ease-in-out opacity-100 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0">
                      <h3 className="text-[#c09e5f] text-[24px] font-orbitron font-bold">
                        {card.heading}
                      </h3>
                      <p className="text-[#e3ce90] text-[14px] font-jura">
                        {card.description}
                      </p>
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

export default OfferEvent;
