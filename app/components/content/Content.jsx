'use client';

import React, { useState, useEffect } from 'react';
import Newsletter from '../../components/newsletter/Newsletter';
import Coaching from '../../components/coaching/Coaching';
import { Helmet } from 'react-helmet-async';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';

const Content = () => {
  const { t, i18n } = useTranslation();
  const [faqEntries, setFaqEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      const sectionResponse = await fetch(`${baseUrl}/api/content/sections/Experience`);
      if (!sectionResponse.ok) {
        throw new Error(t('Content.Error'));
      }

      const sectionData = await sectionResponse.json();
      let entries = [];

      if (sectionData.success) {
        const domeSection = sectionData.data.sections.find((section) => section.title === 'Session');

        if (domeSection && domeSection.section_fields) {
          entries = domeSection.section_fields
            .filter((field) => field.key.startsWith('title'))
            .map((field, index) => {
              const descriptionField = domeSection.section_fields.find(
                (f) => f.key === `description${field.key.replace('title', '')}`
              );

              const staticImageUrls = [
                '/assets/images/experience/mintue1.jpg',
                '/assets/images/experience/30mn.png',
                '/assets/images/experience/60mn.png',
                '/assets/images/experience/privateevent.jpg',
                '/assets/images/experience/90min.png',
              ];

              return {
                title: field.value,
                description: descriptionField ? descriptionField.value : '',
                imageUrl: staticImageUrls[index] || '/assets/images/static/default.jpg',
              };
            });

          setFaqEntries(entries);
        }
      }
    } catch (err) {
      setError(err.message || t('Content.Error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('Content.Title')}</title>
        <meta
          name="description"
          content={t('Content.Description')}
        />
      </Helmet>

      <Head>
        <link rel="preload" href="/assets/images/experience/exbg.png" as="image" />
        <link rel="preload" href="/assets/images/experience/mintue1.jpg" as="image" />
      </Head>

      <div className="flex flex-col items-center overflow-x-hidden lg:py-[80px] lg:pb-[100px] lg:pt-[50px]">
        <div className="flex items-center justify-center xl:px-40 lg:px-20 sm:px-4">
          <div className="text-center text-[#e3ce90]">
            <h1 className="font-orbitron text-[34px] lg:text-[54px] text-[#e3ce90] font-black mb-4">
              {t('Content.Sessions')}
            </h1>
          </div>
        </div>

        <div className="w-full">
          <div className="xl:flex xl:justify-center gap-4 lg:mx-80 ">
            {loading && <p className="text-[#c09e5f]">{t('Content.Loading')}</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading &&
              !error &&
              faqEntries.slice(0, 3).map((experience, index) => (
                <div
                  key={index}
                  className="overflow-hidden bg-[#002718] flex flex-col items-center h-[650px] sm:w-[330px] lg:w-[360px] my-8"
                >
                  <div className="flex justify-center items-center w-full h-[282px]">
                    <Image
                      src={experience.imageUrl}
                      alt={t('Content.Title')}
                      width={300}
                      height={282}
                      className="w-[360px] h-[282px] object-cover"
                      priority={true}
                    />
                  </div>
                   {/* First Button: Visible on Small Screens, Hidden on Large Screens */}
                   <div className="pt-[19px] pb-[22px] block lg:hidden">
                      <Link
                        className="button-slanted cursor-pointer w-[250px] lg:w-[250px] h-[44px] font-jura font-normal md:font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#063828] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
                        href='/normal'
                      >
                        <span className="button-slanted-content">{t('BOOK NOW')}</span>
                      </Link>
                    </div>
                  <div className="flex flex-col justify-between items-center mx-4 pt-4 flex-1 w-full">
                    <div>
                      <h1 className="text-[#c09e5f] text-[18px] font-orbitron font-bold px-8">
                        {experience.title}
                      </h1>
                      <p className="text-[#e3ce90] text-[18px] font-jura font-bold py-4 px-8">
                        {experience.description}
                      </p>
                    </div>
                    <div className="pt-[19px] pb-[22px] hidden lg:block">
                      <Link
                        className="button-slanted cursor-pointer w-[250px] lg:w-[250px] h-[44px] font-jura font-normal md:font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#063828] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
                        href="/normal"
                      >
                        <span className="button-slanted-content">{t('Content.BookNow')}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
      
          </div>
          <div className="xl:flex xl:justify-center flex-wrap gap-2 lg:mx-80 ">
            {faqEntries.slice(3, 5).map((experience, index) => (
              <div
                key={index}
                className="overflow-hidden bg-[#002718] flex flex-col items-center h-[650px] sm:w-[430px] lg:w-[560px] my-8"
              >
                <div className="flex justify-center items-center w-full h-[282px]">
                  <Image
                    src={experience.imageUrl}
                    alt="Experience Image"
                    width={300}
                    height={282}
                    className="w-[560px] h-[282px] object-cover"
                    priority={true}
                  />
                </div>
                {/* First Button: Visible on Small Screens, Hidden on Large Screens */}
                <div className="pt-[19px] pb-[22px] block lg:hidden">
                      <Link
                        className="button-slanted cursor-pointer w-[250px] lg:w-[250px] h-[44px] font-jura font-normal md:font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#063828] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
                        href={index === 0 ? `/vip` : `/lounge`}
                      >
                        <span className="button-slanted-content">{t('BOOK NOW')}</span>
                      </Link>
                    </div>
                <div className="flex flex-col justify-between items-center mx-4 pt-4 flex-1 w-full">
                  <div>
                    <h1 className="text-[#c09e5f] text-[18px] font-orbitron font-bold px-8">
                      {experience.title}
                    </h1>
                    <p className="text-[#e3ce90] text-[18px] font-jura font-bold py-4 px-8">
                      {experience.description}
                    </p>
                  </div>
                  <div className="pt-[19px] pb-[22px] hidden lg:block">
                    <Link
                      className="button-slanted cursor-pointer w-[250px] lg:w-[250px] h-[44px] font-jura font-normal md:font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#063828] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
                      href={index === 0 ? `/vip` : `/lounge`}
                    >
                      <span className="button-slanted-content">{t('BOOK NOW')}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;



// 'use client';

// import React, { useState, useEffect } from 'react';
// import Newsletter from '../../components/newsletter/Newsletter';
// import Coaching from '../../components/coaching/Coaching';
// import { Helmet } from 'react-helmet-async';
// import Head from 'next/head';
// import { useTranslation } from 'react-i18next';
// import Image from 'next/image';
// import Link from 'next/link';

// const Content = () => {
//   const { t, i18n } = useTranslation();
//   // const [faqEntries, setFaqEntries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//  const faqEntries = t('Content.Entries', { returnObjects: true });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//       const sectionResponse = await fetch(`${baseUrl}/api/content/sections/Experience`);
//       if (!sectionResponse.ok) {
//         throw new Error(t('Content.Error'));
//       }

//       const sectionData = await sectionResponse.json();
//       let entries = [];

//       if (sectionData.success) {
//         const domeSection = sectionData.data.sections.find((section) => section.title === 'Session');

//         if (domeSection && domeSection.section_fields) {
//           entries = domeSection.section_fields
//             .filter((field) => field.key.startsWith('title'))
//             .map((field, index) => {
//               const descriptionField = domeSection.section_fields.find(
//                 (f) => f.key === `description${field.key.replace('title', '')}`
//               );

//               const staticImageUrls = [
//                 '/assets/images/experience/mintue1.jpg',
//                 '/assets/images/experience/30mn.png',
//                 '/assets/images/experience/60mn.png',
//                 '/assets/images/experience/privateevent.jpg',
//                 '/assets/images/experience/90min.png',
//               ];

//               return {
//                 title: field.value,
//                 description: descriptionField ? descriptionField.value : '',
//                 imageUrl: staticImageUrls[index] || '/assets/images/static/default.jpg',
//               };
//             });

//           // setFaqEntries(entries);
//         }
//       }
//     } catch (err) {
//       setError(err.message || t('Content.Error'));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mapping function
//   const getHref = (title) => {
//     const lowerTitle = title.toLowerCase();
//     if (lowerTitle.includes('20')) {
//       return '/normal';
//     } else if (lowerTitle.includes('40')) {
//       return '/40mints';
//     } else if (lowerTitle.includes('60')) {
//       return '/60mints';
//     }
//     return '/normal'; 
//   };

//   return (
//     <>
//       <Helmet>
//         <title>{t('Content.Title')}</title>
//         <meta
//           name="description"
//           content={t('Content.Description')}
//         />
//       </Helmet>

//       <Head>
//         <link rel="preload" href="/assets/images/experience/exbg.png" as="image" />
//         <link rel="preload" href="/assets/images/experience/mintue1.jpg" as="image" />
//       </Head>

//       <div className="flex flex-col items-center overflow-x-hidden lg:py-[80px] lg:pb-[100px] lg:pt-[50px]">
//         <div className="flex items-center justify-center xl:px-40 lg:px-20 sm:px-4">
//           <div className="text-center text-[#e3ce90] mt-20">
//             <h1 className="font-orbitron text-[34px] lg:text-[54px] text-[#e3ce90] font-black mb-4">
//               {t('Content.Sessions')}
//             </h1>
//           </div>
//         </div>

//         <div className="">
//           <div className="xl:flex xl:justify-center gap-4 lg:mx-80 ">
//             {loading && <p className="text-[#c09e5f]">{t('Content.Loading')}</p>}
//             {error && <p className="text-red-500">{error}</p>}

//             {!loading &&
//               !error &&
//               faqEntries.slice(0, 3).map((experience, index) => (
//                 <div
//                   key={index}
//                   className="overflow-hidden bg-[#002718] flex flex-col items-center h-[650px] sm:w-[330px] lg:w-[360px] my-8"
//                 >
//                   <div className="flex justify-center items-center w-full h-[282px]">
//                     <Image
//                       src={experience.imageUrl}
//                       alt={experience.title}
//                       width={600}
//                       height={282}
//                       className="sm:w-[600px] lg:w-[360px] h-[282px] object-cover"
//                       priority={true}
//                     />
//                   </div>
//                   {/* Button: Visible on Small Screens, Hidden on Large Screens */}
//                   <div className="pt-[19px] pb-[22px] block lg:hidden">
//                     <Link
//                       className="button-slanted cursor-pointer w-[250px] h-[44px] font-jura font-normal md:font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#063828] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
//                       href={getHref(experience.title)} // Dynamic href
//                     >
//                       <span className="button-slanted-content">{t('BOOK NOW')}</span>
//                     </Link>
//                   </div>
//                   <div className="flex flex-col justify-between items-center mx-4 pt-4 flex-1 w-full">
//                     <div>
//                       <h1 className="text-[#c09e5f] text-[18px] font-orbitron font-bold px-8">
//                         {experience.title}
//                       </h1>
//                       <p className="text-[#e3ce90] text-[18px] font-jura font-bold py-4 px-8">
//                       {experience.description}
//                       </p>
//                     </div>
//                     {/* Button: Hidden on Small Screens, Visible on Large Screens */}
//                     <div className="pt-[19px] pb-[22px] hidden lg:block">
//                       <Link
//                         className="button-slanted cursor-pointer w-[250px] h-[44px] font-jura font-normal md:font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#063828] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
//                         href={getHref(experience.title)}
//                       >
//                         <span className="button-slanted-content">{t('BOOK NOW')}</span>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//           <div className="xl:flex xl:justify-center flex-wrap gap-2 lg:mx-80 ">
//             {faqEntries.slice(3, 5).map((experience, index) => (
//               <div
//                 key={index}
//                 className="overflow-hidden bg-[#002718] flex flex-col items-center h-[650px] sm:w-[430px] lg:w-[560px] my-8"
//               >
//                 <div className="flex justify-center items-center w-full h-[282px]">
//                   <Image
//                     src={experience.imageUrl}
//                     alt={experience.title}
//                     width={300}
//                     height={282}
//                     className="w-[560px] h-[282px] object-cover"
//                     priority={true}
//                   />
//                 </div>
//                 {/* Button: Visible on Small Screens, Hidden on Large Screens */}
//                 <div className="pt-[19px] pb-[22px] block lg:hidden">
//                   <Link
//                     className="button-slanted cursor-pointer w-[250px] h-[44px] font-jura font-normal md:font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#063828] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
//                     href={index === 0 ? `/vip` : `/lounge`}
//                   >
//                     <span className="button-slanted-content">{t('BOOK NOW')}</span>
//                   </Link>
//                 </div>
//                 <div className="flex flex-col justify-between items-center mx-4 pt-4 flex-1 w-full">
//                   <div>
//                     <h1 className="text-[#c09e5f] text-[18px] font-orbitron font-bold px-8">
//                     {experience.title}
//                     </h1>
//                     <p className="text-[#e3ce90] text-[18px] font-jura font-bold py-4 px-8">
//                     {experience.description}
//                     </p>
//                   </div>
//                   {/* Button: Hidden on Small Screens, Visible on Large Screens */}
//                   <div className="pt-[19px] pb-[22px] hidden lg:block">
//                     <Link
//                       className="button-slanted cursor-pointer w-[250px] h-[44px] font-jura font-normal md:font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#063828] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
//                       href={index === 0 ? `/vip` : `/lounge`}
//                     >
//                       <span className="button-slanted-content">{t('BOOK NOW')}</span>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Content;
