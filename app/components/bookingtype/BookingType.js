// components/BookingType.js

import React from "react";

const BookingType = ({ selectedBookingType, onBookingTypeChange }) => {
  // Handle the change when a booking type is selected
  const handleBookingTypeChange = (type) => {
    onBookingTypeChange(type); // Pass the selected type to the parent component
  };

  return (
    <div className="flex justify-center space-x-4 mt-4">
      {/* Normal Booking Button */}
      <button
        className={`button-slanted w-[200px] h-[55px] px-4 py-4 bg-opacity-50 buton border-[1px] border-[#063828] font-jura font-bold text-[#063828] hover:text-[#c09e5f] hover:bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0 ${
          selectedBookingType === "normal" ? " text-[##c09e5f]" : "bg-gray-200"
        }`}
        onClick={() => handleBookingTypeChange("normal")}
      >
        Normal
      </button>
      
      {/* VIP Booking Button */}
      <button
        className={`button-slanted w-[200px] h-[55px] px-4 py-4 bg-opacity-50 buton border-[1px] border-[#063828] font-jura font-bold text-[#063828] hover:text-[#c09e5f] hover:bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0  ${
          selectedBookingType === "vip" ? " text-[##c09e5f]" : "bg-gray-200"
        }`}
        onClick={() => handleBookingTypeChange("vip")}
      >
        VIP
      </button>
      
      {/* Lounge Booking Button */}
      <button
        className={`button-slanted w-[200px] h-[55px] px-4 py-4 bg-opacity-50 buton border-[1px] border-[#063828] font-jura font-bold text-[#063828] hover:text-[#c09e5f] hover:bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0 ${
          selectedBookingType === "lounge" ? " text-white" : "bg-gray-200"
        }`}
        onClick={() => handleBookingTypeChange("lounge")}
      >
        Lounge
      </button>
    </div>
  );
};

export default BookingType;
