// 'use client';
// import React, { useState } from 'react';
// // import useFaqData from '../../components/useFaqData';
// // import useFaqBookingData from '../../components/useFaqBookingData';
// // import useFaqAdditionalData from '../../components/useFaqAdditionalData';

// const FaqItem = ({ question, answer, isOpen, onClick }) => {
//   return (
//     <div className="border-b border-white border-opacity-50 py-4 ">
//       <div
//         className="flex justify-between items-center cursor-pointer py-6"
//         onClick={onClick}
//       >
//         <h3 className="text-white text-[24px] md:text-[34px] font-bold font-orbitron">{question}</h3>
//         <button className="w-[18px] h-[2px] font-normal ">{isOpen ? '-' : '+'}</button>
//       </div>
//       {isOpen && <p className="mt-4 text-white text-[18px] font-bold font-jura">{answer}</p>}
//     </div>
//   );
// };

// const Faq = () => {
//   // const { faqs = [], loading: loadingFaqs } = useFaqData();
//   // const { faqs: bookings = [], loading: loadingBookings } = useFaqBookingData();
//   // const { faqs: additionals = [], loading: loadingAdditionals } = useFaqAdditionalData();
//   const faqs = [
//     { title: 'Do I need prior experience? ', description: 'No experience is necessary! Our simulators are user-friendly, and our staff is always available to assist you, practice makes perfect!' },
//     { title: 'What makes Teleios Dome unique?', description: ' All these features! Professional-grade simulators: Experience the excitement of racing on the same simulators used by pro drivers, with advanced features like triple curved screens, F1-style controls, and authentic racing physics. Diverse racing options: Choose from over 100 tracks and a wide variety of vehicles, from go-karts to F1 cars, to create your perfect race. Competitive racing: Challenge your friends in head-to-head races or compete in our weekly competitions.'},
//     { title: 'Who can use the simulators?', description: 'Anyone aged 7 and above who meets our height requirements (110 cm to 200 cm) can experience the excitement of racing at Teleios Dome.' },
//     { title: 'What is Teleios Dome? ', description: 'Teleios Dome is a state-of-the-art entertainment facility in Dubai Production City, offering an exhilarating racing simulation experience made accessible to all. Our 19 simulators are the same ones professional drivers use for training, delivering unparalleled realism and excitement.' },
//   ];
//   const bookings = [
//     { title: 'How do I book a session?', description: 'Book online through our website or call us directly. We highly recommend booking in advance, especially during peak times.' },
//     { title: 'What types of bookings are available?', description: 'These are the available packages - Practice: 15-minute guided introduction to racing simulation, perfect for beginners. - Racing: 30 minutes experience to practice, qualify, and race against others or your friends. - Endurance: 60 minutes for players that want a longer and more challenging experience, spanning more laps or two different tracks - VIP: An exclusive private room experience with two simulators, food & beverages, coaching, and tech support. - Private venue: the whole Teleios Dome for you and your friends. You can go anywhere, use all the resources available and get refreshments at the café in 90 minute blocks. - 1-1 coaching: Perfect your driving skills, learn all the professional ways of facing every aspect of a race with the support of our mentors.' },
//     { title: 'Can I walk in without a booking? ', description: 'While we sometimes have availability for walk-ins, booking in advance is the best way to guarantee your spot.' },
//     { title: 'Can I cancel my booking? ', description: 'Yes, you can cancel online bookings within 24 hours for a full refund.'},
//     { title: 'Do you offer summer camps ?', description: 'Yes we offer summer camps for kids during half terms they will spend the full day taking part in activities and challenges ' },
//   ];
//   const additionals = [
//     { title: 'Where is Teleios Dome located?', description: 'We are in Dubai Production City, building D65'},
//     { title: 'Do you host birthday parties?', description: 'Yes, we can accommodate parties of up to 100 guests. Please contact us for more details. - we handle all the birthday organisation and customise so its fit for your needs'},
//     { title: 'Do you host Corporate events?', description: 'We host them with particular care to make them unique and effective. Please refer to the relevant section for further details. (put link under relevant section)'},
//     { title: 'Do you serve food and beverages?', description: 'Yes, our cafe offers pastries and non-alcoholic beverages.'},
//     { title: 'Can I buy a Teleios simulator?', description: 'Absolutely! You can explore our simulator options online at www.teleios.ae.' },
//     { title: 'Can we rent the simulators for events?', description: 'Yes you can rent our simulators for your experiential activation events from Teleios global. '},

