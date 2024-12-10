
// import React, { useState, useEffect, useCallback } from "react";
// import { doGetCall } from "../../utils/api";

// const BookingCalendar = () => {
//   const [slotsData, setSlotsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedSlotType, setSelectedSlotType] = useState("normal");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [slotInterval, setSlotInterval] = useState(20);

//   const startHour = 9; // Start time
//   const endHour = 24; // End time

//   useEffect(() => {
//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().split("T")[0];
//     setSelectedDate(formattedDate);
//   }, []);

//   const generateSlotTimes = (startHour, endHour, interval) => {
//     const times = [];
//     for (let hour = startHour; hour < endHour; hour++) {
//       for (let minutes = 0; minutes < 60; minutes += interval) {
//         const formattedTime = `${hour.toString().padStart(2, "0")}:${minutes
//           .toString()
//           .padStart(2, "0")}`;
//         times.push(formattedTime);
//       }
//     }
//     return times;
//   };

//   const fetchBookings = useCallback(async () => {
//     setLoading(true);

//     const payload = {
//       no_of_people: "2",
//       date: selectedDate,
//       duration: slotInterval.toString(),
//       booking_type: selectedSlotType,
//     };

//     const queryString = new URLSearchParams(payload).toString();

//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//     const url = `${baseUrl}/api/bookings/availableSlots?${queryString}`;
//       let response = await doGetCall(url);
//       const data = await response.json();
//       console.log("Fetched data:", data);

//       // Generate consistent slots and map API data
//       const slotTimes = generateSlotTimes(startHour, endHour, slotInterval);
//       const slotsWithBusyData = slotTimes.map((time) => {
//         const slot = data.find((s) => s.time === time) || {};
//         let busy = 0;

//         if (selectedSlotType === "normal") {
//           busy = 14 - (slot.sims || 0);
//         } else if (selectedSlotType === "vip") {
//           busy = 4 - (slot.sims || 0);
//         } else if (selectedSlotType === "lounge") {
//           busy = 2 - (slot.sims || 0);
//         }

//         return {
//           time,
//           sims: slot.sims || 0,
//           busy,
//           type: selectedSlotType,
//           date: selectedDate,
//         };
//       });

//       setSlotsData(slotsWithBusyData);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedSlotType, selectedDate, slotInterval]);

//   useEffect(() => {
//     fetchBookings();
//   }, [fetchBookings]);

//   const handleSlotTypeChange = (event) => {
//     setSelectedSlotType(event.target.value);
//   };

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };

//   const handleIntervalChange = (event) => {
//     setSlotInterval(Number(event.target.value));
//   };

//   return (
//     <div className="w-full overflow-x-auto h-screen">
//       <div className="flex gap-16">
//         <div className="mb-4">
//           <label className="mr-4">Select Slot Type:</label>
//           <select
//             value={selectedSlotType}
//             onChange={handleSlotTypeChange}
//             className="p-2 border"
//           >
//             <option value="normal">Normal</option>
//             <option value="vip">VIP</option>
//             <option value="lounge">Lounge</option>
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="mr-4">Select Date:</label>
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={handleDateChange}
//             className="p-2 border"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="mr-4">Select Slot Time Interval:</label>
//           <select
//             value={slotInterval}
//             onChange={handleIntervalChange}
//             className="p-2 border"
//           >
//             <option value={20}>20 minutes</option>
//             <option value={40}>40 minutes</option>
//             <option value={60}>60 minutes</option>
//             <option value={120}>120 minutes</option>
//           </select>
//         </div>
//       </div>

//       <table className="min-w-full border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 p-4 bg-[#ececec]">Type</th>
//             <th className="border border-gray-300 p-4 bg-[#ececec]">Available</th>
//             <th className="border border-gray-300 p-4 bg-[#ececec]">Busy</th>
//             <th className="border border-gray-300 p-4 bg-[#ececec]">Time</th>
//             <th className="border border-gray-300 p-4 bg-[#ececec]">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="5" className="text-center p-4">
//                 Loading...
//               </td>
//             </tr>
//           ) : (
//             slotsData.map((slot) => (
//               <tr key={slot.time}>
//                 <td className="border border-gray-300 p-4 text-center">{slot.type}</td>
//                 <td className="border border-gray-300 p-4 text-center">{slot.sims}</td>
//                 <td className="border border-gray-300 p-4 text-center">{slot.busy}</td>
//                 <td className="border border-gray-300 p-4 text-center">{slot.time}</td>
//                 <td className="border border-gray-300 p-4 text-center">{selectedDate}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BookingCalendar;



