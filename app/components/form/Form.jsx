
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { supabase } from '../../../supabase';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    phone: '',
    email: '',
    type: '',
    hearAboutUs: '',
    message: '',
  });

  const { t } = useTranslation();

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRadioSelected, setIsRadioSelected] = useState(false);
  const [showRadioError, setShowRadioError] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false); 

  
  const handleChange = (e) => {
    const { name, value } = e.target;

  
    // Clear the error for the field as the user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? '' : prevErrors[name], 
    }));
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    // if (!formData.type) newErrors.type = 'Trip type is required';
    // if (!formData.hearAboutUs) newErrors.hearAboutUs = 'This field is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!validateForm() && isCheckboxChecked ) {
      return; // If form validation fails, do nothing
    }
   

    if (!isRadioSelected) {
      setShowRadioError(true); // Show error if radio button is not selected
      return;
    }

    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            company_name: formData.companyName,
            phone: formData.phone,
            email: formData.email,
            trip_type: formData.type,
            hear_about_us: formData.hearAboutUs,
            message: formData.message,
          },
        ]);

      if (error) {
        throw error;
      }

      console.log('Data:', data);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);

      // Reset the form after submission
      setFormData({
        firstName: '',
        lastName: '',
        companyName: '',
        phone: '',
        email: '',
        type: '',
        hearAboutUs: '',
        message: '',
      });
      setIsRadioSelected(false); // Uncheck the radio after submission
        setHasSubmitted(false); // Reset the form submission state
        setIsCheckboxChecked(false);
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };



  const handleSubmitClick = () => {
    if (validateForm()) {
  
      setShowRadioError(false);
    } else {
      setShowRadioError(true);
    }
  };
  
  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };


  const handleRadioClick = () => {
    setIsRadioSelected((prevState) => !prevState);
  };

  return (
    <div id="target-section" className="flex items-center justify-center py-[20px] lg:py-[40px] xl:py-[80px]">
      <div className="w-full max-w-2xl px-4">
        <h2 className="text-[32px] lg:text-[42px] text-[#c09e5f] font-black font-orbitron">
          {t('Get_In_Touch')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 py-10 ">
        <div className="xl:flex justify-between">
            <div className=''>
              <label
                htmlFor="firstName"
                className="block text-[14px] font-bold font-jura text-[#c09e5f] py-2 placeholder-white placeholder-opacity-20 "
              >
                 {t('FirstName')}
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                id="firstName"
                className="mt-1 p-4 block w-full xl:w-[316px] bg-[#002718] text-[#c09e5f] py-[10px] text-[14px] font-bold font-jura placeholder-white placeholder-opacity-20 focus:outline-none focus:ring-0 focus:bg-[#1a1a2e] focus:text-[#ffffff]"
                value={formData.firstName}
                onChange={handleChange}
               
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">{errors.firstName}</p>
              )}
            </div>
            <div className="">
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
                className="mt-1 p-4 block w-full xl:w-[316px] bg-[#002718] py-[10px] text-[#c09e5f] text-[14px] font-bold font-jura placeholder-white placeholder-opacity-20 focus:outline-none focus:ring-0 focus:bg-[#1a1a2e] focus:text-[#ffffff]"
                value={formData.lastName}
                onChange={handleChange}
               
                
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="xl:flex justify-between">
            <div className=''>
              <label
                htmlFor="companyName"
                className="block text-[14px] font-bold font-jura text-[#c09e5f] py-2"
              >
               {t('CompanyName')}
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Enter your company name"
                id="companyName"
                className="mt-1 p-4 block w-full xl:w-[316px] bg-[#002718] py-[10px] text-[#c09e5f] text-[14px] font-bold font-jura placeholder-white placeholder-opacity-20 focus:outline-none focus:ring-0 focus:bg-[#1a1a2e] focus:text-[#ffffff]"
                value={formData.companyName}
                onChange={handleChange}
             
               
              />
              {errors.companyName && (
                <p className="text-red-500 text-xs">{errors.companyName}</p>
              )}
            </div>
            <div className="">
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
                className="mt-1 p-4 block w-full xl:w-[316px] bg-[#002718] py-[10px] text-[#c09e5f] text-[14px] font-bold font-jura placeholder-white placeholder-opacity-20 focus:outline-none focus:ring-0 focus:bg-[#1a1a2e] focus:text-[#ffffff]"
                value={formData.phone}
                onChange={handleChange}
              
                
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="xl:flex justify-between">
            <div className=''>
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
                className="mt-1 p-4 block w-full xl:w-[316px] bg-[#002718] py-[10px] text-[#c09e5f] text-[14px] font-bold font-jura placeholder-white placeholder-opacity-20 focus:outline-none focus:ring-0 focus:bg-[#1a1a2e] focus:text-[#ffffff]"
                value={formData.email}
                onChange={handleChange}
            
                
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
            <div className="">
              <label
                htmlFor="type"
                className="block text-[14px] font-bold font-jura text-[#c09e5f] py-2"
              >
                {t('TripType')}
              </label>
              <select
                name="type"
                id="type"
                className="mt-1 p-4 block w-full xl:w-[316px] bg-[#002718] py-[10px] text-[14px] font-bold text-[#c09e5f]font-jura placeholder-white placeholder-opacity-20 focus:outline-none focus:ring-0 focus:bg-[#1a1a2e] focus:text-[#ffffff]"
                value={formData.type}
                onChange={handleChange}
               
              >
                <option
                  value=""
                  className="text-[14px] font-bold w-full xl:w-[316px] font-jura text-[#c09e5f] placeholder-white"
                >
                  {t('SelectType')}
                </option>
                <option
                  value="Type 1"
                  className="text-[14px] w-full lg:w-[316px] font-bold font-jura text-[#c09e5f] placeholder-white"
                >
                  Factory Tour/Sim Experience
                </option>
                <option
                  value="Type 2"
                  className="text-[14px] w-full lg:w-[316px] font-bold font-jura text-[#c09e5f] placeholder-white"
                >
                  Teleios Dome Racing Academy (4days)
                </option>
                <option
                  value="Type 3"
                  className="text-[14px] w-full lg:w-[316px] font-bold font-jura text-[#c09e5f] placeholder-white"
                >
                  Driver Coaching
                </option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-xs">{errors.type}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="hearAboutUs"
              className="block text-[14px] w-full font-bold font-jura text-[#c09e5f] placeholder-white py-2"
            >
             {t('HearAboutUs')}
            </label>
            <select
              name="hearAboutUs"
              id="hearAboutUs"
              className="mt-1 p-4 block w-full xl:w-[642px] bg-[#002718] text-[#c09e5f] py-[10px] focus:outline-none focus:ring-0 focus:bg-[#1a1a2e] focus:text-[#ffffff]"
              value={formData.hearAboutUs}
              onChange={handleChange}
              
            >
              <option
                value=""
                className="text-[14px]  font-bold font-jura text-[#c09e5f] w-full xl:w-[316px] placeholder-white "
              >
                {t('SelectOption')}
              </option>
              <option
                value="Option 2"
                className="text-[14px] w-full lg:w-[316px] font-bold font-jura text-[#c09e5f] placeholder-white"
              >
                Google Search
              </option>
              <option
                value="Option 1"
                className="text-[14px] w-full lg:w-[316px] font-bold font-jura text-[#c09e5f] placeholder-white"
              >
                Social Media (Instagram, TikTok, Facebook, etc.)
              </option>
              <option
                value="Option 2"
                className="text-[14px] w-full lg:w-[316px] font-bold font-jura text-[#c09e5f] placeholder-white"
              >
                Online Advertisement
              </option>
              <option
                value="Option 2"
                className="text-[14px] w-full lg:w-[316px] font-bold font-jura text-[#c09e5f] placeholder-white"
              >
                Word of Mouth
              </option>
              <option
                value="Option 3"
                className="text-[14px] w-full lg:w-[316px] font-bold font-jura text-[#c09e5f] placeholder-white"
              >
               Friend or Colleague
              </option>
              <option
                value="Option 3"
                className="text-[14px] w-full lg:w-[316px] font-bold font-jura text-[#c09e5f] placeholder-white"
              >
              Event or Conference
              </option>
              <option
                value="Option 3"
                className="text-[14px] w-full lg:w-[316px] font-bold font-jura text-[#c09e5f] placeholder-white"
              >
              News Article or Blog
              </option>
              <option
                value="Option 3"
                className="text-[14px] w-full lg:w-[316px] font-bold font-jura text-[#c09e5f] placeholder-white"
              >
              YouTube Video
              </option>
              <option
                value="Option 3"
                className="text-[14px] w-full lg:w-[316px] font-bold font-jura text-[#c09e5f] placeholder-white"
              >
              Other
              </option>
            </select>
            {errors.hearAboutUs && (
              <p className="text-red-500 text-xs">{errors.hearAboutUs}</p>
            )}
            
          </div>

          <div>
            <label
              htmlFor="message"
              className="block w-full text-[14px] font-bold font-jura text-[#c09e5f] py-2"
            >
              {t('AdditionalInformation')}
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="Select event type"
              rows="4"
              className="mt-1 p-4 block w-full xl:w-[642px] bg-[#002718] py-[10px] text-[14px] font-bold font-jura text-[#c09e5f] placeholder-white placeholder-opacity-20 focus:outline-none focus:ring-0 focus:bg-[#1a1a2e] focus:text-[#ffffff]"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          
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
            <span className={`custom-radio ${isRadioSelected ? 'checked' : ''}`} />
          </label>
          <span className={`ml-4 text-[14px] font-medium font-jura mt-1 mr-4 ${isRadioSelected ? 'text-[#c09e5f]' : 'text-[#c09e5f]'}`}>
          {t('Agree')}{' '}
            <Link href="/terms&conditions" className="underline">{t('TermsConditions')}</Link>
          </span>
        </div>

        <div className="mt-4">
        <button
  type="submit"
  className={`button-slanted w-[200px] lg:w-[233px] h-[44px] px-8 py-6 button font-jura font-bold border-[1px] border-[#c09e5f] ${
    isRadioSelected ? 'hover:bg-gradient-to-r hover:from-[#e3ce90] hover:to-[#c09e5f] hover:border-0 text-[#c09e5f]' : 'border-[#c09e5f] text-[#c09e5f]'
  } ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center`}
>
  <span className="button-slanted-content" onClick={handleSubmitClick}>{t('Submit')}</span>
</button>

        </div>
      </div>
    </div>
{/* 
    {showRadioError && (
      <p className="text-red-500 text-xs">Please fill all required fields to agree to the terms.</p>
    )} */}
    {isSubmitted && (
      <div className="bg-[#2AC67029] text-[#2AC670] p-4 rounded-lg mt-4 flex">
        <Image
          src="/assets/images/education/success-submit.png"
          alt="alt"
          height={12}
          width={12}
          className="w-[16px] h-[16px] mt-[4px]"
          priority={true}
        />
        <p className="ml-[8px]">Your form has been successfully submitted!</p>
      </div>
    )}
        </form>
      </div>
    </div>
  );
};

export default Form;

