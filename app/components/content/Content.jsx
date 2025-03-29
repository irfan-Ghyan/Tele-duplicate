'use client';

import React, { useState, useEffect, useCallback} from 'react';
import { Helmet } from 'react-helmet-async';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';



const Content = () => {
  const { t } = useTranslation();
  const [faqEntries, setFaqEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const fetchData =  useCallback(async () => {
    setLoading(true);
    setError("");

    try {

      if (typeof window === "undefined") return;
      
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (!baseUrl) throw new Error("API base URL is missing.");

      const sectionResponse = await fetch(`${baseUrl}/api/content/sections/Experience`);
      if (!sectionResponse.ok) { throw new Error(t("Content.Error"));
      }

      const sectionData = await sectionResponse.json();
      let entries = [];

      if (sectionData.success) {
        const domeSection = sectionData.data.sections.find((section) => section.title === "Session");

        if (domeSection && domeSection.section_fields) {
          entries = domeSection.section_fields
            .filter((field) => field.key.startsWith("title"))
            .map((field, index) => {
              const descriptionField = domeSection.section_fields.find(
                (f) => f.key === `description${field.key.replace("title", "")}`
              );

              const staticImageUrls = [
                "/assets/images/experience/session01.png",
                "/assets/images/experience/30mn.png",
                "/assets/images/experience/60mn.png",
                "/assets/images/experience/session2.png",
                "/assets/images/experience/session03.png",
              ];

              return {
                title: field.value,
                description: descriptionField ? descriptionField.value : "",
                imageUrl: staticImageUrls[index] || "/assets/images/static/default.jpg",
              };
            });

          setFaqEntries(entries);
        }
      }
    } catch (err) {
      console.error("Error fetching content:", err);
      setError(err.message || t("Content.Error"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchData();
    }
  }, [fetchData]);
  
  return (
    <>
      <Helmet>
        <title>{t('Content.Title')}</title>
        <meta
          name="description"
          content={t('Content.Description')}
        />
      </Helmet>

      <Head>
        <link rel="preload" href="/assets/images/experience/exbg.png" as="image" />
        <link rel="preload" href="/assets/images/experience/mintue1.jpg" as="image" />
      </Head>

      <div className="flex flex-col items-center overflow-x-hidden  lg:pb-[70px] lg:pt-[80px] py-8 md:py-[80px] lg:py-[80px]">
        <div className="flex items-center justify-center xl:px-40 lg:px-20 sm:px-4 md:flex lg:flex xl:flex xl:justify-center">
          <div className="text-start md:text-center lg:text-center text-[#C09E5F]">
            <h1 className="font-orbitron text-[54px] [#C09E5F] font-black ">
              {t('Content.Sessions')}
            </h1>
            <h1 className="text-[#ffffff] text-[15px] md:text-[18px] lg:text-[18px] text-start md:text-center lg:text-center font-jura font-bold md:w-[601px] lg:w-[601px] leading-[20px] ">
              {t('Content.Description')}
            </h1>
          </div>
        </div>

        <div className="w-full lg:my-8 my-8">
          <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row justify-center gap-[50px] ">
            {loading && <p className="text-[#c09e5f]">{t('Loading ...')}</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading &&
              !error &&
              faqEntries.slice(0, 1).map((experience, index) => (
                <div
                  key={index}
                  className="overflow-hidden bg-[#00352F] border border-[#C09E5F] flex flex-col items-center h-[650px] sm:w-[330px] lg:w-[360px] "
                >
                  <div className="flex justify-center items-center w-full h-[282px] bg-gradient-to-r from-[#c09e5f]-[100%] to-[#e3ce90]-[0%] relative">
                    <Image
                      src={experience.imageUrl}
                      alt={t('Content.Title')}
                      width={300}
                      height={281}
                      className="w-full h-[281px] object-cover"
                      priority={true}
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-[#063828] to-transparent opacity-100"></div> */}
                  </div>
                   {/* <div className="pt-[19px] pb-[22px] block lg:hidden">
                      <Link
                        className="button-slanted cursor-pointer w-[250px] lg:w-[250px] h-[44px] font-jura bg-[#F13936] text-[16px] text-[#ffffff] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
                        href='/normal'
                      >
                        <span className="button-slanted-content">{t('BOOK SESSION')}</span>
                      </Link>
                    </div> */}
                  <div className="flex flex-col justify-between  items-center mx-4 flex-1 w-full">
                    <div className=''>
                      <h1 className="text-[#C09E5F] text-[46px] text-center md:text-start lg:text-start font-orbitron font-bold px-4 ">
                        {experience.title}
                      </h1>
                      <p className="text-[#ffffff] text-[18px] text-center md:text-start lg:text-start font-jura py-2 px-4">
                        {experience.description}
                      </p>
                    </div>
                    <div className="pt-[19px] pb-[22px] ">
                      <Link
                        className="button-slanted cursor-pointer w-[250px] lg:w-[250px] h-[46px] leading-[24px] font-jura  bg-[#F13936] text-[16px] text-[#ffffff] transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
                        href="/booking/race/"
                      >
                        <span className="button-slanted-content">{t('BOOK RACE')}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
      
          {/* </div> */}
          {/* sm:w-[430px] lg:w-[560px */}
          {/* <div className="xl:flex xl:justify-center flex-wrap gap-2 lg:mx-80 "> */}
            {faqEntries.slice(3,4).map((experience, index) => (
              <div
                key={index}
                className="overflow-hidden bg-[#C09E5F] flex flex-col items-center h-[650px] xl:h-[756px] sm:w-[330px] lg:w-[396px] xl:w-[396px] border border-[#C09E5F]"
              >
                <div className="flex justify-center items-center w-full h-[282px] relative">
                  <Image
                    src={experience.imageUrl}
                    alt="Experience Image"
                    width={300}
                    height={281}
                    className="w-full h-[281px] object-cover"
                    priority={true}
                  />
                   {/* <div className="absolute inset-0 bg-gradient-to-t from-[#C09E5F] to-transparent opacity-100"></div> */}
                </div>
                {/* First Button: Visible on Small Screens, Hidden on Large Screens */}
                {/* <div className="pt-[19px] pb-[22px] ">
                      <Link
                        className="button-slanted cursor-pointer w-[250px] lg:w-[250px] h-[46px] leading-[24px] font-jura  bg-[#F13936] text-[16px] text-[#ffffff] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
                        href={index === 0 ? `/vip` : `/lounge`}
                      >
                        <span className="button-slanted-content">{t('BOOK EVENT')}</span>
                      </Link>
                    </div> */}
                <div className="flex flex-col justify-between items-center mx-4 flex-1 w-full">
                  <div className='px-[12px] md:py-8'>
                    <h1 className="text-[#00352F] text-[48px] text-center md:text-start lg:text-start font-orbitron font-bold px-4">
                      {experience.title}
                    </h1>
                    <p className="text-[#00352F] text-[18px] text-center md:text-start lg:text-start font-jura font-bold py-2 px-4">
                      {experience.description}
                    </p>
                  </div>
                  <div className="pt-[19px] pb-[22px] ">
                    <Link
                      className="button-slanted cursor-pointer w-[250px] lg:w-[250px] h-[46px] leading-[24px] font-jura bg-[#F13936] text-[16px] text-[#ffffff]  transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
                      href={index === 0 ? `booking/vip-bays/` : `/booking/vip-suite/`}
                    >
                      <span className="button-slanted-content">{t('BOOK VIP BAY')}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

        {faqEntries.slice(4, 5).map((experience, index) => (
              <div
                key={index}
                className="overflow-hidden bg-[#00352F] border border-[#C09E5F] flex flex-col items-center h-[650px] sm:w-[330px] lg:w-[360px]"
              >
                <div className="flex justify-center items-center w-full h-[282px] relative">
                  <Image
                    src={experience.imageUrl}
                    alt="Experience Image"
                    width={300}
                    height={281}
                    className="w-full h-[281px] object-cover"
                    priority={true}
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-[#063828] to-transparent opacity-100"></div> */}
                </div>
                {/* First Button: Visible on Small Screens, Hidden on Large Screens */}
                {/* <div className="pt-[19px] pb-[22px] block lg:hidden">
                      <Link
                        className="button-slanted cursor-pointer w-[250px] lg:w-[250px] h-[46px] font-jura  bg-[#F13936] text-[16px] text-[#ffffff] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
                        href={index === 0 ? `/vip` : `/lounge`}
                      >
                        <span className="button-slanted-content">{t('BOOK LOUNGE')}</span>
                      </Link>
                    </div> */}
                <div className="flex flex-col justify-between items-center mx-4 flex-1 w-full ">
                  <div>
                    <h1 className="text-[#C09E5F] text-[48px] text-center md:text-start lg:text-start font-orbitron font-bold px-8">
                      {experience.title}
                    </h1>
                    <p className="text-[#FAFAFA] text-[18px]  font-jura font-bold text-start py-2 px-8">
                      {experience.description}
                    </p>
                  </div>
                  <div className="pt-[19px] pb-[22px] ">
                    <Link
                      className="button-slanted cursor-pointer w-[250px] lg:w-[250px] h-[46px] font-jura leading-[24px] bg-[#F13936] text-[16px] text-[#ffffff]  transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
                      href={index === 0 ? `/booking/vip-suite/` : `/booking/vip-suite/`}
                    >
                      <span className="button-slanted-content">{t('BOOK VIP SUITE')}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;


