'use client';

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { doGetCall, getImageCall } from '@/app/utils/api';

const Executive = () => {
  const { t } = useTranslation();
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
      const url =`${baseUrl}/api/content/sections/Experience`
      const sectionResponse = await doGetCall(url);
      if (!sectionResponse.ok) {
        throw new Error('Failed to fetch section data from the server.');
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
                imageUrl: staticImageUrls[index], 
              };
            });

          setFaqEntries(entries); 
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };


  const getHref = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('20')) {
      return '/normal';
    } else if (lowerTitle.includes('40')) {
      return '/40mints';
    } else if (lowerTitle.includes('60')) {
      return '/60mints';
    }
    return '/normal';
  };
  
  return (
    <>
      <Helmet>
        <title>{t('EXECUTIVE LOUNGE | Step into the Executive Lounge at TeleiosX')}</title>
        <meta
          name={t('description')}
          content={t(
            'Step into the Executive Lounge at TeleiosX , a space designed for those who value privacy, comfort, and sophistication.Located on the first floor of Riyadh’s most dynamic venue, the Executive Lounge is your sanctuary to relax, connect, and elevate every moment.'
          )}
        />
      </Helmet>

      <Head>
        <link rel="preload" href="/assets/images/experience/exbg.png" as="image" />
        <link rel="preload" href="/assets/images/experience/mintue1.jpg" as="image" />
      </Head>

      <div className="flex flex-col items-center overflow-x-hidden lg:py-[80px] lg:pb-[100px] lg:pt-[50px]">
        <div className="flex items-center justify-center xl:px-40 lg:px-20 sm:px-4 ">
          <div className="text-center text-[#e3ce90]">
            <h1 className="font-orbitron text-[34px] lg:text-[54px] text-[#c09e5f] font-black mb-4">
       {t('executive.heading')}
            </h1>
            <p className="text-[#e3ce90] font-jura text-[18px] font-bold lg:px-[40px] xl:px-[65px] text-justify max-w-7xl px-4 sm:px-0">
              {t('executive.paragraph')}
            </p>
          </div>
        </div>

  
      </div>
    </>
  );
};

export default Executive;




