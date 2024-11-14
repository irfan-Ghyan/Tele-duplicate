'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const WhyteleiosData = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation(); // Translation hook
  const [whyEntries, setWhysEntries] = useState([]);
  
  const domes = [
    { imageUrl: '/assets/images/education/edu1.png' },
    { imageUrl: '/assets/images/education/edu2.png' },
    { imageUrl: '/assets/images/education/edu3.png' },
  ];

  useEffect(() => {
    if (domes.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % domes.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [domes]);

  const scrollToSection = () => {
    const targetSection = document.getElementById('target-section');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = "http://192.168.70.211:8000/api/content/sections/Education";
      const response = await fetch(url);
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
  
        if (data.success) {
          const faqSection = data.data.sections.find((section) => section.title === "Why Teleios");
  
          if (faqSection) {
            const faqData = faqSection.section_fields.reduce((acc, field, index, fields) => {
              if (field.key.startsWith("title")) {
                const descriptionField = fields.find((f, i) => i > index && f.key === "description");
                if (descriptionField) {
                  acc.push({
                    title: field.value,
                    description: descriptionField.value,
                    imageUrl: field.imageUrl || "", 
                  });
                }
              }
              return acc;
            }, []);
  
            setWhysEntries(faqData.reverse());
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Head>
        <link rel="preload" href="/assets/images/education/edu1.png" as="image" />
        <link rel="preload" href="/assets/images/education/edu2.png" as="image" />
        <link rel="preload" href="/assets/images/education/edu3.png" as="image" />
      </Head>
      <div className="max-w-7xl px-4 md:px-8 mx-auto">
        <div className="inset-0 px-4 md:pr-6 py-[34px] md:py-[100px]">
          <h1 className="text-[24px] md:text-[54px] text-[#c09e5f] font-black text-center font-orbitron">
            {t('DISCOVER_TELEIOS')}
          </h1>

          <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start">
            <div className="order-2 lg:order-1 flex flex-col lg:items-start lg:text-left w-full lg:w-1/2 lg:pr-8 lg:py-0">
            {whyEntries.map((why, index) => (
              <div key={why.index} className="py-[40px]">
                <h2 className="text-[23px] text-[#c09e5f] font-bold font-orbitron">
                  {why.title}
                </h2>
                <p className="w-full xl:w-[600px] md:text-[14px] lg:text-[18px] text-[#e3ce90] font-bold font-jura py-6 pr-6 leading-18 text-justify">
                  {why.description}
                </p>
                <div className="pt-4 pb-10">
                    <button onClick={scrollToSection} className="button-slanted text-[#c09e5f] w-[200px] lg:w-[233px] h-[44px] px-8 py-6 button font-jura font-bold border-[1px] border-[#c09e5f] hover:bg-gradient-to-r hover:from-[#c09e5f] hover:to-[#e3ce90] hover:border-0 hover:text-[#002718] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
                      <span className="button-slanted-content">{t('ENQUIRE NOW')}</span>
                    </button>
                  </div>
              </div>
            ))}
            </div>
            <div className="order-1 lg:order-2 w-full lg:w-1/2 flex justify-center lg:justify-end lg:py-0 overflow-hidden relative">
              {domes.length > 0 && (
                <Image
                  src={domes[currentIndex].imageUrl}
                  width={520}
                  height={566}
                  alt=""
                  className="w-full lg:w-auto lg:max-w-sm xl:max-w-md h-auto transition-opacity duration-1000 ease-in-out mt-[40px]"
                  priority={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyteleiosData;
