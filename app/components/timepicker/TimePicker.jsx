// import React, { useState, useCallback, useEffect } from 'react';
// import ReactTimePicker from 'react-time-picker';
// import { doGetCall } from '../../utils/api';

// const TimePicker = ({ onTimeChange }) => {
//   const [times, setTimes] = useState({});
//   const [showTimePicker, setShowTimePicker] = useState(false);
//   const [activeTime, setActiveTime] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedSlotType, setSelectedSlotType] = useState("normal");
//   const [slotInterval, setSlotInterval] = useState(20);

//   const handleButtonClick = (timeKey) => {
//     setActiveTime(timeKey);
//     setShowTimePicker(true);
//   };

//   const handleTimeChange = (value) => {
//     setTimes(prevTimes => ({
//       ...prevTimes,
//       [activeTime]: value
//     }));
//     setShowTimePicker(false);
//     onTimeChange(activeTime, value);
//   };

//   const chunkArray = (array, chunkSize) => {
//     const result = [];
//     for (let i = 0; i < array.length; i += chunkSize) {
//       result.push(array.slice(i, i + chunkSize));
//     }
//     return result;
//   };

//   const timeEntries = Object.entries(times);
//   const timeChunks = chunkArray(timeEntries, 5);

//   const fetchBookings = useCallback(async () => {
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

//       const fetchedTimes = data.reduce((acc, slot) => {

//         acc[`time${slot.time}`] = slot.time;
//         return acc;
//       }, {});
//       setTimes(fetchedTimes);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//     }
//   }, [selectedDate, selectedSlotType, slotInterval]);

//   useEffect(() => {
//     fetchBookings();
//   }, [fetchBookings]);

//   return (
//     <div >
//       {timeChunks.map((chunk, chunkIndex) => (
//         <div key={chunkIndex} className='flex justify-between'>
//           {chunk.map(([timeKey, timeValue]) => (
//             <div
//               key={timeKey}
//               className={`button-slanted mt-[20px] cursor-pointer w-[82px] h-[51px] font-jura font-normal text-[#002718] hover:text-[#c09e5f] md:font-bold border-[0.5px] border-opacity-30 border-[#063828] text-[#063828]e m-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden ${
//                 chunkIndex === timeChunks.length - 1
//                   ? 'bg-[#063828] bg-opacity-60  hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]'
//                   : 'bg-border-[0.5px] bg-opacity-30 bg-transparent hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]'
//               }`}
//             >
//               <button
//                 onClick={() => handleButtonClick(timeKey)}
//                 className='button-slanted-content w-full h-full flex items-center justify-center'
//               >
//                 {timeValue}
//               </button>
//               {showTimePicker && activeTime === timeKey && (
//                 <div className='absolute top-full'>
//                   <ReactTimePicker
//                     onChange={handleTimeChange}
//                     value={times[activeTime]}
//                     disableClock={true}
//                   />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TimePicker;


'use client'

import React, { useState, useCallback, useEffect } from 'react';
import ReactTimePicker from 'react-time-picker';
import { doGetCall } from '../../utils/api';

const TimePicker = ({ onTimeChange }) => {
  const [times, setTimes] = useState({});
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activeTime, setActiveTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlotType, setSelectedSlotType] = useState("normal");
  const [slotInterval, setSlotInterval] = useState(20);

  

  const handleButtonClick = (timeKey) => {
    setActiveTime(timeKey);
    setShowTimePicker(true);
  };

  const handleTimeChange = (value) => {
    setTimes(prevTimes => ({
      ...prevTimes,
      [activeTime]: value
    }));
    setShowTimePicker(false);
    // Pass the selected time to the parent component to update bookingDetails
    onTimeChange(value);
  };

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const timeEntries = Object.entries(times);
  const timeChunks = chunkArray(timeEntries, 6);

  const fetchBookings = useCallback(async () => {
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

      console.log("Fetched data:", data);

      const fetchedTimes = data.reduce((acc, slot) => {
        acc[`time${slot.time}`] = slot.time;
        return acc;
      }, {});
      setTimes(fetchedTimes);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }, [selectedDate, selectedSlotType, slotInterval]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <div >
      {timeChunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className='flex'>
          {chunk.map(([timeKey, timeValue]) => (
            <div
              key={timeKey}
              className={`button-slanted mt-[20px] cursor-pointer w-[120px] h-[51px] font-jura font-normal text-[#002718] hover:text-[#c09e5f] md:font-bold border-[0.5px] border-opacity-30 border-[#063828] text-[#063828]e m-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden ${
                chunkIndex === timeChunks.length - 1
                  ? ' bg-opacity-60  hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]'
                  : 'bg-border-[0.5px] bg-opacity-30 bg-transparent hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]'
              }`}
            >
              <button
                onClick={() => handleButtonClick(timeKey)}
                className='button-slanted-content w-full h-full flex items-center justify-center'
              >
                {timeValue}
              </button>
              {showTimePicker && activeTime === timeKey && (
                <div className='absolute top-full'>
                  <ReactTimePicker
                    onChange={handleTimeChange}
                    value={times[activeTime]}
                    disableClock={true}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TimePicker;
