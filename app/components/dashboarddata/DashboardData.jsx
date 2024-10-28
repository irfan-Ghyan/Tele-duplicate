import React from "react";
import BookingCalendar from "../bookingcalendar/Bookingcalendar";
import BookingListing from "../bookinglisting/Bookinglisting";

const DashboardData = () => {
  return (
    <div className="w-full bg-[#ffffff]">
       <div>
            <h1 className='text-4xl font-black px-20 pt-20'>BOOKING</h1>
          </div>
      <div className="px-20 py-10">
     <BookingCalendar />
     </div>
     <div className="px-20 py-10">
     <BookingListing />
     </div>
    </div>
  );
};

export default DashboardData;
