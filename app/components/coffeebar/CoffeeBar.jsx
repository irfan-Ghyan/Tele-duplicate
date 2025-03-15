import Image from "next/image"
import Link from "next/link"

export default function CoffeeBar() {
  return (
    <div className="relative w-full h-[550px] overflow-hidden lg:bg-cover bg-left lg:bg-right xl:bg-center  " style={{ backgroundImage: "url('/assets/images/dome/offers.png')" }}>


      <div className="relative h-full w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
        <div className="hidden md:block md:w-1/2"></div>

        <div className="w-full md:w-1/2 flex flex-col justify-center h-full space-y-8 md:py-[50px] lg:py-[50px]">
       
          <div className="self-end">
          
            <p className="font-orbitron text-[#C09E5F] text-normal font-[14px] tracking-wider hidden sm:block">F&B</p>
          </div>
          <div className="border-t border-[#E5C992]/40 w-full border-opacity-20 hidden sm:block"></div>
          {/* Main Heading */}
          <div className="flex justify-between">
          <h1 className="text-[#C09E5F] font-orbitron text-[34px] md:text-[54px] lg:text-[54px] font-black tracking-wider">F&B</h1>
          <p className="font-orbitron text-[#C09E5F] text-normal font-[14px] tracking-wider sm:hidden">F&B</p>
          </div>
          {/* Description */}
          <p className="text-[#C09E5F] font-jura text-[18px] lg:text-[18px] font-normal leading-[20px]">
            Elevate your experience with an exquisite selection of gourmet coffees, premium snacks, and handcrafted
            mocktails. Our premium coffee bar is the perfect pit stop between races.
          </p>

          {/* Button */}
          <div className="pt-6">
            <Link
              href="/menu"
              className="button-slanted w-[136px] h-[53px] text-[#C09E5F] font-jura text-[16px] font-bold leading-[24px] bg-0 border border-[#C09E5F] cursor-pointer rounded-tl-lg rounded-br-lg flex items-center justify-center"
            >
              SEE MENU
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

