import Image from "next/image"

export default function AboutVenue() {
  return (
    <div className=" text-[#C09E5F] min-h-screen p-8 md:p-16">
      <div className="container mx-auto md:pt-8">
        
        <div className="flex gap-8">
          <div className="flex flex-col justify-center">
            <div className="border-t border-[#E5C992]/40 w-full mb-8"></div>
            <h1 className="text-[34px] md:text-[88.96px] lg:text-[88.96px] font-black font-orbitron mb-8 leading-tight">
              ABOUT
              <br />
              THE
              <br />
              VENUE
            </h1>
          </div>

          <div className="flex flex-col justify-center space-y-6 ">
            <p className="text-[24px] font-jura text-[#C09E5F] leading-24">
              A luxury-driven venue offering state-of-the-art racing simulators, exclusive VIP lounges, premium suites,
              and a stylish coffee bar. TeleiosX is designed to elevate your experience with world-class technology,
              luxury seating, and a futuristic ambiance.
            </p>

            <p className="text-[24px] font-jura text-[#C09E5F] leading-24">
              The ultimate destination for luxury entertainment—where the thrill of racing meets the sophistication of
              Riyadh's most dynamic venue. Take the driver's seat in our state- of-the-art simulators. Experience speed,
              luxury, and entertainment on another level. Watch the race while being part of one, and feel the
              adrenaline.
            </p>

            <p className="text-[24px] font-jura text-[#C09E5F] leading-24">
              For those who demand more, our exclusive lounge areas offer the perfect escape— private, luxurious, and
              designed for comfort.
              <br />
              Whether you are here to play, race, or simply experience the best Riyadh has to offer, TeleiosX redefines
              what it means to entertain.
            </p>
          </div>
        </div>

        <div className="mt-12 relative rounded-lg overflow-hidden">
          <Image
            src="/assets/images/about/aboutvenue.png"
            alt="TeleiosX luxury venue interior with large screen and comfortable seating"
            width={1200}
            height={600}
            className="w-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

