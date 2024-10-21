import React from 'react';
import Image from 'next/image';

const EventCard = ({ imageUrl, title, date, description }) => {
  return (
    <div className="relative max-w-sm  bg-white shadow-lg  mb-6w-[320px] md:w-[371px] lg:w-[371px] xl:w-[371px] h-[473px] ml-[18px] md:ml-[0px] ">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end px-[29px] pb-[22px]">
        <h2 className="font-orbitron text-[23px] font-bold mb-2 text-white">{title}</h2>
        <span>
        <Image src="/assets/icons/calendar.png"  width={15.75} height={15.75} alt="Facebook" className="h-[16px] w-[8.59px]" />
        <p className="font-jura text-[18px] font-normal mb-2 text-white">{date}</p>
        </span>
        <p className="font-jura text-[18px] font-normal text-white">{description}</p>
      </div>
    </div>
  );
};

export default EventCard;
