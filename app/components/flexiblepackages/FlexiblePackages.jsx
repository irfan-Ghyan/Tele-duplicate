// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";

// const FlexiblePackages = () => {
//   const router = useRouter();

//   const vipBays = [
//     { duration: "60’", price: "400 SAR" },
//     { duration: "90’", price: "500 SAR" },
//     { duration: "120’", price: "600 SAR" },
//   ];

//   const vipSuite = [
//     { duration: "60’", price: "800 SAR" },
//     { duration: "90’", price: "1000 SAR" },
//     { duration: "120’", price: "1200 SAR" },
//   ];

//   const handleNavigation = () => {
//     router.push("/vip");
//   };

//   const handleNavigation1 = () => {
//     router.push("/lounge");
//   };

//   return (
//     <div className="xl:flex xl:flex-col p-6 mb-40">
//       <h2 className="font-orbitron text-[24px] lg:text-[34px] text-[#c09e5f] font-black mb-4 text-center ">
//         Flexible Packages For Groups
//       </h2>

//       <div className="w-full mt-4 max-w-7xl ">

//         <div className="bg-[#002718] shadow-md rounded-lg p-10 mx-4">
//           <h3 className="text-[18px] lg:text-[24px] text-[#c09e5f] font-black font-orbitron mb-4">
//             VIP Bays at TeleiosX
//           </h3>
//           <div className="xl:grid xl:grid-cols-3 gap-4 text-center ">
//             {vipBays.map((packageItem, index) => (
//               <div
//                 key={index}
//                 onClick={handleNavigation}
//                 className="xl:w-[360px] px-10 py-2 rounded-lg bg-[#e3ce90] text-[#002718] cursor-pointer  mb-4 lg:mb-0 xl:mb-0"
//               >
//                 <p className="text-[18px] lg:text-[24px] text-[#002718] font-black font-orbitron mt-2">{packageItem.duration}</p>
//                 <p className="text-[14px] lg:text-[18px] text-[#002718] font-bold font-jura mt-2">{packageItem.price}</p>
//               </div>
//             ))}
//           </div>
//         </div>


//         <div className="bg-[#002718] shadow-md rounded-lg p-10 mx-4 mt-4">
//           <h3 className="text-[18px] lg:text-[24px] text-[#c09e5f] font-black font-orbitron mb-4">
//             VIP Suite at TeleiosX
//           </h3>
//           <div className=" text-center xl:grid xl:grid-cols-3 gap-4">
//             {vipSuite.map((packageItem, index) => (
//               <div
//                 key={index}
//                 onClick={handleNavigation1}
//                 className="px-10 py-2 rounded-lg bg-[#e3ce90] text-[#002718] cursor-pointer mb-4 lg:mb-0 xl:mb-0"
//               >
//                 <p className="text-[18px] lg:text-[24px] text-[#002718] font-black font-orbitron mt-2">{packageItem.duration}</p>
//                 <p className="text-[14px] lg:text-[18px] text-[#002718] font-bold font-jura mt-2">{packageItem.price}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlexiblePackages;



"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Image from "next/image";

const FlexiblePackages = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const simulatorSessions = [
    { duration: "60’", price: "400 SAR", image: "/assets/images/dome/bg-3.png" },
    { duration: "90’", price: "500 SAR", image: "/assets/images/dome/bg-4.png" },
    { duration: "120’", price: "600 SAR", image: "/assets/images/dome/bg-5.png" },
  ];

  const groupRacing = [
    { duration: "60’", price: "800 SAR", image: "/assets/images/dome/S5.JPG" },
    { duration: "90’", price: "1000 SAR", image: "/assets/images/dome/pic-103.jpg" },
    { duration: "120’", price: "1200 SAR", image: "/assets/images/dome/pic-103.jpg" },
  ];

  const handleClick = () => {
    router.push("/normal");
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center px-6 mt-4 md:mt-20 lg:mt-20 pb-[40px] ${i18n.language === 'ar' ? 'rtl' : ''}`}>
      <div className="xl:flex xl:flex-col w-full max-w-7xl">
        
        <div className=" mb-2">
          <h3 className="text-[18px] md:text-[34px] text-[#c09e5f] text-center font-black font-orbitron">
            {t("simulatorSessions.title")}
          </h3>
          <div className="lg:grid lg:grid-cols-3 gap-4 text-center py-4">
            {simulatorSessions.map((session, index) => (
              <button
                key={index}
                className="p-0 mt-4 bg-[#e3ce90] hover:bg-[#c09e5f] transition duration-300 flex flex-col w-full"
                onClick={handleClick}
              >
                <div className="w-full h-40 md:h-60 lg:h-60 relative">
                  <Image 
                    src={session.image} 
                    alt={`Simulator ${index + 1}`} 
                    layout="fill"
                    objectFit="cover"
                    className=""
                  />
                </div>
             
                <div className="w-full p-4 flex flex-col justify-center items-center h-32 text-center">
                  <p className="text-[24px] lg:text-[34px] font-black font-orbitron text-[#002718]">
                    {t("simulatorSessions.duration", { duration: session.duration })}
                  </p>
                  <p className="text-[18px] lg:text-[18px] text-jura text-[#002718]">
                    {t("simulatorSessions.price", { price: session.price })}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className=" mb-40 lg:my-20 pb-80 md:pb-0 lg:pb-0 xl:pb-0">
          <h3 className="text-[24px] md:text-[34px] text-[#c09e5f] font-black text-center font-orbitron pb-[10px]">
            {t("groupRacing.title")}
          </h3>
          <div className="lg:grid lg:grid-cols-3 gap-4 text-center h-[400px]">
            {groupRacing.map((race, index) => (
              <button
                key={index}
                className="p-0 mt-4 bg-[#e3ce90] hover:bg-[#c09e5f] transition duration-300 flex flex-col w-full"
                onClick={handleClick}
              >
                <div className="w-full h-40 md:h-60 lg:h-60 relative">
                  <Image 
                    src={race.image} 
                    alt={`Group Racing ${index + 1}`} 
                    layout="fill"
                    objectFit="cover"
                    className=""
                  />
                </div>
                <div className="w-full p-4 flex flex-col justify-center items-center h-32 text-center">
                  <p className="text-[24px] lg:text-[34px] font-black font-orbitron text-[#002718]">
                    {t("groupRacing.duration", { duration: race.duration })}
                  </p>
                  <p className="text-[18px] lg:text-[18px] text-jura text-[#002718]">
                    {t("groupRacing.price", { price: race.price })}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FlexiblePackages;
