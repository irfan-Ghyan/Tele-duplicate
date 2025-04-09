import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import CustomPhoneInput from "../../components/phoneinput/Phone-Input";
import { doGetCall, doPostCall } from "../../utils/api";


export default function CorporateEvents() {
  const images = [

    "/assets/images/events/bg1.jpg",
    "/assets/images/events/bg2.jpg",
    "/assets/images/events/bg3.jpg",
    "/assets/images/events/bg4.jpg",
    "/assets/images/events/bg5.jpg",
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenThank, setIsModalOpenThank] = useState(false);
  const { t } = useTranslation();
  const [generalError, setGeneralError] = useState("");
  // const [bookingErrors, setBookingErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
   const [showRadioError, setShowRadioError] = useState(false);
   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });

     const [currentSlide, setCurrentSlide] = useState(0);
      const swiperRef = useRef(null); // Reference to Swiper
    
      const goToSlide = (index) => {
        if (swiperRef.current) {
          swiperRef.current.slideTo(index);
        }
        setCurrentSlide(index);
      };

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

    };
  
    const venueData = {
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
        {  ...venueData },
        { "Content-Type": "application/json" }
      );
  
      const data = await response.json();
  
      if (data.success) {
        console.log("Venur hire saved successfully:", data);
        // Proceed to the next tab
  
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
                venueData: { ...venueData }
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
        }
      } else {
        console.error("Error saving Venue Hire:", data.message);
        setGeneralError(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error with POST request:", error);
      setGeneralError("An error occurred while processing your request. Please try again.");
    }
  };
  
useEffect(() => {
      if (generalError.length > 0) {
        const timer = setTimeout(() => {
          setGeneralError("");
 
        }, 2000); 
    
        return () => clearTimeout(timer);
      }
}, [generalError]);



  return (
    <div className="bg-[#0a3330] text-white p-4 md:p-20">
      {/* Header */}
      <div className="container mx-auto py-16 flex flex-col md:flex-row lg:flex-row">
        <div className="w-full md:w-[40%] lg:w-[40%] block md:hidden"><h1 className="text-[54px] font-extrabold font-orbitron text-[#C09E5F] leading-[50px]">CORPORATE EVENTS</h1></div>
        <div className="w-full md:w-[40%] lg:w-[40%] hidden md:block"><h1 className="text-[50px] md:text-[54px] lg:text-[54px] font-extrabold font-orbitron text-[#C09E5F] leading-[50px]">Corporate Events</h1></div>
        <div className="w-full md:w-[60%] lg:w-[60%] pl-0 md:pl-8 lg:pl-8">
        <p className="text-[18px] font-bold font-jura text-white  pt-10 md:pt-0 lg:pt-0 opacity-80 leading-none text-opacity-80">
          Team team building activities is another level by blending competition with professional networking.
          Customizable branding, in-depth briefing and an unforgettable simulated experience await.
        </p>
        </div>
      </div>

      <div className="container mx-auto border border-[#d4af37]/30 p-4 md:p-12 mb-8">
  <div className="flex flex-col md:flex-row gap-4">
  <div className="relative w-full min-h-[250px] md:h-[400px] lg:h-[500px] overflow-hidden flex-1 md:order-last  block md:hidden">
      {/* <Image
        src="/assets/images/events/sim.png"
        alt="Modern venue space for corporate events"
        fill
        className="object-cover w-full"
      /> */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
      {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-[28px] h-[4px] ${
                  index === currentSlide
                    ? "bg-[#C09E5F] rounded-[20px]"
                    : "bg-white bg-opacity-[26%] rounded-[20px] hover:bg-opacity-100"
                }`}
              />
            ))}
          </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true, el: null }} 
        modules={[Pagination]}
        className="w-full h-full"
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Store Swiper instance
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
           
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div className="relative w-full min-h-[250px] md:h-[400px] ">
              <Image
                src={src}
                alt={`Carousel image ${index + 1}`}
                fill
                className="object-cover w-full min-h-[250px] md:h-[400px] "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
 
    <div className=" space-y-2 w-full md:w-[500px] flex flex-col justify-between">
      <div>
      <h2 className="text-[41px] font-bold font-orbitron text-[#C09E5F]">
        VENUE HIRE
      </h2>
      <p className="text-[15px] font-normal font-jura text-white leading-none text-opacity-80 ">
        Break your fear or sharpen your skills in an exhilarating session. Feel
        the adrenaline rush as you take on challenges while bonding with your
        friends in a competitive group race.
      </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-orbitron font-normal text-[#C09E5F] mt-[80px]">ADD-ONS</h3>
        <div className="flex flex-wrap gap-2 pb-4">
          <Link
            href="#"
            className="bg-transparent border border-[#C09E5F] font-bold font-jura text-white px-3 py-1 rounded-full text-xs"
          >
            BRANDED SIMULATION
          </Link>
          <Link
            href="#"
            className="bg-transparent border border-[#C09E5F] font-bold font-jura text-white px-3 py-1 rounded-full text-xs"
          >
            SCREENS
          </Link>
          <Link
            href=""
            className="bg-transparent border border-[#C09E5F] font-bold font-jura text-white px-3 py-1 rounded-full text-xs"
          >
            TEAM BUILDING ACTIVITIES
          </Link>
          <Link
            href="#"
            className="bg-transparent border border-[#C09E5F] font-bold font-jura text-white px-3 py-1 rounded-full text-xs"
          >
            CATERING
          </Link>
          <Link
            href="#"
            className="bg-transparent border border-[#C09E5F] font-bold font-jura text-white px-3 py-1 rounded-full text-xs"
          >
            VIDEOGRAPHY / PHOTOGRAPHY
          </Link>
          <Link
            href="#"
            className="bg-transparent border border-[#C09E5F] text-white px-3 py-1 rounded-full text-xs"
          >
            BRANDED GIFT PENS
          </Link>
        </div>
      </div>

      <Link
            // onClick={() => setIsModalOpen(true)}
              href="https://wa.me/966552249297?text=I'm%20interested%20in%20hiring%20the%20venue%20for%20an%20event,%20can%20I%20have%20more%20details?"
              className="button-slanted mt-[60px] w-[250px] h-[42px] font-jura text-[16px] font-bold leading-[24px] bg-[#F13936] cursor-pointer  text-white transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center"
            >
              GET DETAILS
            </Link>

            {/* {isModalOpen &&(
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="md:mx-4 mb-8 ">
              <div className="bg-[#C09E5F] shadow-lg w-full max-w-4xl mx-auto p-4 lg:p-16 md:rounded-[15px]">
                <h2 className="text-[32px] font-black font-orbitron text-[#063828] leading-[28px] mb-4 pb-4">{t('VENUE HIRE GET DETAILS')}</h2>
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
              onClick={() => setIsModalOpen(true)}
              type="submit"
              className="button-slanted mt-[20px] w-full h-[40px] md:h-[59px] lg:h-[59px] cursor-pointer flex items-center justify-center px-[20px] py-[8px]  font-jura font-bold text-[#c09e5f] bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0"
            >
              <span className="button-slanted-content py-2 font-jura font-bold text-[#c09e5f]">{t('GET CORPORATE BROCHURE')}</span>
              </button>
              </div>
            </div>
          
                </form>
        
              </div>
              </div>
            </div>
      )}

      {isModalOpenThank && (
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
        )} */}
    </div>

    <div className="relative w-full min-h-[250px] md:h-[400px] overflow-hidden flex hidden md:block ">
       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-[28px] h-[4px] ${index === currentSlide ? "bg-[#C09E5F] rounded-[20px]" : "bg-white bg-opacity-[26%] rounded-[20px] hover:bg-opacity-100"}`}
              />
            ))}
          </div>
      <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true, el: null }} 
            modules={[Pagination]}
            className="w-full h-full"
            onSwiper={(swiper) => (swiperRef.current = swiper)} 
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
            >
            {images.map((src, index) => (
        <SwiperSlide key={index} className="flex justify-center items-center">
            <div className="relative w-full min-h-[400px]">
            <Image
            src={src}
            alt={`Carousel image ${index + 1}`}
            fill
            className="object-cover "/>
              </div>
            </SwiperSlide>
            ))}
        </Swiper>
    </div>
  </div>
