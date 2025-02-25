// 'use client';

// import React from 'react';
// import Head from 'next/head';
// import { useTranslation } from 'react-i18next';
// import Link from 'next/link';

// const HowItWorks = () => {
//   const { t, i18n } = useTranslation();

//   const steps = [
//     {
//       image: "/assets/images/60mn.jpg",
//       heading: t('howItWorks.plan.heading'),
//       description: t('howItWorks.plan.description')
//     },
//     {
//       image: "/assets/images/30mn.png",
//       heading: t('howItWorks.create.heading'),
//       description: t('howItWorks.create.description')
//     },
//     {
//       image: "/assets/images/events/Stage.png",
//       heading: t('howItWorks.celebrate.heading'),
//       description: t('howItWorks.celebrate.description')
//     }
//   ];

//   return (
//     <>
//       <Head>
//         <link rel="preload" href="/assets/images/experience/corbg.jpg" as="image" />
//       </Head>

//       <div className={`w-full px-4 md:px-0 py-[20px] xl:pb-[80px] max-w-7xl mx-auto ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
//         <div className="px-0 md:px-4 lg:px-4 xl:px-4 flex flex-col max-w-7xl mx-auto">
          
//           <h1 className="text-[24px] md:text-[34px] text-[#c09e5f] font-black font-orbitron mb-6 text-center">
//             {t('howItWorks.title')}
//           </h1>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
//             {steps.map((step, idx) => (
//               <div 
//                 key={idx} 
//                 className="bg-[#002718]  duration-300 p-4 border border-[#002718] rounded-lg overflow-hidden"
//               >
//                 <img 
//                   src={step.image} 
//                   alt={step.heading} 
//                   className="w-full h-[200px] rounded-lg object-cover"
//                 />

     
//                 <div className="p-6 text-center">
//                   <h3 className="text-[#c09e5f] font-bold text-lg font-orbitron md:text-xl mb-3">{step.heading}</h3>
//                   <p className="text-[#e3ce90] font-jura text-sm md:text-base">{step.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-10 text-center">
//             <p className="text-[#e3ce90] text-lg md:text-xl font-jura mb-4">{t('howItWorks.finalMessage')}</p>
//             <Link href="/experience">
//               <span className="inline-block px-6 py-3 bg-[#c09e5f] text-[#002718] text-lg font-bold rounded-lg transition hover:bg-[#b08d4f] cursor-pointer">
//                 {t('howItWorks.contactUs')}
//               </span>
//             </Link>
//             <p className="mt-4 text-[#e3ce90] text-sm md:text-base font-jura">
//               {t('howItWorks.riyadhMessage')}
//             </p>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default HowItWorks;


'use client';

import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';

const HowItWorks = () => {
  const { t, i18n } = useTranslation();

  const steps = [
    {
      image: "/assets/images/60mn.jpg",
      heading: t('howItWorks.plan.heading'),
      description: t('howItWorks.plan.description')
    },
    {
      image: "/assets/images/30mn.png",
      heading: t('howItWorks.create.heading'),
      description: t('howItWorks.create.description')
    },
    {
      image: "/assets/images/events/Stage.png",
      heading: t('howItWorks.celebrate.heading'),
      description: t('howItWorks.celebrate.description')
    }
  ];

  return (
    <>
      <Head>
        <link rel="preload" href="/assets/images/experience/corbg.jpg" as="image" />
      </Head>

      <div className={`w-full px-4 md:px-0 py-[20px] xl:pb-[80px] max-w-7xl mx-auto ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="px-0 md:px-4 lg:px-4 xl:px-4 flex flex-col max-w-7xl mx-auto">
          
          <h1 className="text-[24px] md:text-[34px] text-[#c09e5f] font-black font-orbitron mb-6 text-center">
            {t('howItWorks.title')}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="group bg-[#002718] duration-300  overflow-hidden"
              >
                <Image
                  src={step.image} 
                  alt={step.heading} 
                  className="w-full h-[400px] object-cover transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-2"
                  width={100}
                  height={100}
                />

                <div className="p-6 text-center transition-all duration-300 ease-in-out opacity-100 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 ">
                  <h3 className="text-[#c09e5f] font-bold text-lg font-orbitron md:text-xl mb-3">{step.heading}</h3>
                  <p className="text-[#e3ce90] font-jura text-sm md:text-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center ">
            <p className="text-[#e3ce90] text-lg md:text-xl font-jura mb-4">{t('howItWorks.finalMessage')}</p>
            <Link href="/experience">
              <span className="inline-block px-6 py-3 bg-[#c09e5f] text-[#002718] text-lg font-bold rounded-lg transition hover:bg-[#b08d4f] cursor-pointer">
                {t('howItWorks.contactUs')}
              </span>
            </Link>
            <p className="mt-4 text-[#e3ce90] text-sm md:text-base font-jura ">
              {t('howItWorks.riyadhMessage')}
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default HowItWorks;
