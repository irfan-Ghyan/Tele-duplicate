
import React, { useState } from 'react';
import Image from 'next/image';
import closeIcon from '../../../public/assets/images/dome/navbarclose.png';
import leftArrow from '../../../public/assets/images/dome/left.png';
import rightArrow from '../../../public/assets/images/dome/right.png';
// import uae from '../../../public/assets/images/uae.png';

const CalendarPopup = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const calendarData = [
    { id: 'R1', location: 'Bahrain', date: '29th Feburary 2024' },
    { id: 'R2', location: 'Saudi Arabia', date: '07th Marcg 2024' },
    { id: 'R3', location: 'Australia', date: '21sth March 2024' },
    { id: 'R4', location: 'Japan', date: '04th April 2024' },
    { id: 'R5', location: 'China', date: '18th April 2024' },
    { id: 'R6', location: 'Miami', date: '02nd May 2024' },
    { id: 'R7', location: 'Emilia Romagna', date: '15th May 2024' },
    { id: 'R8', location: 'Monaco', date: '23rd May 2024' },
    { id: 'R9', location: 'Canada', date: '06th June 2024' },
    { id: 'R10', location: 'Spain', date: '20th June 2024' },
    { id: 'R11', location: 'Austria', date: '27th June 2024' },
    { id: 'R12', location: 'United Kingdom', date: '04th July 2024' },
    { id: 'R13', location: 'Hungary', date: '18th July 2024' },
    { id: 'R14', location: 'Belgium', date: '25th July 2024' },
    { id: 'R15', location: 'Netherlands', date: '22nd August 2024' },
    { id: 'R16', location: 'Italy', date: '29th August 2024' },
    { id: 'R17', location: 'Azerbaijan', date: '12th September 2024' },
    { id: 'R18', location: 'Singapore', date: '19th September 2024' },
    { id: 'R19', location: 'USA', date: '17th October 2024' },
    { id: 'R20', location: 'Mexico', date: '24th October 2024' },
    { id: 'R21', location: 'Brazil', date: '31st October 2024' },
    { id: 'R22', location: 'Las Vegas', date: '21st November 2024' },
    { id: 'R23', location: 'Qatar', date: '28th November 2024' },
    { id: 'R24', location: 'Abu Dhabi', date: '05th December 2024' },


  ];
  const flagImages = {
    USA: '/assets/flags/usa.png',
    Italy: '/assets/flags/italy.png',
    Miami: '/assets/flags/usa.png', 
    'Saudi Arabia': '/assets/flags/saudi_arabia.png',
    Mexico: '/assets/flags/mexico.png',
    Qatar: '/assets/flags/qatar.png',
    Australia: '/assets/flags/australia.png',
    China: '/assets/flags/china.png',
    Japan: '/assets/flags/japan.png',
    UAE: '/assets/flags/uae.png',
    'Emilia Romagna': '/assets/flags/italy.png',
    Canada: '/assets/flags/canada.png',
    Monaco: '/assets/flags/monaco.png',
    Azerbaijan: '/assets/flags/azerbaijan.png',
    Singapore: '/assets/flags/singapore.png',
    Netherlands: '/assets/flags/netherlands.png',
    Belgium: '/assets/flags/belgium.png',
    Hungary: '/assets/flags/hungary.png',
    'Las Vegas': '/assets/flags/usa.png',
    'United Kingdom': '/assets/flags/uk.png',
    Spain: '/assets/flags/spain.png',
    Austria: '/assets/flags/austria.png',
    Bahrain: '/assets/flags/bahrain.png',
    'Abu dhabi': '/assets/flags/uae.png',
    Brazil: '/assets/flags/brazil.png',
  };
  const totalPages = Math.ceil(calendarData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = calendarData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#11072C] p-8 relative w-[650px] h-[705px]">
        <button onClick={onClose} className="absolute top-2 right-2">
          <Image src={closeIcon} alt="Close" width={24} height={24} />
        </button>
        <div className=''>
          <h2 className="font-bold text-[20px] lg:text-[34px] text-white font-orbitron text-center">Calendar</h2>
          <div className='flex justify-center items-center'>
            <p className='text-[14px] lg:text-[16px] text-white font-orbitron'>TELEIOS </p> 
            <p className='text-[14px] lg:text-[24px] text-white font-orbitron ml-4'>VIRTUAL</p>
          </div>
          <div className='flex justify-center items-center'>
            <p className='text-[14px] lg:text-[24px] text-white font-orbitron'>2004 </p> 
            <p className='text-[14px] lg:text-[16px] text-white font-orbitron ml-4'>GRANDPRIX</p>
          </div>
        </div>
        <table className="w-full text-left text-[14px] lg:text-[18px] my-4 text-white font-jura ">
          <thead className='bg-[#7d7082]'>
            <tr>
              <th className="px-4 py-2 text-[14px] lg:text-[18px] mb-4 text-white font-jura ">No#</th>
              <th className="px-4 py-2 text-[14px] lg:text-[18px] mb-4 text-white font-jura">Location </th>
              <th className="px-4 py-2 text-[14px] lg:text-[18px] mb-4 text-white font-jura">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td className="border border-[#11072C] px-4 py-2 text-[14px] lg:text-[18px] text-white font-jura bg-[#A72AEB]">{item.id}</td>
                <td className="border px-4 py-2 flex items-center">
                  <Image src={flagImages[item.location] || '/assets/flags/default.png'} alt={`${item.location} Flag`} width={27} height={23} className="mr-2" />
                  {item.location}
                </td>
                <td className="border border-[#11072C] px-4 py-2 text-[14px] lg:text-[18px] text-white font-jura bg-[#23124F]">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`mx-1 px-4 py-4 text-white cursor-pointer flex items-center justify-center border-[0.5px] border-opacity-30 border-white ml-2 font-jura font-bold hover:bg-gradient-to-r hover:from-[#D00746] hover:to-[#7E51F8] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
            disabled={currentPage === 1}
          >
            <Image src={leftArrow} alt="left" width={12} height={11} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`mx-1 px-3 py-1 text-white cursor-pointer flex items-center justify-center border-white ml-2 font-jura font-bold hover:bg-gradient-to-r hover:from-[#D00746] hover:to-[#7E51F8] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0  ${currentPage === i + 1 ? 'bg-opacity-100' : 'bg-opacity-50'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`mx-1 px-4 py-4 text-white cursor-pointer flex items-center justify-center border-[0.5px] border-opacity-30 border-white ml-2 font-jura font-bold hover:bg-gradient-to-r hover:from-[#D00746] hover:to-[#7E51F8] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
            disabled={currentPage === totalPages}
          >
            <Image src={rightArrow} alt="right" width={12} height={11} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarPopup;
