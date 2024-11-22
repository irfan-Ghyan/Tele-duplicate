
// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import CalendarPopup from '../calendarpopup/CalendarPopup';
// import StandingsPopup from '../standingspopup/StandingsPopup';
// import RaceResultsPopup from '../raceresultspopup/RaceResultsPopup';
// import Image from 'next/image';
// import whatsapp from '../../../public/assets/images/whatsapp.png';
// import Head from 'next/head';

// const UpcomingEvents = () => {
//   // State to hold dynamic content data
//   const [dynamicContent, setDynamicContent] = useState({
//     title: 'Virtual GP',
//     description: 'Experience the Teleios Dome Virtual Grand Prix, mirroring the 2024 Formula 1 calendar with 24 races. Compete weekly before the real F1 Grand Prix. Earn points for the overall championship. Thursdays at 8pm precede each F1 weekend. Prizes include weekly rewards and a championship pool of 100k AED.',
//     imageUrl: '/assets/images/events/eventbg.jpg',
//   });

//   const [isCalendarPopupOpen, setIsCalendarPopupOpen] = useState(false);
//   const [isStandingsPopupOpen, setIsStandingsPopupOpen] = useState(false);
//   const [isRaceResultsPopupOpen, setIsRaceResultsPopupOpen] = useState(false);

//   // Function to open and close popups
//   const openCalendarPopup = () => setIsCalendarPopupOpen(true);
//   const closeCalendarPopup = () => setIsCalendarPopupOpen(false);

//   const openStandingsPopup = () => setIsStandingsPopupOpen(true);
//   const closeStandingsPopup = () => setIsStandingsPopupOpen(false);

//   const openRaceResultsPopup = () => setIsRaceResultsPopupOpen(true);
//   const closeRaceResultsPopup = () => setIsRaceResultsPopupOpen(false);

 
//   const updateDynamicContent = (newTitle, newDescription, newImageUrl) => {
//     setDynamicContent({
//       title: newTitle,
//       description: newDescription,
//       imageUrl: newImageUrl,
//     });
//   };

//   return (
//     <>
//      <Head>
//       <link rel="preload" href="/assets/images/events/eventbg.jpg" as="image" />
//     </Head>
//     <div className="relative w-full h-[750px] max-w-full overflow-hidden flex justify-center items-center">
//       <div
//         className="absolute flex justify-center items-center w-full h-full bg-black bg-opacity-30 lg:p-10 xl:p-20 sm:p-4"
//         style={{
//           backgroundImage: `url(${dynamicContent.imageUrl})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="flex flex-col items-center md:items-center justify-between h-full max-w-7xl mx-auto md:py-8">
//           <div className="flex flex-col items-center md:items-start justify-between pb-20 md:px-8 md:py-4 ">
//             <div className="w-[340px] md:w-full xl:w-full text-center md:text-left pt-[66px] md:pt-0 lg:pt-0 xl:pt-0">
//               <h2 className="text-[24px] lg:text-[54px] mb-4 text-[#c09e5f] font-black font-orbitron">
//                 {dynamicContent.title}
//               </h2>
//               <p className="text-[14px] lg:text-[18px] mb-4 text-[#c09e5f] font-jura lg:w-[50%]">
//                 {dynamicContent.description}
//               </p>
//             </div>
//             <div className="button-slanted py-4">
//               <Link
//                 href="/"
//                 className="w-[300px] h-[44px] lg:w-[475px] px-8 py-3 bg-opacity-50 button border-[1px] border-[#c09e5f] font-jura font-bold text-[#c09e5f] hover:text-[#002718] hover:bg-gradient-to-r ml-2 hover:from-[#c09e5f] hover:to-[#e3ce90] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0"
//               >
//                 <span className="button-slanted-content">LEARN MORE ABOUT VIRTUAL GP</span>
//               </Link>
//             </div>
//             <div className="w-full flex justify-center flex-wrap md:justify-start xl:justify-start py-8 gap-x-4 ">
//               <div className="button-slanted mt-3 ">
//                 <Link
//                   href="https://feverup.com/m/187813" target="_blank" rel="noopener noreferrer" 
//                   className="w-[160px] lg:w-[233px] h-[48px] xl:h-[48px] px-14 py-3.5 button font-jura font-bold text-[#002718] bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] rounded-tl-lg rounded-br-lg"
//                 >
//                   <span className="button-slanted-content text-[#002718]">BOOK ONLINE</span>
//                 </Link>
//               </div>
//               <div className="mt-4 md:mt-0 lg:mt-0 xl:mt-0 button-slanted ">
//                 <Link
//                   href="HTTPS://wa.me/971566628585"  target="_blank" rel="noopener noreferrer"
//                   className="w-[233px] h-[44px] px-4 py-6 button text-[#c09e5f] font-jura font-bold bg-[#063828] flex items-center justify-center rounded-tl-lg rounded-br-lg"
//                 >
//                   <div></div>
//                   <span className="button-slanted-content md:text-[13px] lg:text-[18px] text-[#c09e5f] font-bold font-jura">
//                     BOOK THROUGH
//                   </span>
  
//                   <Image
//                     src={whatsapp}
//                     alt="WhatsApp"
//                     width={24}
//                     height={20}
//                     className="w-[20px] h-[24px] ml-2"
//                   />
                 
