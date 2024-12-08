import React, { useRef, useState, useEffect } from 'react';
import RaceExperience from '../../raceexperience/RaceExperince';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const Experience = () => {
  const scrollContainerRef = useRef(null);
  const [experienceEntries, setExperienceEntries] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const { t } = useTranslation();

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
                    imageUrl: field.imageUrl || "",
                  });
                }
              }
              return acc;
            }, []);

            setExperienceEntries(faqData.reverse());
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const scrollToTop = () => {
    scrollContainerRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full relative py-[40px] md:py-[50px] lg:py-[100px]">
      <div className="border-solid border-b-[1px] border-[#e3ce90] border-opacity-50 text-end">
        <h1 className="text-[14px] text-[#e3ce90] font-normal font-orbitron pb-4">{t('SESSION')}</h1>
      </div>
      <div className="md:flex justify-between mt-[36px] md:mb-[41px]">
        <div>
          <h1 className="text-[32px] md:text-[54px] text-[#c09e5f] font-black font-orbitron">
            {t('SESSIONS')}
          </h1>
        </div>
      </div>

      <div
        className="scroll-container flex flex-wrap justify-between overflow-hidden my-66"
        ref={scrollContainerRef}
      >
        {experienceEntries.map((experience, index) => (
          <div
            key={index}
            className="card-wrapper w-full md:w-[280px]"
            style={{ minWidth: '286px', marginRight: '16px' }}
          >
            <RaceExperience
              title={experience.title}
              description={experience.description}
              imageUrl={experience.imageUrl}
              button={t('BOOK NOW')}
              link="#"
            />
          </div>
        ))}

    <div className="card-wrapper5 mx-[30px] md:mx-[10px] lg:mx-[20px] xl:ml-[30px]" style={{ minWidth: '360px'}}>
             <div className="overflow-hidden bg-[#002718] mt-5 xl:mt-20 flex flex-col items-center h-[600px] w-[363px] mx-auto">
      <div className="flex justify-center items-center w-[363px] h-[282px]">
        <Image src="" alt="Product" width={363} height={282} className="w-[363px] h-[282px] object-cover"  priority={true} />
      </div>
      <div className='flex flex-col justify-between items-center mx-[20px] pt-4 flex-1 w-full'>
        <div>
          <h1 className="text-[#c09e5f] text-[18px] font-orbitron font-bold px-8">Private Events</h1>
          <p className="text-[#e3ce90] text-[18px] font-jura font-bold py-4 px-8 text-justify">Whether it's a corporate event, birthday party, or team-building exercise, we offer fully customizable packages tailored to your needs.</p>
        </div>
        <div className="pt-[19px] pb-[22px]">
          <Link
            className="button-slanted cursor-pointer w-[280px] lg:w-[310px] h-[44px] font-jura font-normal md:font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#063828] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
            href='/experiencedetails'
            target="_blank" 
            rel="noopener noreferrer"
          >
            <span className='button-slanted-content'>{t('ENQUIRE NOW')}</span>
          </Link>
          
        </div>
      
      </div>
            </div>
    
          </div>
      </div>

    
      

      {/* Mobile Scroll Button */}
      {showScrollButton && (
        <div className="fixed bottom-6 right-6 md:hidden">
          <button
            onClick={scrollToTop}
            className="bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-600 transition duration-300"
          >
            <Image src="/assets/images/rightarrow.png" alt="scroll to top" width={24} height={24} />
          </button>
        </div>
      )}

      <style jsx>{`
        .scroll-container {
          scroll-snap-type: x mandatory;
        }
        .card-wrapper {
          scroll-snap-align: start;
        }
      `}</style>
    </div>
  );
};

export default Experience;
