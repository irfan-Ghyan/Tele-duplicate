// "use client";

// import React, { useState, useCallback, useEffect } from "react";
// import CalendarComponent from "../components/calendar/Calendar";
// import PlanSelector from "../components/planselector/PlanSelector";
// import { doGetCall, doPostCall } from "../utils/api";

// const Page = ({ onTimeChange = () => {} }) => {
//   const [count, setCount] = useState(1);
//   const [date, setDate] = useState(new Date());
//   const [bookingDetails, setBookingDetails] = useState([
//     { title: "Experience", description: "Race Session." },
//     { title: "Seats", description: "1 Person" },
//     { title: "Date & Time", description: "00/00, 00:00" },
//     { title: "Time", description: "00:00" },
//     { title: "Duration", description: "20 mins" },
//   ]);

//   const [times, setTimes] = useState({});
//   const [showTimePicker, setShowTimePicker] = useState(false);
//   const [activeTime, setActiveTime] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedSlotType, setSelectedSlotType] = useState("normal");
//   const [slotInterval, setSlotInterval] = useState(20);

//   const handleTimeChange = (value) => {
//     setTimes((prevTimes) => ({
//       ...prevTimes,
//       [activeTime]: value,
//     }));
//     setShowTimePicker(false);

//     const updatedDetails = bookingDetails.map((detail) => {
//       if (detail.title === "Time") {
//         return { ...detail, description: value };
//       }
//       return detail;
//     });

//     setBookingDetails(updatedDetails);
//     onTimeChange(value);
//   };

//   const increaseCount = () => {
//     const newCount = count + 1;
//     setCount(newCount);
//     updateSeatsDescription(newCount);
//   };

//   const decreaseCount = () => {
//     if (count > 1) {
//       const newCount = count - 1;
//       setCount(newCount);
//       updateSeatsDescription(newCount);
//     }
//   };

//   const handlePlanChange = (newDuration) => {
//     const updatedDetails = bookingDetails.map((detail) => {
//       if (detail.title === "Duration") {
//         return { ...detail, description: newDuration };
//       }
//       return detail;
//     });
//     setBookingDetails(updatedDetails);
//   };

//   const updateSeatsDescription = (newCount) => {
//     const newBookingDetails = bookingDetails.map((detail) => {
//       if (detail.title === "Seats") {
//         return {
//           ...detail,
//           description: `${newCount} Driver${newCount > 1 ? "s" : ""}`,
//         };
//       }
//       return detail;
//     });
//     setBookingDetails(newBookingDetails);
//   };

//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//     updateBookingDetailsForDate(newDate);
//   };

//   const updateBookingDetailsForDate = (newDate) => {
//     const formattedDate = newDate.toLocaleDateString();
//     const updatedDetails = bookingDetails.map((detail) => {
//       if (detail.title === "Date & Time") {
//         return { ...detail, description: formattedDate };
//       }
//       return detail;
//     });
//     setBookingDetails(updatedDetails);
//   };

//   const handleButtonClick = (timeKey, timeValue) => {
//     const updatedDetails = bookingDetails.map((detail) => {
//       if (detail.title === "Time") {
//         return { ...detail, description: timeValue };
//       }
//       return detail;
//     });

//     setBookingDetails(updatedDetails);
//     onTimeChange(timeValue);
//   };

//   const chunkArray = (array, chunkSize) => {
//     const result = [];
//     for (let i = 0; i < array.length; i += chunkSize) {
//       result.push(array.slice(i, i + chunkSize));
//     }
//     return result;
//   };

//   const timeEntries = Object.entries(times);
//   const timeChunks = chunkArray(timeEntries, 6);

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

//   // POST request handler function
//   const handleSubmit = async () => {
//     // Extracting necessary booking data from the bookingDetails state
//     const bookingData = {
//       name: "Rashid", // Replace with user input if applicable
//       phone: "123123", // Replace with user input if applicable
//       email: "rashid@teleios.ae", // Replace with user input if applicable
//       no_of_people: count.toString(), // The number of people
//       duration: slotInterval.toString(), // Duration from slotInterval state
//       date: date.toLocaleDateString("en-CA"), // The selected date in "YYYY-MM-DD" format
//       time:
//         bookingDetails.find((detail) => detail.title === "Time")?.description ||
//         "00:00", // Get the selected time
//       booking_type: "vip", // Replace with selected booking type if applicable
//     };
//     try {
//       const url =
//         "http://192.168.70.211:8000/api/content/setMultipleFieldValues";
//       const response = await doPostCall(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bookingData),
//       });

