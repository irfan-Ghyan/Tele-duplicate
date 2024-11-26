
// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
// import Head from 'next/head';
// import { useTranslation } from 'react-i18next';
// import Image from 'next/image';
// import Link from 'next/link';

// const Content = () => {
//   // return (
//   //   <div id="target-section" className="max-w-full overflow-hidden text-white flex flex-col justify-between">
//   //       <Experience />
//   //   </div>
//   // );

//   const { t } = useTranslation();
//   const [faqEntries, setFaqEntries] = useState([]);
//   const [apiData, setApiData] = useState([]);
//    const [events, setEvents] = useState([]);
   

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//     const url = `${baseUrl}/api/content/sections/Experience`;
//       const response = await fetch(url);

//       if (response.ok) {
//         const data = await response.json();

//         if (data.success) {
//           const faqSection = data.data.sections.find((section) => section.title === "Session");
//           if (faqSection) {
//             // Group fields by their index (e.g., "title1", "description1")
//             const groupedData = faqSection.section_fields.reduce((acc, field) => {
//               const match = field.key.match(/(title|description)(\d+)/); // Extract type and index
//               if (match) {
//                 const [_, type, index] = match;
//                 if (!acc[index]) acc[index] = {};
//                 acc[index][type] = field.value; 
//               }
//               return acc;
//             }, {});

//             const faqData = Object.values(groupedData);
//             setFaqEntries(faqData);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

  
//   return (
//     <>
//     <Helmet>
//         <title>{t('Experiences | Racing simulators and all-inclusive access')}</title>
//         <meta name={t('description')} content={t("Explore various racing experiences at Teleios Dome, from beginner sessions to exclusive VIP experiences. Enjoy adrenaline-packed moments tailored to your level of skill.")} />
//       </Helmet>

//       <Head>
//         <link rel="preload" href="/assets/images/experience/exbg.png" as="image" />
//         <link rel="preload" href="/assets/images/experience/mintue1.jpg" as="image" />
//       </Head>
//     <div className="flex flex-col items-center overflow-x-hidden lg:py-[80px] lg:pb-[100px] lg:pt-[50px]">
//         <div className="flex items-center justify-center xl:px-40 lg:px-20 sm:px-4 my-[40px]">
//         <div className="text-center text-[#e3ce90] ">
//           <h1 className="font-orbitron text-[34px] lg:text-[54px] text-[#e3ce90] font-black mb-4">SESSIONS</h1>
//         </div>
//       </div>
//       <div className="flex justify-center my-6 lg:pb-[100px] flex-wrap gap-8">
//           {faqEntries.map((experience, index) => (
//             <div
//               key={index}
//               className="overflow-hidden bg-[#002718] mt-5 xl:mt-20 flex flex-col items-center h-[600px] w-[363px] mx-auto"
//             >
//               <div className="flex justify-center items-center w-[363px] h-[282px]">
//                 <Image
//                   src=""
//                   alt="Product"
//                   width={363}
//                   height={282}
//                   className="w-[363px] h-[282px] object-cover"
//                   priority={true}
//                 />
//               </div>
//               <div className="flex flex-col justify-between items-center mx-[20px] pt-4 flex-1 w-full">
//                 <div>
//                   <h1 className="text-[#c09e5f] text-[18px] font-orbitron font-bold px-8">{experience.title}</h1>
//                   <p className="text-[#e3ce90] text-[18px] font-jura font-bold py-4 px-8 text-justify">
//                     {experience.description}
//                   </p>
//                 </div>
//                 <div className="pt-[19px] pb-[22px]">
//                   <Link
//                     className="button-slanted cursor-pointer w-[280px] lg:w-[310px] h-[44px] font-jura font-normal md:font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#063828] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
//                     href={`/experience/${experience.id}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <span className="button-slanted-content">{t('BOOK NOW')}</span>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div className="overflow-hidden  mt-5 xl:mt-20 flex flex-col items-center h-[600px] w-full">
//             <div className='flex gap-8'>
//             <div className='w-1/2 md:flex-col md:justify-center bg-[#002718]'>
//             <div className="flex justify-center items-center w-[363px] h-[282px]">
//                 <Image src="" alt="Product" width={363} height={282} className="w-[363px] h-[282px] object-cover"  priority={true} />
//               </div>
//               <div className='flex flex-col justify-between items-center mx-[20px] pt-4 flex-1 w-full'>
//                 <div>
//                   <h1 className="text-[#c09e5f] text-[18px] font-orbitron font-bold px-8">VIP</h1>
//                   <p className="text-[#e3ce90] text-[18px] font-jura font-bold py-4 px-8 text-justify">Enjoy the full experience with a 60-minute session.</p>
//                 </div>
//                 <div className="pt-[19px] pb-[22px]">
//                   <Link
//                     className="button-slanted cursor-pointer w-[280px] lg:w-[310px] h-[44px] font-jura font-normal md:font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#063828] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
//                     href='/experiencedetails'
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                   >
//                     <span className='button-slanted-content'>{t('ENQUIRE NOW')}</span>
//                   </Link>
                  
//                 </div>

