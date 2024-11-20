'use client'

// import Event from '../components/event/Event';
import React, { useState, useEffect } from 'react';
import Newsletter from '../components/newsletter/Newsletter';
import RaceExperience from '../components/raceexperience/RaceExperince'
import Coaching from '../components/coaching/Coaching';
import { Helmet } from 'react-helmet-async';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';


const Page = () => {
  
  const { t } = useTranslation();
  const [faqEntries, setFaqEntries] = useState([]);
  const [apiData, setApiData] = useState([]);
   const [events, setEvents] = useState([]);


  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const url = "http://192.168.70.211:8000/api/content/sections/Experience";
  //     const response = await fetch(url);
  
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  
  //       if (data.success) {
  //         const faqSection = data.data.sections.find((section) => section.title === "Session");
  
  //         if (faqSection) {
  //           const faqData = faqSection.section_fields.reduce((acc, field, index, fields) => {
  //             if (field.key.startsWith("title")) {
  //               const descriptionField = fields.find((f, i) => i > index && f.key === "description");
  //               if (descriptionField) {
  //                 acc.push({
  //                   title: field.value,
  //                   description: descriptionField.value,
  //                   imageUrl: field.imageUrl || "", 
  //                 });
  //               }
  //             }
  //             return acc;
  //           }, []);
  
  //           setFaqEntries(faqData.reverse());
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const url = "http://192.168.70.211:8000/api/content/sections/Experience";
      const response = await fetch(url);
  
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Ensure data includes id
  
        if (data.success) {
          const faqSection = data.data.sections.find((section) => section.title === "Session");
  
          if (faqSection) {
            const faqData = faqSection.section_fields.map((field) => ({
              id: field.id, // Ensure `id` field exists
              title: field.value,
              description: field.description,
              imageUrl: field.imageUrl || "",
            }));
  
            console.log(faqData); // Check if `id` is populated
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
    <div className="flex flex-col min-h-screen items-center overflow-x-hidden lg:py-[80px] lg:pb-[100px] lg:pt-[50px]">
        <div className="flex items-center justify-center xl:px-40 lg:px-20 sm:px-4">
        <div className="text-center text-[#e3ce90] ">
          <h1 className="font-orbitron text-[34px] lg:text-[54px] text-[#e3ce90] font-black mb-4">EXPERIENCES</h1>
        </div>
      </div>
      <div className="w-full max-w-7xl ">
      <div className="flex justify-center my-6 lg:pb-[100px]" >
        {faqEntries.map((experience, index) => (
          <div key={index} className="card-wrapper5 mx-[30px] md:mx-[10px] lg:mx-[20px] xl:ml-[30px]" style={{ minWidth: '360px'}}>
             <div className="overflow-hidden bg-[#002718] mt-5 xl:mt-20 flex flex-col items-center h-[600px] w-[363px] mx-auto">
      <div className="flex justify-center items-center w-[363px] h-[282px]">
        <Image src="" alt="Product" width={363} height={282} className="w-[363px] h-[282px] object-cover"  priority={true} />
      </div>
      <div className='flex flex-col justify-between items-center mx-[20px] pt-4 flex-1 w-full'>
        <div>
          <h1 className="text-[#c09e5f] text-[18px] font-orbitron font-bold px-8">{experience.title}</h1>
          <p className="text-[#e3ce90] text-[18px] font-jura font-bold py-4 px-8 text-justify">{experience.description}</p>
        </div>
        <div className="pt-[19px] pb-[22px]">
          <Link
            className="button-slanted cursor-pointer w-[280px] lg:w-[310px] h-[44px] font-jura font-normal md:font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#063828] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
            href={`/experience/${experience.id}`}
            target="_blank" 
            rel="noopener noreferrer"
          >
            <span className='button-slanted-content'>{t('BOOK NOW')}</span>
          </Link>
          
        </div>

        <div className="flex justify-center items-center w-[363px] h-[282px]">
        <Image src="" alt="Product" width={363} height={282} className="w-[363px] h-[282px] object-cover"  priority={true} />
      </div>
      
      </div>
            </div>
    
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


