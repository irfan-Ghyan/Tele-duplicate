// "use client";

// import React, { useState, useCallback, useEffect } from "react";
// import CalendarComponent from "../components/calendar/Calendar";
// import PlanSelector from "../components/planselector/PlanSelector";
// import { doGetCall, doPostCall } from "../utils/api";
// // import BookingType from "../components/bookingtype/BookingType";
// // import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// const Page = ({ params } ) => {
//   const router = useRouter();
//   const { id } = params;

//   const [count, setCount] = useState(1);
//   const [date, setDate] = useState(new Date());


//   const [bookingDetails, setBookingDetails] = useState([
//     { key: "name", title: "Name", description: "" },
//     { key: "no_of_people", title: "Number of People", description: "1" },
//     { key: "date", title: "Date", description: "" },
//     { key: "time", title: "Time", description: "" },
//     { key: "booking_type", title: "Booking Type", description: "Normal" },
//     { key: "duration", title: "Duration", description: "20 Min" },
//   ]);
  

//   const [times, setTimes] = useState({});
//   const [showTimePicker, setShowTimePicker] = useState(false);
//   const [activeTime, setActiveTime] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedSlotType, setSelectedSlotType] = useState("normal");
//   const [slotInterval, setSlotInterval] = useState(20);
//   const [eventDetails, setEventDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [generalError, setGeneralError] = useState("");
//   const [bookingErrors, setBookingErrors] = useState([]);
//   const [seatError, setSeatError] = useState("");


//   const [minDate, setMinDate] = useState(null);
//   const [maxDate, setMaxDate] = useState(null); 

//   const [bookingType, setBookingType] = useState("normal");

//   const [activeTab, setActiveTab] = useState(1);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     // cardNumber: "",
//     // expiryDate: "",
//     // securityCode: "",
//     // cardHolderName: "",
//   });
//   const [validationErrors, setValidationErrors] = useState({});

  
//   useEffect(() => {
//     if (id) fetchEventDetails();
//     setBookingDetails((prevDetails) =>
//       prevDetails.map((detail) =>
//         detail.title === "name" ? { ...detail, description: formData.firstName } : detail
//       )
//     );
//   }, [id, formData.firstName]);

//   const fetchEventDetails = async () => {
//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; 
//       const response = await fetch(`${baseUrl}/api/content/sections/${id}`);
//       const data = await response.json();
//       console.log("Fetched Event Details:", data);
//       setEventDetails(data);
//     } catch (error) {
//       console.error("Error fetching event details:", error);
//     }
//   };


//   const handleBookingTypeChange = (type) => {
//     setBookingDetails((prevDetails) =>
//       prevDetails.map((detail) =>
//         detail.key === "booking_type" ? { ...detail, description: type } : detail
//       )
//     );
//     setBookingType(type);
//   };

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


//   // const updateBookingDetail = (field, value) => {
//   //   setBookingDetails((prevDetails) =>
//   //     prevDetails.map((detail) =>
//   //       detail.title === field ? { ...detail, description: value } : detail
//   //     )
//   //   );
//   // };
//   const updateBookingDetail = (key, value) => {
//     setBookingDetails((prevDetails) =>
//       prevDetails.map((detail) =>
//         detail.key === key ? { ...detail, description: value } : detail
//       )
//     );
//   };

//   const increaseCount = () => {
//     if (count < 14) {
//       const newCount = count + 1;
//       //step 2
//       //access the number of available sims and check if the count is smaller or not
//         //if count gets bigger
//           //show error message and keep count equal to the available sims
//           //let the user increase the max capacity
//           //de-select the time slot that was selected and re-fetch slots on each click (whenever increaseCount function runs fetch fresh slots)
          

          
//       setCount(newCount);
//       updateBookingDetail("no_of_people", newCount.toString());
//       setSeatError("");
//     } else {
//       setSeatError("Maximum limit of 14 seats reached.");
//     }
//   };
  
//   const decreaseCount = () => {
//     if (count > 1) {
//       const newCount = count - 1;
//       setCount(newCount);
//       updateBookingDetail("no_of_people", newCount.toString());
//       setSeatError("");  // Clear error message if count is valid
//     }
//   };

//   const handlePlanChange = (newDuration) => {

//     //step 4
//       // 1 - fetch fresh time slots
//       // 2 - de-select time slot if that slot for that many people is not available 

//     updateBookingDetail("duration", newDuration);
//   };

//   const handleDateChange = (newDate) => {
//     //step 3

//     //when clicked a day
//      // 1 - fetch fresh time slots
//       // 2 - deselect the selected time slot ( de select only if this slot is not available on this day for this many people)
     
      
    
//     setDate(newDate);
//     updateBookingDetail("date", newDate.toLocaleDateString("en-CA"));

//     const selectedDate = new Date(newDate);
//     setMinDate(selectedDate); 

//     const formattedDate = newDate.toLocaleDateString("en-CA"); 

//     updateBookingDetail("date", formattedDate);
//     const nextDate = new Date(selectedDate);
//     nextDate.setDate(selectedDate.getDate() + 1);
//     setMaxDate(nextDate);
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


//     // step 1
//   //save available number of sim for the clicked slot 
//   //available sims are fetched when slots are fetched
//   //To-Do:
//     // available sims for this clicked slots needs to be saved so we can access them in number of people counter
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
//       no_of_people: count.toString(),
//       date: selectedDate,
//       duration: slotInterval.toString(),
//       booking_type: selectedSlotType,
//     };

//     const queryString = new URLSearchParams(payload).toString();

//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//       const url = `${baseUrl}/api/bookings/availableSlots?${queryString}`;
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
  
//   const goBack = () => {
//     if (activeTab === 1) {
//       router.push("/experience");
//     } else {
//       setActiveTab(prevTab => Math.max(prevTab - 1, 1));
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//     setValidationErrors({
//       ...validationErrors,
//       [name]: "",
//     });
//   };

//   const validateForm = () => {
//     const errors = {};
  
//     if (!formData.firstName.trim()) {
//       errors.firstName = "First name is required.";
//     }
//     if (!formData.lastName.trim()) {
//       errors.lastName = "Last name is required.";
//     }
//     if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "A valid email is required.";
//     }
//     if (!formData.phone.trim() || !/^\d+$/.test(formData.phone)) {
//       errors.phone = "A valid phone number is required.";
//      }
//     // if (!formData.cardNumber.trim() || !/^\d{16}$/.test(formData.cardNumber)) {
//     //   errors.cardNumber = "Card number must be 16 digits.";
//     // }
//     // if (!formData.expiryDate.trim() || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
//     //   errors.expiryDate = "Expiry date must be in MM/YY format.";
//     // }
//     // if (!formData.securityCode.trim() || !/^\d{3,4}$/.test(formData.securityCode)) {
//     //   errors.securityCode = "CVV must be 3 or 4 digits.";
//     // }
//     // if (!formData.cardHolderName.trim()) {
//     //   errors.cardHolderName = "Cardholder name is required.";
//     // }
  
