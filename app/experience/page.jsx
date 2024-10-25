// 'use client'

// // import Event from '../components/event/Event';
// import React from 'react';
// import Newsletter from '../components/newsletter/Newsletter';
// import RaceExperience from '../components/raceexperience/RaceExperince'

// import Coaching from '../components/coaching/Coaching'


// const Page = () => {

//   // const infiniteExperiences = [...experiences, ...experiences, ...experiences]; 
//   // const uniqueExperiences = experiences.slice(0, 6);
//   const uniqueExperiences = [
//     { title: '15 Minutes', description: 'Get to know our racing simulator with a 15-minute introductory session. As a beginner you will  learn the basics and prepare for more challenging experiences.', imageUrl: '/assets/images/mintue1.jpg' },
//     { title: '30 Minutes', description: 'Choose your track, and your car and enjoy 30 minutes of adrenaline. A package ideal for practicing racing and experiencing a full race from start to end', imageUrl: '/assets/images/experience/30mn.png' },
//     { title: '60 Minutes', description: 'Are you a hardcore racer? Never enough adrenaline? Searching for a record-breaking lap time? This package will challenge your stamina and abilities!  ', imageUrl: '/assets/images/experience/60mn.png' },
//     { title: '90 Minutes', description: 'and all inclusive access to the Dome’s cafe for 90 minutes ', imageUrl: '/assets/images/experience/90min.png' },
//     { title: 'Private Venue', description: 'Your comfort and your privacy with up to 19 guests in our Dome, exclusively for you. Access to the VIP room is included and you can book slots of 60 minutes.', imageUrl: '/assets/images/mintue4.png' },
//     { title: 'VIP experience', description: 'Get together with up to four other guests in our private area where you have two dedicated racing simulators and all inclusive access to the Dome’s cafe for 90 minutes', imageUrl: '/assets/images/experience/vip.png' },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen items-center overflow-x-hidden lg:py-[80px] lg:pb-[100px] lg:pt-[50px]">
//         <div className="flex items-center justify-center xl:px-40 lg:px-20 sm:px-4">
//         <div className="text-center text-white ">
//           <h1 className="font-orbitron text-[34px] lg:text-[54px] text-white font-black mb-4">EXPERIENCES</h1>
//         </div>
//       </div>
//       <div className="w-full max-w-7xl ">
//       <div className="flex flex-wrap justify-center my-6 lg:pb-[100px]" >
//         {uniqueExperiences.map((experience, index) => (
//           <div key={index} className="card-wrapper5 mx-[30px] md:mx-[10px] lg:mx-[20px] xl:ml-[30px]" style={{ minWidth: '360px'}}>
//             <RaceExperience
//               title={experience.title}
//               description={experience.description}
//               imageUrl={experience.imageUrl}
//               // date={experience.date} 
//             />
//           </div>
//         ))}
//       </div>
//       </div>
//       {/* <div className="w-full max-w-7xl md:px-8">
//         <Event />
//       </div> */}
//       <div className="w-full ">
//         <Coaching/>
//       </div>
//       <div className="w-full max-w-7xl md:px-8">
//         <Newsletter />
//       </div>

//     </div>
//   );
// }

// export default Page;


// 'use client';

// import React from 'react';
// import { Helmet } from 'react-helmet-async'; // Import Helmet
// import Newsletter from '../components/newsletter/Newsletter';
// import RaceExperience from '../components/raceexperience/RaceExperince';
// import Coaching from '../components/coaching/Coaching';

// const Page = () => {
//   const uniqueExperiences = [
//     { title: '15 Minutes', description: 'Get to know our racing simulator with a 15-minute introductory session. As a beginner you will learn the basics and prepare for more challenging experiences.', imageUrl: '/assets/images/mintue1.jpg' },
//     { title: '30 Minutes', description: 'Choose your track, and your car and enjoy 30 minutes of adrenaline. A package ideal for practicing racing and experiencing a full race from start to end', imageUrl: '/assets/images/experience/30mn.png' },
//     { title: '60 Minutes', description: 'Are you a hardcore racer? Never enough adrenaline? Searching for a record-breaking lap time? This package will challenge your stamina and abilities!', imageUrl: '/assets/images/experience/60mn.png' },
//     { title: '90 Minutes', description: 'And all-inclusive access to the Dome’s cafe for 90 minutes.', imageUrl: '/assets/images/experience/vip1.png' },
//     { title: 'Private Venue', description: 'Your comfort and your privacy with up to 19 guests in our Dome, exclusively for you. Access to the VIP room is included, and you can book slots of 60 minutes.', imageUrl: '/assets/images/experience/mintue5.png' },
//     { title: 'VIP experience', description: 'Get together with up to four other guests in our private area where you have two dedicated racing simulators and all-inclusive access to the Dome’s cafe for 90 minutes.', imageUrl: '/assets/images/experience/vip1.png' },
//   ];

//   return (
//     <>
//       <Helmet>
//         <title>Experiences | Racing simulators and all-inclusive access</title>
//         <meta
//           name="description"
//           content="Explore various racing experiences at Teleios Dome, from beginner sessions to exclusive VIP experiences. Enjoy adrenaline-packed moments tailored to your level of skill."
//         />
//         <meta property="og:title" content="Experiences | Teleios Dome" />
//         <meta
//           property="og:description"
//           content="Join us at Teleios Dome for an array of racing experiences, whether you're a beginner or a hardcore racer, we have the perfect package for you."
//         />
//         <meta property="og:type" content="website" />
//         <meta property="og:image" content="/assets/images/experience/30mn.png" />
//         {/* <link rel="canonical" href="/experience" /> */}
//       </Helmet>

//       <div
//         className="max-w-full flex items-center justify-center xl:px-40 lg:px-20 sm:px-4"
//         style={{
//           backgroundImage: 'url(/public/assets/images/experience/exbg.png)',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//           height: '350px',
//         }}
//       >
//         <div className="text-center text-white">
//           <h1 className="font-orbitron text-[34px] lg:text-[54px] text-white font-black mb-4">
//             EXPERIENCES
//           </h1>
//           <p className="text-white font-jura text-[18px] font-bold px-[8px] lg:px-[40px] xl:px-[80px] text-center text-balance">
//             Experience the thrill of speed at Teleios Dome, offering dynamic group races and exclusive VIP
//             experiences
//             <br />
//             for all levels of enthusiasts. Elevate your skills with personalized 1-1 coaching mastering
//             essential racing strategies and techniques. Prepare for an adrenaline-fueled adventure like no
//             other.
//           </p>
//         </div>
//       </div>

//       <div className="flex flex-col min-h-screen items-center overflow-x-hidden lg:py-[50px] lg:pb-[100px]">

//         <div className="w-full max-w-7xl">
//           <div className="flex flex-wrap justify-center my-6 lg:pb-[100px]">
//             {uniqueExperiences.map((experience, index) => (
//               <div key={index} className="card-wrapper5 mx-[30px] md:mx-[10px] lg:mx-[20px] xl:ml-[30px]" style={{ minWidth: '360px' }}>
//                 <RaceExperience
//                   title={experience.title}
//                   description={experience.description}
//                   imageUrl={experience.imageUrl}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="w-full">
//           <Coaching />
//         </div>
//         <div className="w-full max-w-7xl md:px-8">
//           <Newsletter />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Page;


'use client';

import React from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import Newsletter from '../components/newsletter/Newsletter';
import RaceExperience from '../components/raceexperience/RaceExperince';
import Coaching from '../components/coaching/Coaching';
import PrivateEvents from '../components/privateevents/PrivateEvents'
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const Page = () => {
  const { t } = useTranslation();

  const uniqueExperiences = [
    { title: t('20-Minute Sprint'), description: t('Jump into a quick 20-minute sprint where your goal is to set the fastest lap. Perfect for those looking for a short, intense racing experience.'), imageUrl: '/assets/images/experience/mintue1.jpg' },
    { title: t('40-Minute Session'), description: t('Choose between a sprint for the fastest lap or a qualifying and race session with your friends. A great option for fun and friendly competition.'), imageUrl: '/assets/images/experience/30mn.png' },
    { title: t('60-Minute Session'), description: t('Enjoy the full experience with a 60-minute session. Choose between a sprint for the fastest lap or a full qualifying and race session with your friends for the ultimate racing showdown.'), imageUrl: '/assets/images/experience/60mn.png' },
  ];

  return (
    <>
      <Helmet>
        <title> {t('Experiences | Racing simulators and all-inclusive access')}</title>
        <meta
          name={t('description')}
          content={t("Explore various racing experiences at Teleios Dome, from beginner sessions to exclusive VIP experiences. Enjoy adrenaline-packed moments tailored to your level of skill.")}
        />
        <meta property={t("og:title")} content="Experiences | Teleios Dome" />
        <meta
          property={t("og:description")}
          content={t("Join us at Teleios Dome for an array of racing experiences, whether you're a beginner or a hardcore racer, we have the perfect package for you.")}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/images/experience/30mn.png" />
        {/* <link rel="canonical" href="/experience" /> */}
      </Helmet>

      <Head>
      <link rel="preload" href="/assets/images/experience/exbg.png" as="image" />
        <link rel="preload" href="/assets/images/experience/mintue1.jpg" as="image" />
        <link rel="preload" href="/assets/images/experience/30mn.png" as="image" />
        <link rel="preload" href="/assets/images/experience/60mn.png" as="image" />
      </Head>

      <div
        className="max-w-full flex items-center justify-center xl:px-80 lg:px-20 px-4 bg-[#11072C] bg-opacity-80 lg:bg-opacity-40% "
        style={{
          backgroundImage: 'url(/assets/images/experience/exbg.png)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '450px',
        }}
      >
        <div className="text-center text-whit justify-center xl:px-80 px-2 ">
          <h1 className="font-orbitron text-[34px] lg:text-[54px] text-white font-black mb-4">
          {t('EXPERIENCES')}
          </h1>
          <p className="text-white font-jura text-[18px] font-bold px-[2px] text-justify ">
          {t('Fun_For_Everyone')}
          </p>
        </div>
      </div>

      <div className="flex flex-col min-h-screen items-center overflow-x-hidden ">
        <div className="w-full max-w-7xl">
        <div className="flex flex-wrap justify-center my-6 lg:pb-[100px]">
             {uniqueExperiences.map((experience, index) => (
              <div key={index} className="card-wrapper5 mx-[30px] md:mx-[10px] lg:mx-[20px] xl:ml-[30px]" style={{ minWidth: '360px' }}>
                <RaceExperience
                  title={experience.title}
                  description={experience.description}
                  imageUrl={experience.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <PrivateEvents />
        </div>
        <div className="w-full">
          <Coaching />
        </div>
        {/* <div className="w-full max-w-7xl md:px-8">
          <Newsletter />
        </div> */}
      </div>
    </>
  );
}

export default Page;




