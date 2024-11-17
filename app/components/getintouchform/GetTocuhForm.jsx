"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { supabase } from "../../../supabase";
import Link from "next/link";
import { useTranslation } from 'react-i18next';

const Form = () => {

  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    submitTime: "",
    submitDate:"",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRadioSelected, setIsRadioSelected] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showRadioError, setShowRadioError] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  // const radioContainerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : prevErrors[name],
    }));

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    // if (!formData.type) newErrors.type = 'Event type is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
  
    if (validateForm() && isCheckboxChecked) {
      console.log("Form data:", formData);

      const currentTimeInUAE = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dubai",
        hour12: false,
      });

      const datePart = currentTimeInUAE.split(", ")[0];
      const timePart = currentTimeInUAE.split(", ")[1]; 

      setFormData((prevData) => ({
        ...prevData,
        submitTime: timePart, 
        submitDate: datePart,

      }));
  
      try {
        const { data, error } = await supabase.from("corprate").insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            submit_time: timePart,
            submit_date: datePart,

          },
        ]);
  
        if (error) {
          throw error;
        }

        const response = await fetch("/api/sendEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        
        
        const result = await response.json();
        console.log(result);
        
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);

  
        // Reset the form
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          submitTime: "",
          submitDate: "",
        });
        setIsRadioSelected(false);
        setHasSubmitted(false);
        setIsCheckboxChecked(false);
      } catch (error) {
        console.error("Error adding data or sending email:", error);
      }
    }
  };
  
  const handleRadioClick = () => {
    setIsRadioSelected((prevState) => !prevState);
  };


  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  return (
    <div className="flex items-center justify-center py-[20px] lg:py-[40px]">
      <div className="w-full max-w-2xl px-4">
        <h2 className="text-[32px] lg:text-[42px] text-[#c09e5f] font-black font-orbitron text-center">
          {t('Get_Touch')}
        </h2>
        <p className="text-center text-[18px] font-bold font-jura text-[#c09e5f] py-2">
          {t('We_Look_Forward')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="lg:flex justify-between ">
            <div className=""> 
              <label
                htmlFor="firstName"
                className="block text-[14px] font-bold font-jura text-[#c09e5f] py-2 "
              >
                {t('FirstName')}
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                id="firstName"
                className="mt-1 p-4 block w-full lg:w-[316px] bg-[#c09e5f] py-[10px] text-[14px] font-bold font-jura placeholder-[#c09e5f] placeholder-opacity-20 focus:outline-none focus:ring-0 focus:bg-[#1a1a2e] focus:text-[#c09e5f]"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">{errors.firstName}</p>
              )}
            </div>
            <div className="xl:ml-[14px]">
              <label
                htmlFor="lastName"
                className="block text-[14px] font-bold font-jura text-[#c09e5f] py-2"
              >
                {t('LastName')}
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                id="lastName"
                className="mt-1 p-4 block w-full lg:w-[316px] bg-[#c09e5f] py-[10px] text-[#c09e5f] text-[14px] font-bold font-jura placeholder-[#c09e5f] placeholder-opacity-20 focus:outline-none focus:ring-0 focus:bg-[#1a1a2e] focus:text-[#c09e5f]"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="lg:flex justify-between">
            <div className="">
              <label
                htmlFor="email"
                className="block text-[14px] font-bold font-jura text-[#c09e5f] py-2"
              >
                {t('Email')}
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                id="email"
                className="mt-1 p-4 block w-full lg:w-[316px] bg-[#c09e5f] py-[10px] text-[#c09e5f] text-[14px] font-bold font-jura placeholder-[#c09e5f] placeholder-opacity-20 focus:outline-none focus:ring-0 focus:bg-[#1a1a2e] focus:text-[#c09e5f]"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
            <div className="xl:ml-[14px]">
              <label
                htmlFor="phone"
                className="block text-[14px] font-bold font-jura text-[#c09e5f] py-2"
              >
                {t('Phone')}
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone"
                id="phone"
                className="mt-1 p-4 block w-full lg:w-[316px] bg-[#c09e5f] py-[10px] text-[#c09e5f] text-[14px] font-bold font-jura placeholder-[#c09e5f] placeholder-opacity-20 focus:outline-none focus:ring-0 focus:bg-[#1a1a2e] focus:text-[#ffffff]"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Radio Button */}
          <div className="lg:flex justify-between">
            <div className="w-full lg:flex justify-between">
              <div className="flex py-4">
                <label className="custom-radio-container">
                  <input
                    type="radio"
                    className="hidden"
                    value="phone"
                    checked={isRadioSelected}
                    onClick={handleRadioClick}
                    onChange={handleCheckboxChange}
                  />
                  <span
                    className={`custom-radio ${isRadioSelected ? "checked" : ""}`}
                  />
                </label>
                <span
                  className={`ml-4 text-[14px] font-medium font-jura mt-1 mr-4 ${isRadioSelected ? "text-[#c09e5f]" : "text-[#8f7648]"}`}
                >
                  {t('Agree')}{" "}
                  <Link href="/terms&conditions" className="underline">
                    {t('TermsConditions')}
                  </Link>
                </span>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className={`button-slanted w-[200px] lg:w-[233px] h-[44px] px-8 py-6 button font-jura font-bold border-[1px] border-[#c09e5f] ${
                    isRadioSelected
                      ? "hover:bg-gradient-to-r hover:from-[#7E51F8] hover:to-[#D007A6] hover:border-0 text-[#c09e5f]"
                      : "border-[#c09e5f] text-gray-300"
                  } ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center`}
                >
                  <span className="button-slanted-content">{t('Submit')}</span>
                </button>
              </div>
            </div>
          </div>

          {showRadioError && (
            <p className="text-red-500 text-xs">
              Please fill all required fields to agree to the terms.
            </p>
          )}
          {isSubmitted && (
            <div className="bg-[#2AC67029] text-[#2AC670] p-4 rounded-lg mt-4 flex">
              <Image
                src="/assets/images/education/success-submit.png"
                alt="alt"
                height={12}
                width={12}
                className="w-[16px] h-[16px] mt-[4px]"
              />
              <p className="ml-[8px]">
                Your form has been successfully submitted!
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;

