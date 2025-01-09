'use client';

import React, { useState } from 'react';
import { supabase } from '../../../supabase'; 
import { useTranslation } from 'react-i18next';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
    const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage(''); 

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(query)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('newsletter')
        .insert([{ email: query }]);

      if (error) {
        console.error('Supabase insert error:', error);
        setErrorMessage(`Error: ${error.message || 'An error occurred while submitting your email.'}`);
        return;
      }

      setSuccessMessage('Thank you for subscribing! Your 10% coupon is on its way to your inbox. Stay tuned for the latest news and offers.');
      console.log('Email submitted successfully:', data);

      setQuery('');
      setIsSubmitted(true);

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Unexpected error during submission:', error);
      setErrorMessage('There was an unexpected error submitting your email. Please try again.');
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value === '') {
      setErrorMessage('');
    }
  };

  return (
    <div className="container mx-auto max-w-full overflow-hidden py-[109px] px-4 md:px-0">
      <h1 className="text-[#c09e5f] font-orbitron text-[24px] md:text-[42px] text-center font-black mb-2">
        {isSubmitted ? t('THANK_YOU_SUBSCRIBING') : t('SIGN_UP_NEWSLETTER')}
      </h1>
      <p className="text-[#c09e5f] font-jura text-[14px] md:text-[18px] font-bold text-center mb-6">
          {isSubmitted ? t('JOIN_COMMUNITY') : t('STAY_UPDATED')}
      </p>
      {errorMessage && <p className="text-red-500 text-center mb-6">{t('ERROR_INVALID_EMAIL')}</p>}
      {successMessage && <p className="text-green-500 text-center mb-6">{t('THANK_YOU_MESSAGE')}</p>}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col items-center space-y-4">
        <div className='flex w-full md:w-[496px] h-[44px] justify-center'>
          <input
            type="email"
            value={query}
            onChange={handleChange}
            placeholder={t('PLACEHOLDER_EMAIL')}
            className="button-slanted text-[#e3ce90] w-[240px] md:w-[423px] h-[44px] font-jura font-normal lg:font-medium bg-[#002718] rounded-tl-lg pl-[10px] md:pl-[54px] pr-[10px] py-[13px] mr-[-10px] lg:mr-[-30px] focus:outline-none focus:ring-0 focus:bg-[#002718] focus:text-[#c09e5f]"
            required
          />
          <button
            type="submit"
            className="button-slanted w-[100px] md:w-[158px] h-[44px] font-jura font-bold text-[#002718] bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] transition duration-300 rounded-tl-lg rounded-br-lg z-10"
          >
            <span className='button-slanted-content'>{t('SUBMIT')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchComponent;
