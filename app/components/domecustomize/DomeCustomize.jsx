

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { getImageCall } from '@/app/utils/api';

const DomeCustomize = () => {
  const { t } = useTranslation();
  const [simEntry, setLatestEntry] = useState(null);
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
        const domeSection = sectionData.data.sections.find(
          (section) => section.title === 'SIM Configurator'
        );

        if (domeSection && domeSection.section_fields) {
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

          const imageResponse = await getImageCall(`${baseUrl}/api/content/getImages/Gaming Room`);
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
        <link rel="preload" href="/assets/images/dome/customize-1.png" as="image" />
      </Head>
      <div className="w-full max-w-full lg:overflow-hidden lg:h-[700px] bg-cover bg-center px-4 md:px-0">
        <div className="inset-0 bg-transparent flex md:flex-col md:pr-6">
          <div className="flex flex-col justify-between py-[30px]">
            <div className="lg:flex items-center justify-between">
              <div className="order-1 lg:order-2 lg:w-1/2">
                <Image
                  src="/assets/images/dome/customize-1.png"
                  width={520}
                  height={566}
                  alt="customize"
                  className="h-[350px] lg:h-[566px] xl:h-[566px] w-[516px] priority={true}"
                />
              </div>

              {loading && <div className='text-center text-[#e3ce90] font-bold text-xl'>{t('Loading...')}</div>}
              
              {error && <div className="text-red-500">Error: {error}</div>}

              {!loading && !error && simEntry?.title && simEntry?.description &&  (
                <div className="order-1 lg:order-2 lg:w-1/2 px-0 md:px-4 lg:px-4 xl:px-4">
                  <div className="flex flex-col justify-center flex-grow-4">
                    <h1 className="text-[24px] md:text-[38px] text-[#c09e5f] font-black font-orbitron mt-6">{simEntry.title}</h1>
                    <p className="md:w-[400px] lg:w-[550px] xl:w-[600px] md:text-[14px] lg:text-[18px] text-[#c09e5f] font-bold font-jura mt-6 text-justify">{simEntry.description}</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DomeCustomize;

