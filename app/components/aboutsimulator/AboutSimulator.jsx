import Image from "next/image"

export default function AboutSimulators() {

  
    return (
      <section className="w-full text-white ">

        <div className="container mx-auto px-4 md:px-0">
          <div className="flex flex-col xl:flex-row justify-between">
            <div className="space-y-4">
            <div className="border-t border-[#E5C992]/40 w-full mb-8 md:hidden lg:hidden"></div>
              <h2
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text"
                style={{
                  WebkitTextStroke: "2.05px #C09E5F",
                  color: "transparent",
                }}
              >
                <span className="block font-orbitron font-black text-[95px] md:text-[166px] lg:text-[203px] ">ABOUT</span>
                <span className="block font-orbitron font-black text-[51px] md:text-[92px] lg:text-[108px]">SIMULATORS</span>
              </h2>
            </div>
  
            <div className="space-y-4 pl-0 md:pl-0 lg:pl-[80px] py-8">
              <p className="text-[15px] md:text-[20px] lg:text-[20px] text-[#fff] text-opacity-80 font-jura leading-normal">
                The Hydra-One simulator represents the first and the most iconic of Teleios Simulators.
              </p>
  
              <p className="text-[15px] md:text-[20px] lg:text-[20px]  text-[#fff] text-opacity-80 font-jura leading-normal">
                Named after the mythical Greek creature, it embodies strength, versatility, and grandeur—qualities
                seamlessly integrated into its design and performance.
              </p>
  
              <p className="text-[15px] md:text-[20px] lg:text-[20px]  text-[#fff] text-opacity-80 font-jura leading-normal">
                This racing simulator combines cutting-edge technology with luxury craftsmanship, creating the ultimate
                racing experience for those who demand nothing less than perfection.
              </p>
            </div>
          </div>
        </div>
   

      
      </section>
    )
  }
  
  