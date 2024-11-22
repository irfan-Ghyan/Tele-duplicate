

// import React, { useState, useEffect, useCallback } from "react";
// import { doGetCall } from "../../utils/api";

// const BookingCalendar = () => {
//   const [slotsData, setSlotsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedSlotType, setSelectedSlotType] = useState("normal");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [slotInterval, setSlotInterval] = useState(20);

//   useEffect(() => {
//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().split("T")[0];
//     setSelectedDate(formattedDate);
//   }, []);

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
//       const url = `http://192.168.70.211:8000/api/bookings/availableSlots?${queryString}`;
//       let response = await doGetCall(url);
//       const data = await response.json();
//       console.log("Fetched data:", data);

//       const slotsWithBusyData = data.map((slot) => {
//         let busy;

//         if (selectedSlotType === "normal") {
//           busy = 14 - slot.sims;
//         } else if (selectedSlotType === "vip") {
//           busy = 4 - slot.sims;
//         } else if (selectedSlotType === "lounge") {
//           busy = 2 - slot.sims;
//         }

//         return {
//           ...slot,
//           busy: busy,
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

//   const generateSlotTimes = (interval) => {
//     const startHour = 9;
//     const endHour = 24;
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

//   const slotTimes = generateSlotTimes(slotInterval);

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
//             slotTimes.map((time, index) => {
//               const slot = slotsData[index] || {};
//               return (
//                 <tr key={time}>
//                   <td className="border border-gray-300 p-4 text-center">{slot.type || "-"}</td>
//                   <td className="border border-gray-300 p-4 text-center">{slot.sims || "-"}</td>
//                   <td className="border border-gray-300 p-4 text-center">{slot.busy || "-"}</td>
//                   <td className="border border-gray-300 p-4 text-center">{slot.time}</td>
//                   <td className="border border-gray-300 p-4 text-center">{selectedDate}</td>
//                 </tr>
//               );
//             })
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

    const payload = {
      no_of_people: "2",
      date: selectedDate,
      duration: slotInterval.toString(),
      booking_type: selectedSlotType,
    };

    const queryString = new URLSearchParams(payload).toString();

    try {
      const url = `http://192.168.70.211:8000/api/bookings/availableSlots?${queryString}`;
      let response = await doGetCall(url);
      const data = await response.json();
      console.log("Fetched data:", data);

      // Generate consistent slots and map API data
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
    <div className="w-full overflow-x-auto h-screen">
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

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-4 bg-[#ececec]">Type</th>
            <th className="border border-gray-300 p-4 bg-[#ececec]">Available</th>
            <th className="border border-gray-300 p-4 bg-[#ececec]">Busy</th>
            <th className="border border-gray-300 p-4 bg-[#ececec]">Time</th>
            <th className="border border-gray-300 p-4 bg-[#ececec]">Date</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : (
            slotsData.map((slot) => (
              <tr key={slot.time}>
                <td className="border border-gray-300 p-4 text-center">{slot.type}</td>
                <td className="border border-gray-300 p-4 text-center">{slot.sims}</td>
                <td className="border border-gray-300 p-4 text-center">{slot.busy}</td>
                <td className="border border-gray-300 p-4 text-center">{slot.time}</td>
                <td className="border border-gray-300 p-4 text-center">{selectedDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingCalendar;
