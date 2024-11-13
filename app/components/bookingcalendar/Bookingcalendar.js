import React, { useState, useEffect, useCallback } from "react";
import { doGetCall } from "../../utils/api";

const BookingCalendar = () => {
  const [slotsData, setSlotsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlotType, setSelectedSlotType] = useState("normal");
  const [selectedDate, setSelectedDate] = useState("10-11-2024");


  const fetchBookings = useCallback(async () => {
    setLoading(true);

    const payload = {
      no_of_people: "2",
      date: selectedDate,
      duration: "40",
      booking_type: selectedSlotType,
    };

    const queryString = new URLSearchParams(payload).toString();

    try {
      const url = `http://192.168.70.211:8000/api/bookings/availableSlots?${queryString}`;
      let response = await doGetCall(url);
      const data = await response.json();
      console.log("Fetched data:", data); 
      // Initialize `busy` for each slot
      const slotsWithBusyData = data.map((slot) => ({
        ...slot,
        busy: 0, 
        type: selectedSlotType,
        date: selectedDate,
      }));
      setSlotsData(slotsWithBusyData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedSlotType, selectedDate, setSlotsData]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);


  const handleSlotTypeChange = (event) => {
    setSelectedSlotType(event.target.value);
  };


  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Handle slot booking
  const handleSlotSelection = (type, duration, index) => {
    
    const simsToBook = 1; 

    const updatedSlots = [...slotsData];
    
    const slot = updatedSlots[index];

    if (slot.sims >= simsToBook && (slot.sims - simsToBook) >= slot.busy) {
      updatedSlots[index] = {
        ...slot,
        busy: slot.busy + simsToBook,
        sims: slot.sims - simsToBook,
      };
      setSlotsData(updatedSlots);
    } else {
      alert("Not enough sims available");
    }
  };

  const filteredSlots = slotsData.filter((slot) => slot.type === selectedSlotType);

  return (
    <div className="w-full overflow-x-auto h-screen">
      <div className="mb-4">
        <label className="mr-4">Select Slot Type:</label>
        <select
          value={selectedSlotType}
          onChange={handleSlotTypeChange}
          className="p-2 border"
        >
          <option value="normal">Normal</option>
          <option value="vip">VIP</option>
          <option value="lounge">Lounge</option>
        </select>
      </div>

      {/* Date Selector */}
      <div className="mb-4">
        <label className="mr-4">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-2 border"
        />
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-4 bg-[#ececec]">Date</th>
            <th className="border border-gray-300 p-4 bg-[#ececec]">Time</th>
            <th className="border border-gray-300 p-4 bg-[#ececec]">Sims Available</th>
            <th className="border border-gray-300 p-4 bg-[#ececec]">Busy</th>
            <th className="border border-gray-300 p-4 bg-[#ececec]">Slot Type</th>
         
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center p-4">Loading...</td>
            </tr>
          ) : (
            filteredSlots.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">No slots available for selected type</td>
              </tr>
            ) : (
              filteredSlots.map((slot, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-4 text-center">{slot.date}</td>
                  <td className="border border-gray-300 p-4 text-center">{slot.time}</td>
                  <td className="border border-gray-300 p-4 text-center">{slot.sims}</td>
                  <td className="border border-gray-300 p-4 text-center">{slot.busy}</td>
                  <td className="border border-gray-300 p-4 text-center">{slot.type}</td>
                
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingCalendar;
