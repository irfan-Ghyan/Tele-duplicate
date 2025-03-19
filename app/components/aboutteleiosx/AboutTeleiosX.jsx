export default function AboutTeleiosX() {
    return (
          <div className="relative w-full h-[805px] md:h-[1100px] lg:h-[1100px] bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col items-center justify-center" style={{ backgroundImage: 'url(/assets/images/about/bg.jpg)' }}>
            <div className="container mx-auto max-w-7xl px-[12px] md:px-[20px] lg:px-[20px] flex flex-col justify-center  relative z-10">
              <h1 className="text-[#C09E5F] text-[34px] md:text-[54px] font-orbitron font-black tracking-wider leading-[54px] mb-6">
                WHAT IS TELEIOSX
              </h1>
      
              <div className="mb-12">
                <p className="text-[#fff] opacity-[80%] font-jura text-[20px] md:text-[32px] lg:text-[32px] font-normal leading-none">
                  TeleiosX is an immersive motorsport destination crafted for enthusiasts, gamers, and professionals. Located
                  in the heart of Riyadh, we offer cutting-edge racing simulators, esports, and luxury hospitality, delivering
                  an unmatched thrill.
                </p>
                <br />
                <p className="text-[#fff] opacity-[80%] font-jura text-[20px] md:text-[32px] lg:text-[32px] font-normal leading-none">
                  Whether you're sharpening your racing skills, hosting an unforgettable event, or simply looking for the
                  ultimate track-racing experience, TeleiosX provides high-end entertainment at its finest.
                </p>
              </div>
            </div>
      
            <div className="absolute bottom-0 w-full hidden md:block ">
              <h2 className="text-[#C09E5F] text-[83px] md:text-[136.91px] font-orbitron font-black text-start md:text-center  md:leading-[189px] lg:leading-[189px]"
                style={{
                  WebkitTextStroke: "2px #E9B872",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ABOUT TELEIOSX
              </h2>
            </div>
            <div className="md:absolute lg:absolute bottom-0 w-full h-[84px] block md:hidden ">
              <h2 className="text-[#C09E5F] text-[83px] md:text-[136.91px] font-orbitron font-black text-start md:text-center leading-[83px]"
                style={{
                  WebkitTextStroke: "2px #E9B872",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ABOUT TELEIOSX
              </h2>
            </div>
          </div>
        );
      }
      
 