//   ];

//   const [openIndex, setOpenIndex] = useState(null);


//   const handleClick = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="w-full px-4 lg:px-[0px] xl:px-[0px] max-w-full overflow-hidden">
//       <div className='border-solid border-b-[1px] border-white border-opacity-50 pt-[40px] md:pt-[50px] lg:pt-[100px] text-end'>
//         <h1 className='text-[14px] text-white font-normal font-orbitron pb-4'>{`FAQ'S`}</h1>
//       </div>
//       <div className='flex justify-between mt-[36px] mb-[41px] '>
//         <div>
//           <h1 className='text-[34px] md:text-[54px] text-white font-black font-orbitron '>FREQUENTLY ASKED QUESTIONS</h1>
//         </div>
//       </div>
//       <div className="text-[34px] text-white font-normal font-orbitron py-6">
//         <h1 className='text-[34px] md:text-[54px] text-white font-black font-orbitron '>THE TELEIOS DOME EXPERIENCE</h1>
//         {faqs.map((faq, index) => (
//           <FaqItem
//             key={index}
//             question={faq.title}
//             answer={faq.description}
//             isOpen={openIndex === index}
//             onClick={() => handleClick(index)}
//           />
//         ))}
//       </div>

//       <div className="text-[34px] text-white font-normal font-orbitron py-6">
//         <h1 className='text-[34px] md:text-[54px] text-white font-black font-orbitron '>Booking Your Experience</h1>
//         {bookings.map((booking, index) => (
//           <FaqItem
//             key={index}
//             question={booking.title}
//             answer={booking.description}
//             isOpen={openIndex === index}
//             onClick={() => handleClick(index)}
//           />
//         ))}
//       </div>

//       <div className="text-[34px] text-white font-normal font-orbitron py-6">
//         <h1 className='text-[34px] md:text-[54px] text-white font-black font-orbitron '>Additional Information</h1>
//         {additionals.map((additional, index) => (
//           <FaqItem
//             key={index}
//             question={additional.title}
//             answer={additional.description}
//             isOpen={openIndex === index}
//             onClick={() => handleClick(index)}
//           />
//         ))}
//       </div>
//       <div className="text-[34px] text-white font-normal font-orbitron py-6">
//         <h1 className='text-[34px] md:text-[54px] text-white font-black font-orbitron '>Other Questions?</h1>
//         <p className='text-[24px] md:text-[18px] text-white font-bold font-jura'>Contact us for more information or assistance with your booking. We look forward to welcoming you to Teleios Dome for an unforgettable racing experience!</p>
//       </div>
//     </div>
//   );
// };

// export default Faq;


// 'use client';
// import React, { useState } from 'react';
// import Link from 'next/link';

// const FaqItem = ({ question, answer, isOpen, onClick }) => {
//   return (
//     <div className="border-b border-white border-opacity-50 py-4 ">
//       <div
//         className="flex justify-between items-center cursor-pointer py-6"
//         onClick={onClick}
//       >
//         <h3 className="text-white text-[24px] md:text-[34px] font-bold font-orbitron">{question}</h3>
//         <button className="w-[18px] h-[2px] font-normal ">{isOpen ? '-' : '+'}</button>
//       </div>
//       {isOpen && <p className="mt-4 text-white text-[20px] font-bold font-jura">{answer}</p>}
//     </div>
//   );
// };

