import React, { useState, useCallback } from "react";
import BookingCalendar from "../bookingcalendar/Bookingcalendar";
import BookingListing from "../bookinglisting/Bookinglisting";

const DashboardData = () => {
  const [slotsData, setSlotsData] = useState([]);
  const updateSlotData = (updatedSlots) => {
    setSlotsData(updatedSlots);
  };

  return (
    <div className="w-full bg-gray-200">
       <div>
            <h1 className='text-4xl font-black text-[#002718] px-20 pt-20'>BOOKING</h1>
          </div>
      <div className="px-20 py-10">
     <BookingCalendar slotsData={slotsData} setSlotsData={updateSlotData} />
     </div>
     <div className="px-20 py-10">
     <BookingListing slotsData={slotsData} />
     </div>
    </div>
  );
};

 export default DashboardData;

