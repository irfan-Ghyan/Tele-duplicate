

// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useTranslation } from 'react-i18next';

// const FaqItem = ({ question, answer, isOpen, onClick }) => {
//   return (
//     <div className="border-b border-[#c09e5f] border-opacity-50 py-4">
//       <div
//         className="flex justify-between items-center cursor-pointer py-6"
//         onClick={onClick}
//       >
//         <h3 className="text-[#c09e5f] text-[24px] md:text-[34px] font-bold font-orbitron">
//           {question}
//         </h3>
//         <button className="w-[18px] h-[2px] font-normal">
//           {isOpen ? '-' : '+'}
//         </button>
//       </div>
//       {isOpen && (
//         <p className="mt-4 text-[#e3ce90] text-[20px] font-bold font-jura">
//           {answer}
//         </p>
//       )}
//     </div>
//   );
// };

// const Faq = () => {
//   const { t } = useTranslation(); 
//   const [faqEntries, setFaqEntries] = useState([]);
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(''); // Error state
//   const [openFaqIndex, setOpenFaqIndex] = useState(null);
//   const [showMore, setShowMore] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true); // Set loading to true before fetching
//     setError(''); // Clear previous errors
//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//       const url = `${baseUrl}/api/content/sections/Home`;
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error('Failed to fetch FAQs from the server.');
//       }

//       const data = await response.json();

//       if (data.success) {
//         const faqSection = data.data.sections.find(
//           (section) => section.title === "FAQ"
//         );
//         const faq = { next: null, data: [] };

//         if (faqSection) {
//           faqSection.section_fields.forEach((field, index, fields) => {
//             if (field.key.startsWith("q")) {
//               const answerField = fields.find(
//                 (f) => f.key === "a" + field.key.slice(1)
//               );
//               if (answerField) {
//                 faq["data"].push({
//                   question: { key: field.key, value: field.value },
//                   answer: { key: answerField.key, value: answerField.value },
//                 });
//               }
//             }
//           });
//         }
//         faq.next = faq.data.length + 1;
//         setFaqEntries(faq.data.reverse());
//       } else {
//         setError('No FAQ data found.');
//       }
//     } catch (err) {
//       setError(err.message || 'An error occurred while fetching FAQs.');
//     } finally {
//       setLoading(false); // Stop loading once fetching is complete
//     }
//   };

//   const toggleFaq = (index) => {
//     setOpenFaqIndex(openFaqIndex === index ? null : index);
//   };

//   const toggleShowMore = () => {
//     setShowMore(!showMore);
//   };

//   return (
//     <div className="w-full px-4 lg:px-[0px] xl:px-[0px] max-w-full overflow-hidden pb-20">
//       <div className="border-solid border-b-[1px] border-[#e3ce90] border-opacity-50 pt-[40px] md:pt-[50px] lg:pt-[100px] text-end">
//         <h1 className="text-[14px] text-[#e3ce90] font-normal font-orbitron pb-4">{t('FAQ')}</h1>
//       </div>
//       <div className="flex justify-between mt-[36px] mb-[41px]">
//         <div>
//           <h1 className="text-[34px] md:text-[54px] text-[#c09e5f] font-black font-orbitron">
//             {t('faq.title')}
//           </h1>
//         </div>
//       </div>

//       {loading && (
//         <div className="text-center">
//           <p className="text-[#c09e5f] text-xl">{t('Loading')}</p>
//         </div>
//       )}
      
//       {error && (
//         <div className="text-center">
//           <p className="text-red-500 text-[20px] font-bold">{error}</p>
//         </div>
//       )}

//       {!loading && !error && (
//         <>
//           <div className="text-[34px] text-[#e3ce90] font-normal font-orbitron py-6">
//             {faqEntries.slice(0, 4).map((faq, index) => (
//               <FaqItem
//                 key={index}
//                 question={faq.question.value}
//                 answer={faq.answer.value}
//                 isOpen={openFaqIndex === index}
//                 onClick={() => toggleFaq(index)}
//               />
//             ))}

//             {showMore &&
//               faqEntries.slice(4).map((faq, index) => (
//                 <FaqItem
//                   key={index + 4}
//                   question={faq.question.value}
//                   answer={faq.answer.value}
//                   isOpen={openFaqIndex === index + 4}
//                   onClick={() => toggleFaq(index + 4)}
//                 />
//               ))}
//           </div>

//           <div className="flex justify-center">
//             <div className='py-8 button-slanted'>
//               <button onClick={toggleShowMore} className="w-[200px] h-[44px] px-8 bg-opacity-50 button border-[1px] border-[#c09e5f] font-jura font-bold text-[#e3ce90] hover:bg-gradient-to-r ml-2 hover:from-[#e3ce90] hover:to-[#c09e5f] hover:text-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
//                 <span className='button-slanted-content text-[18px] md:text-[24px] text-[#c09e5f] font-bold font-jura'>
//                   {showMore ? t('faq.seeLess') : t('faq.seeMore')}
//                 </span>
//               </button>
//             </div>
//           </div>
//         </>
//       )}

