
"use client";

import React, { useState, useCallback, useEffect } from "react";
import CalendarComponent from "../../components/calendar/Calendar";
import PlanSelector from "../../components/planselector/PlanSelector";
import { doGetCall, doPostCall } from "../../utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import Image from "next/image";
import CustomPhoneInput from "../../components/phoneinput/Phone-Input";
import { trackBookingEvent, trackBookingStep } from "../../utils/moengage";
import { sendGTMEvent } from '@next/third-parties/google';


const Page = ({ params } ) => {
  const router = useRouter();
  const { id } = params;
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [count, setCount] = useState(1);
  const [date, setDate] = useState(new Date());
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const {  } = useTranslation(); 
  
  const [time, setTime] = useState('');
  const [numOfPeople, setNumOfPeople] = useState(0);
  const [price, setPrice] = useState(0);
  const [type, setType] = useState('');



  const [bookingDetails, setBookingDetails] = useState([
    // { key: "name", title: "Name", description: "" },
    { key: "no_of_people", title: "Participants", description: "1" },
    // { key: "date", title: "Date", description: new Date().toLocaleDateString("en-CA") },
    { key: "date", title: "Date", description: "" },
    { key: "time", title: "Time", description: "" },
    { key: "booking_type", title: "Booking Type", description: "Normal" },
    { key: "duration", title: "Duration", description: "20" },
    { key: "price", title: "Price", description: "95 SAR" },
  ]);


  useEffect(()=>{
    try {
      sendGTMEvent({ event: 'fnb_page_visit', value: 'f&b page visit' });
    } catch (error) {
      console.error('Error sending GTM event:', error);
    }
  }, [])

  const handleClick = () => {
    // Check if bookingDetails exists and is an array
    if (!bookingDetails || !Array.isArray(bookingDetails)) {
      console.log("No booking details available for tracking")
      router.push("/booking/thankyou")
      return
    }

    const dateValue = bookingDetails.find((detail) => detail.key === "date")?.description || "Not specified"
    const timeValue = bookingDetails.find((detail) => detail.key === "time")?.description || "00:00"
    const numOfPeopleValue = bookingDetails.find((detail) => detail.key === "no_of_people")?.description || "0"
    const priceValue = bookingDetails.find((detail) => detail.key === "price")?.description || ""
    const typeValue = bookingDetails.find((detail) => detail.key === "booking_type")?.description || ""

    console.log("Extracted booking details:", {
      dateValue,
      timeValue,
      numOfPeopleValue,
      priceValue,
      typeValue,
    })

    try {
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || []

        window.dataLayer.push({
          event: "continue_button_clicked",
          date: dateValue,
          time: timeValue,
          numOfPeople: numOfPeopleValue,
          price: priceValue,
          type: typeValue,
        })
        console.log("GTM dataLayer push successful with event: continue_button_clicked")
        
      }
    } catch (error) {
      console.error("Error sending GTM event:", error)
    }

    router.push("/booking/thankyou")
  }


  const [times, setTimes] = useState({});
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activeTime, setActiveTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlotType, setSelectedSlotType] = useState("normal");
  const [slotInterval, setSlotInterval] = useState(20);
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [bookingErrors, setBookingErrors] = useState([]);
  const [seatError, setSeatError] = useState("");
  const [availableSIMs, setAvailableSIMs] = useState(null);
    const [showRadioError, setShowRadioError] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("")
  const phoneDetail = bookingDetails.find((detail) => detail.key === "phone")

    const handlePhoneChange = (phone) => {
    setPhoneNumber(phone)

    }

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

 

  const closePopup = () => {
    setIsPopupVisible(false);
    setPopupMessage("");
  };
  
 

  useEffect(() => {
    setBookingDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.key === "date"
          ? { ...detail, description: new Date().toLocaleDateString("en-CA") }
          : detail
      )
    );
  }, []);

  const fetchEventDetails = useCallback(async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; 
      const response = await fetch(`${baseUrl}/api/content/sections/${id}`);
      const data = await response.json();
      console.log("Fetched Event Details:", data);
      setEventDetails(data);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchEventDetails();
    setBookingDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.title === "name" ? { ...detail, description: formData.firstName } : detail
      )
    );
  }, [id, formData.firstName, fetchEventDetails]);

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


  const updateBookingDetail = (key, value) => {
    setBookingDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.key === key ? { ...detail, description: value } : detail
      )
    );
  };

  
  const increaseCount = async () => { 
    const newCount = count + 1;

    if (count < 14) {
      setCount(newCount);
      updateBookingDetail("no_of_people", newCount.toString());

      setSeatError(""); 
      // setPopupMessage("Seats are not available.");
      setIsPopupVisible(true);

      if (activeTime && times[activeTime]?.sims < newCount) {
        setPopupMessage(`Only ${times[activeTime]?.sims || 0} seats are available for the selected time slot.`);
        setIsPopupVisible(true);
        setTimeout(() => {
          setIsPopupVisible(false);
        }, 1000);
        
      }
      await handlePlanChange(slotInterval);
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
  
      await handlePlanChange(slotInterval);
      await fetchBookings();
    }
    if (count > 1) { 
      const newCount = count - 1;
      setCount(newCount);
      updateBookingDetail("no_of_people", newCount.toString());
    }
  };

  
 
  
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    trackBookingStep(field, { [field]: value });
  };


  const handleDateChange = async (newDate) => {
    updateBookingDetail("date", newDate.toLocaleDateString("en-CA"));
    const formattedDate = newDate.toLocaleDateString("en-CA"); 
    const selectedDate = new Date(newDate);
    setMinDate(selectedDate); 
    setDate(newDate);
    setSelectedDate(formattedDate);
    setActiveTime(null);
    updateBookingDetail("time", "");

    updateBookingDetail("date", formattedDate);

    await fetchBookings();

    setBookingDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.key === "date"
          ? { ...detail, description: newDate.toLocaleDateString("en-CA") }
          : detail
      )
    );

    const hasAvailableSlots = Object.values(times).some((slot) => slot.sims >= count);
    if (!hasAvailableSlots) {
      setPopupMessage("No slots are available for the selected date and time.");
      setIsPopupVisible(true);
    }

  if (activeTime) {
    const isSelectedTimeAvailable = Object.values(times).some(
      (slot) => slot.time === activeTime && slot.sims >= count
    );

   
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

  const addMissingSlots = (data) => {
    const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };
    
    const timeSlots = [];
    const startTime = timeToMinutes(data[0].time);
    const endTime = timeToMinutes(data[data.length - 1].time);

    for (let time = startTime; time <= endTime; time += 20) {
        const hours = String(Math.floor(time / 60)).padStart(2, "0");
        const minutes = String(time % 60).padStart(2, "0");
        timeSlots.push(`${hours}:${minutes}`);
    }

    const missingSlots = timeSlots
        .filter((slot) => !data.some((entry) => entry.time === slot))
        .map((slot) => ({ time: slot, sims: 0 }));

    const updatedData = [...data, ...missingSlots];

    updatedData.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

    return updatedData;
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
  const timeChunks = chunkArray(timeEntries, 3);

  const fetchBookings = useCallback(async () => {
    const payload = {
      no_of_people: count.toString(),
      date: selectedDate,
      duration: slotInterval.toString(),
      booking_type: selectedSlotType,
      price: count.toString(),
    }

    const queryString = new URLSearchParams(payload).toString();

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/bookings/availableSlots?${queryString}`;
      let response = await doGetCall(url);
      const data = await response.json();
      const data_ = addMissingSlots(data)
      console.log(data_)
      const fetchedTimes = data_.reduce((acc, slot) => {
        if (slot.time) {
          acc[`time${slot.time}`] = {
            time: String(slot.time),
            sims: slot.sims || 0,
          };
        }
        return acc;
      }, {});
      setTimes(fetchedTimes);

     
    // if (activeTime) {
    //   const isActiveSlotAvailable = fetchedTimes[activeTime]?.sims >= count;
    //   if (!isActiveSlotAvailable) {
    //     setActiveTime(null); 
    //     updateBookingDetail("time", ""); 
    //   }
    // }

    console.log("Available slots fetched:", fetchedTimes);


    } catch (error) {
      console.error("Error fetching bookings:", error);
      
    }
  }, [count, selectedDate, selectedSlotType, slotInterval]);


  const handlePlanChange = useCallback(async (newDuration) => {
    await fetchBookings();
    setSlotInterval(newDuration);
  
    updateBookingDetail("duration", `${newDuration}`);
  
    let basePrice;
  
    if (count <= 3) {
      if (newDuration === 20) {
        basePrice = 95;
      } else if (newDuration === 40) {
        basePrice = 170;
      } else if (newDuration === 60) {
        basePrice = 250;
      }
    } else {
      if (newDuration === 20) {
        basePrice = 80; 
      } else if (newDuration === 40) {
        basePrice = 140;
      } else if (newDuration === 60) {
        basePrice = 200; 
      }
    }
  
    const updatedPrice = `${basePrice * count} SAR`;
  
    updateBookingDetail("price", updatedPrice);
  
    await fetchBookings();
  }, [count, fetchBookings]); 

  useEffect(() => {
    if (count > 0) {
      handlePlanChange(slotInterval);
    }
  }, [count, slotInterval, handlePlanChange]); 


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
  
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

 const handleSubmit = async (e) => {
     e.preventDefault();

   
     if (validateForm()) {
       setShowRadioError(false);
     } else {
       setShowRadioError(true);
       return;
     }
    
    const trackingData = {
    date: bookingDetails.find((detail) => detail.key === "date")?.description,
    time: bookingDetails.find((detail) => detail.key === "time")?.description || "00:00",
    numOfPeople: bookingDetails.find((detail) => detail.key === "no_of_people")?.description || "0",
    price: bookingDetails.find((detail) => detail.key === "price")?.description || "",
    type: bookingDetails.find((detail) => detail.key === "booking_type")?.description || "",
  };

  console.log("Tracking Data:", trackingData);

  try {
    sendGTMEvent({ 
      event: 'continue_button_clicked', 
      value: 'User submitted form to continue',
      ...trackingData
    });
  } catch (error) {
    console.error('Error sending GTM event:', error);
  }
   
     const errors = {};
   
     const bookingData = {
       name: formData.firstName,
       phone: bookingDetails.find((detail) => detail.key === "phone")?.description || "",
       email: bookingDetails.find((detail) => detail.key === "email")?.description || "",
       no_of_people: bookingDetails.find((detail) => detail.key === "no_of_people")?.description || "0",
       duration: parseInt(bookingDetails.find((detail) => detail.key === "duration")?.description, 10),
       date: bookingDetails.find((detail) => detail.key === "date")?.description,
       time: bookingDetails.find((detail) => detail.key === "time")?.description || "00:00",
       booking_type: bookingDetails.find((detail) => detail.key === "booking_type")?.description || "",
     };
   
     const paymentData = {
       firstName: formData.firstName,
       lastName: formData.lastName,
       email: formData.email,
       phone: formData.phone,
     };
   
     if (!formData.firstName.trim()) errors.firstName = "First name is required.";
     if (!formData.lastName.trim()) errors.lastName = "Last name is required.";
     if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
       errors.email = "A valid email is required.";
     }
   
     setValidationErrors(errors);
   
     if (Object.keys(errors).length > 0) {
       setGeneralError("Please fix the errors above before proceeding.");
       return;
     }
   
     setGeneralError("");
   
     try {
       const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
       const url = `${baseUrl}/api/bookings`;
       const response = await doPostCall(
         url,
         { ...bookingData, ...paymentData },
         { "Content-Type": "application/json" }
       );
   
       const data = await response.json();
   
       if (data.success) {
         console.log("Booking and payment saved successfully:", data);
         // Proceed to the next tab
         handleTabChange(3);
         console.log({ ...bookingData, ...paymentData });

         trackBookingEvent({
        ...formData,
        status: "Success",
        language: currentLanguage,
      });
   
         try {
           const response = await fetch("https://teleiosx.com/email/email.php", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({
               customerEmail: formData.email,
               companyEmail: "no-reply@teleiosx.com",
               subject: "Booking Confirmation",
               payload: {
                 bookingData: { ...bookingData },
                 paymentData: { ...paymentData }
               }
             }),
           });
   
           if (response.ok) {
             const result = await response.json();
             console.log("Success:", result.message);
           } else {
             const error = await response.text();
             console.error("Error response:", error);


           }
         } catch (error) {
           console.error("Error during submission:", error);

           trackBookingEvent({
            ...formData,
            status: "Failure",
            language: currentLanguage,
          });
    
          console.error("There was an error processing your booking. Please try again.", error);
         }
       } else {
         console.error("Error saving booking/payment:", data.message);
         setGeneralError(data.message || "An error occurred. Please try again.");
       }
     } catch (error) {
       console.error("Error with POST request:", error);
       setGeneralError("An error occurred while processing your request. Please try again.");
     }
   };
 

  useEffect(() => {
    if (generalError || bookingErrors.length > 0) {
      const timer = setTimeout(() => {
        setGeneralError("");
        setBookingErrors([]);
      }, 2000); 
  
      return () => clearTimeout(timer);
    }
  }, [generalError, bookingErrors]);




  const handleCreateBooking = () => {
    console.log("Create Booking logic...");
  };

 
  const handlePayment = () => {
    console.log("Payment logic...");
  };


  const handleThankYou = () => {

    console.log("Thank you logic...");
  };


  const handleButtonClick = (timeKey, timeValue, sims) => {
    if (sims >= count) {
      setActiveTime(timeKey);
      updateBookingDetail("time", timeValue);
      setSeatError("");
    } else {
      setPopupMessage("The selected time slot is not available for the selected number of people.");
      setIsPopupVisible(true);
    }
  };


  const validateBookingDetails = () => {
    const errors = [];
  
    bookingDetails.forEach((detail) => {
      if (detail.key === "no_of_people" && (!detail.description || detail.description === "0")) {
        errors.push("You must select at least one seat.");
      } else if (detail.key === "date" && (!detail.description || detail.description.trim() === "")) {
        errors.push("Please pick a valid date.");
      } else if (detail.key === "time" && (!detail.description || detail.description.trim() === "")) {
        errors.push("Please pick a time slot.");
      } else if (detail.key === "duration" && (!detail.description || detail.description.trim() === "")) {
        errors.push("Please select a booking duration.");
      }
    });
  
    setBookingErrors(errors);
    return errors.length === 0;
  };
  

  const handleTabChange = (tabIndex) => {
    if (tabIndex === 2) {
      if (count === 0) {
        setGeneralError("Please select at least one seat before continuing.");
        return;
      }
  
      if (!validateBookingDetails()) {
        return;
      }
    }
  
    setGeneralError("");
    setActiveTab(tabIndex);
  };
  
  function formatToAMPM(time) {
    if (!time || typeof time !== "string" || !time.includes(":")) {
      console.log("Invalid time value:", time);
      return "Invalid Time"; 
    }
  
    const [hours, minutes] = time.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; 
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  }
  
  
  return (
    <>
 
      <div className=" w-full overflow-x-hidden max-w-7xl mx-auto lg:pb-[40px]">
        
     
      <div>
        <div className="my-[60px] px-4">
            <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center w-full lg:w-[720px] md:w-[720px] max-w-7xl mx-auto my-8 gap-y-4 px-4">
  
                    <div className="mt-[20px] md:mt-[0px] w-[84px] h-[54px]">
                      <button
                        onClick={goBack}
                        className="button-slanted cursor-pointer flex items-center justify-center px-4 py-3  border-[0.5px] border-opacity-30 border-[#C09E5F]  font-jura font-bold  duration-300 rounded-tl-lg rounded-br-lg "
                      >
                      <Image src="/assets/images/dome/left.png" alt="arrow" width={30} height={18} />
                      </button>
                    </div>
                    <div className="relative w-full md:w-[200px] lg:w-[200px] button-slanted cursor-pointer mx-1 flex items-center  px-6 py-2 border-[0.5px] border-opacity-30 border-[#C09E5F] hover:border-[#C09E5F] font-jura font-bold  duration-300 rounded-tl-lg rounded-br-lg">
                    
                    <div className={`w-[30px] h-[30px] mt-1 rounded-full ${activeTab === 1 ? 'bg-[#C09E5F]' : 'bg-[#C09E5F] opacity-30'} text-[#002718] flex items-center justify-center mb-2 font-bold hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]`} onClick={() => handleTabChange(1)}>
                        01
                    </div>
                    <div className={`text-[14px]  ml-4 ${activeTab === 1 ? 'text-[#C09E5F] ' : 'text-[#0e4b25]'} font-bold font-orbitron`}>{t('experiences')}</div>
                    </div>
                    <div className="relative w-full md:w-[200px] lg:w-[200px] button-slanted cursor-pointer mx-1 flex items-center  px-6 py-2 border-[0.5px] border-opacity-30 border-[#C09E5F] hover:border-[#C09E5F] font-jura font-bold  duration-300 rounded-tl-lg rounded-br-lg">
                    <div className={`w-[30px] h-[30px] mt-1 rounded-full ${activeTab === 2 ? 'bg-[#C09E5F]' : 'bg-[#C09E5F] opacity-30'} text-[#002718] flex items-center justify-center mb-2 font-bold hover:bg-[#C09E5F]`}>
                        02
                    </div>
                    <div className={`text-[14px] ml-4 ${activeTab === 2 ? 'text-[#C09E5F]' : 'text-[#0e4b25]'} font-bold font-orbitron`}>{t('confirm')}</div>
                    {/* <div className="absolute top-[22px] right-full h-1 w-[120px] bg-[#c09e5f]"></div> */}
                    </div>
                    <div className="relative w-full md:w-[200px] lg:w-[200px] button-slanted cursor-pointer flex mx-1 backdrop:items-center px-6 py-2  border-[0.5px] border-opacity-30 border-[#C09E5F] hover:border-[#C09E5F] font-jura font-bold  duration-300 rounded-tl-lg rounded-br-lg">
                    <div className={`mr-4 w-[30px] mt-1 h-[30px] rounded-full ${activeTab === 3 ? 'bg-[#C09E5F]' : 'bg-[#C09E5F] opacity-30'} text-[#002718] flex items-center justify-center mb-2 font-bold hover:bg-gradient-to-r hover:from-[#002718] hover:to-[#002718]`}>
                        03
                    </div>
                    <div className={`text-[14px] ml-4 ${activeTab === 3 ? 'text-[#C09E5F]' : 'text-[#0e4b25]'} font-bold font-orbitron`}>
                    {t('thanks')}
                    </div>
                    {/* <div className="absolute top-[22px] right-full h-1 w-[120px] bg-[#c09e5f]"></div> */}
                    </div>
              </div>
        </div>
        
      {activeTab === 1 && (
        <div className="flex flex-col lg:flex-row gap-4 md:gap-0 lg:gap-0 my-20">
          <div className="w-full left">
            <div className="flex max-w-7xl ">
              <div className="w-full flex">
                <div className="w-full xl:w-full lg:w-[680px] md:px-4">

                  <div className="bg-[#C09E5F] p-[20px] lg:p-[30px] h-auto md:rounded-[15px]">
                    <h1 className="text-lg text-[#063828] font-black font-orbitron">
                    {t('normalSeats')}
                    </h1>
                    <div className="flex justify-between">
                      <div className="py-4">
                        <p className="text-md text-[#063828] font-bold font-jura mb-4">
                        {t('selectSeats')}
                        </p>
                        {isPopupVisible && (
                            <>
                            <p className="text-red-600 font-bold">{popupMessage}</p>
                            </>
                            )}
                      </div>
                     
                      <div className="flex items-center justify-center mb-4 ">
                        <button
                          onClick={decreaseCount}
                          className=" button-slanted text-[18px] cursor-pointer flex items-center justify-center px-[20px] py-[8px] border-[0.5px] border-opacity-30 border-[#063828] ml-2 font-jura font-bold text-[#063828] hover:text-[#C09E5F] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0"
                        >
                          <span className="button-slanted-content text-[#063828] hover:text-[#C09E5F] font-jura text-[18px] font-bold">
                            -
                          </span>
                        </button>
                        <span className="px-8 py-2 text-[23px] text-[#063828] font-jura font-black">
                          {count}
                        </span>
                        <button
                          onClick={increaseCount}
                          className=" button-slanted text-[18px] cursor-pointer flex items-center justify-center px-[20px] py-[8px] border-[0.5px] border-opacity-30 border-[#063828] ml-2 font-jura font-bold text-[#063828] hover:text-[#C09E5F] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0"
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
                  

                  <div className="w-full bg-[#C09E5F] p-[20px] lg:p-[30px] h-auto  md:rounded-[15px] mt-[20px]">
                    <h1 className="text-md text-[#C09E5F] font-black font-orbitron">
                      {t('duration')}
                    </h1>
                    <PlanSelector onPlanChange={handlePlanChange} />
                  </div>
                 
                  <div className="my-4">
                    <div className="w-full bg-[#C09E5F] p-[20px] lg:p-[30px] h-auto  md:rounded-[15px]">
                      <h1 className="text-md text-[#063828] font-black font-orbitron">
                      {t('chooseDate')}
                      </h1>
                      <CalendarComponent
                          onChange={handleDateChange}
                          value={date}
                          minDate={minDate} 
                          maxDate={maxDate}
                        />
                    </div>
                  </div>

   



              <div className="w-full bg-[#C09E5F] p-[20px] lg:p-[30px] h-auto  md:rounded-[15px] mt-[20px]">
                <h1 className="text-lg text-[#00352F] font-black font-orbitron">{t('chooseTime')}</h1>
                
                {timeChunks
                  .filter((chunk) => {
                    const now = new Date();
                    const currentDate = now.toLocaleDateString("en-CA");
                    const selectedDateStr = date.toLocaleDateString("en-CA");
                    const isToday = selectedDateStr === currentDate;
                    const startTime = isToday
                      ? now.getHours() * 60 + now.getMinutes()
                      : 540;
                    
                    return chunk.some(([_, { time: timeValue = "" }]) => {
                      const match = timeValue.match(/^(\d{1,2}):(\d{2})$/);
                      if (!match) return false; 
                      const hours = Number(match[1]);
                      const minutes = Number(match[2]);
                      const slotTime = hours * 60 + minutes;
                      return slotTime >= startTime;
                    });
                  })
                  .map((chunk, chunkIndex) => {
                    const now = new Date();
                    const currentDate = now.toLocaleDateString("en-CA");
                    const selectedDateStr = date.toLocaleDateString("en-CA");
                    const isToday = selectedDateStr === currentDate;
                    const startTime = isToday
                      ? now.getHours() * 60 + now.getMinutes()
                      : 540;

                    return (
                      <div key={chunkIndex} className="flex">
                        {chunk.map(([timeKey, { time: timeValue = "", sims }], index) => {
                          const match = timeValue.match(/^(\d{1,2}):(\d{2})$/);
                          if (!match) {
                            console.warn(`Invalid time format for key ${timeKey}:`, timeValue);
                            return null;
                          }
                          const hours = Number(match[1]);
                          const minutes = Number(match[2]);
                          const slotTime = hours * 60 + minutes;

                        //   const isDisabled = sims === 0 || slotTime < startTime ;

                          return (
                            <div
                              key={timeKey}
                              className={`button-slanted mt-[10px] cursor-pointer w-[180px] lg:w-[240px] h-[40px] font-jura font-normal mx-2
                                ${timeKey === activeTime 
                                  ? "bg-[#002718] text-white font-bold border-2 border-[#002718]" 
                                //   : isDisabled
                                //   ? "text-[#C09E5F] border-opacity-80 cursor-not-allowed border border-[#C09E5F]"
                                  : "hover:text-[#C09E5F] md:font-bold border-[0.5px] border-opacity-100 border-[#002718] text-[#002718]"}
                                transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden`}
                            >
                              <button
                                onClick={() => handleButtonClick(timeKey, timeValue, sims)}
                                // onClick={() => isDisabled && handleButtonClick(timeKey, timeValue, sims)}
                                className="button-slanted-content w-full h-full flex items-center justify-center"
                                // disabled={slotTime < startTime || isDisabled}
                                
                              
                              >
                                {formatToAMPM(timeValue)}
   
                                
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
              </div>

                    


                  {/* <div className="w-[734px] bg-[#e3ce90] p-[30px] h-[183px] my-[20px]">
                    <h1 className="text-[23px] text-[#063828] font-black font-orbitron">
                      Booking Type
                    </h1>
                    <BookingType selectedBookingType={bookingType} onBookingTypeChange={handleBookingTypeChange} />
                  </div>  */}
                 
                </div>
              </div>
            </div>
          </div>
          {/* <div className="bg-[#e3ce90] ml-[20px] p-[30px] rounded-lg ">
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
               
            <div className="max-w-3xl mx-auto bg-[#e3ce90] rounded-lg mt-20">
                {generalError && (
                  <p className="text-red-500 text-md font-normal">{generalError}</p>
                )}
                 {bookingErrors.length > 0 && (
              
              <ul>
                {bookingErrors.map((error, index) => (
                  <li key={index} className="text-red-500 text-md font-normal ">{error}</li>
                ))}
              </ul>
          )}
              <button
                onClick={() => handleTabChange(2)} 
                
                className="button-slanted mt-[20px] w-full ursor-pointer flex items-center justify-center px-[20px] py-[8px] ml-2 font-jura font-bold text-[#c09e5f] bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0"
              >
                <span className="button-slanted-content py-2">CONTINUE</span>
              </button>
            </div>
          </div> */}
          <div className="bg-[#C09E5F] md:mx-[20px] p-[20px] w-full md:w-[730px] lg:w-full h-[750px]  md:rounded-[15px] mt-2 lg:mt-0">
          <h2 className="text-lg text-[#063828] font-black font-orbitron mb-[24px]">
          {t('bookingDetails')}
          </h2>
          {bookingDetails
            .filter((detail) => detail.key !== "booking_type") 
            .map((detail, index) => (
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

          <div className="max-w-3xl mx-auto bg-[#C09E5F] rounded-lg mt-20">
            {generalError && (
              <p className="text-red-500 text-md font-normal">{generalError}</p>
            )}
            {bookingErrors.length > 0 && (
              <ul>
                {bookingErrors.map((error, index) => (
                  <li key={index} className="text-red-500 text-md font-normal ">
                    {error}
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => handleTabChange(2)}
              className="button-slanted mt-[20px] w-full cursor-pointer flex items-center justify-center px-[20px] py-[8px]  font-jura font-bold text-[#c09e5f] bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg  rounded-br-lg hover:border-0"
            >
              <span className="button-slanted-content py-2">CONTINUE</span>
            </button>
          </div>
          </div>

        </div>
        
      )}


    {activeTab === 2 && (
      <div className="md:mx-4 mb-8 ">
      <div className="bg-[#C09E5F] shadow-lg w-full max-w-4xl mx-auto p-4 lg:p-16 md:rounded-[15px]">
        <h2 className="text-[32px] font-black font-orbitron text-[#063828] leading-[28px] mb-4 pb-4">{t('paymentDetails')}</h2>
        <hr className="border-[#063828] opacity-30"/>
        <form onSubmit={handleSubmit} >
        <div className="space-y-4 pt-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-[16px] font-orbitron leading-[27px] font-bold text-[#063828] px-2 md:px-8 lg:px-8">
              {t('firstname')}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your Firtst Name"
                value={formData.firstName}
                onChange={handleChange}
                className="button-slanted mt-[8px] w-full h-[40px] md:h-[61px] lg:h-[61px] flex items-center justify-center px-[20px] py-[8px] font-jura font-bold text-[#063828] bg-[#C09E5F] border border-[#063828] rounded-tl-lg rounded-br-lg placeholder-[#063828] placeholder-opacity-30"
              />
              {validationErrors.firstName && (
                <p className="text-red-500 text-sm">{validationErrors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-[16px] font-orbitron leading-[27px] font-bold text-[#063828] px-2 md:px-8 lg:px-8">
              {t('lastname')}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                 placeholder="Enter your Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="button-slanted mt-[8px] w-full h-[40px] md:h-[61px] lg:h-[61px] flex items-center justify-center px-[20px] py-[8px]  font-jura font-bold text-[#063828] bg-[#C09E5F] border border-[#063828] rounded-tl-lg rounded-br-lg placeholder-[#063828] placeholder-opacity-30"
              />
              {validationErrors.lastName && (
                <p className="text-red-500 text-sm">{validationErrors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-[16px] font-orbitron leading-[27px] font-bold text-[#063828] px-2 md:px-8 lg:px-8">
            {t('emailAddress')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              className="button-slanted mt-[8px] w-full h-[40px] md:h-[61px] lg:h-[61px] flex items-center justify-center px-[20px] py-[8px]  font-jura font-bold text-[#063828] bg-[#C09E5F]  border border-[#063828]  rounded-tl-lg rounded-br-lg placeholder-[#063828] placeholder-opacity-30"
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm">{validationErrors.email}</p>
            )}
          </div>

          {/* <div>
            <label htmlFor="phone" className="block text-[16px] font-orbitron font-bold text-[#063828] px-2 md:px-8 lg:px-8">
            {t('phoneNormal')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
                placeholder="+966 241 0002 202"
              onChange={handleChange}
              className="button-slanted mt-[8px] w-full h-[40px] md:h-[61px] lg:h-[61px] flex items-center justify-center px-[20px] py-[8px] font-jura font-bold text-[#063828] bg-[#C09E5F]  border border-[#063828] rounded-tl-lg rounded-br-lg placeholder-[#063828] placeholder-opacity-30"
            />
            {validationErrors.phone && (
              <p className="text-red-500 text-sm">{validationErrors.phone}</p>
            )}
          </div> */}

            <div>
              <label
                htmlFor="phone"
                className="block text-[16px] font-orbitron font-bold text-[#063828] px-2 md:px-8 lg:px-8"
              >
                {t("phoneNormal")}
              </label>
              <CustomPhoneInput
                name="phone"
                value={formData.phone}
                onChange={handleChange}
             
              />
              {validationErrors.phone && (
              <p className="text-red-500 text-sm">{validationErrors.phone}</p>
            )}
            </div>
        </div>


  <div>
  {generalError && (
    <p className="text-red-500 text-sm font-bold mb-4">{generalError}</p>
  )}
    <div className="mt-6 flex justify-center">
      <button
      type="submit"
      onClick={handleClick}
      className="button-slanted mt-[20px] w-full h-[40px] md:h-[59px] lg:h-[59px] cursor-pointer flex items-center justify-center px-[20px] py-[8px]  font-jura font-bold text-[#c09e5f] bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0"
    >
      <span className="button-slanted-content py-2 font-jura font-bold text-[#c09e5f]">{t('CONTINUE')}</span>
      </button>
      </div>
    </div>
        </form>

      </div>
      </div>
      )}

      {activeTab === 3 && (
        <div className="bg-[#C09E5F] flex justify-center items-center py-20 px-4 rounded-[15px] lg:w-[826px] mx-auto mb-[100px]">
          <div className="">
          <div>
            <h2 className=" text-[32px] leading-[28px] text-center font-orbitron font-black text-[#063828] mb-4">{t('thankYouMessage')}</h2>
            <p className=" text-[20px] leading-[24px] font-jura text-center font-bold text-[#063828]">{t('emailMessage')}</p>
          </div>
          <div className="mt-20 w-[320px] lg:w-[725px] ">
            <Link href="/experience" className="button-slanted w-full  cursor-pointer flex items-center justify-center px-[20px] py-[8px]m  font-jura font-bold text-[#c09e5f] bg-[#063828] rounded-tl-lg rounded-br-lg hover:border-0">
            <span className="button-slanted-content text-lg font-bold py-2">{t('continueExperience')}</span>
            </Link>
          </div>
          </div>
          </div>
        )}

</div>


      </div>
    </>
  );
};

export default Page;




