import Image from "next/image"
import Link from "next/link"

export default function CorporateEvents() {
  return (
    <div className="bg-[#0a3330] text-white p-4 md:p-20">
      {/* Header */}
      <div className="container mx-auto py-16 flex flex-col md:flex-row lg:flex-row">
        <div className="w-full md:w-[40%] lg:w-[40%]"><h1 className="text-[50px] md:text-[50px] lg:text-[50px] font-extrabold font-orbitron text-[#C09E5F] leading-[50px]">Corporate Events</h1></div>
        <div className="w-full md:w-[60%] lg:w-[60%] pl-0 md:pl-8 lg:pl-8">
        <p className="text-[17px] font-bold font-jura text-opacity-80 pt-10 md:pt-0 lg:pt-0">
          Team team building activities is another level by blending competition with professional networking.
          Customizable branding, in-depth briefing and an unforgettable simulated experience await.
        </p>
        </div>
      </div>

      {/* Venue Hire Section */}
      <div className="container mx-auto border border-[#d4af37]/30 p-4 md:p-12 mb-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="relative h-[250px] md:h-full overflow-hidden flex-1 md:order-last block md:hidden">
      <Image
        src="/assets/images/events/sim.png"
        alt="Modern venue space for corporate events"
        fill
        className="object-cover w-full"
      />
    </div>
    {/* Text Section (Will be First on Mobile, Left on Larger Screens) */}
    <div className="space-y-4 w-full md:w-[350px]">
      <h2 className="text-[45px] font-bold font-orbitron text-[#C09E5F]">
        VENUE HIRE
      </h2>
      <p className="text-[16px] font-bold font-jura text-white leading-none">
        Break your fear or sharpen your skills in an exhilarating session. Feel
        the adrenaline rush as you take on challenges while bonding with your
        friends in a competitive group race.
      </p>

      <div className="space-y-4">
        <h3 className="text-xl font-orbitron font-bold text-[#C09E5F]">ADD-ONS</h3>
        <div className="flex flex-wrap gap-2">
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
        href="#"
        className="button-slanted w-[250px] h-[42px] font-jura text-[16px] font-bold leading-[24px] bg-[#F13936] cursor-pointer text-white transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center"
      >
        GET DETAILS
      </Link>
    </div>

    {/* Image (Top on Mobile, Right on Larger Screens) */}
    <div className="relative h-[250px] md:h-full overflow-hidden flex-1 md:order-last hidden md:block">
      <Image
        src="/assets/images/events/sim.png"
        alt="Modern venue space for corporate events"
        fill
        className="object-cover w-full"
      />
    </div>
  </div>
</div>


      {/* Activations Section */}
      <div className="container mx-auto border border-[#d4af37]/30 p-4 md:p-12">
        <div className="grid md:grid-cols-2 justify-between gap-6">
        <div className="relative h-[300px] md:h-full overflow-hidden flex-1 md:order-last block md:hidden">
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
          <div className="space-y-4 w-[330px] md:[350px]">
            <h2 className="text-[41px] font-bold font-orbitron text-[#C09E5F]">ACTIVATIONS</h2>
            <p className="text-[16px] font-bold font-jura text-white ">
              Bring the "teleport" experience to your venue with our portable simulators. With effective branding, these
              units provide unforgettable and energy excitement to any event.
            </p>

            <div className="space-y-4 gap-2 ">
            <h3 className="text-xl font-orbitron font-bold text-[#C09E5F]">ADD-ONS</h3>
            <div className="flex flex-wrap gap-2">
            <Link href="#" className="bg-transparent border font-bold font-jura border-[#C09E5F] text-white px-3 py-1 rounded-full text-xs">
                DRY HIRE
              </Link>
              <Link href="#" className="bg-transparent border font-bold font-jura border-[#C09E5F] text-white px-3 py-1 rounded-full text-xs">
                BRANDING
              </Link>
            </div>
              
            </div>

            <Link
              href="#"
              className="button-slanted w-[250px] h-[42px] font-jura text-[16px] font-bold leading-[24px] bg-[#F13936] cursor-pointer  text-white transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center"
            >
              GET DETAILS
            </Link>
          </div>
          <div className="relative h-[300px] md:h-full overflow-hidden flex-1 hidden md:block">
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

