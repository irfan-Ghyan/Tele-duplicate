import Image from "next/image"

const Feature = ({ number, title, description, position, className }) => {
  const positionClasses = position === "left" ? "text-right items-end" : "text-left items-start"

  return (
    <div className={`flex flex-col gap-2 max-w-[300px] ${positionClasses} ${className || ""}`}>
      <div className="flex items-center gap-2">
        {position === "right" && (
          <div className="flex items-center justify-center w-6 h-6 rounded-full border border-amber-500 text-amber-500">
            {number}
          </div>
        )}
        <h3 className="text-amber-500 font-semibold">{title}</h3>
        {position === "left" && (
          <div className="flex items-center justify-center w-6 h-6 rounded-full border border-amber-500 text-amber-500">
            {number}
          </div>
        )}
      </div>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  )
}

export default function SimulatorShowcase() {
  return (
    <div className="bg-[#00352f] text-white min-h-screen w-full py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="flex flex-col justify-center ]">
            <h1
              className="text-[203.38px] md:text-[203.38px] font-bold tracking-tighter text-amber-500 mb-8 h-[313px"
              style={{
                WebkitTextStroke: "1px #b78c3c",
                WebkitTextFillColor: "transparent",
              }}
            >
              ABOUT
             
              <br />
              <span className="text-[108px]">SIMULATORS</span>
              </h1>
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <p className="text-gray-300">
              The Hydra-One simulator represents the first and the most iconic of Teleios Simulators.
            </p>
            <p className="text-gray-300">
              Named after the mythical Greek creature, it embodies strength, versatility, and grandeur—qualities
              seamlessly integrated into its design and performance.
            </p>
            <p className="text-gray-300">
              This racing simulator combines cutting-edge technology with luxury craftsmanship, creating the ultimate
              racing experience for those who demand nothing less than perfection.
            </p>
          </div>
        </div>

       

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-1">
              <Feature
                number={1}
                title="Luxury Design"
                description="Engineered for both elegance and performance, with clean lines and aesthetic details that complement any environment with timeless appeal."
                position="left"
              />

              <div className="h-16 lg:h-32"></div>

              <Feature
                number={2}
                title="Premium Materials"
                description="Crafted with the highest quality components, from aerospace-grade aluminum to composite seat materials, complemented by the finest Italian-produced Alcantara leather."
                position="left"
              />

              <div className="h-16 lg:h-32"></div>

              <Feature
                number={3}
                title="Solid Frame"
                description="A fully hand-welded stainless steel structure engineered for maximum performance and durability, designed to withstand the highest torques and braking forces."
                position="left"
              />
            </div>

    
            <div className="relative">
          {/* Central Image */}
          <div className=" mb-8 lg:mb-0">
            <div className=" w-full max-w-4xl">
              <Image
                src="/assets/images/about/simulator.png"
                alt="Hydra-One Racing Simulator"
                width={800}
                height={600}
                className="object-contain"
                priority
              />
            </div>
          </div>
            </div>

            <div className="lg:col-span-1">
              <Feature
                number={4}
                title="Comfort Features"
                description="A fully hand-welded stainless steel structure engineered for maximum performance and durability, designed to withstand the highest torques and braking forces."
                position="right"
              />

              <div className="h-16 lg:h-32"></div>

              <Feature
                number={5}
                title="Turnkey Solution"
                description="A ready-to-use racing simulator, delivered and installed at your location—whether home, office, garage, or race track—by our expert technicians who provide personalized training."
                position="right"
              />

              <div className="h-16 lg:h-32"></div>

              <Feature
                number={6}
                title="Customizable"
                description="Through our exclusive Tailoring program, design your unique racing simulator. Our expert designers work with you to select the best materials, perfect leather for your seat, and customize every element from steering wheel to pedals."
                position="right"
              />
            </div>
        </div>
      </div>
    </div>
  )
}

