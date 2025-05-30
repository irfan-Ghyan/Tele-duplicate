'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const Coaching = () => {
  const { t } = useTranslation();
  const [training, setTraining] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${baseUrl}/api/content/sections/Experience`);
        const result = await response.json();

        if (result.success) {
          const section = result.data.sections.find(
            (section) => section.title === 'Private Events'
          );

          if (section) {
            const bgImageField = section.section_fields.find(field => field.key === 'backgroundImage');
            const bgImageUrl = bgImageField ? `${baseUrl}${bgImageField.value}` : null;

            setBackgroundImage(bgImageUrl || '/assets/images/experience/S8.png'); 
            const titleField = section.section_fields.find(field => field.key === 'title');
            const descriptionField = section.section_fields.find(field => field.key === 'description');

            setTraining({
              title: titleField ? titleField.value : '',
              description: descriptionField ? descriptionField.value : '',
            });
          }
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data.');
        setBackgroundImage('/assets/images/experience/S8.png');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <link rel="preload" href="/assets/images/experience/S8.png" as="image" />
      </Head>

      <div
        className="w-full max-w-full overflow-hidden lg:h-[750px] xl:h-[850px] bg-cover bg-right px-4 sm:px-0 md:px-0 lg:px-0 xl:px-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="w-full bg-[#002718] bg-opacity-80 xl:bg-opacity-0 px-4">
          <div className="inset-0 flex flex-col md:flex-row md:items-center md:justify-end px-4 md:pr-6 py-[20px] mt-[240px] sm:mt-[0px] md:mt-[0px] lg:mt-[0px] xl:mt-[0px] sm:pt-[100px] md:pt-[100px] lg:py-[100px] md:px-8 max-w-7xl mx-auto ">
            <div className="w-full flex flex-col">
              <div className="border-solid border-b-[1px] border-[#e3ce90] border-opacity-20 text-end">
                <h1 className="text-[14px] text-[#e3ce90] font-normal font-orbitron pb-4 mt-10 md:mt-0">
                  {t('PRIVATE EVENTS')}
                </h1>
              </div>
              <div className="flex flex-col justify-between md:mt-[36px] md:mb-[41px] ">
                {training && (
                  <div className="py-[30px]">
                    <h1 className="text-[34px] md:text-[54px] text-[#e3ce90] font-black font-orbitron">
                      {t('training.title')}
                    </h1>
                    <p className="md:w-[400px] lg:w-[550px] xl:w-[600px] md:text-[14px] lg:text-[18px] text-[#e3ce90] font-black font-jura mt-6 leading-7 text-justify">
                      {t('training.description')}
                    </p>
                  </div>
                )}
                <div className="flex justify-center lg:justify-start m-bottom">
                  <div className="pt-4 pb-10">
                    <Link
                      href="https://api.whatsapp.com/send/?phone=966552249297&text&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-slanted w-[200px] lg:w-[233px] h-[44px] text-[#e3ce90] px-8 py-6 button font-jura font-bold border-[1px] border-[#e3ce90] hover:bg-gradient-to-r hover:from-[#c09e5f] hover:to-[#e3ce90] hover:border-0 hover:text-[#002718] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center"
                    >
                      <span className="button-slanted-content">{t('ENQUIRE NOW')}</span>
                    </Link>
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

export default Coaching;