</div>


      <div className="container mx-auto border border-[#d4af37]/30 p-4 md:p-12 mb-8">
      
      <div className="flex flex-col md:flex-row gap-4">
      <div className="relative min-h-[250px] md:h-[400px]  overflow-hidden flex-1 md:order-last block md:hidden">
            <Image
              src="/assets/images/events/activation.png"
              alt="Gaming simulation setup with red and green lighting"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* <div className="absolute bottom-2 right-2 bg-black/50 rounded-full w-6 h-6 flex items-center justify-center">
              <span className="text-white text-xs">+</span>
            </div> */}
          </div>
          <div className="space-y-2 md:w-[500px] flex flex-col justify-between">
            <div>
            <h2 className="text-[41px] font-bold font-orbitron text-[#C09E5F]">ACTIVATIONS</h2>
            <p className="text-[15px] font-normal font-jura text-white leading-none text-opacity-80 ">
              Bring the "teleport" experience to your venue with our portable simulators. With effective branding, these
              units provide unforgettable and energy excitement to any event.
            </p>
            </div>
            <div className="space-y-2 flex flex-col justify-end">
            <h3 className="text-xl font-orbitron font-bold text-[#C09E5F] mt-[40px]">ADD-ONS</h3>
            <div className="flex flex-wrap gap-2 pb-4">
            <Link href="#" className="bg-transparent border font-bold font-jura border-[#C09E5F] text-white px-3 py-1 rounded-full text-xs">
                SIM HIRE
              </Link>
              <Link href="#" className="bg-transparent border font-bold font-jura border-[#C09E5F] text-white px-3 py-1 rounded-full text-xs">
                BRANDING
              </Link>
            </div>
           
            </div>

            <Link
            // onClick={() => setIsModalOpen(true)}
              href="https://wa.me/966552249297?text=I%27m%20interested%20in%20renting%20simulators%20for%20an%20activation%2C%20can%20I%20have%20more%20details%3F"
              className="button-slanted  w-[250px] h-[42px] font-jura text-[16px] font-bold leading-[24px] bg-[#F13936] cursor-pointer  text-white transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center"
            >
              GET DETAILS
            </Link>

            {/* {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[90%] md:w-[400px] text-center">
            <h3 className="text-xl font-bold text-[#C09E5F]">Venue Hire Details</h3>
            <p className="text-black opacity-80 mt-2">
              Contact us via WhatsApp for more information about venue hire.
            </p>
            <Link
              href="https://wa.me/966552249297?text=I'm%20interested%20in%20hiring%20the%20venue%20for%20an%20event,%20can%20I%20have%20more%20details?"
              className="block bg-[#F13936] text-white font-bold py-2 px-4 rounded-md mt-4"
            >
              Chat on WhatsApp
            </Link>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-[#F13936] font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )} */}
          </div>
          <div className="relative w-full min-h-[250px] md:h-[400px] overflow-hidden flex hidden md:block">
    
            <Image
              src="/assets/images/events/activation.png"
              alt="Gaming simulation setup with red and green lighting"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* <div className="absolute bottom-2 right-2 bg-black/50 rounded-full w-6 h-6 flex items-center justify-center">
              <span className="text-white text-xs">+</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

