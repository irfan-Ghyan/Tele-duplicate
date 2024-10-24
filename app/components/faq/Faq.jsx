

// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';

// const FaqItem = ({ question, answer, isOpen, onClick }) => {
//   return (
//     <div className="border-b border-white border-opacity-50 py-4">
//       <div
//         className="flex justify-between items-center cursor-pointer py-6"
//         onClick={onClick}
//       >
//         <h3 className="text-white text-[24px] md:text-[34px] font-bold font-orbitron">
//           {question}
//         </h3>
//         <button className="w-[18px] h-[2px] font-normal">
//           {isOpen ? '-' : '+'}
//         </button>
//       </div>
//       {isOpen && (
//         <p className="mt-4 text-white text-[20px] font-bold font-jura">
//           {answer}
//         </p>
//       )}
//     </div>
//   );
// };

// const Faq = () => {
  
//   const faqs = [
//     {
//       title: 'Do I need prior experience?',
//       description:
//         'No experience is necessary! Our simulators are user-friendly, and our staff is always available to assist you, practice makes perfect!',
//     },
//     {
//       title: 'What makes Teleios Dome unique?',
//       description:
//         'All these features! Professional-grade simulators: Experience the excitement of racing on the same simulators used by pro drivers, with advanced features like triple curved screens, F1-style controls, and authentic racing physics.',
//     },
//     {
//       title: 'Who can use the simulators?',
//       description:
//         'Anyone aged 7 and above who meets our height requirements (110 cm to 200 cm) can experience the excitement of racing at Teleios Dome.',
//     },
//     {
//       title: 'What is Teleios Dome?',
//       description:
//         'Teleios Dome is a state-of-the-art entertainment facility in Dubai Production City, offering an exhilarating racing simulation experience made accessible to all.',
//     },
//     {
//       title: 'How do I book a session?',
//       description:
//         'Book online through our website or call us directly. We highly recommend booking in advance, especially during peak times.',
//     },
//     {
//       title: 'Can I walk in without a booking?',
//       description:
//         'While we sometimes have availability for walk-ins, booking in advance is the best way to guarantee your spot.',
//     },
//     {
//       title: 'Can I cancel my booking?',
//       description:
//         'Yes, you can cancel online bookings within 24 hours for a full refund.',
//     },
//     {
//       title: 'Do you host birthday parties?',
//       description:
//         'Yes, we can accommodate parties of up to 100 guests. Please contact us for more details.',
//     },
//   ];

//   const [openFaqIndex, setOpenFaqIndex] = useState(null);
//   const [showMore, setShowMore] = useState(false);

//   const toggleFaq = (index) => {
//     setOpenFaqIndex(openFaqIndex === index ? null : index);
//   };

//   const toggleShowMore = () => {
//     setShowMore(!showMore);
//   };

//   return (
//     <div className="w-full px-4 lg:px-[0px] xl:px-[0px] max-w-full overflow-hidden pb-20">
//       <div className="border-solid border-b-[1px] border-white border-opacity-50 pt-[40px] md:pt-[50px] lg:pt-[100px] text-end">
//         <h1 className="text-[14px] text-white font-normal font-orbitron pb-4">{`FAQ'S`}</h1>
//       </div>
//       <div className="flex justify-between mt-[36px] mb-[41px]">
//         <div>
//           <h1 className="text-[34px] md:text-[54px] text-white font-black font-orbitron">
//             FREQUENTLY ASKED QUESTIONS
//           </h1>
//         </div>
//       </div>

//       {/* Display initial FAQs */}
//       <div className="text-[34px] text-white font-normal font-orbitron py-6">
//         {faqs.slice(0, 4).map((faq, index) => (
//           <FaqItem
//             key={index}
//             question={faq.title}
//             answer={faq.description}
//             isOpen={openFaqIndex === index}
//             onClick={() => toggleFaq(index)}
//           />
//         ))}

//         {/* Show more FAQs when button is clicked */}
//         {showMore &&
//           faqs.slice(4).map((faq, index) => (
//             <FaqItem
//               key={index + 4}
//               question={faq.title}
//               answer={faq.description}
//               isOpen={openFaqIndex === index + 4}
//               onClick={() => toggleFaq(index + 4)}
//             />
//           ))}

//       </div>
//       <div className="flex justify-center">
//         <div className='py-8 button-slanted'>
//           <button onClick={toggleShowMore} className="w-[200px] h-[44px] px-8 bg-opacity-50 button border-[1px] border-white font-jura font-bold text-white hover:bg-gradient-to-r ml-2 hover:from-[#D007A6] hover:to-[#7E51F8] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
//             <span className='button-slanted-content text-[18px] md:text-[24px] text-white font-bold font-jura'>{showMore ? 'SEE LESS' : 'SEE MORE'}</span>
//           </button>
  