//       const data = await response.json();

//       if (data.success) {
//         console.log("Booking created successfully:", data);
//       } else {
//         console.error("Error creating booking:", data.message);
//       }
//     } catch (error) {
//       console.error("Error with POST request:", error);
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen overflow-x-hidden max-w-7xl mx-auto pb-[60px]">
//         <div className="my-[60px]">
//           <div class="flex justify-between items-center w-[407px] max-w-3xl mx-auto my-8">
//             <div class="relative">
//               <div class="ml-4 w-12 h-12 rounded-full bg-[#c09e5f] text-[#002718] hover:text-[#c09e5f] flex items-center justify-center mb-2 font-bold hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]">
//                 1
//               </div>
//               <div class="text-[14px] text-[#c09e5f] font-bold font-orbitron">
//                 Experiences
//               </div>
//             </div>
//             <div class="relative">
//               <div class="w-12 h-12 rounded-full bg-[#c09e5f] text-[#002718] flex items-center hover:text-[#c09e5f]  justify-center mb-2 font-bold hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]">
//                 2
//               </div>
//               <div class="text-[14px] text-[#c09e5f] font-bold font-orbitron">
//                 Payment
//               </div>
//               <div class="absolute top-[22px] right-full h-1 w-[120px] bg-[#c09e5f]"></div>
//             </div>
//             <div class="relative">
//               <div class="mr-4 w-12 h-12 rounded-full bg-[#c09e5f] text-[#002718] flex items-center hover:text-[#c09e5f] justify-center mb-2 font-bold hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]">
//                 3
//               </div>
//               <div class="text-[14px] text-[#c09e5f] font-bold font-orbitron">
//                 Thanks
//               </div>
//               <div class="absolute top-[22px] right-full h-1 w-[120px] bg-[#c09e5f]"></div>
//             </div>
//           </div>
//         </div>
//         <div className="flex">
//           <div className="left">
//             <div className="flex max-w-7xl ">
//               <div className="w-full flex">
//                 <div className="">
//                   <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[261px]">
//                     <h1 className="text-[23px] text-[#063828] font-black font-orbitron">
//                       Select Seats
//                     </h1>
//                     <div className="flex justify-between">
//                       <div className="py-4">
//                         <p className="text-[18px] text-[#063828] font-bold font-jura mb-4">
//                           Drivers must be at least 7 years old to race.
//                           <br />
//                           Teleios dome is 18+ from 5pm.
//                         </p>
//                         <p className="pt-[20px] text-[18px] text-[#063828] font-bold font-jura ">
//                           For 6+, Go back and select team racing.
//                         </p>
//                       </div>
//                       <div className="flex items-center justify-center mb-4 ">
//                         <button
//                           onClick={decreaseCount}
//                           className=" button-slanted text-[18px] cursor-pointer flex items-center justify-center px-[20px] py-[8px] border-[0.5px] border-opacity-30 border-[#063828] ml-2 font-jura font-bold text-[#063828] hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0"
//                         >
//                           <span className="button-slanted-content text-[#063828] hover:text-[#e3ce90] font-jura text-[18px] font-bold">
//                             -
//                           </span>
//                         </button>
//                         <span className="px-8 py-2 text-[23px] text-[#063828] font-jura font-black">
//                           {count}
//                         </span>
//                         <button
//                           onClick={increaseCount}
//                           className=" button-slanted text-[18px] cursor-pointer flex items-center justify-center px-[20px] py-[8px] border-[0.5px] border-opacity-30 border-[#063828] ml-2 font-jura font-bold text-[#063828] hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0"
//                         >
//                           <span className="button-slanted-content font-jura text-[18px] font-bold">
//                             +
//                           </span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[493px] my-[20px]">
//                       <h1 className="text-[23px] text-[#063828] font-black font-orbitron">
//                         Select Date
//                       </h1>
//                       <CalendarComponent
//                         onChange={handleDateChange}
//                         value={date}
//                       />
//                     </div>
//                   </div>
//                   <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[740px] my-[10px]">
//                     <h1 className="text-[23px] text-[#063828] font-black font-orbitron">
//                       Choose Time
//                     </h1>
//                     {timeChunks.map((chunk, chunkIndex) => (
//                       <div key={chunkIndex} className="flex">
//                         {chunk.map(([timeKey, timeValue]) => (
//                           <div
//                             key={timeKey}
//                             className={`button-slanted mt-[20px] cursor-pointer w-[120px] h-[51px] font-jura font-normal text-[#002718] hover:text-[#c09e5f] md:font-bold border-[0.5px] border-opacity-30 border-[#063828] text-[#063828]e m-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden ${
//                               chunkIndex === timeChunks.length - 1
//                                 ? " bg-opacity-60  hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]"
//                                 : "bg-border-[0.5px] bg-opacity-30 bg-transparent hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]"
//                             }`}
//                           >
//                             <button
//                               onClick={() =>
//                                 handleButtonClick(timeKey, timeValue)
//                               }
//                               className="button-slanted-content w-full h-full flex items-center justify-center"
//                             >
//                               {timeValue}
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     ))}
//                   </div>
//                   <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[183px] my-[20px]">
//                     <h1 className="text-[23px] text-[#063828] font-black font-orbitron">
//                       Duration
//                     </h1>
//                     <PlanSelector onPlanChange={handlePlanChange} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="w-[386px] bg-[#e3ce90] ml-[20px] p-[30px]">
//             <h2 className="text-[18px] text-[#063828] font-black font-orbitron mb-[24px]">
//               Your booking details
//             </h2>
//             {bookingDetails.map((detail, index) => (
//               <div
//                 className="border-b-[0.5px] border-opacity-[50%] border-[#063828] py-[12px]"
//                 key={index}
//               >
//                 <h3 className="text-[18px] text-[#063828] font-bold font-orbitron">
//                   {detail.title}
//                 </h3>
//                 <p className="text-[18px] text-[#063828] font-jura py-2">
//                   {detail.description}
//                 </p>
//               </div>
//             ))}
//             <div className="max-w-3xl mx-auto bg-[#e3ce90] rounded-lg ">
//               <h1 className="text-[18px] text-[#063828] font-black font-orbitron mb-4 mt-[20px]">
//                 Price From
//               </h1>
//               <div className="flex justify-between items-center mb-4">
//                 <p className="text-[18px] text-[#063828] font-normal font-jura">
//                   Price
//                 </p>
//                 <p className="text-[18px] text-[#063828] font-normal font-jura">
//                   250<span className="text-[#A063828]">AED</span>
//                 </p>
//               </div>
//               <p className="text-[18px] text-[#063828] font-normal font-jura">
//                 Total cost will be calculated at the next step
//               </p>
//               <button
//                 onClick={handleSubmit}
//                 className="button-slanted mt-[20px] w-full ursor-pointer flex items-center justify-center px-[20px] py-[8px] ml-2 font-jura font-bold text-[#c09e5f] bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0"
//               >
//                 <span className="button-slanted-content py-2">CONTINUE</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Page;







