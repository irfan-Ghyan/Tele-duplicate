// "use client";

// import React from "react";
// import { useTranslation } from "react-i18next";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// const PricingTable = () => {
//   const { t, i18n } = useTranslation();
//   const router = useRouter();

//   const simulatorSessions = [
//     { duration: "20’", price: "95 SAR", image: "/assets/images/dome/bg-3.png" },
//     { duration: "40’", price: "170 SAR", image: "/assets/images/dome/bg-4.png" },
//     { duration: "60’", price: "250 SAR", image: "/assets/images/dome/bg-5.png" },
//   ];

//   const groupRacing = [
//     { duration: "40’", price: "140 SAR", image: "/assets/images/dome/S5.JPG" },
//     { duration: "60’", price: "200 SAR", image: "/assets/images/dome/pic-103.jpg" },
//   ];

//   const handleClick = () => {
//     router.push("/normal");
//   };

//   return (
//     <div className={`flex flex-col items-center justify-center px-2 mb-8 md:mb-0 lg:mb-0 xl:mb-4 py-[40px] ${i18n.language === 'ar' ? 'rtl' : ''}`}>
//       <div className="xl:flex xl:flex-col w-full max-w-7xl">
        
//         <div className="px-2  mb-2">
//           <h3 className="text-[18px] md:text-[34px] text-[#c09e5f] text-center font-black font-orbitron pb-[10px]">
//             {t("simulatorSessions.title")}
//           </h3>
//           <div className=" md:grid md:grid-cols-3 lg:grid lg:grid-cols-3 xl:grid xl:grid-cols-3 gap-4 text-center py-4">
//             {simulatorSessions.map((session, index) => (
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
//                     {t("simulatorSessions.duration", { duration: session.duration })}
//                   </p>
//                   <p className="text-[18px] lg:text-[18px] text-jura text-[#e3ce90]">
//                     {t("simulatorSessions.price", { price: session.price })}
//                   </p>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="px-2 mb-40 lg:my-20">
//           <h3 className="text-[24px] md:text-[34px] text-[#c09e5f] font-black text-center font-orbitron pb-[10px]">
//             {t("groupRacing.title")}
//           </h3>
//           <div className="md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-2 gap-4 text-center h-[400px]">
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
//                     {t("groupRacing.duration", { duration: race.duration })}
//                   </p>
//                   <p className="text-[18px] lg:text-[18px] text-jura text-[#e3ce90]">
//                     {t("groupRacing.price", { price: race.price })}
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

// export default PricingTable;

"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const PricingTable = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const simulatorSessions = [
    { duration: "20’", price: "95 SAR" },
    { duration: "40’", price: "170 SAR" },
    { duration: "60’", price: "250 SAR" },
  ];

  const groupRacing = [
    { duration: "40’", price: "140 SAR" },
    { duration: "60’", price: "200 SAR" },
  ];

  // const handleClick = () => {
  //   router.push("/normal");
  // };

  return (
    <div className={`flex flex-col items-center justify-center px-2 mb-8 py-[40px] ${i18n.language === 'ar' ? 'rtl' : ''}`}>
      <div className="w-full max-w-7xl">
        
        {/* Simulator Sessions Table */}
        <h3 className="text-[18px] md:text-[34px] text-[#c09e5f] text-center font-black font-orbitron pb-4">
          {t("simulatorSessions.title")}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-[#c09e5f] text-center">
            <thead>
              <tr className="bg-[#002718] text-[#e3ce90]">
                <th className="border border-[#c09e5f] font-orbitron px-4 py-4">Duration</th>
                <th className="border border-[#c09e5f] font-orbitron px-4 py-4">Price</th>
          
              </tr>
            </thead>
            <tbody>
              {simulatorSessions.map((session, index) => (
                <tr key={index} className="hover:bg-[#134532] transition duration-300">
                  <td className="border text-[#e3ce90] border-[#c09e5f] font-orbitron  px-4 py-4">{session.duration}</td>
                  <td className="border text-[#e3ce90] border-[#c09e5f] font-orbitron  px-4 py-4">{session.price}</td>
                  {/* <td className="border border-[#c09e5f] px-4 py-2">
                    <button 
                      onClick={handleClick} 
                      className="bg-[#c09e5f] text-[#002718] px-3 py-1 rounded-md hover:bg-[#e3ce90] transition">
                      {t("bookNow")}
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-[18px] md:text-[34px] text-[#c09e5f] text-center font-black font-orbitron pt-8 pb-4">
          {t("groupRacing.title")}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-[#c09e5f] text-center">
            <thead>
              <tr className="bg-[#002718] text-[#e3ce90]">
                <th className="border border-[#c09e5f] px-4 font-orbitron  py-4">Duration</th>
                <th className="border border-[#c09e5f] px-4 font-orbitron  py-4">Price</th>
                {/* <th className="border border-[#c09e5f] px-4 py-2">{t("actions")}</th> */}
              </tr>
            </thead>
            <tbody>
              {groupRacing.map((race, index) => (
                <tr key={index} className="hover:bg-[#134532] transition duration-300">
                  <td className="border text-[#e3ce90] border-[#c09e5f] font-orbitron  px-4 py-4">{race.duration}</td>
                  <td className="border text-[#e3ce90] border-[#c09e5f] font-orbitron   px-4 py-4">{race.price}</td>
                  {/* <td className="border border-[#c09e5f] px-4 py-2">
                    <button 
                      onClick={handleClick} 
                      className="bg-[#c09e5f] text-[#002718] px-3 py-1 rounded-md hover:bg-[#e3ce90] transition">
                      {t("bookNow")}
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default PricingTable;
