
"use client";

import React, { useState, useCallback, useEffect } from "react";
import CalendarComponent from "../../components/calendar/Calendar";
import PlanSelectorGroupRace from "../../components/planselectorgrouprace/PlanSelectorgrouprace";
import { doGetCall, doPostCall } from "../../utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import Image from "next/image";
import CustomPhoneInput from "../../components/phoneinput/Phone-Input";
import { trackBookingEvent, trackBookingStep } from "../../utils/moengage"
import { sendGTMEvent } from '@next/third-parties/google';


const Page = ({ params } ) => {
  const router = useRouter();
  const { id } = params;
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [count, setCount] = useState(4);
  const [date, setDate] = useState(new Date());
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  


  const [bookingDetails, setBookingDetails] = useState([
    // { key: "name", title: "Name", description: "" },
    { key: "no_of_people", title: "Participants", description: "4" },
    // { key: "date", title: "Date", description: new Date().toLocaleDateString("en-CA") },
    { key: "date", title: "Date", description: "" },
    { key: "time", title: "Time", description: "" },
    { key: "booking_type", title: "Booking Type", description: "Normal" },
    { key: "duration", title: "Duration", description: "40" },
    { key: "price", title: "Price", description: "320 SAR" },
  ]);
  

  const [times, setTimes] = useState({});
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activeTime, setActiveTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlotType, setSelectedSlotType] = useState("normal");
  const [slotInterval, setSlotInterval] = useState(40);
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [bookingErrors, setBookingErrors] = useState([]);
  const [seatError, setSeatError] = useState("");
  const [availableSIMs, setAvailableSIMs] = useState(null);
  const [showRadioError, setShowRadioError] = useState(false);



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

  const handleClickGtm = () => {
    sendGTMEvent({ event: 'continue_button_clicked', value: 'User clicked continue' });
    console.log('GTM Event Sent: continue_button_clicked');
  };


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
    };

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
        basePrice = 175; 
      } else if (newDuration === 60) {
        basePrice = 250;
      }
    } else {
      if (newDuration === 20) {
        basePrice = 80; 
      } else if (newDuration === 40) {
        basePrice = 175; 
      } else if (newDuration === 60) {
        basePrice = 200; 
      }
    }
  
    // Adjust the price for multiple persons
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
                bookingData: { amount : trackingData['price'],...bookingData },
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


  const handleSubmitClick = () => {
    if (validateForm()) {
  
      setShowRadioError(false);
    } else {
      setShowRadioError(true);
    }
  };

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
 
      <div className=" w-full overflow-x-hidden max-w-7xl mx-auto lg:py-[80px]">
        
    
 
        <div className="bg-[#C09E5F] flex justify-center items-center py-20 px-4 rounded-[15px] lg:w-[826px] mx-auto mb-[100px]">
          <div className="">
          <div>
            <h2 className=" text-[32px] leading-[28px] text-center font-orbitron font-black text-[#063828] mb-4">{t('thankYouMessage')}</h2>
            <p className=" text-[20px] leading-[24px] font-jura text-center font-bold text-[#063828]">{t('emailMessage')}</p>
          </div>
          <div className="mt-20 w-[320px] lg:w-[725px] ">
            <Link href="/experience" className="button-slanted w-full  cursor-pointer flex items-center justify-center px-[20px] py-[8px] font-jura font-bold text-[#c09e5f] bg-[#063828] rounded-tl-lg rounded-br-lg hover:border-0">
            <span className="button-slanted-content text-lg font-bold py-2">{t('continueExperience')}</span>
            </Link>
          </div>
          </div>


</div>


      </div>
    </>
  );
};

export default Page;




