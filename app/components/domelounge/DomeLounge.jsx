'use client';

import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
// import lounge from '../../../public/assets/images/dome/customize1.png';
import { useTranslation } from 'react-i18next';
import { getImageCall } from '@/app/utils/api';

const DomeLounge = () => {
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
      const sectionResponse = await fetch(`${baseUrl}/api/content/sections/Dome`);
      if (!sectionResponse.ok) {
        throw new Error('Failed to fetch section data from the server.');
      }

      const sectionData = await sectionResponse.json();
      let entry = null;

      if (sectionData.success) {
        const domeSection = sectionData.data.sections.find((section) => section.title === 'Lounge Area');

        if (domeSection && domeSection.section_fields) {
          // Assume the fields are sorted by the backend or sort them here
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
          const imageResponse = await getImageCall(`${baseUrl}/api/content/getImages/Lounge Area`);
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
      <link rel="preload" href="/assets/images/dome/customize1.png" as="image" />
    </Head>
    <div className="w-full max-w-full lg:overflow-hidden xl:h-[700px] px-4 bg-cover bg-center">
      <div className="inset-0 bg-transparent flex md:flex-col md:pr-6">
        <div className="flex flex-col justify-between pt-[20px] py-[30px]">
        {!loading && !error && latestEntry &&  (
            <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-8 mb-10 lg:mb-0">
              <div className="order-2 lg:order-1 lg:w-1/2 flex flex-col justify-between">
                {/* <h4 className="text-[34px] xl:text-[35px] text-[#D008A6] font-bold font-jura">{dome.subtitle}</h4> */}
                <h1 className="text-[24px] md:text-[38px] text-[#c09e5f] font-black font-orbitron">{latestEntry.title}</h1>
                <p className="md:w-[400px] lg:w-[550px] xl:w-[600px] md:text-[14px] lg:text-[18px] text-[#c09e5f] font-bold font-jura mt-6 text-justify">{latestEntry.description}</p>
                {/* <div className="py-10">
                  <Link href="https://feverup.com/m/187813" target="_blank" rel="noopener noreferrer" className="button-slanted w-[233px] h-[44px] px-8 py-6 button font-jura font-bold bg-gradient-to-r from-[#7E51F8] to-[#D007A6] text-white ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
                    <span className='button-slanted-content'>BOOK NOW</span>
                  </Link>
                </div> */}
              </div>
              <div className="order-1 lg:order-2 lg:w-1/2 flex justify-center lg:justify-end mb-6 lg:mb-0">
                <Image src="/assets/images/dome/customize1.png" width={520} height={566} alt="lounge" className="h-[350px] lg:h-[566px] xl:h-[566px] w-[516px]"  priority={true}/>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default DomeLounge;
