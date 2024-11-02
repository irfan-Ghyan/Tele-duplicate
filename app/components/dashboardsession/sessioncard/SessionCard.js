import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head'; 


const SessionCard = ({ imageUrl, title, description }) => {


  return (
    
    <div className="overflow-hidden bg-[#371F76] mb-5 items-center flex flex-col h-full">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
      </Head>
      <div className="relative w-full h-[200px]">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"  
          priority={true}
        />
      </div>
      <div className="mx-[20px] pt-4 flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-white text-[18px] font-orbitron font-bold">{title}</h1>
          <p className="text-white text-[14px] font-jura font-bold py-4 text-justify">{description}</p>
        </div>

      </div>
    </div>
  );
};

export default SessionCard;