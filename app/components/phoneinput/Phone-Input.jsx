"use client"

import { useState, useEffect } from "react"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

export default function CustomPhoneInput({ value, onChange, name, error }) {
  const [phone, setPhone] = useState(value || "")

  useEffect(() => {
    if (value !== phone) {
      setPhone(value)
    }
  }, [value])

  const handleChange = (value) => {
    setPhone(value)
    onChange({
      target: {
        name: name,
        value: value,
      },
    })
  }

  return (
    <div className="relative">
      <div className="button-slanted mt-[8px] w-full h-[40px] md:h-[61px] lg:h-[61px] flex items-center justify-center font-jura font-bold text-[#063828] bg-[#C09E5F] border border-[#063828] rounded-tl-lg rounded-br-lg overflow-hidden">
        <PhoneInput
          country={"sa"} 
          value={phone}
          onChange={handleChange}
          inputClass="bg-transparent w-full h-full py-3 px-4 text-[#063828] font-jura font-bold focus:outline-none placeholder-[#063828] placeholder-opacity-30"
          buttonClass="bg-transparent border-r border-[#063828]"
          dropdownClass="bg-[#C09E5F] text-[#063828]"
          containerClass="w-full h-full"
          placeholder="+966 241 0002 202"
          specialLabel=""
          inputStyle={{
            backgroundColor: "transparent",
            border: "none",
            width: "100%",
            height: "100%",
          }}
          buttonStyle={{
            backgroundColor: "transparent",
            border: "none",
            borderRight: "1px solid rgba(6, 56, 40, 0.3)",
          }}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