"use client";

import React, { useState, useCallback, useEffect } from "react";
import CalendarComponent from "../components/calendar/Calendar";
import PlanSelector from "../components/planselector/PlanSelector";
import { doGetCall, doPostCall } from "../utils/api";
import BookingType from "../components/bookingtype/BookingType";

const Page = ({ onTimeChange }) => {
  const [count, setCount] = useState(1);
  const [date, setDate] = useState(new Date());
  const [bookingDetails, setBookingDetails] = useState([
   
    { title: "no_of_people", description: "0" },
    { title: "date", description: "17-11-2024" },
    { title: "time", description: "01:00" }, 
    { title: "booking_type", description: "vip" },
    { title: "duration", description: "20" }, 
  ]);
  
  

  const [times, setTimes] = useState({});
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activeTime, setActiveTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlotType, setSelectedSlotType] = useState("normal");
  const [slotInterval, setSlotInterval] = useState(20);

  const [bookingType, setBookingType] = useState("normal");

  const handleBookingTypeChange = (type) => {
    // Update the bookingDetails state with the selected booking type
    setBookingDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.title === "booking_type" ? { ...detail, description: type } : detail
      )
    );
    setBookingType(type); // Set the bookingType state as well
  };

  const handleTimeChange = (value) => {
    setTimes((prevTimes) => ({
      ...prevTimes,
      [activeTime]: value,
    }));
    setShowTimePicker(false);

    const updatedDetails = bookingDetails.map((detail) => {
      if (detail.title === "Time") {
        return { ...detail, description: value };
      }
      return detail;
    });

    setBookingDetails(updatedDetails);
    onTimeChange(value);
  };



  const updateBookingDetail = (field, value) => {
    setBookingDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.title === field ? { ...detail, description: value } : detail
      )
    );
  };


  const increaseCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateBookingDetail("no_of_people", newCount.toString());
  };
  
  const decreaseCount = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      updateBookingDetail("no_of_people", newCount.toString());
    }
  };

  const handlePlanChange = (newDuration) => {
    updateBookingDetail("duration", newDuration);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    updateBookingDetail("date", newDate.toLocaleDateString("en-CA"));
  };

  const handleButtonClick = (timeValue) => {
    updateBookingDetail("time", timeValue);
  };
  
  const updateSeatsDescription = (newCount) => {
    const newBookingDetails = bookingDetails.map((detail) => {
      if (detail.title === "Seats") {
        return {
          ...detail,
          description: `${newCount} Driver${newCount > 1 ? "s" : ""}`,
        };
      }
      return detail;
    });
    setBookingDetails(newBookingDetails);
  };


  const updateBookingDetailsForDate = (newDate) => {
    const formattedDate = newDate.toLocaleDateString();
    const updatedDetails = bookingDetails.map((detail) => {
      if (detail.title === "Date & Time") {
        return { ...detail, description: formattedDate };
      }
      return detail;
    });
    setBookingDetails(updatedDetails);
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
      const url = `http://192.168.70.211:8000/api/bookings/availableSlots?${queryString}`;
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

  const handleSubmit = async () => {
    // Extract the required data from bookingDetails
    const bookingData = {
  
      no_of_people: bookingDetails.find((detail) => detail.title === "no_of_people")?.description || "1",
      duration: bookingDetails.find((detail) => detail.title === "duration")?.description || "20", 
      date: bookingDetails.find((detail) => detail.title === "date")?.description || "2024-10-29", 
      time: bookingDetails.find((detail) => detail.title === "time")?.description || "00:00", 
      booking_type: bookingDetails.find((detail) => detail.title === "booking_type")?.description || "normal", 
      
    };
  
    console.log("Booking data:", bookingData);
    try {
      const url = "http://192.168.70.211.:8000/api/bookings"; 
      const response = await doPostCall(url, bookingData );
  
      const data = await response.json();
  
      if (data.success) {
        console.log("Booking created successfully:", data);
      } else {
        console.error("Error creating booking:", data.message);
      }
    } catch (error) {
      console.error("Error with POST request:", error);
    }
  };
  
  return (
    <>
      <div className="min-h-screen overflow-x-hidden max-w-7xl mx-auto pb-[60px]">
        {/* <div className="my-[60px]">
          <div class="flex justify-between items-center w-[407px] max-w-3xl mx-auto my-8">
            <div class="relative">
              <div class="ml-4 w-12 h-12 rounded-full bg-[#c09e5f] text-[#002718] hover:text-[#c09e5f] flex items-center justify-center mb-2 font-bold hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]">
                1
              </div>
              <div class="text-[14px] text-[#c09e5f] font-bold font-orbitron">
                Experiences
              </div>
            </div>
            <div class="relative">
              <div class="w-12 h-12 rounded-full bg-[#c09e5f] text-[#002718] flex items-center hover:text-[#c09e5f]  justify-center mb-2 font-bold hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]">
                2
              </div>
              <div class="text-[14px] text-[#c09e5f] font-bold font-orbitron">
                Payment
              </div>
              <div class="absolute top-[22px] right-full h-1 w-[120px] bg-[#c09e5f]"></div>
            </div>
            <div class="relative">
              <div class="mr-4 w-12 h-12 rounded-full bg-[#c09e5f] text-[#002718] flex items-center hover:text-[#c09e5f] justify-center mb-2 font-bold hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]">
                3
              </div>
              <div class="text-[14px] text-[#c09e5f] font-bold font-orbitron">
                Thanks
              </div>
              <div class="absolute top-[22px] right-full h-1 w-[120px] bg-[#c09e5f]"></div>
            </div>
          </div>
        </div> */}
        <div className="flex my-20">
          <div className="left">
            <div className="flex max-w-7xl ">
              <div className="w-full flex">
                <div className="">
                  <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[261px]">
                    <h1 className="text-[23px] text-[#063828] font-black font-orbitron">
                      Select Seats
                    </h1>
                    <div className="flex justify-between">
                      <div className="py-4">
                        <p className="text-[18px] text-[#063828] font-bold font-jura mb-4">
                          Drivers must be at least 7 years old to race.
                          <br />
                          Teleios dome is 18+ from 5pm.
                        </p>
                        <p className="pt-[20px] text-[18px] text-[#063828] font-bold font-jura ">
                          For 6+, Go back and select team racing.
                        </p>
                      </div>
                      <div className="flex items-center justify-center mb-4 ">
                        <button
                          onClick={decreaseCount}
                          className=" button-slanted text-[18px] cursor-pointer flex items-center justify-center px-[20px] py-[8px] border-[0.5px] border-opacity-30 border-[#063828] ml-2 font-jura font-bold text-[#063828] hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0"
                        >
                          <span className="button-slanted-content text-[#063828] hover:text-[#e3ce90] font-jura text-[18px] font-bold">
                            -
                          </span>
                        </button>
                        <span className="px-8 py-2 text-[23px] text-[#063828] font-jura font-black">
                          {count}
                        </span>
                        <button
                          onClick={increaseCount}
                          className=" button-slanted text-[18px] cursor-pointer flex items-center justify-center px-[20px] py-[8px] border-[0.5px] border-opacity-30 border-[#063828] ml-2 font-jura font-bold text-[#063828] hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0"
                        >
                          <span className="button-slanted-content font-jura text-[18px] font-bold">
                            +
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[493px] my-[20px]">
                      <h1 className="text-[23px] text-[#063828] font-black font-orbitron">
                        Select Date
                      </h1>
                      <CalendarComponent
                        onChange={handleDateChange}
                        value={date}
                      />
                    </div>
                  </div>
                  <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[740px] my-[10px]">
                    <h1 className="text-[23px] text-[#063828] font-black font-orbitron">
                      Choose Time
                    </h1>
                    {timeChunks.map((chunk, chunkIndex) => (
                      <div key={chunkIndex} className="flex">
                        {chunk.map(([timeKey, timeValue]) => (
                          <div
                            key={timeKey}
                            className={`button-slanted mt-[20px] cursor-pointer w-[120px] h-[51px] font-jura font-normal text-[#002718] hover:text-[#c09e5f] md:font-bold border-[0.5px] border-opacity-30 border-[#063828] text-[#063828]e m-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden ${
                              chunkIndex === timeChunks.length - 1
                                ? " bg-opacity-60  hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]"
                                : "bg-border-[0.5px] bg-opacity-30 bg-transparent hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]"
                            }`}
                          >
                            <button
                              onClick={() =>
                                handleButtonClick(timeKey, timeValue)
                              }
                              className="button-slanted-content w-full h-full flex items-center justify-center"
                            >
                              {timeValue}
                            </button>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[183px] my-[20px]">
                    <h1 className="text-[23px] text-[#063828] font-black font-orbitron">
                      Booking Type
                    </h1>
                    <BookingType selectedBookingType={bookingType} onBookingTypeChange={handleBookingTypeChange} />
                  </div>
                  <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[183px] my-[20px]">
                    <h1 className="text-[23px] text-[#063828] font-black font-orbitron">
                      Duration
                    </h1>
                    <PlanSelector onPlanChange={handlePlanChange} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[386px] bg-[#e3ce90] ml-[20px] p-[30px]">
            <h2 className="text-[18px] text-[#063828] font-black font-orbitron mb-[24px]">
              Your booking details
            </h2>
            {bookingDetails.map((detail, index) => (
              <div
                className="border-b-[0.5px] border-opacity-[50%] border-[#063828] py-[12px]"
                key={index}
              >
                <h3 className="text-[18px] text-[#063828] font-bold font-orbitron">
                  {detail.title}
                </h3>
                <p className="text-[18px] text-[#063828] font-jura py-2">
                  {detail.description}
                </p>
              </div>
            ))}
            <div className="max-w-3xl mx-auto bg-[#e3ce90] rounded-lg ">
              <h1 className="text-[18px] text-[#063828] font-black font-orbitron mb-4 mt-[20px]">
                Price From
              </h1>
              <div className="flex justify-between items-center mb-4">
                <p className="text-[18px] text-[#063828] font-normal font-jura">
                  Price
                </p>
                <p className="text-[18px] text-[#063828] font-normal font-jura">
                  250<span className="text-[#A063828]">AED</span>
                </p>
              </div>
              <p className="text-[18px] text-[#063828] font-normal font-jura">
                Total cost will be calculated at the next step
              </p>
              <button
                onClick={handleSubmit}
                className="button-slanted mt-[20px] w-full ursor-pointer flex items-center justify-center px-[20px] py-[8px] ml-2 font-jura font-bold text-[#c09e5f] bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0"
              >
                <span className="button-slanted-content py-2">CONTINUE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
