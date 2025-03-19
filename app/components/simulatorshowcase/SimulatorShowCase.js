// import Image from "next/image"

// export default function RacingSimulatorShowcase() {
//   return (
//     <div className="relative container mx-auto w-full overflow-hidden">
//       <div className="max-w-7xl mx-auto">
//         {/* Central Product Image */}
//         <div className="relative flex justify-center items-center ">
//           <Image
//             src="/assets/images/about/simulator.png"
//             width={800}
//             height={500}
//             className="object-contain z-10 w-[900px] h-[800px]"
//             priority
//             alt="simulator"
//           />
//         </div>

//         {/* Feature Points - Left Side */}

//         <div className="absolute left-4 md:left-12 lg:left-24 top-1/4 w-1/3 md:w-1/4 z-20">
//           <FeaturePoint
//             number={1}
//             title="Luxury Design"
//             description="Engineered for both elegance and performance with meticulous attention to aesthetic details that complement any environment with timeless sophistication."
//           />
//         </div>

//         <div className="absolute left-4 md:left-12 lg:left-24 top-1/2 w-1/3 md:w-1/4 z-20">
//           <FeaturePoint
//             number={2}
//             title="Premium Materials"
//             description="Crafted with the finest quality components from aerospace-grade aluminum to composite seat materials, complemented by the finest Italian-produced Nappa leather."
//           />
//         </div>

//         <div className="absolute left-4 md:left-12 lg:left-24 bottom-1/4 w-1/3 md:w-1/4 z-20 mt-[2]">
//           <FeaturePoint
//             number={3}
//             title="Solid Frame"
//             description="A fully hand-welded stainless steel structure engineered for maximum performance and durability, designed to withstand the highest torques and braking forces."
//           />
//         </div>
//         {/* Feature Points - Right Side */}

//         <div className="absolute right-4 md:right-12 lg:right-24 top-1/4 w-1/3 md:w-1/4 text-right z-20">
//           <FeaturePoint
//             number={4}
//             title="Comfort Features"
//             description="A fully hand-welded stainless steel structure engineered for maximum performance and durability, designed to withstand the highest torques and braking forces."
//             rightAligned={true}
//           />
//         </div>

//         <div className="absolute right-4 md:right-12 lg:right-24 top-1/2 w-1/3 md:w-1/4 text-right z-20">
//           <FeaturePoint
//             number={5}
//             title="Turnkey Solution"
//             description="A ready-to-use simulator that can be delivered and installed in your location—whether home, office, garage, or race track—by our expert technicians who provide personalized training."
//             rightAligned={true}
//           />
//         </div>

//         <div className="absolute right-4 md:right-12 lg:right-24 bottom-1/4 w-1/3 md:w-1/4 text-right z-20">
//           <FeaturePoint
//             number={6}
//             title="Customizable"
//             description="Through our exclusive Tailoring program, design your unique racing simulator. Our expert designers work with you to select the finest materials, perfect leather for your seat, and customize every element from branding details to performance."
//             rightAligned={true}
//           />

//         </div>
//       </div>
//     </div>
//   )
// }

// /**
//  * Feature Point Component
//  * @param {Object} props - Component props
//  * @param {number} props.number - Feature number
//  * @param {string} props.title - Feature title
//  * @param {string} props.description - Feature description
//  * @param {boolean} props.rightAligned - Whether the feature should be right-aligned
//  */
// function FeaturePoint({ number, title, description, rightAligned = false }) {
//   return (
//     <div className={`flex flex-col gap-2 ${rightAligned ? "items-end" : "items-start"}`}>
//       <div className={`flex items-center gap-2 ${rightAligned ? "flex-row-reverse" : "flex-row"}`}>
//         <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[#C09E5F] text-[#C09E5F]">
//           {number}
//         </div>
//         <h3 className="text-[16px] md:text-[16px] font-orbitron font-bold text-white">{title}</h3>
//       </div>
//       <p className={`text-[14px] md:text-[14px] font-jura text-[#5F7F7B] ${rightAligned ? "text-right" : "text-left"}`}>{description}</p>
//       <div
//         className={`w-full h-0.5 bg-[#C09E5F] ${rightAligned ? " bg-[#C09E5F]" : "bg-[#C09E5F]"} mt-2`}
//       ></div>
//     </div>
//   )
// }