// const Faq = () => {
//   const faqs = [
//     { title: 'Do I need prior experience?', description: 'No experience is necessary! Our simulators are user-friendly, and our staff is always available to assist you, practice makes perfect!' },
//     { title: 'What makes Teleios Dome unique?', description: 'All these features! Professional-grade simulators: Experience the excitement of racing on the same simulators used by pro drivers, with advanced features like triple curved screens, F1-style controls, and authentic racing physics.'},
//     { title: 'Who can use the simulators?', description: 'Anyone aged 7 and above who meets our height requirements (110 cm to 200 cm) can experience the excitement of racing at Teleios Dome.' },
//     { title: 'What is Teleios Dome?', description: 'Teleios Dome is a state-of-the-art entertainment facility in Dubai Production City, offering an exhilarating racing simulation experience made accessible to all.' },
//     { title: 'How do I book a session?', description: 'Book online through our website or call us directly. We highly recommend booking in advance, especially during peak times.' },
//   ];
  
//   // const bookings = [
//   //   { title: 'How do I book a session?', description: 'Book online through our website or call us directly. We highly recommend booking in advance, especially during peak times.' },
//   //   { title: 'What types of bookings are available?', description: 'Practice: 15-minute guided introduction to racing simulation, perfect for beginners. Racing: 30 minutes experience to practice, qualify, and race against others or your friends. Endurance: 60 minutes for players that want a longer and more challenging experience.' },
//   //   { title: 'Can I walk in without a booking?', description: 'While we sometimes have availability for walk-ins, booking in advance is the best way to guarantee your spot.' },
//   //   { title: 'Can I cancel my booking?', description: 'Yes, you can cancel online bookings within 24 hours for a full refund.'},
//   // ];
  
//   // const additionals = [
//   //   { title: 'Where is Teleios Dome located?', description: 'We are in Dubai Production City, building D65.'},
//   //   { title: 'Do you host birthday parties?', description: 'Yes, we can accommodate parties of up to 100 guests. Please contact us for more details.'},
//   //   { title: 'Do you host Corporate events?', description: 'We host them with particular care to make them unique and effective.'},
//   //   { title: 'Do you serve food and beverages?', description: 'Yes, our cafe offers pastries and non-alcoholic beverages.'},
//   // ];

//   const [openFaqIndex, setOpenFaqIndex] = useState(null);
//   const [openBookingIndex, setOpenBookingIndex] = useState(null);
//   const [openAdditionalIndex, setOpenAdditionalIndex] = useState(null);

//   const toggleFaq = (index) => {
//     setOpenFaqIndex(openFaqIndex === index ? null : index);
//   };

//   const toggleBooking = (index) => {
//     setOpenBookingIndex(openBookingIndex === index ? null : index);
//   };

//   const toggleAdditional = (index) => {
//     setOpenAdditionalIndex(openAdditionalIndex === index ? null : index);
//   };

//   return (
//     <div className="w-full px-4 lg:px-[0px] xl:px-[0px] max-w-full overflow-hidden pb-20">
//       <div className='border-solid border-b-[1px] border-white border-opacity-50 pt-[40px] md:pt-[50px] lg:pt-[100px] text-end'>
//         <h1 className='text-[14px] text-white font-normal font-orbitron pb-4'>{`FAQ'S`}</h1>
//       </div>
//       <div className='flex justify-between mt-[36px] mb-[41px]'>
//         <div>
//           <h1 className='text-[34px] md:text-[54px] text-white font-black font-orbitron '>FREQUENTLY ASKED QUESTIONS</h1>
//         </div>
//       </div>
      
//       {/* Teleios Dome Experience Section */}
//       <div className="text-[34px] text-white font-normal font-orbitron py-6">
//         {/* <h1 className='text-[34px] md:text-[54px] text-white font-black font-orbitron '>THE TELEIOS DOME EXPERIENCE</h1> */}
//         {faqs.map((faq, index) => (
//           <FaqItem
//             key={index}
//             question={faq.title}
//             answer={faq.description}
//             isOpen={openFaqIndex === index}
//             onClick={() => toggleFaq(index)}
//           />
//         ))}
//       </div>

//       {/* Booking Your Experience Section */}
//       {/* <div className="text-[34px] text-white font-normal font-orbitron py-6">
//         <h1 className='text-[34px] md:text-[54px] text-white font-black font-orbitron '>Booking Your Experience</h1>
//         {bookings.map((booking, index) => (
//           <FaqItem
//             key={index}
//             question={booking.title}
//             answer={booking.description}
//             isOpen={openBookingIndex === index}
//             onClick={() => toggleBooking(index)}
//           />
//         ))}
//       </div> */}

