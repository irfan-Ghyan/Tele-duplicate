import Image from "next/image"
import Link from "next/link"

export default function MeetingRoomsSection() {
  return (
    <section className=" py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-8 ">
          <div className="w-[379px]">
          <div className="relative h-[208px] md:h-[390px] flex-1 md:hidden block pb-4">
            <Image
              src="/assets/images/experience/meetingroom.png"
              alt="High-tech meeting room with large display screen and modern design"
              fill
              className="object-cover rounded-sm"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              />
              </div>
            <div className="border-t border-[#E5C992]/40 w-full mb-8 hidden sm:block gap-y-4"></div>
            <h2 className="text-[34px] md:text-[73px] font-black font-orbitron text-[#C09E5F] leading-none py-8">
              MEETING
              <br />
              ROOMS
            </h2>
            <div className="hidden md:block">
            <p className="text-[14px] md:text-[18px] font-bold font-jura text-[#C09E5F] leading-normal">
            A premium space designed for special events, corporate gatherings, team-building activities, and exclusive meetups. Our VIP Suites feature spacious meeting rooms, comfortable seating, and state-of-the-art racing simulators—offering the perfect blend of business andadrenaline-fueled excitement.
            </p>
            </div>
            <div className="block md:hidden"> 
            <p className="text-[14px] md:text-[18px] font-bold font-jura text-white text-opcaity-80 leading-normal">
            A premium space designed for special events, corporate gatherings, team-building activities, and exclusive meetups.
            </p>
            <br/>
            <p className="text-[14px] md:text-[18px] font-bold font-jura text-white text-opcaity-80 leading-normal">
            Our VIP Suites feature spacious meeting rooms, comfortable seating, and state-of-the-art racing simulators—offering the perfect blend of business andadrenaline-fueled excitement.
            </p>
            </div>
            {/* <div className="pt-6">
              <Link
                href="#"
                className="button-slanted w-[209px] md:w-[233px] lg:w-[233px] h-[51px] text-[#C09E5F] font-jura text-[16px] font-bold leading-[24px] bg-0 border border-[#C09E5F] cursor-pointer rounded-tl-lg rounded-br-lg flex items-center justify-center"
              >
                SEE MORE DETAILS
              </Link>
            </div> */}
          </div>
          <div className="relative h-[400px] md:h-[589px] flex-1 hidden md:block">
            <Image
              src="/assets/images/experience/meeting.png"
              alt="High-tech meeting room with large display screen and modern design"
              fill
              className="object-cover rounded-sm"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              
            />
            {/* <div className="absolute bottom-4 right-4 bg-black/20 p-1 rounded">
              <span className="text-white text-xs">Google</span>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
