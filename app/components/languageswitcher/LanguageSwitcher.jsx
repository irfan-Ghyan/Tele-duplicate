"use client";
import { useState } from "react";
import Image from "next/image";

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language is English

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setIsOpen(false); 
  };

  return (
    <div className="relative language-switcher ml-[31px]">
      {/* Globe Icon - Click to Toggle Dropdown */}
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center">
        <Image
          src="/assets/images/dome/globe.png"
          alt="Language Icon"
          width={20}
          height={20}
          className="mr-2 cursor-pointer"
        />
        <span className="font-jura text-[#C09E5F] text-[12px] font-bold">
          {selectedLanguage === "en" ? "EN" : "العربية"}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-8 left-0 bg-white border border-gray-300 shadow-md rounded-md w-24">
          <button
            onClick={() => handleLanguageChange("en")}
            className="w-full px-3 py-2 text-left text-[12px] font-jura hover:bg-gray-100"
          >
            EN
          </button>
          <button
            onClick={() => handleLanguageChange("ar")}
            className="w-full px-3 py-2 text-left text-[12px] font-jura hover:bg-gray-100"
          >
            العربية
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
