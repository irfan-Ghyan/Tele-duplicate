'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';


const Training = () => {
  const { t } = useTranslation();

  return (
    <div
      className="training-section w-full max-w-full overflow-hidden h-[200px] sm:h-[400px] md:h-[550px] lg:h-[550px] xl:h-[550px] lg:bg-cover bg-right lg:bg-right xl:bg-center px-4 md:px-0 lg:px-0 xl:px-0"
      style={{ backgroundImage: "url('/assets/images/dome/f&b.png')" }}
    >
      <div className='w-full bg-[#002718] bg-opacity-80 lg:bg-opacity-60 md:bg-opacity-60 xl:bg-opacity-0 px-4 mt-[230px] sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0'>
        <div className="px-4 md:flex md:flex-col sm:pt-[100px] md:pt-[100px] md:pr-6 md:px-8 max-w-7xl mx-auto bottom-0 py-2 ">
          {/* Heading */}
          {/* <div className='border-solid border-b-[1px] border-[#e3ce90] border-opacity-20 text-end mt-10 md:mt-0'>
            <h1 className='text-[14px] text-[#ffffff] font-normal drop-shadow-xl font-orbitron pb-4 mt-10 md:mt-0'>
              {t('f&b')}
            </h1>
          </div> */}

          <div className='flex flex-col justify-between md:mt-[36px] md:mb-[41px]'>
            <div className=''>
              <h1 className='text-[24px] sm:text-[34px] md:text-[54px] lg:text-[54px] text-[#ffffff] font-black leading-[81px] font-orbitron'>
                {t('f&b')}
              </h1>
              <p className='md:w-[400px] lg:w-[550px] xl:w-[550px] lg:h-[67px] md:text-[14px] lg:text-[18px] text-[#ffffff] text-opacity-[80%] font-bold font-jura mt-4 text-justify leading-[28px]'>
                {t('f&b_des')}
              </p>
            </div>

            <div className="flex justify-center lg:justify-start m-bottom ">
              <div className='pt-4 pb-10'>
                <Link href="/f&b" className="md:mt-[77px] lg:mt-[77px] button-slanted w-[200px] lg:w-[233px] h-[44px] px-8 py-6 button text-[16px] leading-[24px] font-jura border-[1px] border-[#fff] hover:to-[#c09e5f] hover:text-[#C09E5F] hover:border-[#C09E5F] text-[#fff] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
                  <span className='button-slanted-content'>{t('FIND OUT MORE')}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Query for Mobile Screen */}
      <style jsx>{`
        @media (max-width: 430px) {
          .training-section {
            height: 600px;
          }
        }
      `}</style>
    </div>
  );
};

export default Training;
