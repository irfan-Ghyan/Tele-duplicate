

// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Head from 'next/head';
// import { useTranslation } from 'react-i18next';
// import { getImageCall } from '../../utils/api';
// import Image from 'next/image';

// const CorporateNetworking = () => {

//   const { t } = useTranslation();
//   const [latestEntry, setLatestEntry] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//       // Fetch the section data
//       const sectionResponse = await fetch(`${baseUrl}/api/content/sections/Corporate Events`);
//       if (!sectionResponse.ok) {
//         throw new Error('Failed to fetch section data from the server.');
//       }

//       const sectionData = await sectionResponse.json();
//       let entry = null;

//       if (sectionData.success) {
//         const domeSection = sectionData.data.sections.find((section) => section.title === 'Networking');

//         if (domeSection && domeSection.section_fields) {
//           // Assume the fields are sorted by the backend or sort them here
//           const latestField = domeSection.section_fields
//             .filter((field) => field.key.startsWith('title'))
//             .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];

//           const descriptionField = domeSection.section_fields.find(
//             (field) => field.key === `description${latestField.key.replace('title', '')}`
//           );

//           if (latestField && descriptionField) {
//             entry = {
//               title: latestField.value,
//               description: descriptionField.value,
//               imageUrl: '', // Placeholder for now
//             };
//           }

//           // Fetch the image data dynamically
//           const imageResponse = await getImageCall(`${baseUrl}/api/content/getImages/Networking`);
//           if (imageResponse.ok) {
//             const imageData = await imageResponse.json();
//             if (imageData.success && imageData.data.length > 0) {
//               entry.imageUrl = imageData.data[0].url; // Use the first image URL
//             }
//           }

//           setLatestEntry(entry);
//         }
//       }
//     } catch (err) {
//       setError(err.message || 'An error occurred while fetching data.');
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <>
//     <Head>
//      <link rel="preload" href="/assets/images/events/pics-17.jpg" as="image" />
//      <link rel="preload" href="/assets/images/events/pics-98.jpg" as="image" />
//      <link rel="preload" href="/assets/images/events/Stage.png" as="image" />
//    </Head>
//     <div className='w-full flex flex-wrap justify-center items-center my-0 md:my-20 lg:my-20'>
//     {loading && (
//                 <div className="text-center text-[#e3ce90] font-bold text-xl">
//                   {t('Loading...')}
//                 </div>
//               )}

//               {error && (
//                 <div className="text-center text-red-500 font-bold text-xl">
//                   {t('Error:')} {error}
//                 </div>
//               )}

//               {!loading && !error && latestEntry && (
//       <div className="relative w-full h-[240px] md:h-[319px] hover-trigger" style={{ backgroundImage: "url('/assets/images/events/pics-17.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
//         <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center hover-content transition-transform duration-300">
//           <Link href="/enquiry-form" className="flex flex-col items-center text-center">
//           <Image
//               src={latestEntry.imageUrl || '/assets/images/events/default.jpg'}
//               width={60}
//               height={60}
//               alt="Networking"
//               className="mb-4"
//               priority={true}
//             />
//             <h1 className='text-[18px] text-[#c09e5f] font-bold font-orbitron'>{latestEntry.title}</h1>
//             <p className='text-[#c09e5f] font-jura text-center hidden md:block text-balance'> {latestEntry.description}</p>
//             {/* <button className='hidden md:block mt-2 button-slanted w-[160px] h-[44px] px-4 py-2 button font-jura font-bold bg-gradient-to-r from-[#7E51F8] to-[#D007A6] text-white ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center'>
//             <span className='button-slanted-content'>Enquire now</span>
//             </button> */}
//           </Link>
//         </div>
//       </div>
// )}
//       <style jsx>{`
//         .hover-trigger {
//           position: relative;
//           overflow: hidden;
//         }
//         .hover-content {
//           transform: translateY(100%);
//         }
//         .hover-trigger:hover .hover-content {
//           transform: translateY(0);
//         }
//         .hover-trigger:hover .hover-content p,
//         .hover-trigger:hover .hover-content button {
//           display: block;
//         }
//         @media (max-width: 764px) {
//           .hover-content {
//             transform: translateY(0);
//           }
//           .hover-content p,
//           .hover-content button {
//             display: block !important;
//           }
//         }
//       `}</style>
//     </div>
//     </>
//   )
// }

