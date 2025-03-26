
import React from 'react';
import Link from 'next/link';


export default function ForBooking() {
  
  return (
    <div className='container mx-auto mb-[16px] px-8'>
        <h2 className="text-[#C09E5F] text-[49px] sm:text-[120px] md:text-[88px] lg:text-[154px] font-orbitron font-black text-center "
        style={{
            WebkitTextStroke: "0.5px #E9B872",
            WebkitTextFillColor: "transparent",
        }}
        >
       FOR BOOKING
        </h2>
        <div className='flex flex-col lg:flex-row items-center justify-between pb-[60px] px-8'>
            <div className='font-orbitron font-bold text-[24px] md:text-[34px] leading-80 text-[#C09E5F]'>Contact us at</div>
            <div className='font-orbitron font-bold text-[24px] md:text-[34px] leading-80 text-[#C09E5F]'> +966 55 224 9297</div>
            <Link href="https://api.whatsapp.com/send/?phone=966552249297&text&type=phone_number&app_absent=0" className="button-slanted w-[320px] md:w-[190px] lg:w-[233px] h-[51px] font-orbitron font-bold text-[20px] leading-80 bg-[#C09E5F] text-[#002718] rounded-tl-lg rounded-br-lg flex items-center justify-center mt-6 md:mt-0"> CONTACT US</Link>
        </div>
  </div>
  );
}