//       {/* Additional Information Section */}
//       {/* <div className="text-[34px] text-white font-normal font-orbitron py-6">
//         <h1 className='text-[34px] md:text-[54px] text-white font-black font-orbitron '>Additional Information</h1>
//         {additionals.map((additional, index) => (
//           <FaqItem
//             key={index}
//             question={additional.title}
//             answer={additional.description}
//             isOpen={openAdditionalIndex === index}
//             onClick={() => toggleAdditional(index)}
//           />
//         ))}
//       </div> */}

//       <div className="text-[34px] text-white font-normal font-orbitron py-6">
//         <h1 className='text-[34px] md:text-[54px] text-white font-black font-orbitron '>Other Questions?</h1>
//         <p className='text-[24px] md:text-[18px] text-white font-bold font-jura'><Link href="/enqiuryform" target="_blank" rel="noopener noreferrer">Contact us</Link> for more information or assistance with your booking. We look forward to welcoming you to Teleios Dome for an unforgettable racing experience!</p>
//       </div>
//     </div>
//   );
// };

// export default Faq;


'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
  
  const faqs = [
    {
      title: 'Do I need prior experience?',
      description:
        'No experience is necessary! Our simulators are user-friendly, and our staff is always available to assist you, practice makes perfect!',
    },
    {
      title: 'What makes Teleios Dome unique?',
      description:
        'All these features! Professional-grade simulators: Experience the excitement of racing on the same simulators used by pro drivers, with advanced features like triple curved screens, F1-style controls, and authentic racing physics.',
    },
    {
      title: 'Who can use the simulators?',
      description:
        'Anyone aged 7 and above who meets our height requirements (110 cm to 200 cm) can experience the excitement of racing at Teleios Dome.',
    },
    {
      title: 'What is Teleios Dome?',
      description:
        'Teleios Dome is a state-of-the-art entertainment facility in Dubai Production City, offering an exhilarating racing simulation experience made accessible to all.',
    },
    {
      title: 'How do I book a session?',
      description:
        'Book online through our website or call us directly. We highly recommend booking in advance, especially during peak times.',
    },
    {
      title: 'Can I walk in without a booking?',
      description:
        'While we sometimes have availability for walk-ins, booking in advance is the best way to guarantee your spot.',
    },
    {
      title: 'Can I cancel my booking?',
      description:
        'Yes, you can cancel online bookings within 24 hours for a full refund.',
    },
    {
      title: 'Do you host birthday parties?',
      description:
        'Yes, we can accommodate parties of up to 100 guests. Please contact us for more details.',
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
        <h1 className="text-[14px] text-white font-normal font-orbitron pb-4">{`FAQ'S`}</h1>
      </div>
      <div className="flex justify-between mt-[36px] mb-[41px]">
        <div>
          <h1 className="text-[34px] md:text-[54px] text-white font-black font-orbitron">
            FREQUENTLY ASKED QUESTIONS
          </h1>
        </div>
      </div>

      {/* Display initial FAQs */}
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

        {/* Show more FAQs when button is clicked */}
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
            <span className='button-slanted-content text-[18px] md:text-[24px] text-white font-bold font-jura'>{showMore ? 'SEE LESS' : 'SEE MORE'}</span>
          </button>
  
        </div>
      </div>

      <div className="text-[34px] text-white font-normal font-orbitron py-6">
        <h1 className="text-[34px] md:text-[54px] text-white font-black font-orbitron">
          Other Questions?
        </h1>
        <p className="text-[24px] md:text-[18px] text-white font-bold font-jura">
          <Link href="https://feverup.com/m/187813" target="_blank" rel="noopener noreferrer" className='underline'>
            Contact us
          </Link>{' '}
          for more information or assistance with your booking. We look forward
          to welcoming you to Teleios Dome for an unforgettable racing
          experience!
        </p>
      </div>
    </div>
  );
};

export default Faq;