//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); 
//     const errors = {};
  
//     const bookingData = {
//       name: bookingDetails.find((detail) => detail.key === "name")?.description || "",
//       phone: bookingDetails.find((detail) => detail.key === "phone")?.description || "",
//       email: bookingDetails.find((detail) => detail.key === "email")?.description || "",
//       no_of_people: bookingDetails.find((detail) => detail.key === "no_of_people")?.description || "0",
//       duration: parseInt(bookingDetails.find((detail) => detail.key === "duration")?.description || "20", 10),
//       date: bookingDetails.find((detail) => detail.key === "date")?.description,
//       time: bookingDetails.find((detail) => detail.key === "time")?.description || "00:00",
//       booking_type: bookingDetails.find((detail) => detail.key === "booking_type")?.description || "",
//     };
  
//     const paymentData = {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//       phone: formData.phone,
//       // address: formData.address,
//       // city: formData.city,
  
//       // cardNumber: formData.cardNumber,
//       // expiryDate: formData.expiryDate,
//       // securityCode: formData.securityCode,
//       // cardHolderName: formData.cardHolderName,
//       // billingAddress: formData.billingAddress,
//     };
  
//     // const fullBookingData = { ...bookingData, ...paymentData };
  
//     // if (validateForm()) {
//     //   console.log("Form is valid. Proceeding to submit:", formData);
//     // } else {
//     //   console.error("Form validation failed.");
//     // }

//     if (!formData.firstName.trim()) errors.firstName = "First name is required.";
//     if (!formData.lastName.trim()) errors.lastName = "Last name is required.";
//     if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "A valid email is required.";
//     }
//     // if (!formData.phone.trim() || !/^\d+$/.test(formData.phone)) {
//     //   errors.phone = "A valid phone number is required.";
//     // }
//     // if (!formData.cardNumber.trim() || !/^\d{16}$/.test(formData.cardNumber)) {
//     //   errors.cardNumber = "Card number must be 16 digits.";
//     // }
//     // if (!formData.expiryDate.trim() || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
//     //   errors.expiryDate = "Expiry date must be in MM/YY format.";
//     // }
//     // if (!formData.securityCode.trim() || !/^\d{3,4}$/.test(formData.securityCode)) {
//     //   errors.securityCode = "CVV must be 3 or 4 digits.";
//     // }
//     // if (!formData.cardHolderName.trim()) {
//     //   errors.cardHolderName = "Cardholder name is required.";
//     // }
  
//     // Update state with validation errors
//     setValidationErrors(errors);
  
//     if (Object.keys(errors).length > 0) {
//       setGeneralError("Please fix the errors above before proceeding.");
//       return;
//     }
  
//     // If no validation errors, clear general error and proceed
//     setGeneralError("");
//     handleTabChange(3);

  
//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//       const url = `${baseUrl}/api/bookings`; 
//       const response = await doPostCall(url,        
//         { ...bookingData, ...paymentData },
//         {"Content-Type": "application/json"},
//       );
  
//       const data = await response.json();
//       console.log("Booking successfully:", data)
  
//       if (data.success) {
//         console.log("Booking and payment saved successfully:", data);
//       } else {
//         console.error("Error saving booking/payment:", data.message);
//       }
//     } catch (error) {
//       console.error("Error with POST request:", error);
//     }
//   };



//   // Tab 1: Create Booking
//   const handleCreateBooking = () => {
//     // You can implement your logic to create the booking here.
//     console.log("Create Booking logic...");
//   };

//   // Tab 2: Payment
//   const handlePayment = () => {
//     // Implement the payment logic here (for instance, invoking a payment gateway API).
//     console.log("Payment logic...");
//   };

//   // Tab 3: Thank You
//   const handleThankYou = () => {
//     // Show thank you message after successful booking and payment.
//     console.log("Thank you logic...");
//   };

//   const handleButtonClick = (timeKey, timeValue) => {
//     setActiveTime(timeKey);
//     updateBookingDetail("time", timeValue);
//   };

//   const validateBookingDetails = () => {
//     const errors = [];
  
//     bookingDetails.forEach((detail) => {
//       if (detail.key !== "name" && (!detail.description || detail.description.trim() === "")) {
//         errors.push(`The field "${detail.title}" is required.`);
//       }
//     });
  
//     setBookingErrors(errors);
//     return errors.length === 0;
//   };
//   const handleTabChange = (tabIndex) => {
//       if (tabIndex === 2 && !validateBookingDetails()) {
//         return;
//       }
    
//       setActiveTab(tabIndex);
//   };
  
//   function formatToAMPM(time) {
//     const [hours, minutes] = time.split(':').map(Number); // Split and convert to numbers
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
//     return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
//   }
  
//   return (
//     <>
//       <div className="min-h-screen overflow-x-hidden max-w-7xl mx-auto pb-[60px]">
//       <button
//           className="text-[#e3ce90]"
//           onClick={goBack} 
//         >
//           Go back
//         </button>

//         <div className="my-[60px] ">
//             <div className="flex justify-between items-center w-[407px] max-w-7xl mx-auto my-8">
//                     <div className="relative">
//                     <div
//                         className={`ml-4 w-12 h-12 rounded-full ${activeTab === 1 ? 'bg-green-500' : 'bg-[#c09e5f]'} text-[#002718] flex items-center justify-center mb-2 font-bold hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]`}
//                         onClick={() => handleTabChange(1)}  // Add a click handler to set active tab to 1
//                     >
//                         1
//                     </div>
//                     <div className={`text-[14px] ${activeTab === 1 ? 'text-white' : 'text-[#c09e5f]'} font-bold font-orbitron`}>
//                         Experiences
//                     </div>
//                     </div>
//                     <div className="relative">
//                     <div
//                         className={`w-12 h-12 rounded-full ${activeTab === 2 ? 'bg-green-500' : 'bg-[#c09e5f]'} text-[#002718] flex items-center justify-center mb-2 font-bold hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]`}
//                         // Add a click handler to set active tab to 2
//                     >
//                         2
//                     </div>
//                     <div className={`text-[14px] ${activeTab === 2 ? 'text-white' : 'text-[#c09e5f]'} font-bold font-orbitron`}>
//                         Payment
//                     </div>
//                     <div className="absolute top-[22px] right-full h-1 w-[120px] bg-[#c09e5f]"></div>
//                     </div>
//                     <div className="relative">
//                     <div
//                         className={`mr-4 w-12 h-12 rounded-full ${activeTab === 3 ? 'bg-green-500' : 'bg-[#c09e5f]'} text-[#002718] flex items-center justify-center mb-2 font-bold hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]`}
//                         onClick={() => handleTabChange(3)} 
//                     >
//                         3
//                     </div>
//                     <div className={`text-[14px] ${activeTab === 3 ? 'text-white' : 'text-[#c09e5f]'} font-bold font-orbitron`}>
//                         Thanks
//                     </div>
//                     <div className="absolute top-[22px] right-full h-1 w-[120px] bg-[#c09e5f]"></div>
//                     </div>
//                 </div>
//         </div>
        

