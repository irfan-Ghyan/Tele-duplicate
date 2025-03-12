"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const OfferSpecials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)
  const [visibleItems, setVisibleItems] = useState(3)

  // Update visible items based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2)
      } else {
        setVisibleItems(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  

  const offers = [
    {
      id: 1,
      title: "LADIES NIGHT",
      day: "WEDNESDAY",
      date: "March 19th",
      time: "From 19:00",
      image: "/assets/images/experience/race.png",
      alt: "Gaming area with multiple screens",
    },
    {
      id: 2,
      title: "LADIES NIGHT",
      day: "WEDNESDAY",
      date: "March 19th",
      time: "From 19:00",
      image: "/assets/images/experience/card3.png",
      alt: "People watching sports on a big screen",
    },
    {
      id: 3,
      title: "LADIES NIGHT",
      day: "WEDNESDAY",
      date: "March 19th",
      time: "From 19:00",
      image: "/assets/images/experience/ladynight.png",
      alt: "Person enjoying VR gaming",
    },
    {
      id: 4,
      title: "LADIES NIGHT",
      day: "WEDNESDAY",
      date: "March 19th",
      time: "From 19:00",
      image: "/assets/images/experience/race.png",
      alt: "Gaming experience",
    },
    {
      id: 5,
      title: "LADIES NIGHT",
      day: "WEDNESDAY",
      date: "March 19th",
      time: "From 19:00",
      image: "/assets/images/experience/race.png",
      alt: "Gaming experience",
    },
    {
      id: 6,
      title: "LADIES NIGHT",
      day: "WEDNESDAY",
      date: "March 19th",
      time: "From 19:00",
      image: "/assets/images/experience/card3.png",
      alt: "Gaming experience",
    },
  ]

  const totalSlides = offers.length
  const maxIndex = totalSlides - visibleItems

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1))
  }

  return (
    <div className="w-full bg-[#00332b] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[48px] font-black font-orbitron text-[#C09E5F]">OFFERS & SPECIALS</h2>
           <div className="top-buttons flex items-center">
                        <div className="mt-[20px] md:mt-[0px] w-68 h-55">
                          <button
                            onClick={prevSlide}
                            className="button-slanted cursor-pointer flex items-center justify-center px-2 py-2 lg:px-6 lg:py-4 border-[0.5px] border-opacity-30 border-[#C09E5F] font-jura font-bold text-[#C09E5F] hover:bg-gradient-to-r ml-2 hover:from-[#c09e5f] hover:to-[#e3ce90] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0"
                          >
                            <Image src="/assets/images/dome/left.png" alt="arrow" width={30} height={18} />
                          </button>
                        </div>
                        <div className="mt-[20px] md:mt-[0px] w-68 h-55">
                          <button
                            onClick={nextSlide}
                            className="button-slanted cursor-pointer flex items-center justify-center px-2 py-2 lg:px-6 lg:py-4 border-[0.5px] border-opacity-30 border-[#C09E5F]  font-jura font-bold text-[#C09E5F] hover:bg-gradient-to-r ml-2 hover:from-[#c09e5f] hover:to-[#e3ce90] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0"
                          >
                            <Image src="/assets/images/dome/right.png" alt="arrow" width={30} height={18} />
                          </button>
                        </div>
                      </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
              width: `${(totalSlides * 100) / visibleItems}%`,
            }}
          >
            {offers.map((offer) => (
              <div key={offer.id} className="px-2">
                <div className="border border-[#c9a66b] w-full md:w-[360px] md:h-[644px] lg:w-[360px] lg:h-[644px]">
                  <div className="relative h-[200px] md:h-[281px] lg:h-[281px] overflow-hidden">
                    <Image src={offer.image || "/placeholder.svg"} alt={offer.alt} fill className="object-cover" />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-#00352F to-transparent opacity-100 mt-4"></div>
                   
                  </div>

                  <div className="p-4 text-center">
                  <div className=" p-4">
                      <h3 className="text-[36px] font-black font-orbitron text-center text-[#C09E5F] leading-[48px]">{offer.title}</h3>
                    </div>
                    <p className="text-white text-[24px] font-bold font-orbitron text-center">{offer.day}</p>
                    <p className="text-white text-[24px] font-bold font-orbitron text-center">{offer.date}</p>
                    <div className="border-t border-[#c9a66b] w-[274px] mx-auto my-2"></div>
                    <p className="text-white text-[20px] font-bold font-jura text-center opacity-60">{offer.time}</p>

                    <div className="space-y-2 mt-8 flex flex-col items-center">
                      <button className="button-slanted w-[256px] h-[42px] font-jura text-[16px] font-bold leading-[24px] bg-[#C09E5F] cursor-pointer text-[#00352F] transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
                        FIND OUT MORE
                      </button>
                      <button className="button-slanted  w-[256px] h-[42px] font-jura text-[16px] font-bold leading-[24px] bg-[#F13936] cursor-pointer  text-white transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
                        BOOK TICKET
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfferSpecials

