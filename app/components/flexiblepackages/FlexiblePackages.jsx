// "use client";

// import React, { Suspense } from "react";
// import { useTranslation } from "react-i18next";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// const FlexiblePackages = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <PackageComponent />
//     </Suspense>
//   );
// };

// const PackageComponent = () => {
//   const { t, i18n } = useTranslation();
//   const router = useRouter();

//   // Session Data
//   const flexiSessions = [
//     { duration: "60’", price: "400 SAR", image: "/assets/images/dome/bg-3.png" },
//     { duration: "90’", price: "500 SAR", image: "/assets/images/dome/bg-4.png" },
//     { duration: "120’", price: "600 SAR", image: "/assets/images/dome/bg-5.png" }
//   ];

//   const groupRacing = [
//     { duration: "60’", price: "800 SAR", image: "/assets/images/dome/S5.JPG" },
//     { duration: "90’", price: "1000 SAR", image: "/assets/images/dome/pic-103.jpg" },
//     { duration: "120’", price: "1200 SAR", image: "/assets/images/dome/pic-103.jpg" }
//   ];

//   const handleClick = () => {
//     router.push("/normal");
//   };

//   return (
//     <div className={`w-full flex flex-col items-center justify-center px-2 mt-4 md:mt-20 lg:mt-20 pt-[40px] pb-[60px] md:pb-0 lg:pb-0 xl:pb-0 ${i18n.language === 'ar' ? 'rtl' : ''}`}>
//       <div className="xl:flex xl:flex-col w-full max-w-7xl">
   
//         <div className="mb-2">
//           <h3 className="text-[18px] md:text-[34px] text-[#c09e5f] text-center font-black font-orbitron">
//             {t("flexiSessions.heading")}
//           </h3>
//           <div className="lg:grid lg:grid-cols-3 gap-4 text-center py-4">
//             {flexiSessions.map((session, index) => (
//               <button
//                 key={index}
//                 className="p-0 mt-4 bg-[#002718] hover:bg-[#134532] transition duration-300 flex flex-col w-full"
//                 onClick={handleClick}
//               >
//                 <div className="w-full h-40 md:h-60 lg:h-60 relative">
//                   <Image 
//                     src={session.image} 
//                     alt={`Simulator ${index + 1}`} 
//                     layout="fill"
//                     objectFit="cover"
//                     className=""
//                   />
//                 </div>
//                 <div className="w-full p-4 flex flex-col justify-center items-center h-32 text-center">
//                   <p className="text-[24px] lg:text-[34px] font-black font-orbitron text-[#e3ce90]">
//                     {t(session.duration)}
//                   </p>
//                   <p className="text-[18px] lg:text-[18px] text-jura text-[#e3ce90]">
//                     {t(session.price)}
//                   </p>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="mb-40 pb-80 md:pb-0 lg:pb-0 xl:pb-0">
//           <h3 className="text-[24px] md:text-[34px] text-[#c09e5f] font-black text-center font-orbitron pb-[10px]">
//             {t("groRacing.title")}
//           </h3>
//           <div className="lg:grid lg:grid-cols-3 gap-4 text-center h-[400px]">
//             {groupRacing.map((race, index) => (
//               <button
//                 key={index}
//                 className="p-0 mt-4 bg-[#002718] hover:bg-[#134532] transition duration-300 flex flex-col w-full"
//                 onClick={handleClick}
//               >
//                 <div className="w-full h-40 md:h-60 lg:h-60 relative">
//                   <Image 
//                     src={race.image} 
//                     alt={`Group Racing ${index + 1}`} 
//                     layout="fill"
//                     objectFit="cover"
//                     className=""
//                   />
//                 </div>
//                 <div className="w-full p-4 flex flex-col justify-center items-center h-32 text-center">
//                   <p className="text-[24px] lg:text-[34px] font-black font-orbitron text-[#e3ce90]">
//                     {t(race.duration)}
//                   </p>
//                   <p className="text-[18px] lg:text-[18px] text-jura text-[#e3ce90]">
//                     {t(race.price)}
//                   </p>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default FlexiblePackages;



"use client";

import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

const FlexiblePackages = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PackageComponent />
    </Suspense>
  );
};

const PackageComponent = () => {
  const { t, i18n } = useTranslation();

  const flexiSessions = [
    { duration: "60’", price: "400 SAR" },
    { duration: "90’", price: "500 SAR" },
    { duration: "120’", price: "600 SAR" },
  ];

  const groupRacing = [
    { duration: "60’", price: "800 SAR" },
    { duration: "90’", price: "1000 SAR" },
    { duration: "120’", price: "1200 SAR" },
  ];

  return (
    <div
      className={`w-full flex flex-col items-center justify-center px-4 mt-4 sm:pt-[40px] md:pt-0 lg:pt-0 pb-[60px] md:pb-0 lg:pb-0 xl:pb-0 ${
        i18n.language === "ar" ? "rtl" : "ltr"
      }`}
    >
      <div className="w-full max-w-7xl mb-4 md:mb-20 lg:mb-40 flex flex-col items-center">
        {/* Flexi Sessions Table */}
        <h3 className="text-[18px] md:text-[34px] text-[#c09e5f] text-center font-black font-orbitron pb-4 sm:mt-4">
          {t("flexiSessions.heading")}
        </h3>
        <div className="overflow-x-auto w-full flex justify-center">
          <table className="w-full border-collapse border border-[#c09e5f] text-center">
            <thead>
              <tr className="bg-[#002718] text-[#e3ce90]">
                <th className="border border-[#c09e5f] px-6 py-4 w-1/2 font-orbitron">
                  Duration
                </th>
                <th className="border border-[#c09e5f] px-6 py-4 w-1/2 font-orbitron">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {flexiSessions.map((session, index) => (
                <tr
                  key={index}
                  className="border border-[#c09e5f] hover:bg-[#134532] transition duration-300"
                >
                  <td className="border border-[#c09e5f] px-6 py-4 font-bold text-[#c09e5f] text-lg font-jura">
                    {session.duration}
                  </td>
                  <td className="border border-[#c09e5f] px-6 py-4 text-[#e3ce90] font-jura">
                    {session.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Group Racing Table */}
        <h3 className="text-[18px] md:text-[34px] text-[#c09e5f] text-center font-black font-orbitron pt-8 pb-4">
          {t("groRacing.title")}
        </h3>
        <div className="overflow-x-auto w-full flex justify-center">
          <table className="w-full border-collapse border border-[#c09e5f] text-center">
            <thead>
              <tr className="bg-[#002718] text-[#e3ce90]">
                <th className="border border-[#c09e5f] px-6 py-4 w-1/2 font-orbitron">
                  Duration
                </th>
                <th className="border border-[#c09e5f] px-6 py-4 w-1/2 font-orbitron">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {groupRacing.map((race, index) => (
                <tr
                  key={index}
                  className="border border-[#c09e5f] hover:bg-[#134532] transition duration-300"
                >
                  <td className="border border-[#c09e5f] px-6 py-4 font-bold text-[#c09e5f] text-lg font-jura">
                    {race.duration}
                  </td>
                  <td className="border border-[#c09e5f] px-6 py-4 text-[#e3ce90] font-jura">
                    {race.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FlexiblePackages;
