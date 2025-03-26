

"use client"

import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function AboutVenue() {
  const images = [
    "/assets/images/events/bg1.jpg",
    "/assets/images/events/bg2.jpg",
    "/assets/images/events/bg3.jpg",
    "/assets/images/events/bg4.jpg",
    "/assets/images/events/bg5.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef(null); // Reference to Swiper

  const goToSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
    setCurrentSlide(index);
  };

  return (
    <div className="text-[#C09E5F] p-4 pb-12 md:p-16">
      <div className="relative container mx-auto md:pt-8">
        <div className="flex flex-col md:flex-row lg:flex-row md:gap-8 lg:gap-8">
          <div className="flex flex-col justify-center">
            <div className="border-t border-[#E5C992]/40 w-full mb-8 hidden md:block"></div>
            <h1 className="text-[55px] md:text-[88.96px] lg:text-[88.96px] font-black font-orbitron mb-8 leading-tight hidden md:block">
              ABOUT
              <br />
              THE
              <br />
              VENUE
            </h1>
            <h1 className="text-[55px] md:text-[88.96px] lg:text-[88.96px] font-black font-orbitron mb-8 leading-tight block md:hidden">
              ABOUT THE VENUE
            </h1>
          </div>

          <div className="flex flex-col space-y-6">
            <p className="text-[15px] md:text-[24px] lg:text-[24px] font-jura text-[#C09E5F] leading-[15px] md:leading-[24px] lg:leading-[24px]">
              A luxury-driven venue offering state-of-the-art racing simulators, exclusive VIP lounges, premium suites,
              and a stylish coffee bar. TeleiosX is designed to elevate your experience with world-class technology,
              luxury seating, and a futuristic ambiance.
            </p>

            <p className="text-[15px] md:text-[24px] lg:text-[24px] font-jura text-[#C09E5F] leading-[15px] md:leading-[24px] lg:leading-[24px]">
              The ultimate destination for luxury entertainment—where the thrill of racing meets the sophistication of
              Riyadh's most dynamic venue. Take the driver's seat in our state-of-the-art simulators. Experience speed,
              luxury, and entertainment on another level. Watch the race while being part of one, and feel the
              adrenaline.
            </p>

            <p className="text-[15px] md:text-[24px] lg:text-[24px] font-jura text-[#C09E5F] leading-[15px] md:leading-[24px] lg:leading-[24px]">
              For those who demand more, our exclusive lounge areas offer the perfect escape— private, luxurious, and
              designed for comfort.
              <br />
              Whether you are here to play, race, or simply experience the best Riyadh has to offer, TeleiosX redefines
              what it means to entertain.
            </p>
          </div>
        </div>

        {/* Swiper Section */}
        <div className="mt-12 relative rounded-lg overflow-hidden">
          {/* Custom Navigation Buttons */}
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

          {/* Swiper Component */}
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true, el: null }}
            modules={[Pagination]}
            className="w-full h-full"
            onSwiper={(swiper) => (swiperRef.current = swiper)} // Store Swiper instance
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)} // Update active slide state
          >
            {images.map((src, index) => (
              <SwiperSlide key={index} className="flex justify-center items-center">
                <div className="relative w-full min-h-[250px] md:h-[718px] lg:h-[818px]">
                  <Image
                    src={src}
                    alt={`Carousel image ${index + 1}`}
                    fill
                    className="object-cover w-full min-h-[250px] md:h-[718px] lg:h-[818px]"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
