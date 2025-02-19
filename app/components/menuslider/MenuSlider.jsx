// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { useTranslation } from "react-i18next";
// import FoodSlider from "../foodslider/FoodSlider";

// const menuItems = [
//   [1, "Mansaf", "Traditional Jordanian dish with lamb and yogurt sauce.", "20 SAR"],
//   [2, "Kabsa", "Saudi rice dish with meat, spices, and vegetables.", "25 SAR"],
//   [3, "Shawarma", "Grilled meat served with garlic sauce and pita bread.", "15 SAR"],
//   [4, "Baklava", "Sweet pastry filled with nuts and honey.", "10 SAR"],
//   [5, "Hummus", "Creamy chickpea dip served with olive oil and pita.", "12 SAR"],
//   [6, "Falafel", "Deep-fried balls made from ground chickpeas or fava beans.", "8 SAR"],
//   [7, "Tabbouleh", "Lebanese salad with parsley, tomatoes, and bulgur.", "14 SAR"],
//   [8, "Fattoush", "Levantine salad with toasted bread and fresh vegetables.", "14 SAR"],
//   [9, "Kunafa", "Sweet cheese pastry soaked in syrup.", "18 SAR"],
//   [10, "Mandi", "Yemeni dish of spiced rice and meat cooked underground.", "30 SAR"],
// ];

// export default function MenuSlider() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { t} = useTranslation();

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.text(t("Food Menu"), 105, 15, { align: "center" });

//     doc.setFontSize(12);
//     autoTable(doc, {
//       startY: 25,
//       head: [["ID", t("Name"), t("Description"), t("Price")]],
//       body: menuItems,
//       styles: { fontSize: 10 },
//       headStyles: { fillColor: [160, 130, 95] },
//     });

//     doc.save("Food_Menu.pdf");
//   };

//   return (
//     <div className="p-4 sm:p-6 text-white w-full flex flex-col items-center">
    
//       <h2 className="font-orbitron text-[24px] sm:text-[34px] lg:text-[48px] text-[#c09e5f] font-black mb-4 text-center">
//         {t("Mocktails & Specialty Coffee")}
//       </h2>

//       <p className="text-[#e3ce90] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-normal font-jura pb-6 sm:pb-10 text-center">
//         {t("exclusive")}
//       </p>

//       <div className='mb-10 lg:mb-20'>
//           <FoodSlider />
//           </div>

//       <div className="flex gap-4">
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="px-6 py-2 text-[#e3ce90] text-[16px] sm:text-[20px] font-orbitron font-bold border border-[#e3ce90] rounded-lg hover:bg-[#c09e5f] transition"
//         >
//           {t("View Menu")}
//         </button>
//         <button
//           onClick={generatePDF}
//           className="px-6 py-2 text-[#e3ce90] text-[16px] sm:text-[20px] font-orbitron font-bold border border-[#e3ce90] rounded-lg hover:bg-[#c09e5f] transition"
//         >
//           {t("Download Menu PDF")}
//         </button>
//       </div>

//       {menuOpen && (
//         <div className="mt-4 p-4 bg-[#092d22] max-h-60 overflow-y-auto text-sm sm:text-base">
//           <ul className="space-y-2">
//             {menuItems.map(([id, name, description, price]) => (
//               <li key={id} className="p-2 border-b border-[#e3ce90]">
//                 <span className="font-semibold text-[#c09e5f] font-orbitron">
//                   {t(name)}
//                 </span>{" "}
//                 -
//                 <span className="font-jura text-[#e3ce90]">
//                   {t(description)}
//                 </span>{" "}
//                 <span className="text-[#c09e5f] font-orbitron">{price}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useTranslation } from "react-i18next";
import FoodSlider from "../foodslider/FoodSlider";

const menuItems = [
  [1, "Mansaf", "Traditional Jordanian dish with lamb and yogurt sauce.", "20 SAR"],
  [2, "Kabsa", "Saudi rice dish with meat, spices, and vegetables.", "25 SAR"],
  [3, "Shawarma", "Grilled meat served with garlic sauce and pita bread.", "15 SAR"],
  [4, "Baklava", "Sweet pastry filled with nuts and honey.", "10 SAR"],
  [5, "Hummus", "Creamy chickpea dip served with olive oil and pita.", "12 SAR"],
  [6, "Falafel", "Deep-fried balls made from ground chickpeas or fava beans.", "8 SAR"],
  [7, "Tabbouleh", "Lebanese salad with parsley, tomatoes, and bulgur.", "14 SAR"],
  [8, "Fattoush", "Levantine salad with toasted bread and fresh vegetables.", "14 SAR"],
  [9, "Kunafa", "Sweet cheese pastry soaked in syrup.", "18 SAR"],
  [10, "Mandi", "Yemeni dish of spiced rice and meat cooked underground.", "30 SAR"],
];

export default function MenuSlider() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(t("Food Menu"), 105, 15, { align: "center" });

    doc.setFontSize(12);
    autoTable(doc, {
      startY: 25,
      head: [["ID", t("Name"), t("Description"), t("Price")]],
      body: menuItems,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [160, 130, 95] },
    });

    doc.save("Food_Menu.pdf");
  };

  return (
    <div className="p-4 sm:p-6 text-white w-full flex flex-col items-center">
      <h2 className="font-orbitron text-[24px] sm:text-[34px] lg:text-[48px] text-[#c09e5f] font-black mb-4 text-center">
        {t("Mocktails & Specialty Coffee")}
      </h2>

      <p className="text-[#e3ce90] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-normal font-jura pb-6 sm:pb-10 text-center">
        {t("exclusive")}
      </p>

      <div className='mb-10 lg:mb-20'>
          <FoodSlider />
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="px-6 py-2 text-[#e3ce90] text-[16px] sm:text-[20px] font-orbitron font-bold border border-[#e3ce90] rounded-lg hover:bg-[#c09e5f] transition"
        >
          {t("View Menu")}
        </button>
        <button
          onClick={generatePDF}
          className="px-6 py-2 text-[#e3ce90] text-[16px] sm:text-[20px] font-orbitron font-bold border border-[#e3ce90] rounded-lg hover:bg-[#c09e5f] transition"
        >
          {t("Download Menu PDF")}
        </button>
      </div>

      {menuOpen && (
        <div className="mt-4 p-4 bg-[#092d22] w-full max-h-60 overflow-y-auto text-sm sm:text-base">
          <ul className="space-y-2">
            {menuItems.map(([id, name, description, price]) => (
              <li key={id} className="p-2 border-b border-[#e3ce90]">
                <span className="font-semibold text-[#c09e5f] font-orbitron">
                  {t(name)}
                </span>{" "}
                -
                <span className="font-jura text-[#e3ce90]">
                  {t(description)}
                </span>{" "}
                <span className="text-[#c09e5f] font-orbitron">{price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
