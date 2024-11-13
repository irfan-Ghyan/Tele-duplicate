// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import Head from 'next/head';
// import { useTranslation } from 'react-i18next';

// const Coaching = () => {
//   const { t } = useTranslation();

//   const trainings = [
//     {
//       title: t('ONE_ON_ONE_COACHING'),
//       description: t('COACHING_DESCRIPTION'),
//     },
//   ];

//   return (
//     <>
//       <Head>
//         <link rel="preload" href="/assets/images/experience/S8.png" as="image" />
//       </Head>
//       <div className="w-full max-w-full overflow-hidden lg:h-[750px] xl:h-[850px] bg-cover bg-right px-4 sm:px-0 md:px-0 lg:px-0 xl:px-0" style={{ backgroundImage: "url('/assets/images/experience/S8.png')" }}>
//         <div className='w-full bg-[#11072C] bg-opacity-60 xl:bg-opacity-0 px-4'>
//           <div className="inset-0 flex flex-col md:flex-row md:items-center md:justify-end px-4 md:pr-6 py-[20px] mt-[240px] sm:mt-[0px] md:mt-[0px] lg:mt-[0px] xl:mt-[0px] sm:pt-[100px] md:pt-[100px] lg:py-[100px] md:px-8 max-w-7xl mx-auto ">
//             <div className="w-full flex flex-col">
//               <div className='border-solid border-b-[1px] border-white border-opacity-20 text-end'>
//                 <h1 className='text-[14px] text-white font-normal font-orbitron pb-4 mt-10 md:mt-0'>{t('COACHING')}</h1>
//               </div>
//               <div className='flex flex-col justify-between md:mt-[36px] md:mb-[41px] '>
//                 {trainings.map((training, index) => (
//                   <div key={index} className='py-[30px]'>
//                     <h1 className='text-[34px] md:text-[54px] text-white font-black font-orbitron'>{training.title}</h1>
//                     <p className='md:w-[400px] lg:w-[550px] xl:w-[600px] md:text-[14px] lg:text-[18px] text-white font-black font-jura mt-6 leading-7 text-justify'>{training.description}</p>
//                   </div>
//                 ))}
//                 <div className="flex justify-center lg:justify-start m-bottom">
//                   <div className='pt-4 pb-10'>
//                     <Link href="HTTPS://wa.me/971566628585" target="_blank" rel="noopener noreferrer" className="button-slanted w-[200px] lg:w-[233px] h-[44px] px-8 py-6 button font-jura font-bold border-[1px] border-white hover:bg-gradient-to-r hover:from-[#7E51F8] hover:to-[#D007A6] hover:border-0 text-white ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
//                       <span className='button-slanted-content'>{t('ENQUIRE NOW')}</span>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Coaching;


'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const Coaching = () => {
  const { t } = useTranslation();
  const [training, setTraining] = useState(null);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.70.211:8000/api/content/sections/Experience');
        const result = await response.json();

        if (result.success) {
          // Find the section with title "Session"
          const sessionSection = result.data.sections.find(
            (section) => section.title === 'Private Events'
          );

          if (sessionSection) {
            // Map the section fields to match the trainings structure
            const titleField = sessionSection.section_fields.find(field => field.key === 'title');
            const descriptionField = sessionSection.section_fields.find(field => field.key === 'description');

            setTraining({
              title: titleField ? titleField.value : '',
              description: descriptionField ? descriptionField.value : '',
            });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <link rel="preload" href="/assets/images/experience/S8.png" as="image" />
      </Head>
      <div className="w-full max-w-full overflow-hidden lg:h-[750px] xl:h-[850px] bg-cover bg-right px-4 sm:px-0 md:px-0 lg:px-0 xl:px-0" style={{ backgroundImage: "url('/assets/images/experience/S8.png')" }}>
        <div className='w-full bg-[#11072C] bg-opacity-60 xl:bg-opacity-0 px-4'>
          <div className="inset-0 flex flex-col md:flex-row md:items-center md:justify-end px-4 md:pr-6 py-[20px] mt-[240px] sm:mt-[0px] md:mt-[0px] lg:mt-[0px] xl:mt-[0px] sm:pt-[100px] md:pt-[100px] lg:py-[100px] md:px-8 max-w-7xl mx-auto ">
            <div className="w-full flex flex-col">
              <div className='border-solid border-b-[1px] border-white border-opacity-20 text-end'>
                <h1 className='text-[14px] text-white font-normal font-orbitron pb-4 mt-10 md:mt-0'>{t('COACHING')}</h1>
              </div>
              <div className='flex flex-col justify-between md:mt-[36px] md:mb-[41px] '>
                {training && (
                  <div className='py-[30px]'>
                    <h1 className='text-[34px] md:text-[54px] text-white font-black font-orbitron'>{training.title}</h1>
                    <p className='md:w-[400px] lg:w-[550px] xl:w-[600px] md:text-[14px] lg:text-[18px] text-white font-black font-jura mt-6 leading-7 text-justify'>{training.description}</p>
                  </div>
                )}
                <div className="flex justify-center lg:justify-start m-bottom">
                  <div className='pt-4 pb-10'>
                    <Link href="HTTPS://wa.me/971566628585" target="_blank" rel="noopener noreferrer" className="button-slanted w-[200px] lg:w-[233px] h-[44px] px-8 py-6 button font-jura font-bold border-[1px] border-white hover:bg-gradient-to-r hover:from-[#7E51F8] hover:to-[#D007A6] hover:border-0 text-white ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
                      <span className='button-slanted-content'>{t('ENQUIRE NOW')}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coaching;