import React, { useState, useEffect, useCallback } from "react";
import { doGetCall } from "../../utils/api";

const BookingCalendar = () => {
  const [slotsData, setSlotsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Error state
  const [selectedSlotType, setSelectedSlotType] = useState("normal");
  const [selectedDate, setSelectedDate] = useState("");
  const [slotInterval, setSlotInterval] = useState(20);

  const startHour = 9; // Start time
  const endHour = 24; // End time

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
  }, []);

  const generateSlotTimes = (startHour, endHour, interval) => {
    const times = [];
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += interval) {
        const formattedTime = `${hour.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
        times.push(formattedTime);
      }
    }
    return times;
  };

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError("");

    const payload = {
      no_of_people: "2",
      date: selectedDate,
      duration: slotInterval.toString(),
      booking_type: selectedSlotType,
    };

    const queryString = new URLSearchParams(payload).toString();

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/bookings/availableSlots?${queryString}`;

    
      let response = await doGetCall(url);
      const data = await response.json();
     

      const slotTimes = generateSlotTimes(startHour, endHour, slotInterval);
      const slotsWithBusyData = slotTimes.map((time) => {
        const slot = data.find((s) => s.time === time) || {};
        let busy = 0;

        if (selectedSlotType === "normal") {
          busy = 14 - (slot.sims || 0);
        } else if (selectedSlotType === "vip") {
          busy = 4 - (slot.sims || 0);
        } else if (selectedSlotType === "lounge") {
          busy = 2 - (slot.sims || 0);
        }

        return {
          time,
          sims: slot.sims || 0,
          busy,
          type: selectedSlotType,
          date: selectedDate,
        };
      });

      setSlotsData(slotsWithBusyData);
    } catch (error) {
      setError("Failed to fetch bookings. Please try again."); // Set error message
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedSlotType, selectedDate, slotInterval]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleSlotTypeChange = (event) => {
    setSelectedSlotType(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleIntervalChange = (event) => {
    setSlotInterval(Number(event.target.value));
  };

  return (
    <div className="w-full overflow-x-auto bg-white h-screen p-20 rounded-lg">
      <div className="flex gap-16">
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

        <div className="mb-4">
          <label className="mr-4">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="p-2 border"
          />
        </div>

        <div className="mb-4">
          <label className="mr-4">Select Slot Time Interval:</label>
          <select
            value={slotInterval}
            onChange={handleIntervalChange}
            className="p-2 border"
          >
            <option value={20}>20 minutes</option>
            <option value={40}>40 minutes</option>
            <option value={60}>60 minutes</option>
            <option value={120}>120 minutes</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="text-center p-4 text-lg text-gray-600">
          Loading slots...
        </div>
      )}

      {error && (
        <div className="text-center p-4 text-lg text-red-500">{error}</div>
      )}

      {!loading && !error && (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="text-left bg-[#f7f7f7]">
              <th className="border border-gray-200 px-4 py-2 text-gray-600">Type</th>
              <th className="border border-gray-200 px-4 py-2 text-gray-600">Available</th>
              <th className="border border-gray-200 px-4 py-2 text-gray-600">Busy</th>
              <th className="border border-gray-200 px-4 py-2 text-gray-600">Time</th>
              <th className="border border-gray-200 px-4 py-2 text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
  {slotsData.map((slot, index) => (
    <tr
      key={slot.time}
      style={{
        backgroundColor: index % 2 === 0 ? "#ffffff" : "#eeeeee", 
      }}
    >
      <td className="border border-gray-200 px-4 py-2">{slot.type}</td>
      <td className="border border-gray-200 px-4 py-2">{slot.sims}</td>
      <td className="border border-gray-200 px-4 py-2">{slot.busy}</td>
      <td className="border border-gray-200 px-4 py-2">{slot.time}</td>
      <td className="border border-gray-200 px-4 py-2">{selectedDate}</td>
    </tr>
  ))}
</tbody>
        </table>
      )}
    </div>
  );
};

export default BookingCalendar;
