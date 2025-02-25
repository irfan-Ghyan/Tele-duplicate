// 'use client';

// import React from 'react';
// import Head from 'next/head';
// import { useTranslation } from 'react-i18next';

// const OccasionEvent = () => {
//   const { t, i18n } = useTranslation();

//   const eventDetails = {
//     title: t('occasionEvent.title'),
//     cards: [
//       {
//         image: "/assets/images/dome/pic-184.png",
//         heading: t('occasionEvent.birthday.heading'),
//         description: t('occasionEvent.birthday.description')
//       },
//       {
//         image: "/assets/images/events/pics-17.png",
//         heading: t('occasionEvent.festive.heading'),
//         description: t('occasionEvent.festive.description')
//       },
//       {
//         image: "/assets/images/education/police.png", 
//         heading: t('occasionEvent.milestone.heading'),
//         description: t('occasionEvent.milestone.description')
//       }
//     ]
//   };

//   return (
//     <>
//       <Head>
//         <link rel="preload" href="/assets/images/experience/corbg.jpg" as="image" />
//       </Head>

//       <div className={`w-full px-4 md:px-0 py-[20px]  xl:pb-[80px] max-w-7xl mx-auto ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
//         <div className="px-0 md:px-4 lg:px-4 xl:px-4 flex flex-col max-w-7xl mx-auto">
          
//           <h1 className="text-[24px] md:text-[34px] text-[#c09e5f] font-black font-orbitron mb-6 text-center">
//             {eventDetails.title}
//           </h1>


//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {eventDetails.cards.map((card, idx) => (
//               <div 
//                 key={idx} 
//                 className="bg-[#002718] duration-300 text-center shadow-sm border border-[#002718] rounded-lg overflow-hidden p-4"
//               >
//                 <img 
//                   src={card.image} 
//                   alt={card.heading} 
//                   className="w-full h-[200px] rounded-lg object-cover"
//                 />

  
//                 <div className="p-6 ">
//                   <h3 className="text-[#c09e5f] font-bold text-[24px] font-orbitron md:text-xl mb-3">{card.heading}</h3>
//                   <p className="text-[#e3ce90] font-normal text-[14px] font-jura md:text-xl mb-3">{card.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default OccasionEvent;


'use client';

import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const OccasionEvent = () => {
  const { t, i18n } = useTranslation();

  const eventDetails = {
    title: t('occasionEvent.title'),
    cards: [
      {
        image: "/assets/images/dome/pic-184.png",
        heading: t('occasionEvent.birthday.heading'),
        description: t('occasionEvent.birthday.description')
      },
      {
        image: "/assets/images/events/pics-17.png",
        heading: t('occasionEvent.festive.heading'),
        description: t('occasionEvent.festive.description')
      },
      {
        image: "/assets/images/education/police.png", 
        heading: t('occasionEvent.milestone.heading'),
        description: t('occasionEvent.milestone.description')
      }
    ]
  };

  return (
    <>
      <Head>
        <link rel="preload" href="/assets/images/experience/corbg.jpg" as="image" />
      </Head>

      <div className={`w-full px-4 md:px-0 py-[20px] xl:pb-[80px] max-w-7xl mx-auto ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="px-0 md:px-4 lg:px-4 xl:px-4 flex flex-col max-w-7xl mx-auto ">
          
          <h1 className="text-[24px] md:text-[34px] text-[#c09e5f] font-black font-orbitron mb-6 text-center">
            {eventDetails.title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {eventDetails.cards.map((card, idx) => (
              <div 
                key={idx} 
                className="group bg-[#002718] duration-300 text-center shadow-sm border border-[#002718] rounded-lg overflow-hidden p-4"
              >
                <Image
                  src={card.image} 
                  alt={card.heading} 
                  className="w-full h-[200px] rounded-lg transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-2"
                  width={100} height={100}
                />

                <div className="p-6 transition-all duration-300 ease-in-out opacity-100 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0">
                  <h3 className="text-[#c09e5f] font-bold text-[24px] font-orbitron md:text-xl mb-3">{card.heading}</h3>
                  <p className="text-[#e3ce90] font-normal text-[14px] font-jura md:text-xl mb-3">{card.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default OccasionEvent;
