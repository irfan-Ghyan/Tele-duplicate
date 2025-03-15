import Image from "next/image"
import Link from "next/link"

export default function CorporateEvents() {
  return (
    <div className="bg-[#0a3330] text-white min-h-screen p-4 md:p-20">
      {/* Header */}
      <div className="container mx-auto py-16 flex flex-col md:flex-row lg:flex-row">
        <h1 className="w-[40%] text-[50px] md:text-[54px] font-bold font-orbitron text-[#C09E5F]">Corporate Events</h1>
        <p className="w-[60%] text-[18px] font-bold font-jura text-opacity-80">
          Team team building activities is another level by blending competition with professional networking.
          Customizable branding, in-depth briefing and an unforgettable simulated experience await.
        </p>
      </div>

      {/* Venue Hire Section */}
      <div className="container mx-auto border border-[#d4af37]/30 p-4 md:p-12 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4 w-[350px]">
            <h2 className="text-2xl md:text-[45px] font-bold font-orbitron text-[#C09E5F]">VENUE HIRE</h2>
            <p className="text-[16px] font-bold font-jura text-white leading-none py-8">
              Break your fear or sharpen your skills in an exhilarating session. Feel the adrenaline rush as you take on
              challenges while bonding with your friends in a competitive group race.
            </p>

            <div className="space-y-4 py-8">
              <h3 className="text-xl font-semibold text-[#C09E5F]">ADD-ONS</h3>
              <div className="flex flex-wrap gap-2">
                <Link href="#" className="bg-transparent border border-[#C09E5F] font-bold font-jura text-white px-3 py-1 rounded-full text-xs">
                  BRANDED SIMULATION
                </Link>
                <Link href="#" className="bg-transparent border border-[#C09E5F] font-bold font-jura text-white px-3 py-1 rounded-full text-xs">
                  SCREENS
                </Link>
                <Link href="" className="bg-transparent border border-[#C09E5F] font-bold font-jura text-white px-3 py-1 rounded-full text-xs">
                  TEAM BUILDING ACTIVITIES
                </Link>
                <Link href="#" className="bg-transparent border border-[#C09E5F] font-bold font-jura text-white px-3 py-1 rounded-full text-xs">
                  CATERING
                </Link>
                <Link href="#" className="bg-transparent border border-[#C09E5F] font-bold font-jura text-white px-3 py-1 rounded-full text-xs">
                  VIDEOGRAPHY / PHOTOGRAPHY
                </Link>
                <Link href="#" className="bg-transparent border border-[#C09E5F] text-white px-3 py-1 rounded-full text-xs">
                  BRANDED GIFT PENS
                </Link>
              </div>
            </div>

            <Link
              href="#"
              className="button-slanted w-[140px] md:w-[250px] lg:w-[250px] h-[42px] font-jura text-[16px] font-bold leading-[24px] bg-[#F13936] cursor-pointer  text-white transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center"
            >
              GET DETAILS
            </Link>
          </div>
          <div className="relative h-[300px] md:h-full overflow-hidden flex-1">
            <Image
              src="/assets/images/events/sim.png"
              alt="Modern venue space for corporate events"
              fill
              className="object-cover w-full"
            />
            {/* <div className="absolute bottom-2 right-2 bg-black/50 rounded-full w-6 h-6 flex items-center justify-center">
              <span className="text-white text-xs">+</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Activations Section */}
      <div className="container mx-auto border border-[#d4af37]/30  p-4 md:p-12">
        <div className="grid md:grid-cols-2 justify-between gap-6">
          <div className="space-y-4 w-[350px]">
            <h2 className="text-2xl md:text-[45px] font-bold font-orbitron text-[#C09E5F]">ACTIVATIONS</h2>
            <p className="text-[16px] font-bold font-jura text-white pt-6 pb-12">
              Bring the "teleport" experience to your venue with our portable simulators. With effective branding, these
              units provide unforgettable and energy excitement to any event.
            </p>

            <div className="flex flex-wrap gap-2 mt-4 pt-2 pb-32 ">
              <Link href="#" className="bg-transparent border font-bold font-jura border-[#C09E5F] text-white px-3 py-1 rounded-full text-xs">
                DRY HIRE
              </Link>
              <Link href="#" className="bg-transparent border font-bold font-jura border-[#C09E5F] text-white px-3 py-1 rounded-full text-xs">
                BRANDING
              </Link>
            </div>

            <Link
              href="#"
              className="button-slanted w-[140px] md:w-[250px] lg:w-[250px] h-[42px] font-jura text-[16px] font-bold leading-[24px] bg-[#F13936] cursor-pointer  text-white transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center"
            >
              GET DETAILS
            </Link>
          </div>
          <div className="relative h-[300px] md:h-full overflow-hidden flex-1">
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