// export default CorporateNetworking;

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image'; // Ensure you import the Image component from 'next/image'
import { useTranslation } from 'react-i18next';
import { getImageCall } from '../../utils/api';

const CorporateNetworking = () => {
  const { t } = useTranslation();
  const [latestEntry, setLatestEntry] = useState(null);
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

      // Fetch the section data
      const sectionResponse = await fetch(`${baseUrl}/api/content/sections/Corporate Events`);
      if (!sectionResponse.ok) {
        throw new Error('Failed to fetch section data from the server.');
      }

      const sectionData = await sectionResponse.json();
      let entry = null;

      if (sectionData.success) {
        const domeSection = sectionData.data.sections.find((section) => section.title === 'Networking');

        if (domeSection && domeSection.section_fields) {
          // Find the latest title and corresponding description
          const latestField = domeSection.section_fields
            .filter((field) => field.key.startsWith('title'))
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];

          const descriptionField = domeSection.section_fields.find(
            (field) => field.key === `description${latestField.key.replace('title', '')}`
          );

          if (latestField && descriptionField) {
            entry = {
              title: latestField.value,
              description: descriptionField.value,
              imageUrl: '', // Placeholder for now
            };
          }

          // Fetch the image data dynamically
          const imageResponse = await getImageCall(`${baseUrl}/api/content/getImages/Networking`);
          if (imageResponse.ok) {
            const imageData = await imageResponse.json();
            if (imageData.success && imageData.data.length > 0) {
              entry.imageUrl = imageData.data[0].url; // Use the first image URL
            }
          }

          setLatestEntry(entry);
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <link rel="preload" href="/assets/images/events/pics-17.jpg" as="image" />
        <link rel="preload" href="/assets/images/events/pics-98.jpg" as="image" />
        <link rel="preload" href="/assets/images/events/Stage.png" as="image" />
      </Head>
      <div className="w-full flex flex-wrap justify-center items-center my-0 md:my-20 lg:my-20">
        {loading && (
          <div className="text-center text-[#e3ce90] font-bold text-xl">
            {t('Loading...')}
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 font-bold text-xl">
            {t('Error:')} {error}
          </div>
        )}

        {!loading && !error && latestEntry && (
          <div
            className="relative w-full h-[240px] md:h-[319px] hover-trigger"
            style={{
              backgroundImage: `url(${latestEntry.imageUrl || '/assets/images/events/pics-17.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center hover-content transition-transform duration-300">
              <Link href="/enquiry-form" className="flex flex-col items-center text-center">
                <Image
                  src={latestEntry.imageUrl || '/assets/images/events/default.jpg'} // Dynamically use the fetched image URL
                  width={60}
                  height={60}
                  alt="Networking"
                  className="mb-4"
                  priority={true}
                />
                <h1 className="text-[18px] text-[#c09e5f] font-bold font-orbitron">
                  {latestEntry.title}
                </h1>
                <p className="text-[#c09e5f] font-jura text-center hidden md:block text-balance">
                  {latestEntry.description}
                </p>
              </Link>
            </div>
          </div>
        )}

        <style jsx>{`
          .hover-trigger {
            position: relative;
            overflow: hidden;
          }
          .hover-content {
            transform: translateY(100%);
          }
          .hover-trigger:hover .hover-content {
            transform: translateY(0);
          }
          .hover-trigger:hover .hover-content p,
          .hover-trigger:hover .hover-content button {
            display: block;
          }
          @media (max-width: 764px) {
            .hover-content {
              transform: translateY(0);
            }
            .hover-content p,
            .hover-content button {
              display: block !important;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default CorporateNetworking;