//       <div className="text-[34px] text-[#e3ce90] font-normal font-orbitron py-6">
//         <h1 className="text-[34px] md:text-[54px] text-[#c09e5f] font-black font-orbitron">
//           {t('faq.otherQuestions')}
//         </h1>
//         <p className="text-[24px] md:text-[18px] text-[#c09e5f] font-bold font-jura">
//           <Link href="/experience" target="_blank" rel="noopener noreferrer" className='underline'>
//             {t('faq.contactUs')}
//           </Link>{' '}
//           {t('faq.moreInfo')}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Faq;



'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-[#c09e5f] border-opacity-50 py-4">
      <div
        className="flex justify-between items-center cursor-pointer py-6"
        onClick={onClick}
      >
        <h3 className="text-[#c09e5f] text-[24px] md:text-[34px] font-bold font-orbitron">
          {question}
        </h3>
        <button className="w-[18px] h-[2px] font-normal">
          {isOpen ? '-' : '+'}
        </button>
      </div>
      {isOpen && (
        <p className="mt-4 text-[#e3ce90] text-[20px] font-bold font-jura">
          {answer}
        </p>
      )}
    </div>
  );
};

const Faq = () => {
  const { t } = useTranslation(); 
  const [faqEntries, setFaqEntries] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching
    setError(''); // Clear previous errors
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/sections/Home`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch FAQs from the server.');
      }

      const data = await response.json();

      if (data.success) {
        const faqSection = data.data.sections.find(
          (section) => section.title === "FAQ"
        );
        const faq = { next: null, data: [] };

        if (faqSection) {
          faqSection.section_fields.forEach((field, index, fields) => {
            if (field.key.startsWith("q")) {
              const answerField = fields.find(
                (f) => f.key === "a" + field.key.slice(1)
              );
              if (answerField) {
                faq["data"].push({
                  question: { key: field.key, value: field.value },
                  answer: { key: answerField.key, value: answerField.value },
                });
              }
            }
          });
        }
        faq.next = faq.data.length + 1;
        setFaqEntries(faq.data.reverse());
      } else {
        setError('No FAQ data found.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching FAQs.');
    } finally {
      setLoading(false); // Stop loading once fetching is complete
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="w-full px-4 lg:px-[0px] xl:px-[0px] max-w-full overflow-hidden pb-20">
      <div className="border-solid border-b-[1px] border-[#e3ce90] border-opacity-50 pt-[40px] md:pt-[50px] lg:pt-[100px] text-end">
        <h1 className="text-[14px] text-[#e3ce90] font-normal font-orbitron pb-4">{t('FAQ')}</h1>
      </div>
      <div className="flex justify-between mt-[36px] mb-[41px]">
        <div>
          <h1 className="text-[34px] md:text-[54px] text-[#c09e5f] font-black font-orbitron">
            {t('faq.title')}
          </h1>
        </div>
      </div>

      {loading && (
        <div className="text-center">
          <p className="text-[#c09e5f] text-xl">{t('Loading')}</p>
        </div>
      )}
      
      {error && (
        <div className="text-center">
          <p className="text-red-500 text-[20px] font-bold">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="text-[34px] text-[#e3ce90] font-normal font-orbitron py-6">
            {faqEntries.slice(0, 4).map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question.value}
                answer={faq.answer.value}
                isOpen={openFaqIndex === index}
                onClick={() => toggleFaq(index)}
              />
            ))}

            {showMore &&
              faqEntries.slice(4).map((faq, index) => (
                <FaqItem
                  key={index + 4}
                  question={faq.question.value}
                  answer={faq.answer.value}
                  isOpen={openFaqIndex === index + 4}
                  onClick={() => toggleFaq(index + 4)}
                />
              ))}
          </div>

          {/* Conditionally render the "See More" button only if there are more than 4 FAQs */}
          {faqEntries.length > 4 && (
            <div className="flex justify-center">
              <div className='py-8 button-slanted'>
                <button onClick={toggleShowMore} className="w-[200px] h-[44px] px-8 bg-opacity-50 button border-[1px] border-[#c09e5f] font-jura font-bold text-[#e3ce90] hover:bg-gradient-to-r ml-2 hover:from-[#e3ce90] hover:to-[#c09e5f] hover:text-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
                  <span className='button-slanted-content text-[18px] md:text-[24px] text-[#c09e5f] font-bold font-jura'>
                    {showMore ? t('faq.seeLess') : t('faq.seeMore')}
                  </span>
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <div className="text-[34px] text-[#e3ce90] font-normal font-orbitron py-6">
        <h1 className="text-[34px] md:text-[54px] text-[#c09e5f] font-black font-orbitron">
          {t('faq.otherQuestions')}
        </h1>
        <p className="text-[24px] md:text-[18px] text-[#c09e5f] font-bold font-jura">
          <Link href="/experience" target="_blank" rel="noopener noreferrer" className='underline'>
            {t('faq.contactUs')}
          </Link>{' '}
          {t('faq.moreInfo')}
        </p>
      </div>
    </div>
  );
};

export default Faq;
