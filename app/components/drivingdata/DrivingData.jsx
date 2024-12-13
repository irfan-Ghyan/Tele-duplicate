
'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';

const DrivingData = () => {
  const { t } = useTranslation();

  const [drivingEntries, setDrivingsEntries] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/sections/Education`;
      const response = await fetch(url);

      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      console.log(data);

      if (data.success) {
        const faqSection = data.data.sections.find((section) => section.title === "Safety Driving");

        if (faqSection) {
          const faqData = faqSection.section_fields.reduce((acc, field, index, fields) => {
            if (field.key.startsWith("title")) {
              const descriptionField = fields.find((f, i) => i > index && f.key === "description");
              if (descriptionField) {
                acc.push({
                  title: field.value,
                  description: descriptionField.value,
                  imageUrl: field.imageUrl || "", // add imageUrl if available
                });
              }
            }
            return acc;
          }, []);

          setDrivingsEntries(faqData.reverse());
        }
      }
    } catch (error) {
      setError("Error fetching data: " + error.message); // Set error message if data fetching fails
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false when the fetch is completed
    }
  };

  const scrollToSection = () => {
    const targetSection = document.getElementById('target-section');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <link rel="preload" href="/assets/images/education/s-bg2.png" as="image" />
      </Head>

      <div className="w-full max-w-full overflow-hidden lg:h-[435px] xl:h-[685px] bg-cover bg-left lg:bg-left xl:bg-center" style={{ backgroundImage: "url('/assets/images/education/s-bg2.png')" }}>
        <div className="w-full px-4">
          <div className="inset-0 flex flex-col md:flex-row md:items-center md:justify-end px-4 md:pr-6 xl:py-[20px] md:px-8 max-w-7xl mx-auto my-10 md:my-0 lg:my-0 xl:my-0">
            <div className="w-full flex flex-col text-end">
              <div className="flex flex-col justify-between px-4 mt-[140px] sm:mt-[140px] md:mt-[0px] lg:mt-[0px] xl:mt-[36px] md:mb-[41px] md:items-end lg:items-end xl:items-end bg-[#11072C] bg-opacity-80 lg:bg-opacity-0 md:bg-opacity-0 xl:bg-opacity-0 p-8">

                {/* Show loading message or spinner */}
                {loading && <div className='text-center text-[#e3ce90] font-bold text-xl'>Loading...</div>}

                {/* Show error message if any error occurs */}
                {error && <div className="text-red-500">{error}</div>}

                {/* Render driving entries if data is available */}
                {!loading && !error && drivingEntries.length > 0 && drivingEntries.map((driving, index) => (
                  <div key={index} className="xl:pb-[30px] xl:pt-[100px] text-left">
                    <h1 className="text-[34px] md:text-[54px] text-[#c09e5f] font-black font-orbitron">{driving.title}</h1>
                    <p className="md:w-[400px] lg:w-[550px] xl:w-[600px] md:text-[14px] lg:text-[18px] text-[#e3ce90] font-black font-jura mt-6 leading-7 text-justify">
                      {driving.description}
                    </p>
                  </div>
                ))}

                {/* Fallback when no entries are found */}
                {!loading && !error && drivingEntries.length === 0 && <div>No driving entries found.</div>}

                <div className="flex justify-center lg:justify-start m-bottom">
                  <div className="pt-4 pb-10">
                    <button onClick={scrollToSection} className="button-slanted text-[#c09e5f] w-[200px] lg:w-[233px] h-[44px] px-8 py-6 button font-jura font-bold border-[1px] border-[#c09e5f] hover:bg-gradient-to-r hover:from-[#c09e5f] hover:to-[#e3ce90] hover:border-0 hover:text-[#002718] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
                      <span className="button-slanted-content">{t('ENQUIRE NOW')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrivingData;
