import Image from "next/image"
import Link from "next/link"

export default function PrivateEventsSection() {
  return (
    <section className="relative">
      <div className="max-w-7xl relative mx-auto px-4 md:py-24 h-[900px] flex flex-col md:flex-row mt-[140px]">
        <div className="flex flex-col justify-center space-y-8 mb-12 md:mb-0 ">
          <div className="space-y-6">
            <h2 className="text-[34px] md:text-[34px] lg:text-[54px] font-black tracking-wide font-orbitron text-[#C09E5F]">PRIVATE EVENTS</h2>
            <p className="text-white text-[18px] max-w-xl font-bold font-jura text-opacity-80 pb-4">
              Make your private events unforgettable at TeleiosX! Whether it's a birthday, anniversary, or exclusive
              party, we've got you covered. Enjoy a luxurious private setting combined with state-of-the-art racing
              simulators for an unparalleled experience.
            </p>
          </div>

          <div>
            <Link
              href="/discover"
              className="button-slanted w-[233px] h-[51px] font-jura text-[16px] font-bold leading-[24px] bg-[#C09E5F] cursor-pointer rounded-tl-lg rounded-br-lg flex items-center justify-center"
            >
              Discover TeleiosX
            </Link>
          </div>
        </div>
      </div>
     
    </section>
  )
}