"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export default function RacingSimulatorShowcase() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const features = [
    { number: 1, title: "Luxury Design", description: "Engineered for elegance and performance with meticulous attention to detail." },
    { number: 2, title: "Premium Materials", description: "Crafted with aerospace-grade aluminum and fine Italian Nappa leather." },
    { number: 3, title: "Solid Frame", description: "Hand-welded stainless steel structure for maximum durability and performance." },
    { number: 4, title: "Comfort Features", description: "Designed to provide an immersive and comfortable racing experience." },
    { number: 5, title: "Turnkey Solution", description: "Delivered and installed by our experts for a hassle-free experience." },
    { number: 6, title: "Customizable", description: "Personalized design, materials, and branding to match your style." }
  ]

  return (
    <div className="relative container mx-auto w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Central Product Image */}
        <div className="relative flex justify-center items-center">
          <Image
            src="/assets/images/about/simulator.png"
            width={800}
            height={500}
            className="object-contain z-10 w-[900px] h-[480px] md:h-[800px]"
            priority
            alt="simulator"
          />
        </div>

        {/* Mobile View - Swiper Slider */}
        {isMobile ? (
          <>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
       
            spaceBetween={20}
            slidesPerView={1}
            className="w-full h-auto mt-8"
          >
            {features.map((feature) => (
              <SwiperSlide key={feature.number}>
                <FeaturePoint  number={feature.number} title={feature.title} description={feature.description} />
              </SwiperSlide>
            ))}
          </Swiper>
          
        </>
        ) : (
          <>
            {/* Desktop View - Static Layout */}
            <div className="absolute left-4 md:left-12 lg:left-24 top-1/4 w-1/3 md:w-1/4 z-20">
              <FeaturePoint number={1} title="Luxury Design" description="Engineered for elegance and performance with meticulous attention to detail." />
            </div>
            <div className="absolute left-4 md:left-12 lg:left-24 top-1/2 w-1/3 md:w-1/4 z-20">
              <FeaturePoint number={2} title="Premium Materials" description="Crafted with aerospace-grade aluminum and fine Italian Nappa leather." />
            </div>
            <div className="absolute left-4 md:left-12 lg:left-24 bottom-1/4 w-1/3 md:w-1/4 z-20">
              <FeaturePoint number={3} title="Solid Frame" description="Hand-welded stainless steel structure for maximum durability and performance." />
            </div>
            <div className="absolute right-4 md:right-12 lg:right-24 top-1/4 w-1/3 md:w-1/4 text-right z-20">
              <FeaturePoint number={4} title="Comfort Features" description="Designed to provide an immersive and comfortable racing experience." rightAligned={true} />
            </div>
            <div className="absolute right-4 md:right-12 lg:right-24 top-1/2 w-1/3 md:w-1/4 text-right z-20">
              <FeaturePoint number={5} title="Turnkey Solution" description="Delivered and installed by our experts for a hassle-free experience." rightAligned={true} />
            </div>
            <div className="absolute right-4 md:right-12 lg:right-24 bottom-1/4 w-1/3 md:w-1/4 text-right z-20">
              <FeaturePoint number={6} title="Customizable" description="Personalized design, materials, and branding to match your style." rightAligned={true} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function FeaturePoint({ number, title, description, rightAligned = false }) {
  return (
    <div className={`flex flex-col gap-2 px-20 ${rightAligned ? "items-end" : "items-start"}`}>
      <div className={`flex items-center gap-2 text-center ${rightAligned ? "flex-row-reverse" : "flex-row"}`}>
        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[#C09E5F] text-[#C09E5F]">
          {number}
        </div>
        <h3 className="text-[16px] md:text-[16px] font-orbitron font-bold text-white">{title}</h3>
      </div>
      <p className={`text-[14px] md:text-[14px] font-jura text-[#5F7F7B] ${rightAligned ? "text-right" : "text-left"}`}>{description}</p>
      <div className="md:hidden custom-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer">
          <Image src="/assets/images/about/left.png" width={40} height={40} alt="Previous" />
        </div>
        <div className="md:hidden custom-next absolute right-0 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer">
          <Image src="/assets/images/about/right.png" width={40} height={40} alt="Next" />
        </div>
      
    </div>
  )
}
