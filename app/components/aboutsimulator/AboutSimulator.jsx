export default function AboutSimulators() {
    return (
      <section className="w-full text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between">
            <div className="space-y-4">
              <h2
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text"
                style={{
                  WebkitTextStroke: "2.05px #C09E5F",
                  color: "transparent",
                }}
              >
                <span className="block font-orbitron font-black text-[203px]  ">ABOUT</span>
                <span className="block font-orbitron font-black text-[108px]">SIMULATORS</span>
              </h2>
            </div>
  
            <div className="space-y-4 pl-40">
              <p className="text-[20px] text-[#fff] text-opacity-80 font-jura ">
                The Hydra-One simulator represents the first and the most iconic of Teleios Simulators.
              </p>
  
              <p className="text-[20px] text-[#fff] text-opacity-80 font-jura">
                Named after the mythical Greek creature, it embodies strength, versatility, and grandeur—qualities
                seamlessly integrated into its design and performance.
              </p>
  
              <p className="text-[20px] text-[#fff] text-opacity-80 font-jura">
                This racing simulator combines cutting-edge technology with luxury craftsmanship, creating the ultimate
                racing experience for those who demand nothing less than perfection.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  