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
  const { t } = useTranslation();
  const [faqEntries, setFaqEntries] = useState([]);

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
          const faqSection = data.data.sections.find(
            (section) => section.title === 'Session'
          );
          if (faqSection) {
            const groupedData = faqSection.section_fields.reduce((acc, field) => {
              const match = field.key.match(/(title|description)(\d+)/);
              if (match) {
                const [_, type, index] = match;
                if (!acc[index]) acc[index] = {};
                acc[index][type] = field.value;
              }
              return acc;
            }, {});

            const faqData = Object.values(groupedData).map((item, index) => ({
              ...item,
              id: `${index + 1}`, // Generate a unique ID
            }));

            setFaqEntries(faqData);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {t('Experiences | Racing simulators and all-inclusive access')}
        </title>
        <meta
          name={t('description')}
          content={t(
            'Explore various racing experiences at Teleios Dome, from beginner sessions to exclusive VIP experiences. Enjoy adrenaline-packed moments tailored to your level of skill.'
          )}
        />
      </Helmet>

      <Head>
        <link rel="preload" href="/assets/images/experience/exbg.png" as="image" />
        <link
          rel="preload"
          href="/assets/images/experience/mintue1.jpg"
          as="image"
        />
      </Head>
      <div className="flex flex-col min-h-screen items-center overflow-x-hidden lg:py-[80px] lg:pb-[100px] lg:pt-[50px] ">
        <div className="flex items-center justify-center xl:px-40 lg:px-20 sm:px-4">
          <div className="text-center text-[#e3ce90] ">
            <h1 className="font-orbitron text-[34px] lg:text-[54px] text-[#e3ce90] font-black mb-4">
              SESSIONS
            </h1>
          </div>
        </div>
        <div className="w-full">
        <div className="flex justify-center gap-4 my-6 lg:pb-[100px] mx-80 ">
              {faqEntries.slice(0, 5).map((experience, index) => (
                <div
                  key={index}
                  className="overflow-hidden bg-[#002718] flex flex-col items-center h-[700px] w-[360px] mx-auto "
                >
                  <div className="flex justify-center items-center w-[300px] h-[382px]">
                    <Image
                      src=""
                      alt="Product"
                      width={300}
                      height={282}
                      className="w-[250px] h-[282px] object-cover"
                      priority={true}
                    />
                  </div>
                  <div className="flex flex-col justify-between items-center mx-[20px] pt-4 w-full">
                    <div>
                      <h1 className="text-[#c09e5f] text-[18px] font-orbitron font-bold px-8">
                        {experience.title}
                      </h1>
                      <p className="text-[#e3ce90] text-[18px] font-jura font-bold py-4 px-8">
                        {experience.description}
                      </p>
                    </div>
                    <div className="pt-[19px] pb-[22px]">
                      <Link
                        className="button-slanted cursor-pointer w-[200px] lg:w-[200px] h-[44px] font-jura font-normal md:font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#063828] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
                        href="/normal"
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


        <div className="w-full ">
          <Coaching />
        </div>
        <div className="w-full max-w-7xl md:px-8">
          <Newsletter />
        </div>
      </div>
    </>
  );
};

export default Content;
