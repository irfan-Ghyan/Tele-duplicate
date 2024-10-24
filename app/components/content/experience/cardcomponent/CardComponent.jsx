import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head'; 


const CardComponent = ({ imageUrl, title, description, button, link }) => {


  return (
    
    <div className="overflow-hidden bg-[#371F76] mb-5 items-center flex flex-col h-full">
      <Head>
        <title>{title} | Teleios Dome</title>
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
        <div className="pb-[22px]">
          <Link
            href={link} 
            target="_blank"
            rel="noopener noreferrer"
            className="custom-button button-slanted cursor-pointer w-[220px] md:w-[223px] lg:w-[223px] h-[44px] font-jura font-normal md:font-bold bg-gradient-to-r from-[#7E51F8] to-[#D007A6] text-white ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden"
          >
            <span className="button-slanted-content">{button}</span>
          </Link>
        </div>

        
      </div>
    </div>
  );
};

export default CardComponent;

