'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { getImageCall } from '@/app/utils/api';

const DomePit = () => {
  const { t } = useTranslation();
  const [tipEntry, setLatestEntry] = useState(null);
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
        const domeSection = sectionData.data.sections.find((section) => section.title === 'PIT Stop');

        if (domeSection && domeSection.section_fields) {
          // Assume the fields are sorted by the backend or sort them here
          const latestField = domeSection.section_fields
            .filter((field) => field.key.startsWith('title'))
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0];

          const descriptionField = domeSection.section_fields.find(
            (field) => field.key === `description${latestField.key.replace('title', '')}`
          );

          if (latestField && descriptionField) {
            entry = {
              title: latestField.value,
              description: descriptionField.value,
              updatedAt: latestField.updated_at,
              imageUrl: '',
            };
          }

          // Fetch the image data dynamically
          const imageResponse = await getImageCall(`${baseUrl}/api/content/getImages/PIT Stop`);
          if (imageResponse.ok) {
            const imageData = await imageResponse.json();
            if (imageData.success && imageData.data.length > 0) {
              entry.imageUrl = imageData.data[0].url;
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
        <link rel="preload" href={tipEntry?.imageUrl || '/assets/images/dome/default-image.jpg'} as="image" />
      </Head>

      <div
        className="relative w-full max-w-full overflow-hidden h-[750px] sm:h-[600px] md:h-[500px] lg:h-[600px] xl:h-[785px] bg-cover bg-right lg:bg-center px-4 md:px-0"
        style={{
          backgroundImage: tipEntry?.imageUrl
            ? `url(${tipEntry.imageUrl})`
            : `url('https://api.teleiosx.com/public/storage/images/PIT Stop/PIT Stop_image_0.jpg')`,
        }}
      >
        <div className="w-full bg-[#002718] bg-opacity-60 lg:bg-opacity-0 md:bg-opacity-0 xl:bg-opacity-0 px-4">
          <div className="bottom-0 px-4 md:flex md:flex-col md:pr-6 py-[25px] lg:py-[100px] max-w-7xl mx-auto mt-[200px] sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0">
            <div className="px-4 flex flex-col justify-between md:mt-[36px] md:mb-[41px]">
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

              {!loading && !error && tipEntry?.title && tipEntry?.description  && (
                <div className="py-[15px] lg:py-[30px] xl:pt-[70px] lg:mt-[0px]">
                  <h1 className="text-[34px] md:text-[54px] text-[#e3ce90] font-black font-orbitron drop-shadow-4xl">
                    {tipEntry.title}
                  </h1>
                  <p className="md:w-[400px] lg:w-[550px] xl:w-[600px] md:text-[14px] lg:text-[18px] text-[#e3ce90] font-bold font-jura mt-6 text-balance drop-shadow-4xl text-justify">
                    {tipEntry.description}
                  </p>
                </div>
              )}

              <div className="flex items-start m-bottom">
                <div className="py-10">
                  <Link href="/experience" className="button-slanted w-[200px] lg:w-[233px] h-[44px] px-8 py-6 button font-jura font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#002718] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
                    <span className="button-slanted-content">{t('VIEW_OPTIONS')}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DomePit;
