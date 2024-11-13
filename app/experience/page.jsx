'use client'

// import Event from '../components/event/Event';
import React, { useState, useEffect } from 'react';
import Newsletter from '../components/newsletter/Newsletter';
import RaceExperience from '../components/raceexperience/RaceExperince'
import Coaching from '../components/coaching/Coaching';
import { Helmet } from 'react-helmet-async';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';




const Page = () => {
  
  const { t } = useTranslation();
  const [faqEntries, setFaqEntries] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = "http://192.168.70.211:8000/api/content/sections/Experience";
      const response = await fetch(url);
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
  
        if (data.success) {
          const faqSection = data.data.sections.find((section) => section.title === "Session");
  
          if (faqSection) {
            const faqData = faqSection.section_fields.reduce((acc, field, index, fields) => {
              if (field.key.startsWith("title")) {
                const descriptionField = fields.find((f, i) => i > index && f.key === "description");
                if (descriptionField) {
                  acc.push({
                    title: field.value,
                    description: descriptionField.value,
                    imageUrl: field.imageUrl || "",  // add imageUrl if available
                  });
                }
              }
              return acc;
            }, []);
  
            setFaqEntries(faqData.reverse());
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
    <div className="flex flex-col min-h-screen items-center overflow-x-hidden lg:py-[80px] lg:pb-[100px] lg:pt-[50px]">
        <div className="flex items-center justify-center xl:px-40 lg:px-20 sm:px-4">
        <div className="text-center text-white ">
          <h1 className="font-orbitron text-[34px] lg:text-[54px] text-white font-black mb-4">EXPERIENCES</h1>
        </div>
      </div>
      <div className="w-full max-w-7xl ">
      <div className="flex flex-wrap justify-center my-6 lg:pb-[100px]" >
        {faqEntries.map((experience, index) => (
          <div key={index} className="card-wrapper5 mx-[30px] md:mx-[10px] lg:mx-[20px] xl:ml-[30px]" style={{ minWidth: '360px'}}>
            <RaceExperience
              title={experience.title}
              description={experience.description}
              imageUrl={experience.imageUrl}
              // date={experience.date} 
            />
          </div>
        ))}
      </div>
      </div>
      {/* <div className="w-full max-w-7xl md:px-8">
        <Event />
      </div> */}
      <div className="w-full ">
        <Coaching/>
      </div>
      <div className="w-full max-w-7xl md:px-8">
        <Newsletter />
      </div>

    </div>
    </>
  );
}

export default Page;