//         </div>
//       </div>

//       <div className="text-[34px] text-white font-normal font-orbitron py-6">
//         <h1 className="text-[34px] md:text-[54px] text-white font-black font-orbitron">
//           Other Questions?
//         </h1>
//         <p className="text-[24px] md:text-[18px] text-white font-bold font-jura">
//           <Link href="https://feverup.com/m/187813" target="_blank" rel="noopener noreferrer" className='underline'>
//             Contact us
//           </Link>{' '}
//           for more information or assistance with your booking. We look forward
//           to welcoming you to Teleios Dome for an unforgettable racing
//           experience!
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Faq;


'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-white border-opacity-50 py-4">
      <div
        className="flex justify-between items-center cursor-pointer py-6"
        onClick={onClick}
      >
        <h3 className="text-white text-[24px] md:text-[34px] font-bold font-orbitron">
          {question}
        </h3>
        <button className="w-[18px] h-[2px] font-normal">
          {isOpen ? '-' : '+'}
        </button>
      </div>
      {isOpen && (
        <p className="mt-4 text-white text-[20px] font-bold font-jura">
          {answer}
        </p>
      )}
    </div>
  );
};

const Faq = () => {
  const { t } = useTranslation(); 

   const faqs = [
    {
      title: t('faq.question1.title'),
      description: t('faq.question1.description'),
    },
    {
      title: t('faq.question2.title'),
      description: t('faq.question2.description'),
    },
    {
      title: t('faq.question3.title'),
      description: t('faq.question3.description'),
    },
    {
      title: t('faq.question4.title'),
      description: t('faq.question4.description'),
    },
    {
      title: t('faq.question5.title'),
      description: t('faq.question5.description'),
    },
    {
      title: t('faq.question6.title'),
      description: t('faq.question6.description'),
    },
    {
      title: t('faq.question7.title'),
      description: t('faq.question7.description'),
    },
    {
      title: t('faq.question8.title'),
      description: t('faq.question8.description'),
    },
    
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="w-full px-4 lg:px-[0px] xl:px-[0px] max-w-full overflow-hidden pb-20">
      <div className="border-solid border-b-[1px] border-white border-opacity-50 pt-[40px] md:pt-[50px] lg:pt-[100px] text-end">
        <h1 className="text-[14px] text-white font-normal font-orbitron pb-4">{t(`FAQ'S`)}</h1>
      </div>
      <div className="flex justify-between mt-[36px] mb-[41px]">
        <div>
          <h1 className="text-[34px] md:text-[54px] text-white font-black font-orbitron">
            {t('faq.title')}
          </h1>
        </div>
      </div>

      <div className="text-[34px] text-white font-normal font-orbitron py-6">
        {faqs.slice(0, 4).map((faq, index) => (
          <FaqItem
            key={index}
            question={faq.title}
            answer={faq.description}
            isOpen={openFaqIndex === index}
            onClick={() => toggleFaq(index)}
          />
        ))}

        {showMore &&
          faqs.slice(4).map((faq, index) => (
            <FaqItem
              key={index + 4}
              question={faq.title}
              answer={faq.description}
              isOpen={openFaqIndex === index + 4}
              onClick={() => toggleFaq(index + 4)}
            />
          ))}
      </div>

      <div className="flex justify-center">
        <div className='py-8 button-slanted'>
          <button onClick={toggleShowMore} className="w-[200px] h-[44px] px-8 bg-opacity-50 button border-[1px] border-white font-jura font-bold text-white hover:bg-gradient-to-r ml-2 hover:from-[#D007A6] hover:to-[#7E51F8] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
            <span className='button-slanted-content text-[18px] md:text-[24px] text-white font-bold font-jura'>{showMore ? t('faq.seeLess') : t('faq.seeMore')}</span>
          </button>
        </div>
      </div>

      <div className="text-[34px] text-white font-normal font-orbitron py-6">
        <h1 className="text-[34px] md:text-[54px] text-white font-black font-orbitron">
          {t('faq.otherQuestions')}
        </h1>
        <p className="text-[24px] md:text-[18px] text-white font-bold font-jura">
          <Link href="https://feverup.com/m/187813" target="_blank" rel="noopener noreferrer" className='underline'>
            {t('faq.contactUs')}
          </Link>{' '}
          {t('faq.moreInfo')}
        </p>
      </div>
    </div>
  );
};

export default Faq;