//       {activeTab === 1 && (
//         <div className="flex my-20">
//           <div className="left">
//             <div className="flex max-w-7xl ">
//               <div className="w-full flex">
//                 <div className="">

//                   <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[200px]">
//                     <h1 className="text-[23px] text-[#063828] font-black font-orbitron">
//                       Select Seats
//                     </h1>
//                     <div className="flex justify-between">
//                       <div className="py-4">
//                         <p className="text-[18px] text-[#063828] font-bold font-jura mb-4">
//                           Select your seats
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
//                     {seatError && (
//                         <p className="text-red-500 text-sm mt-2">{seatError}</p>
//                       )}
//                   </div>

                 
//                   <div className="my-4">
//                     <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[605px]">
//                       <h1 className="text-[23px] text-[#063828] font-black font-orbitron">
//                         Select Date
//                       </h1>
//                       <CalendarComponent
//                            onChange={handleDateChange}
//                            value={date}
//                            minDate={minDate} 
//                       />
//                     </div>
//                   </div>

//                   {/* <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[700px] my-[10px]">
//                   <h1 className="text-[23px] text-[#063828] font-black font-orbitron">Choose Time</h1>
//                   {timeChunks.map((chunk, chunkIndex) => {
//                     const now = new Date();
//                     const currentDate = now.toLocaleDateString("en-CA");
//                     const selectedDateStr = date.toLocaleDateString("en-CA");

//                     const hasActiveSlot = chunk.some(([timeKey, timeValue]) => {
//                       const [hours, minutes] = timeValue.split(":").map(Number);
//                       const slotTime = hours * 60 + minutes;

//                       const startTime = selectedDateStr === currentDate ? now.getHours() * 60 + now.getMinutes() : 540;

//                       return slotTime >= startTime;
//                     });

//                     if (!hasActiveSlot) {
//                       return null;
//                     }

//                     return (
//                       <div key={chunkIndex} className="flex">
//                         {chunk.map(([timeKey, timeValue], index) => {
//                           const [hours, minutes] = timeValue.split(":").map(Number);
//                           const slotTime = hours * 60 + minutes;

//                           const startTime = selectedDateStr === currentDate ? now.getHours() * 60 + now.getMinutes() : 540;
//                           const isNearestFutureSlot = !activeTime && slotTime >= startTime;

//                           return (
//                             <div
//                               key={timeKey}
//                               className={`button-slanted mt-[20px] cursor-pointer w-[110px] h-[51px] font-jura font-normal text-[#002718] mx-2 ${
//                                 isNearestFutureSlot || timeKey === activeTime
//                                   ? "border-2 border-[#002718] text-[#063828] font-bold" 
//                                   : "hover:text-[#c09e5f] md:font-bold border-[0.5px] border-opacity-100 border-[#c09e5f] text-[#c09e5f]"
//                               } transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden ${
//                                 slotTime < startTime ? "opacity-40 cursor-not-allowed" : ""
//                               }`}
//                             >
//                              <button
//                               onClick={() => handleButtonClick(timeKey, timeValue)}
//                               className="button-slanted-content w-full h-full flex items-center justify-center"
//                               disabled={slotTime < startTime}
//                             >
//                               {formatToAMPM(timeValue)}
//                             </button>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     );
//                   })}
//                 </div>; */}


                
//                 <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[740px] my-[10px]">
//                   <h1 className="text-[23px] text-[#063828] font-black font-orbitron">Choose Time</h1>
//                   {timeChunks.map((chunk, chunkIndex) => {
//                     const now = new Date();
//                     const currentDate = now.toLocaleDateString("en-CA");
//                     const selectedDateStr = date.toLocaleDateString("en-CA");

//                     const hasActiveSlot = chunk.some(([timeKey, timeValue]) => {
//                       const [hours, minutes] = timeValue.split(":").map(Number);
//                       const slotTime = hours * 60 + minutes;

//                       const startTime = selectedDateStr === currentDate ? now.getHours() * 60 + now.getMinutes() : 540;

//                       return slotTime >= startTime;
//                     });

//                     if (!hasActiveSlot) {
//                       return null;
//                     }

//                     return (
//                       <div key={chunkIndex} className="flex">
//                         {chunk.map(([timeKey, timeValue], index) => {
//                           const [hours, minutes] = timeValue.split(":").map(Number);
//                           const slotTime = hours * 60 + minutes;

//                           const startTime = selectedDateStr === currentDate ? now.getHours() * 60 + now.getMinutes() : 540;

//                           return (
//                             <div
//                               key={timeKey}
//                               className={`button-slanted mt-[20px] cursor-pointer w-[110px] h-[51px] font-jura font-normal text-[#002718] hover:bg-[#002718] mx-2 ${
//                                 slotTime >= startTime
//                                   ? timeKey === activeTime
//                                     ? "bg-[#002718] text-white font-bold border-2 border-[#002718] "
//                                     : "hover:text-[#c09e5f] md:font-bold border-[0.5px] border-opacity-30 border-[#002718] text-[#002718]"
//                                   : "opacity-50 cursor-not-allowed"
//                               } transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden`}
//                             >
//                               <button
//                                 onClick={() => handleButtonClick(timeKey, timeValue)}
//                                 className="button-slanted-content w-full h-full flex items-center justify-center"
//                                 disabled={slotTime < startTime}
//                               >
//                                 {formatToAMPM(timeValue)}
//                               </button>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     );
//                   })}
//                 </div>;



//                   {/* <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[183px] my-[20px]">
//                     <h1 className="text-[23px] text-[#063828] font-black font-orbitron">
//                       Booking Type
//                     </h1>
//                     <BookingType selectedBookingType={bookingType} onBookingTypeChange={handleBookingTypeChange} />
//                   </div> */}
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
//             <h2 className="text-[30px] text-[#063828] font-black font-orbitron mb-[24px]">
//               Your booking details
//             </h2>
//             {bookingDetails.map((detail, index) => (
//             <div
//               className="border-b-[0.5px] border-opacity-[50%] border-[#063828] py-[12px]"
//               key={detail.key}
//             >
//               <h3 className="text-[18px] text-[#063828] font-bold font-orbitron">
//                 {detail.title}
//               </h3>
//               <p className="text-[18px] text-[#063828] font-jura py-2">
//                 {detail.description}
//               </p>
//             </div>
//           ))}
//                 {bookingErrors.length > 0 && (
//                 <ul className="text-red-500 text-sm mt-4">
//                   {bookingErrors.map((error, index) => (
//                     <li key={index}>{error}</li>
//                   ))}
//                 </ul>
//               )}
//             <div className="max-w-3xl mx-auto bg-[#e3ce90] rounded-lg mt-20">
    
