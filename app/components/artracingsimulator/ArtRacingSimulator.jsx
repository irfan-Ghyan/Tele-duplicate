// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import premier from '../../../public/assets/images/events/img1.png';
// import whatsapp from '../../../public/assets/images/whatsapp.png';
// import { useTranslation } from 'react-i18next';

// const ArtRacingSimulator = () => {

//     const { t } = useTranslation();
//   const [dynamicContent, setDynamicContent] = useState({
//     title: 'State-of-the-Art Racing Simulator',
//     description: 'Feel the adrenaline rush with our premium simulator—perfect for friendly competition or solo adventures.',
//   });

//   const updateDynamicContent = (newTitle, newDescription) => {
//     setDynamicContent({
//       title: newTitle,
//       description: newDescription,
//     });
//   };


//   return (
//     <div className="w-full max-w-full lg:overflow-hidden lg:h-[700px] bg-cover bg-center px-4 md:px-0 flex items-center justify-center">
//       <div className="inset-0 bg-transparent flex flex-col lg:flex-row items-center justify-center py-[30px]">
//         <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl">
//           <div className="flex justify-center lg:justify-start">
//             <Image
//               src={premier}
//               width={516}
//               height={566}
//               alt="premier"
//               className="h-[460px] w-[430px] xl:h-[566px] xl:w-[516px]"
//             />
//           </div>
//           <div className="flex flex-col items-center lg:items-start lg:ml-10 mt-6 lg:mt-0">
//             <div className="text-center md:text-left">
//               <div className="flex flex-col items-center lg:items-start">
//                 <h1 className="text-[24px] lg:text-[34px] text-[#c09e5f] font-black font-orbitron">
//                   {t('art.title')}
//                 </h1>
//                 <p className="w-[300px] md:w-[550px] xl:w-[600px] sm:text-[14px] md:text-[18px] text-[#e3ce90] font-bold font-jura mt-6">
//                   {t('art.description')}
//                 </p>
//               </div>
              
//             </div>
//           </div>
//         </div>
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
      image: premier,
      title: t('art.card3.title'),
      description: t('art.card3.description'),
    },
    {
      image: whatsapp,
      title: t('art.card4.title'),
      description: t('art.card4.description'),
    },
  ];

  return (
    <div className="w-full bg-cover bg-center px-4 ">
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {cards.map((card, index) => (
          <div key={index} className="flex flex-col items-center bg-transparent p-4">
            <Image
              src={card.image}
              alt={`Card Image ${index + 1}`}
              className="w-full h-[400px] "
            />
            <div className="mt-4">
              <h2 className="text-[18px] lg:text-[24px] text-[#c09e5f] font-bold font-orbitron">
                {card.title}
              </h2>
              <p className="text-[#e3ce90] font-jura mt-2">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtRacingSimulator;
