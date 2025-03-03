// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import { useTranslation } from 'react-i18next';
// import premier from '../../../public/assets/images/dome/bg-1.png';
// import whatsapp from '../../../public/assets/images/dome/bg-2.png';
// import premier1 from '../../../public/assets/images/dome/bg-6.png';
// import whatsapp1 from '../../../public/assets/images/dome/S1.png';

// const ArtRacingSimulator = () => {
//   const { t } = useTranslation();

//   const cards = [
//     {
//       image: premier,
//       title: t('art.card1.title'),
//       description: t('art.card1.description'),
//     },
//     {
//       image: whatsapp,
//       title: t('art.card2.title'),
//       description: t('art.card2.description'),
//     },
//     {
//       image: premier1,
//       title: t('art.card3.title'),
//       description: t('art.card3.description'),
//     },
//     {
//       image: whatsapp1,
//       title: t('art.card4.title'),
//       description: t('art.card4.description'),
//     },
//   ];

//   return (
//     <div className="w-full bg-cover bg-center px-0 lg:px-4 ">
  
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto pt-16 lg:pt-0 xl:pt-0">
//         {cards.map((card, index) => (
//           <div key={index} className="flex flex-col items-center bg-transparent ">
//             <Image
//               src={card.image}
//               alt={`Card Image ${index + 1}`}
//               className="w-full h-[400px] "
//             />
//             <div className="mt-4 px-4 lg:px-0">
//               <h2 className="text-[18px] lg:text-[24px] text-[#c09e5f] font-bold font-orbitron">
//                 {card.title}
//               </h2>
//               <p className="text-[#e3ce90] font-jura mt-2">
//                 {card.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ArtRacingSimulator;


'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import premier from '../../../public/assets/images/dome/bg-1.png';
import whatsapp from '../../../public/assets/images/dome/bg-2.png';
import premier1 from '../../../public/assets/images/dome/bg-6.png';
import whatsapp1 from '../../../public/assets/images/dome/S1.png';

const ArtRacingSimulator = () => {
  const { t } = useTranslation();

  const cards = [
    {
      image: premier,
      title: t('art.card1.title'),
      description: t('art.card1.description'),
    },
    {
      image: whatsapp,
      title: t('art.card2.title'),
      description: t('art.card2.description'),
    },
    {
      image: premier1,
      title: t('art.card3.title'),
      description: t('art.card3.description'),
    },
    {
      image: whatsapp1,
      title: t('art.card4.title'),
      description: t('art.card4.description'),
    },
  ];

  return (
    <div className="w-full bg-cover bg-center px-4">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto pt-2 lg:pt-0 xl:pt-0">
        {cards.map((card, index) => (
          <div key={index} className="flex flex-col bg-[#C09E5F] shadow-sm border border-[#C09E5F] rounded-lg my-2 w-full">
            <div className=" overflow-hidden rounded-md flex justify-center items-center group ">
              <div className='relative object-cover transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-2'>
              <Image src={card.image} alt={`Card Image ${index + 1}`} className=" w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#C09E5F] to-transparent opacity-100"></div>
              </div>
            </div>
            <div className="p-6 text-center">
              <h4 className="text-[24px] font-bold text-[#002718] font-orbitron">{card.title}</h4>
              <p className="text-[14px] text-[#002718] font-normal">{card.description}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtRacingSimulator;
