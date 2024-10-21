'use client';

import React, { useState } from 'react';
// import back from '../../public/assets/icons/left.png';
// import Link from 'next/link';
// import Image from 'next/image';
import CalendarComponent from '../components/calendar/Calendar';
import TimePicker from '../components/timepicker/TimePicker';
import PlanSelector from '../components/planselector/PlanSelector';

const Page = () => {
  const [count, setCount] = useState(1);
  const [date, setDate] = useState(new Date());

  const [bookingDetails, setBookingDetails] = useState([
    { title: 'Experience', description: 'Race Session.' },
    { title: 'Seats', description: '1 Driver' },
    { title: 'Date & Time', description: 'Saturday 27 May, 27:30' },
    { title: 'Duration', description: 'Bronze - 45mins' }
  ]);

  const handleTimeChange = (timeKey, newTime) => {
    // Update the time in booking details based on some condition or directly
    const updatedDetails = bookingDetails.map(detail => {
      if (detail.title === 'Date & Time') {
        return { ...detail, description: `${detail.description.split(',')[0]}, ${newTime}` };
      }
      return detail;
    });
    setBookingDetails(updatedDetails);
  };

  const increaseCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateSeatsDescription(newCount);
  };

  const decreaseCount = () => {
    if (count > 1) {  
      const newCount = count - 1;
      setCount(newCount);
      updateSeatsDescription(newCount);
    }
  };

  const updateSeatsDescription = (newCount) => {
    const newBookingDetails = bookingDetails.map(detail => {
      if (detail.title === 'Seats') {
        return { ...detail, description: `${newCount} Driver${newCount > 1 ? 's' : ''}` };
      }
      return detail;
    });
    setBookingDetails(newBookingDetails);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    updateBookingDetailsForDate(newDate);
  };

  const updateBookingDetailsForDate = (newDate) => {
    const updatedDetails = bookingDetails.map(detail => {
      if (detail.title === "Date & Time") {
        return { ...detail, description: newDate.toLocaleString() };
      }
      return detail;
    });
    setBookingDetails(updatedDetails);
  };



  return (
    <>
    
    <div className="min-h-screen overflow-x-hidden max-w-7xl mx-auto pb-[60px]">
      
      <div className='my-[60px]'>
       
        <div class="flex justify-between items-center w-[407px] max-w-3xl mx-auto my-8">
          <div class="relative">
            <div class="ml-4 w-12 h-12 rounded-full bg-[#261457] text-white flex items-center justify-center mb-2 font-bold hover:bg-gradient-to-r hover:from-[#D00746] hover:to-[#7E51F8]">1</div>
            <div class="text-[14px] text-white font-bold font-orbitron">Experiences</div>

          </div>
          <div class="relative">
            <div class="w-12 h-12 rounded-full bg-[#261457] text-white flex items-center justify-center mb-2 font-bold hover:bg-gradient-to-r hover:from-[#D00746] hover:to-[#7E51F8]">2</div>
            <div class="text-[14px] text-white font-bold font-orbitron">Payment</div>
            <div class="absolute top-[22px] right-full h-1 w-[120px] bg-[#261457]"></div>
          </div>
          <div class="relative">
            <div class="mr-4 w-12 h-12 rounded-full bg-[#261457] text-white flex items-center justify-center mb-2 font-bold hover:bg-gradient-to-r hover:from-[#D00746] hover:to-[#7E51F8]">3</div>
            <div class="text-[14px] text-white font-bold font-orbitron">Thanks</div>
            <div class="absolute top-[22px] right-full h-1 w-[120px] bg-[#261457]"></div>
          </div>
        </div>

      </div>
      <div className='flex'>
        <div className='left'>
          <div className="flex max-w-7xl ">
            <div className='flex'>
              <div className=''>
                <div className="w-[736px] bg-[#261457] p-[30px] h-[261px]">
                  <h1 className="text-[23px] text-white font-black font-orbitron">Select Seats</h1>
                  <div className='flex justify-between'>
                    <div className='py-4'>
                      <p className="text-[18px] text-white font-bold font-jura mb-4">
                        Drivers must be at least 7 years old to race.<br />Teleios dome is 18+ from 5pm.
                      </p>
                      <p className='pt-[20px] text-[18px] text-white font-bold font-jura '>For 6+, Go back and select team racing.</p>
                    </div>
                    <div className="flex items-center justify-center mb-4 ">
                      <button onClick={decreaseCount} className=" button-slanted text-[18px] cursor-pointer flex items-center justify-center px-[20px] py-[8px] border-[0.5px] border-opacity-30 border-white ml-2 font-jura font-bold text-white hover:bg-gradient-to-r hover:from-[#D00746] hover:to-[#7E51F8] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0">
                        <span className='button-slanted-content text-white font-jura text-[18px] font-bold'>-</span>
                      </button>
                      <span className="px-8 py-2 text-[23px] text-white font-jura font-black">{count}</span>
                      <button onClick={increaseCount} className=" button-slanted text-[18px] cursor-pointer flex items-center justify-center px-[20px] py-[8px] border-[0.5px] border-opacity-30 border-white ml-2 font-jura font-bold text-white hover:bg-gradient-to-r hover:from-[#D00746] hover:to-[#7E51F8] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0">
                        <span className='button-slanted-content font-jura text-[18px] font-bold'>+</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='w-[734px] bg-[#261457] p-[30px] h-[493px] my-[20px]'>
                    <h1 className='text-[23px] text-white font-black font-orbitron'>Select Date</h1>
                    <CalendarComponent onChange={handleDateChange} value={date} />
                    

                  </div>

                </div>
                <div className='w-[734px] bg-[#261457] p-[30px] h-[347px] my-[20px]'>
                  <h1 className='text-[23px] text-white font-black font-orbitron'>Choose Time</h1>
                  <TimePicker onTimeChange={handleTimeChange}/>
                </div>
                <div className='w-[734px] bg-[#261457] p-[30px] h-[183px] my-[20px]'>
                  <h1 className='text-[23px] text-white font-black font-orbitron'>Duration</h1>
                  <PlanSelector />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='right'>
          <div className="w-[386px] bg-[#261457] ml-[20px] p-[30px]">
            <h2 className="text-[18px] text-white font-black font-orbitron mb-[24px]">Your booking details</h2>
            {bookingDetails.map((detail, index) => (
        <div className="border-b-[0.5px] border-opacity-[20%] py-[12px]" key={index}>
          <h3 className="text-[18px] text-white font-bold font-orbitron">{detail.title}</h3>
          <p className="text-[18px] text-white font-jura py-2">{detail.description}<span>{detail.time}</span></p>
        </div>
      ))}
            <div className="max-w-3xl mx-auto bg-[#261457] rounded-lg ">

              <h1 className="text-[18px] text-white font-black font-orbitron mb-4 mt-[20px]">Price From</h1>

              <div className="flex justify-between items-center mb-4">
                <p className="text-[18px] text-white font-normal font-jura">Price</p>
                <p className="text-[18px] text-white font-normal font-jura">250<span className='text-[#A62ED1]'>AED</span></p>
              </div>
              <p className="text-[18px] text-white font-normal font-jura">Total cost will be calculated at the next step</p>
              <button className="button-slanted mt-[20px] w-full ursor-pointer flex items-center justify-center px-[20px] py-[8px] ml-2 font-jura font-bold text-white bg-gradient-to-r to-[#D00746] from-[#7E51F8] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0">
                <span className='button-slanted-content'>CONTINUE</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
    </>
  );
}

export default Page;