//         {/* 
//                 <div className="flex justify-center items-center w-[363px] h-[282px]">
//                 <Image src="" alt="Product" width={363} height={282} className="w-[363px] h-[282px] object-cover"  priority={true} />
//               </div> */}
              
//               </div>
//             </div>
             
//             <div className='w-1/2 bg-[#002718] '>
//             <div className="flex justify-center items-center w-[363px] h-[282px]">
//                 <Image src="" alt="Product" width={363} height={282} className="w-[363px] h-[282px] object-cover"  priority={true} />
//               </div>
//               <div className='flex flex-col justify-between items-center mx-[20px] pt-4 flex-1 w-full'>
//                 <div>
//                   <h1 className="text-[#c09e5f] text-[18px] font-orbitron font-bold px-8">LOUNGE</h1>
//                   <p className="text-[#e3ce90] text-[18px] font-jura font-bold py-4 px-8 text-justify">Enjoy the full experience with a 120-minute session.</p>
//                 </div>
//                 <div className="pt-[19px] pb-[22px]">
//                   <Link
//                     className="button-slanted cursor-pointer w-[280px] lg:w-[310px] h-[44px] font-jura font-normal md:font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#063828] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
//                     href='/experiencedetails'
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                   >
//                     <span className='button-slanted-content'>{t('ENQUIRE NOW')}</span>
//                   </Link>
                  
//                 </div>

//         {/* 
//                 <div className="flex justify-center items-center w-[363px] h-[282px]">
//                 <Image src="" alt="Product" width={363} height={282} className="w-[363px] h-[282px] object-cover"  priority={true} />
//               </div> */}
              
//               </div>
//             </div>
//             </div>
//           </div>
//         </div>
//     </div>
//     </>
//   );
// }


// export default Content;




import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';

const Content = () => {
  // return (
  //   <div id="target-section" className="max-w-full overflow-hidden text-white flex flex-col justify-between">
  //       <Experience />
  //   </div>
  // );

  const { t } = useTranslation();
  const [faqEntries, setFaqEntries] = useState([]);
  const [apiData, setApiData] = useState([]);
   const [events, setEvents] = useState([]);
   

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}/api/content/sections/Experience`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          const faqSection = data.data.sections.find((section) => section.title === "Session");
          if (faqSection) {
            // Group fields by their index (e.g., "title1", "description1")
            const groupedData = faqSection.section_fields.reduce((acc, field) => {
              const match = field.key.match(/(title|description)(\d+)/); // Extract type and index
              if (match) {
                const [_, type, index] = match;
                if (!acc[index]) acc[index] = {};
                acc[index][type] = field.value; 
              }
              return acc;
            }, {});

            const faqData = Object.values(groupedData);
            setFaqEntries(faqData);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  return (
    <>
    <Helmet>
        <title>{t('Experiences | Racing simulators and all-inclusive access')}</title>
        <meta name={t('description')} content={t("Explore various racing experiences at Teleios Dome, from beginner sessions to exclusive VIP experiences. Enjoy adrenaline-packed moments tailored to your level of skill.")} />
      </Helmet>

      <Head>
        <link rel="preload" href="/assets/images/experience/exbg.png" as="image" />
        <link rel="preload" href="/assets/images/experience/mintue1.jpg" as="image" />
      </Head>
    <div className="flex flex-col items-center overflow-x-hidden lg:py-[80px] lg:pb-[100px] lg:pt-[50px]">
        <div className="flex items-center justify-center xl:px-40 lg:px-20 sm:px-4 my-[40px]">
        <div className="text-center text-[#e3ce90] ">
          <h1 className="font-orbitron text-[34px] lg:text-[54px] text-[#e3ce90] font-black mb-4">SESSIONS</h1>
        </div>
      </div>
      <div className="flex justify-center my-6 lg:pb-[100px] flex-wrap gap-8">
  {faqEntries.slice(0, 5).map((experience, index) => (
    <div
      key={index}
      className={`overflow-hidden bg-[#002718] mt-5 xl:mt-20 flex flex-col items-center h-[600px] 
        ${index === 3 || index === 4 ? 'w-[550px]' : 'w-[363px]'} mx-auto`}
    >
      <div className="flex justify-center items-center w-full h-[282px]">
        <Image
          src=""
          alt="Product"
          width={363}
          height={282}
          className="w-full h-[282px] object-cover"
          priority={true}
        />
      </div>
      <div className="flex flex-col justify-between items-center mx-[20px] pt-4 flex-1 w-full">
        <div>
          <h1 className="text-[#c09e5f] text-[18px] font-orbitron font-bold px-8">
            {experience.title}
          </h1>
          <p className="text-[#e3ce90] text-[18px] font-jura font-bold py-4 px-8 text-justify">
            {experience.description}
          </p>
        </div>
        <div className="pt-[19px] pb-[22px]">
          <Link
            className="button-slanted cursor-pointer w-[280px] lg:w-[310px] h-[44px] font-jura font-normal md:font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#063828] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
            href={
              index === 3
                ? `/vip`
                : index === 4
                ? `/lounge`
                : `/normal`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="button-slanted-content">{t('BOOK NOW')}</span>
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>


    </div>
    </>
  );
}


export default Content;