//                 </Link>
//               </div>
//             </div>
//             {/* <div className="w-full flex flex-wrap justify-center md:justify-end xl:justify-end mt-6 mb-20 xl:mt-20 px-8 gap-x-2">
//               <div>
//                 <button
//                   onClick={openRaceResultsPopup}
//                   className="button-slanted w-full md:w-[200px] lg:w-[233px] h-[50px] xl:h-[50px] px-4 lg:px-8 py-3 button border-[1px] border-[#c09e5f]  font-jura font-bold text-[#c09e5f] hover:text-[#002718] hover:bg-gradient-to-r ml-2 hover:from-[#c09e5f] hover:to-[#e3ce90] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0"
//                 >
//                   <span className="button-slanted-content text-[14px] lg:text-[18px] text-[#c09e5f] font-bold font-jura">
//                     RACE RESULTS
//                   </span>
//                 </button>
//               </div>
//               <div>
//                 <button
//                   onClick={openCalendarPopup}
//                   className=" button-slanted w-full md:w-[200px] lg:w-[233px] h-[50px] px-4 lg:px-[40px] py-3 bg-opacity-50 button border-[1px] border-[#c09e5f] font-jura font-bold text-[#c09e5f] hover:text-[#002718] hover:bg-gradient-to-r ml-2 hover:from-[#c09e5f] hover:to-[#e3ce90] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0"
//                 >
//                   <span className="button-slanted-content md:text-[14px] lg:text-[18px] xl:text-[18px] text-[#c09e5f] font-bold font-jura">
//                     CALENDAR
//                   </span>
//                 </button>
//               </div>
//               <div className=" mt-[40px] md:mt-[0px] lg:mt-[0px] xl:mt-[0px]">
//                 <button
//                   onClick={openStandingsPopup}
//                   className="button-slanted w-full md:w-[200px] lg:w-[233px] h-[50px] px-[40px] lg:px-8 py-1 bg-opacity-50 button border-[1px] border-[#c09e5f] font-jura font-bold text-[#c09e5f] hover:text-[#002718] hover:bg-gradient-to-r ml-2 hover:from-[#c09e5f] hover:to-[#e3ce90] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0"
//                 >
//                   <span className="button-slanted-content text-[14px] lg:text-[18px] text-[#c09e5f] font-bold font-jura">
//                     STANDINGS
//                   </span>
//                 </button>
//               </div>
//             </div> */}
//           </div>
//         </div>
//       </div>
//       {isCalendarPopupOpen && <CalendarPopup onClose={closeCalendarPopup} />}
//       {isStandingsPopupOpen && <StandingsPopup onClose={closeStandingsPopup} />}
//       {isRaceResultsPopupOpen && <RaceResultsPopup onClose={closeRaceResultsPopup} />}
//     </div>
//     </>
//   );
// };

// export default UpcomingEvents;



'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import bahrain from '../../../public/assets/images/events/img3.png';

const UpcomingEvents = () => {
  const [dynamicContent, setDynamicContent] = useState({
    title: 'Virtual GP', 
    description: 'Experience the Teleios Dome Virtual Grand Prix, mirroring the 2024 Formula 1 calendar with 24 races. Compete weekly before the real F1 Grand Prix. Earn points for the overall championship. Thursdays at 8pm precede each F1 weekend. Prizes include weekly rewards and a championship pool of 100k AED.', 
  });

  const updateDynamicContent = (newTitle, newDescription) => {
    setDynamicContent({
      title: newTitle,
      description: newDescription,
    });
  };


  return (
    <div className="w-full max-w-full lg:overflow-hidden xl:h-[700px] px-4 bg-cover bg-center flex items-center justify-center mx-auto">
      <div className="inset-0 bg-transparent flex flex-col items-center justify-center md:flex-col md:pr-6">
        <div className="flex flex-col justify-between pt-[20px] py-[30px] items-center">
          <div className="flex flex-col lg:flex-row lg:space-x-8 mb-10 lg:mb-0 w-full max-w-7xl items-center">
            <div className="lg:w-1/2 flex justify-center lg:hidden mb-6">
              <Image
                src={bahrain}
                width={520}
                height={566}
                alt="lounge"
                className="h-[460px] w-[430px] xl:h-[566px] xl:w-[520px]"
              />
            </div>
            <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center md:text-left mb-6 lg:mb-0">
              <h1 className="text-[24px] lg:text-[34px] text-[#c09e5f] font-black font-orbitron">
                {dynamicContent.title}
              </h1>
              <p className="w-[340px] md:w-[550px] xl:w-[600px] md:text-[14px] lg:text-[18px] text-[#c09e5f] font-bold font-jura mt-6">
                {dynamicContent.description}
              </p>
              <div className="py-10">
                <div>
                  <Link
                    href="/explore"
                    className="button-slanted w-[300px] md:w-[475px] h-[44px] px-4 py-6 button font-jura font-boldbuton border-[1px] border-[#c09e5f] hover:bg-gradient-to-r hover:from-[#e3ce90] hover:to-[#c09e5f] text-[#c09e5f] hover:text-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center hover:border-0"
                  >
                    <span className="button-slanted-content md:text-[14px] lg:text-[18px] text-[#c09e5f] hover:text-[#002718] font-bold font-jura">
                      LEARN MORE ABOUT VIRTUAL GP
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center lg:justify-end hidden lg:flex">
              <Image
                src={bahrain}
                width={520}
                height={566}
                alt="lounge"
                className="h-[460px] w-[430px] xl:h-[566px] xl:w-[520px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;