//               <button
//                 onClick={() => handleTabChange(2)} 
                
//                 className="button-slanted mt-[20px] w-full ursor-pointer flex items-center justify-center px-[20px] py-[8px] ml-2 font-jura font-bold text-[#c09e5f] bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0"
//               >
//                 <span className="button-slanted-content py-2">CONTINUE</span>
//               </button>
//             </div>
//           </div>
//         </div>
        
//       )}


//     {activeTab === 2 && (
//       <div className="bg-[#e3ce90] shadow-lg w-full max-w-4xl p-20">
//         <h2 className="text-4xl font-black font-jura text-[#063828] mb-4">Payment Details</h2>
//         <form onSubmit={handleSubmit} >
//   <div className="space-y-4">
//     <div className="grid grid-cols-2 gap-4">
//       <div>
//         <label htmlFor="firstName" className="block text-lg font-jura font-bold text-[#063828]">
//           First Name
//         </label>
//         <input
//           type="text"
//           id="firstName"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//           className="mt-1 px-4 py-2 w-full"
//         />
//         {validationErrors.firstName && (
//           <p className="text-red-500 text-sm">{validationErrors.firstName}</p>
//         )}
//       </div>
//       <div>
//         <label htmlFor="lastName" className="block text-lg font-medium text-[#063828]">
//           Last Name
//         </label>
//         <input
//           type="text"
//           id="lastName"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleChange}
//           className="mt-1 px-4 py-2 w-full"
//         />
//         {validationErrors.lastName && (
//           <p className="text-red-500 text-sm">{validationErrors.lastName}</p>
//         )}
//       </div>
//     </div>

//     <div>
//       <label htmlFor="email" className="block text-lg font-jura font-bold text-[#063828]">
//         Email Address
//       </label>
//       <input
//         type="email"
//         id="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         className="mt-1 px-4 py-2 w-full"
//       />
//       {validationErrors.email && (
//         <p className="text-red-500 text-sm">{validationErrors.email}</p>
//       )}
//     </div>

//     <div>
//       <label htmlFor="phone" className="block text-lg font-jura font-bold text-[#063828]">
//         Phone
//       </label>
//       <input
//         type="tel"
//         id="phone"
//         name="phone"
//         value={formData.phone}
//         onChange={handleChange}
//         className="mt-1 px-4 py-2 w-full"
//       />
//       {validationErrors.phone && (
//         <p className="text-red-500 text-sm">{validationErrors.phone}</p>
//       )}
//     </div>
//   </div>

//   {/* Payment Information */}
//   {/* <div className="space-y-4 mt-6">
//     <h1 className="text-4xl font-black font-jura text-[#063828] mt-20">Payment</h1>

//     <div>
//       <label htmlFor="cardNumber" className="block text-lg font-jura font-bold text-[#063828]">
//         Card Number
//       </label>
//       <input
//         type="text"
//         id="cardNumber"
//         name="cardNumber"
//         value={formData.cardNumber}
//         onChange={handleChange}
//         className="mt-1 px-4 py-2 w-full"
//         placeholder="xxxx xxxx xxxx xxxx"
//       />
//       {validationErrors.cardNumber && (
//         <p className="text-red-500 text-sm">{validationErrors.cardNumber}</p>
//       )}

      
//     </div>

//     <div className="grid grid-cols-2 gap-4">
//       <div>
//         <label htmlFor="expiryDate" className="block text-lg font-jura font-bold text-[#063828]">
//           Expiry Date
//         </label>
//         <input
//           type="text"
//           id="expiryDate"
//           name="expiryDate"
//           value={formData.expiryDate}
//           onChange={handleChange}
//           className="mt-1 px-4 py-2 w-full"
//           placeholder="MM/YY"
//         />
//         {validationErrors.expiryDate && (
//           <p className="text-red-500 text-sm">{validationErrors.expiryDate}</p>
//         )}
//       </div>
//       <div>
//         <label htmlFor="securityCode" className="block text-lg font-jura font-bold text-[#063828]">
//           Security Code
//         </label>
//         <input
//           type="text"
//           id="securityCode"
//           name="securityCode"
//           value={formData.securityCode}
//           onChange={handleChange}
//           className="mt-1 px-4 py-2 w-full"
//           placeholder="CVV"
//         />
//         {validationErrors.securityCode && (
//           <p className="text-red-500 text-sm">{validationErrors.securityCode}</p>
//         )}
//       </div>
//     </div>

//     <div>
//       <label htmlFor="cardHolderName" className="block text-lg font-jura font-bold text-[#063828]">
//         Cardholder's Name
//       </label>
//       <input
//         type="text"
//         id="cardHolderName"
//         name="cardHolderName"
//         value={formData.cardHolderName}
//         onChange={handleChange}
//         className="mt-1 px-4 py-2 w-full"
//       />
//       {validationErrors.cardHolderName && (
//         <p className="text-red-500 text-sm">{validationErrors.cardHolderName}</p>
//       )}
//     </div>
//   </div> */}

//   <div>
//   {generalError && (
//     <p className="text-red-500 text-sm font-bold mb-4">{generalError}</p>
//   )}
//     <div className="mt-6 flex justify-center">
//       <button
//       type="submit"
//       className="button-slanted mt-[20px] w-full cursor-pointer flex items-center justify-center px-[20px] py-[8px] ml-2 font-jura font-bold text-[#c09e5f] bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0"
//     >
//       <span className="button-slanted-content py-2 font-jura font-bold text-[#c09e5f]">Pay Now</span>
//       </button>
//       </div>
//     </div>
//         </form>

//       </div>
//       )}

//       {activeTab === 3 && (
//         <div className="flex justify-center py-20">
//           <div className="">
//           <div>
//             <h2 className=" text-[40px] font-jura font-black text-[#e3ce90] mb-4">Thank you for your purchase</h2>
//             <p className=" text-lg font-jura font-bold text-[#e3ce90]">Check your e-mail inbox, Your ticket is waiting you there!</p>
//           </div>
//           <div className="mt-20 w-[400px] ">
//             <Link href="/experience"  className="button-slanted mt-[20px] w-full cursor-pointer flex items-center justify-center px-[20px] py-[8px] ml-2 font-jura font-bold text-[#002718]  bg-gradient-to-r to-[#c09e5f] from-[#e3ce90] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
//             <span className="button-slanted-content text-lg font-bold py-2">CONTINUE EXPERIENCE</span>
//             </Link>
//           </div>
//           </div>
//           </div>
//         )}



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
// import BookingType from "../components/bookingtype/BookingType";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = ({ params } ) => {
  const router = useRouter();
  const { id } = params;

  const [count, setCount] = useState(0);
  const [date, setDate] = useState(new Date());


  const [bookingDetails, setBookingDetails] = useState([
    // { key: "name", title: "Name", description: "" },
    { key: "no_of_people", title: "Customers", description: "0" },
    { key: "date", title: "Date", description: "" },
    { key: "time", title: "Time", description: "" },
    { key: "booking_type", title: "Booking Type", description: "Normal" },
    { key: "duration", title: "Duration", description: "20 Min" },
  ]);
  

  const [times, setTimes] = useState({});
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activeTime, setActiveTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlotType, setSelectedSlotType] = useState("normal");
  const [slotInterval, setSlotInterval] = useState(20);
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generalError, setGeneralError] = useState("");
  const [bookingErrors, setBookingErrors] = useState([]);
  const [seatError, setSeatError] = useState("");
  const [availableSIMs, setAvailableSIMs] = useState(null);

  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null); 

  const [bookingType, setBookingType] = useState("normal");

  const [activeTab, setActiveTab] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // cardNumber: "",
    // expiryDate: "",
    // securityCode: "",
    // cardHolderName: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  
  useEffect(() => {
    if (id) fetchEventDetails();
    setBookingDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.title === "name" ? { ...detail, description: formData.firstName } : detail
      )
    );
  }, [id, formData.firstName]);

  const fetchEventDetails = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; 
      const response = await fetch(`${baseUrl}/api/content/sections/${id}`);
      const data = await response.json();
      console.log("Fetched Event Details:", data);
      setEventDetails(data);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };


  const handleBookingTypeChange = (type) => {
    setBookingDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.key === "booking_type" ? { ...detail, description: type } : detail
      )
    );
    setBookingType(type);
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


  // const updateBookingDetail = (field, value) => {
  //   setBookingDetails((prevDetails) =>
  //     prevDetails.map((detail) =>
  //       detail.title === field ? { ...detail, description: value } : detail
  //     )
  //   );
  // };
  const updateBookingDetail = (key, value) => {
    setBookingDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.key === key ? { ...detail, description: value } : detail
      )
    );
  };

  const increaseCount = async () => {
    if (count < 14) {
      const newCount = count + 1;
      setCount(newCount);
      updateBookingDetail("no_of_people", newCount.toString());
      setSeatError(""); 
  
      // Fetch fresh slots
      await fetchBookings();
    } else {
      setSeatError("Maximum limit of 14 seats reached.");
    }
    
    if (count < 14) {
      if (availableSIMs !== null && count >= availableSIMs) {
        setSeatError(
          `Maximum capacity reached for the selected time slot. Only ${availableSIMs} seats are available.`
        );
        return;
      }

      if (availableSIMs !== null) {
        if (count >= availableSIMs) {
          // Show error message and set count to availableSIMs
          setSeatError(
            `Maximum capacity reached for the selected time slot. Only ${availableSIMs} seats are available.`
          );
          setCount(availableSIMs); // Keep count equal to available SIMs
          return;
        }
      }

      const newCount = count + 1;
      setCount(newCount);
      updateBookingDetail("no_of_people", newCount.toString());
      setSeatError(""); 

      setActiveTime(null);
      updateBookingDetail("time", "");


      await fetchBookings();
    } else {
      setSeatError("Maximum limit of 14 seats reached.");
    }
  };
  
  const decreaseCount = async () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      updateBookingDetail("no_of_people", newCount.toString());
      setSeatError("");
  
      // Fetch fresh slots
      await fetchBookings();
    }
    if (count > 1) { 
      const newCount = count - 1;
      setCount(newCount);
      updateBookingDetail("no_of_people", newCount.toString());
    }
  };

  const handlePlanChange = async (newDuration) => {

    //step 4
      // 1 - fetch fresh time slots
      // 2 - de-select time slot if that slot for that many people is not available 

    updateBookingDetail("duration", newDuration);
    await fetchBookings();

  // Validate the selected time slot
    if (activeTime) {
      const isSelectedTimeAvailable = Object.values(times).some(
        (slot) => slot.time === activeTime && slot.sims >= count
      );
  
      // Deselect the time slot if it's not available
      if (!isSelectedTimeAvailable) {
        setActiveTime(null);
        updateBookingDetail("time", "");
      }
    }
  };

  const handleDateChange = async (newDate) => {
    //step 3

    //when clicked a day
     // 1 - fetch fresh time slots
      // 2 - deselect the selected time slot ( de select only if this slot is not available on this day for this many people)
   
    updateBookingDetail("date", newDate.toLocaleDateString("en-CA"));
    const formattedDate = newDate.toLocaleDateString("en-CA"); 
    const selectedDate = new Date(newDate);
    setMinDate(selectedDate); 

   
    setDate(newDate);
    setSelectedDate(formattedDate);


    updateBookingDetail("date", formattedDate);

    await fetchBookings();
      // Validate the selected time slot
  if (activeTime) {
    const isSelectedTimeAvailable = Object.values(times).some(
      (slot) => slot.time === activeTime && slot.sims >= count
    );

    // Deselect the time slot if it's not available
    if (!isSelectedTimeAvailable) {
      setActiveTime(null);
      updateBookingDetail("time", "");
    }
  }

    setActiveTime(null);
    updateBookingDetail("time", "");
  
    const nextDate = new Date(newDate);
    nextDate.setDate(newDate.getDate() + 1);
    setMaxDate(nextDate);

    // const nextDate = new Date(selectedDate);
    // nextDate.setDate(selectedDate.getDate() + 1);
    // setMaxDate(nextDate);
    fetchBookings();
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


    // step 1
  //save available number of sim for the clicked slot 
  //available sims are fetched when slots are fetched
  //To-Do:
    // available sims for this clicked slots needs to be saved so we can access them in number of people counter
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
      no_of_people: count.toString(),
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

      const fetchedTimes = data.reduce((acc, slot) => {
        if (slot.time) {
          acc[`time${slot.time}`] = {
            time: String(slot.time),
            sims: slot.availableSIMs || 0,
          };
        }
        return acc;
      }, {});
      setTimes(fetchedTimes);

    if (activeTime) {
      const isActiveSlotAvailable = fetchedTimes[activeTime]?.sims >= count;
      if (!isActiveSlotAvailable) {
        setActiveTime(null); 
        updateBookingDetail("time", ""); 
      }
    }

    console.log("Available slots fetched:", fetchedTimes);

    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }, [count, selectedDate, selectedSlotType, slotInterval, activeTime]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);
  
  const goBack = () => {
    if (activeTab === 1) {
      router.push("/experience");
    } else {
      setActiveTab(prevTab => Math.max(prevTab - 1, 1));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const errors = {};
  
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required.";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "A valid email is required.";
    }
    if (!formData.phone.trim() || !/^\d+$/.test(formData.phone)) {
      errors.phone = "A valid phone number is required.";
     }
    // if (!formData.cardNumber.trim() || !/^\d{16}$/.test(formData.cardNumber)) {
    //   errors.cardNumber = "Card number must be 16 digits.";
    // }
    // if (!formData.expiryDate.trim() || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
    //   errors.expiryDate = "Expiry date must be in MM/YY format.";
    // }
    // if (!formData.securityCode.trim() || !/^\d{3,4}$/.test(formData.securityCode)) {
    //   errors.securityCode = "CVV must be 3 or 4 digits.";
    // }
    // if (!formData.cardHolderName.trim()) {
    //   errors.cardHolderName = "Cardholder name is required.";
    // }
  
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const errors = {};
  
    const bookingData = {
      // name: bookingDetails.find((detail) => detail.key === "name")?.description || "",
      name: formData.firstName,
      phone: bookingDetails.find((detail) => detail.key === "phone")?.description || "",
      email: bookingDetails.find((detail) => detail.key === "email")?.description || "",
      no_of_people: bookingDetails.find((detail) => detail.key === "no_of_people")?.description || "0",
      duration: parseInt(bookingDetails.find((detail) => detail.key === "duration")?.description || "20", 10),
      date: bookingDetails.find((detail) => detail.key === "date")?.description,
      time: bookingDetails.find((detail) => detail.key === "time")?.description || "00:00",
      booking_type: bookingDetails.find((detail) => detail.key === "booking_type")?.description || "",
    };
  
    const paymentData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      // address: formData.address,
      // city: formData.city,
  
      // cardNumber: formData.cardNumber,
      // expiryDate: formData.expiryDate,
      // securityCode: formData.securityCode,
      // cardHolderName: formData.cardHolderName,
      // billingAddress: formData.billingAddress,
    };
  
    // const fullBookingData = { ...bookingData, ...paymentData };
  
    // if (validateForm()) {
    //   console.log("Form is valid. Proceeding to submit:", formData);
    // } else {
    //   console.error("Form validation failed.");
    // }

    if (!formData.firstName.trim()) errors.firstName = "First name is required.";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "A valid email is required.";
    }
    // if (!formData.phone.trim() || !/^\d+$/.test(formData.phone)) {
    //   errors.phone = "A valid phone number is required.";
    // }
    // if (!formData.cardNumber.trim() || !/^\d{16}$/.test(formData.cardNumber)) {
    //   errors.cardNumber = "Card number must be 16 digits.";
    // }
    // if (!formData.expiryDate.trim() || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
    //   errors.expiryDate = "Expiry date must be in MM/YY format.";
    // }
    // if (!formData.securityCode.trim() || !/^\d{3,4}$/.test(formData.securityCode)) {
    //   errors.securityCode = "CVV must be 3 or 4 digits.";
    // }
    // if (!formData.cardHolderName.trim()) {
    //   errors.cardHolderName = "Cardholder name is required.";
    // }
  
    // Update state with validation errors
    setValidationErrors(errors);
  
    if (Object.keys(errors).length > 0) {
      setGeneralError("Please fix the errors above before proceeding.");
      return;
    }
  
    // If no validation errors, clear general error and proceed
    setGeneralError("");
    handleTabChange(3);

  
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/bookings`; 
      const response = await doPostCall(url,        
        { ...bookingData, ...paymentData },
        {"Content-Type": "application/json"},
      );
  
      const data = await response.json();
      console.log("Booking successfully:", data)
  
      if (data.success) {
        console.log("Booking and payment saved successfully:", data);
      } else {
        console.error("Error saving booking/payment:", data.message);
      }
    } catch (error) {
      console.error("Error with POST request:", error);
    }
  };



  // Tab 1: Create Booking
  const handleCreateBooking = () => {
    // You can implement your logic to create the booking here.
    console.log("Create Booking logic...");
  };

  // Tab 2: Payment
  const handlePayment = () => {
    // Implement the payment logic here (for instance, invoking a payment gateway API).
    console.log("Payment logic...");
  };

  // Tab 3: Thank You
  const handleThankYou = () => {
    // Show thank you message after successful booking and payment.
    console.log("Thank you logic...");
  };

  const handleButtonClick = (timeKey, timeValue, sims) => {
    setActiveTime(timeKey);
    updateBookingDetail("time", timeValue);
    setAvailableSIMs(sims); // Save the available SIMs for the clicked slot step.1
    console.log(`Available SIMs for slot ${timeValue}:`, sims);
  };

  const validateBookingDetails = () => {
    const errors = [];
  
    bookingDetails.forEach((detail) => {
      if (detail.key !== "name" && (!detail.description || detail.description.trim() === "")) {
        errors.push(`The field "${detail.title}" is required.`);
      }
    });
  
    setBookingErrors(errors);
    return errors.length === 0;
  };
  const handleTabChange = (tabIndex) => {
      if (tabIndex === 2 && !validateBookingDetails()) {
        return;
      }
    
      setActiveTab(tabIndex);
  };
  

  function formatToAMPM(time) {
    if (!time || typeof time !== "string" || !time.includes(":")) {
      console.log("Invalid time value:", time);
      return "Invalid Time"; 
    }
  
    const [hours, minutes] = time.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  }
  
  
  return (
    <>
      <div className="min-h-screen overflow-x-hidden max-w-7xl mx-auto pb-[60px]">
      <button
          className="text-[#e3ce90]"
          onClick={goBack} 
        >
          Go back
        </button>

        <div className="my-[60px] ">
            <div className="flex justify-between items-center w-[407px] max-w-7xl mx-auto my-8">
                    <div className="relative">
                    <div
                        className={`ml-4 w-12 h-12 rounded-full ${activeTab === 1 ? 'bg-green-500' : 'bg-[#c09e5f]'} text-[#002718] flex items-center justify-center mb-2 font-bold hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]`}
                        onClick={() => handleTabChange(1)}  // Add a click handler to set active tab to 1
                    >
                        1
                    </div>
                    <div className={`text-[14px] ${activeTab === 1 ? 'text-white' : 'text-[#c09e5f]'} font-bold font-orbitron`}>
                        Experiences
                    </div>
                    </div>
                    <div className="relative">
                    <div
                        className={`w-12 h-12 rounded-full ${activeTab === 2 ? 'bg-green-500' : 'bg-[#c09e5f]'} text-[#002718] flex items-center justify-center mb-2 font-bold hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]`}
                        // Add a click handler to set active tab to 2
                    >
                        2
                    </div>
                    <div className={`text-[14px] ${activeTab === 2 ? 'text-white' : 'text-[#c09e5f]'} font-bold font-orbitron`}>
                        Payment
                    </div>
                    <div className="absolute top-[22px] right-full h-1 w-[120px] bg-[#c09e5f]"></div>
                    </div>
                    <div className="relative">
                    <div
                        className={`mr-4 w-12 h-12 rounded-full ${activeTab === 3 ? 'bg-green-500' : 'bg-[#c09e5f]'} text-[#002718] flex items-center justify-center mb-2 font-bold hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]`}
                        onClick={() => handleTabChange(3)} 
                    >
                        3
                    </div>
                    <div className={`text-[14px] ${activeTab === 3 ? 'text-white' : 'text-[#c09e5f]'} font-bold font-orbitron`}>
                        Thanks
                    </div>
                    <div className="absolute top-[22px] right-full h-1 w-[120px] bg-[#c09e5f]"></div>
                    </div>
                </div>
        </div>
        

      {activeTab === 1 && (
        <div className="flex my-20">
          <div className="left">
            <div className="flex max-w-7xl ">
              <div className="w-full flex">
                <div className="">

                  <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[200px] rounded-lg">
                    <h1 className="text-[23px] text-[#063828] font-black font-orbitron">
                      Select Seats
                    </h1>
                    <div className="flex justify-between">
                      <div className="py-4">
                        <p className="text-[18px] text-[#063828] font-bold font-jura mb-4">
                          Select your seats
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
                    {seatError && (
                        <p className="text-red-500 text-sm mt-2">{seatError}</p>
                      )}
                  </div>

                 
                  <div className="my-4">
                    <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[605px] rounded-lg">
                      <h1 className="text-[23px] text-[#063828] font-black font-orbitron">
                        Select Date
                      </h1>
                      <CalendarComponent
                          onChange={handleDateChange}
                          value={date}
                          minDate={minDate} 
                          maxDate={maxDate}
                        />
                    </div>
                  </div>

                  {/* <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[700px] my-[10px]">
                  <h1 className="text-[23px] text-[#063828] font-black font-orbitron">Choose Time</h1>
                  {timeChunks.map((chunk, chunkIndex) => {
                    const now = new Date();
                    const currentDate = now.toLocaleDateString("en-CA");
                    const selectedDateStr = date.toLocaleDateString("en-CA");

                    const hasActiveSlot = chunk.some(([timeKey, timeValue]) => {
                      const [hours, minutes] = timeValue.split(":").map(Number);
                      const slotTime = hours * 60 + minutes;

                      const startTime = selectedDateStr === currentDate ? now.getHours() * 60 + now.getMinutes() : 540;

                      return slotTime >= startTime;
                    });

                    if (!hasActiveSlot) {
                      return null;
                    }

                    return (
                      <div key={chunkIndex} className="flex">
                        {chunk.map(([timeKey, timeValue], index) => {
                          const [hours, minutes] = timeValue.split(":").map(Number);
                          const slotTime = hours * 60 + minutes;

                          const startTime = selectedDateStr === currentDate ? now.getHours() * 60 + now.getMinutes() : 540;
                          const isNearestFutureSlot = !activeTime && slotTime >= startTime;

                          return (
                            <div
                              key={timeKey}
                              className={`button-slanted mt-[20px] cursor-pointer w-[110px] h-[51px] font-jura font-normal text-[#002718] mx-2 ${
                                isNearestFutureSlot || timeKey === activeTime
                                  ? "border-2 border-[#002718] text-[#063828] font-bold" 
                                  : "hover:text-[#c09e5f] md:font-bold border-[0.5px] border-opacity-100 border-[#c09e5f] text-[#c09e5f]"
                              } transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden ${
                                slotTime < startTime ? "opacity-40 cursor-not-allowed" : ""
                              }`}
                            >
                             <button
                              onClick={() => handleButtonClick(timeKey, timeValue)}
                              className="button-slanted-content w-full h-full flex items-center justify-center"
                              disabled={slotTime < startTime}
                            >
                              {formatToAMPM(timeValue)}
                            </button>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>; */}


                
                <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[740px] my-[10px] rounded-lg">
                  <h1 className="text-[23px] text-[#063828] font-black font-orbitron">Choose Time</h1>
                  {timeChunks.map((chunk, chunkIndex) => {
                    const now = new Date();
                    const currentDate = now.toLocaleDateString("en-CA");
                    const selectedDateStr = date.toLocaleDateString("en-CA");

                    // const hasActiveSlot = chunk.some(([timeKey, timeValue]) => {
                    //   const [hours, minutes] = timeValue.split(":").map(Number);
                    //   const slotTime = hours * 60 + minutes;

                    //   const startTime = selectedDateStr === currentDate ? now.getHours() * 60 + now.getMinutes() : 540;

                    //   return slotTime >= startTime;
                    // });

                    // if (!hasActiveSlot) {
                    //   return null;
                    // }

                    return (
                      <div key={chunkIndex} className="flex">
                        {chunk.map(([timeKey, { time: timeValue = "", sims }], index) => {
                          const match = timeValue.match(/^(\d{1,2}):(\d{2})$/);
                          if (!match) {
                            console.warn(`Invalid time format for key ${timeKey}:`, timeValue);
                            return null; // Skip invalid time values
                          }
                          const hours = Number(match[1]);
                          const minutes = Number(match[2]);
                          const slotTime = hours * 60 + minutes;
                            

                            const startTime = selectedDateStr === currentDate ? now.getHours() * 60 + now.getMinutes() : 540;

                            return (
                              <div
                                key={timeKey}
                                className={`button-slanted mt-[20px] cursor-pointer w-[110px] h-[51px] font-jura font-normal text-[#002718] hover:bg-[#002718] mx-2 ${
                                  slotTime >= startTime
                                    ? timeKey === activeTime
                                      ? "bg-[#002718] text-white font-bold border-2 border-[#002718]"
                                      : "hover:text-[#c09e5f] md:font-bold border-[0.5px] border-opacity-30 border-[#002718] text-[#002718]"
                                    : "opacity-50 cursor-not-allowed"
                                } transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden`}
                              >
                                 <button
                                onClick={() => handleButtonClick(timeKey, timeValue, sims)}
                                className="button-slanted-content w-full h-full flex items-center justify-center"
                                disabled={slotTime < startTime}
                              >
                                {formatToAMPM(timeValue)}
                                <span className="text-sm text-[#c09e5f]"> ({sims} SIMs)</span>
                              </button>
                              </div>
                            );
                          })}

                          </div>
                        );
                      })}
                    </div>;



                  {/* <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[183px] my-[20px]">
                    <h1 className="text-[23px] text-[#063828] font-black font-orbitron">
                      Booking Type
                    </h1>
                    <BookingType selectedBookingType={bookingType} onBookingTypeChange={handleBookingTypeChange} />
                  </div> */}
                  <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[183px] my-[20px] rounded-lg">
                    <h1 className="text-[23px] text-[#063828] font-black font-orbitron">
                      Duration
                    </h1>
                    <PlanSelector onPlanChange={handlePlanChange} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#e3ce90] ml-[20px] p-[30px] rounded-lg ">
            <h2 className="text-[30px] text-[#063828] font-black font-orbitron mb-[24px]">
              Your booking details
            </h2>
            {bookingDetails.map((detail, index) => (
            <div
              className="border-b-[0.5px] border-opacity-[50%] border-[#063828] py-[12px]"
              key={detail.key}
            >
              <h3 className="text-[18px] text-[#063828] font-bold font-orbitron">
                {detail.title}
              </h3>
              <p className="text-[18px] text-[#063828] font-jura py-2">
                {detail.description}
              </p>
            </div>
          ))}
                {bookingErrors.length > 0 && (
                <ul className="text-red-500 text-sm mt-4">
                  {bookingErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
            <div className="max-w-3xl mx-auto bg-[#e3ce90] rounded-lg mt-20">
    
              <button
                onClick={() => handleTabChange(2)} 
                
                className="button-slanted mt-[20px] w-full ursor-pointer flex items-center justify-center px-[20px] py-[8px] ml-2 font-jura font-bold text-[#c09e5f] bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0"
              >
                <span className="button-slanted-content py-2">CONTINUE</span>
              </button>
            </div>
          </div>
        </div>
        
      )}


    {activeTab === 2 && (
      <div className="bg-[#e3ce90] shadow-lg w-full max-w-4xl p-20">
        <h2 className="text-4xl font-black font-jura text-[#063828] mb-4">Payment Details</h2>
        <form onSubmit={handleSubmit} >
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="firstName" className="block text-lg font-jura font-bold text-[#063828]">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 px-4 py-2 w-full"
        />
        {validationErrors.firstName && (
          <p className="text-red-500 text-sm">{validationErrors.firstName}</p>
        )}
      </div>
      <div>
        <label htmlFor="lastName" className="block text-lg font-medium text-[#063828]">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="mt-1 px-4 py-2 w-full"
        />
        {validationErrors.lastName && (
          <p className="text-red-500 text-sm">{validationErrors.lastName}</p>
        )}
      </div>
    </div>

    <div>
      <label htmlFor="email" className="block text-lg font-jura font-bold text-[#063828]">
        Email Address
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="mt-1 px-4 py-2 w-full"
      />
      {validationErrors.email && (
        <p className="text-red-500 text-sm">{validationErrors.email}</p>
      )}
    </div>

    <div>
      <label htmlFor="phone" className="block text-lg font-jura font-bold text-[#063828]">
        Phone
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="mt-1 px-4 py-2 w-full"
      />
      {validationErrors.phone && (
        <p className="text-red-500 text-sm">{validationErrors.phone}</p>
      )}
    </div>
  </div>

  {/* Payment Information */}
  {/* <div className="space-y-4 mt-6">
    <h1 className="text-4xl font-black font-jura text-[#063828] mt-20">Payment</h1>

    <div>
      <label htmlFor="cardNumber" className="block text-lg font-jura font-bold text-[#063828]">
        Card Number
      </label>
      <input
        type="text"
        id="cardNumber"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleChange}
        className="mt-1 px-4 py-2 w-full"
        placeholder="xxxx xxxx xxxx xxxx"
      />
      {validationErrors.cardNumber && (
        <p className="text-red-500 text-sm">{validationErrors.cardNumber}</p>
      )}

      
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="expiryDate" className="block text-lg font-jura font-bold text-[#063828]">
          Expiry Date
        </label>
        <input
          type="text"
          id="expiryDate"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          className="mt-1 px-4 py-2 w-full"
          placeholder="MM/YY"
        />
        {validationErrors.expiryDate && (
          <p className="text-red-500 text-sm">{validationErrors.expiryDate}</p>
        )}
      </div>
      <div>
        <label htmlFor="securityCode" className="block text-lg font-jura font-bold text-[#063828]">
          Security Code
        </label>
        <input
          type="text"
          id="securityCode"
          name="securityCode"
          value={formData.securityCode}
          onChange={handleChange}
          className="mt-1 px-4 py-2 w-full"
          placeholder="CVV"
        />
        {validationErrors.securityCode && (
          <p className="text-red-500 text-sm">{validationErrors.securityCode}</p>
        )}
      </div>
    </div>

    <div>
      <label htmlFor="cardHolderName" className="block text-lg font-jura font-bold text-[#063828]">
        Cardholder's Name
      </label>
      <input
        type="text"
        id="cardHolderName"
        name="cardHolderName"
        value={formData.cardHolderName}
        onChange={handleChange}
        className="mt-1 px-4 py-2 w-full"
      />
      {validationErrors.cardHolderName && (
        <p className="text-red-500 text-sm">{validationErrors.cardHolderName}</p>
      )}
    </div>
  </div> */}

  <div>
  {generalError && (
    <p className="text-red-500 text-sm font-bold mb-4">{generalError}</p>
  )}
    <div className="mt-6 flex justify-center">
      <button
      type="submit"
      className="button-slanted mt-[20px] w-full cursor-pointer flex items-center justify-center px-[20px] py-[8px] ml-2 font-jura font-bold text-[#c09e5f] bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0"
    >
      <span className="button-slanted-content py-2 font-jura font-bold text-[#c09e5f]">Pay Now</span>
      </button>
      </div>
    </div>
        </form>

      </div>
      )}

      {activeTab === 3 && (
        <div className="flex justify-center py-20">
          <div className="">
          <div>
            <h2 className=" text-[40px] font-jura font-black text-[#e3ce90] mb-4">Thank you for your purchase</h2>
            <p className=" text-lg font-jura font-bold text-[#e3ce90]">Check your e-mail inbox, Your ticket is waiting you there!</p>
          </div>
          <div className="mt-20 w-[400px] ">
            <Link href="/experience"  className="button-slanted mt-[20px] w-full cursor-pointer flex items-center justify-center px-[20px] py-[8px] ml-2 font-jura font-bold text-[#002718]  bg-gradient-to-r to-[#c09e5f] from-[#e3ce90] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
            <span className="button-slanted-content text-lg font-bold py-2">CONTINUE EXPERIENCE</span>
            </Link>
          </div>
          </div>
          </div>
        )}



      </div>
    </>
  );
};

export default Page;
