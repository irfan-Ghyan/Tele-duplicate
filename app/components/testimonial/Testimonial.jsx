
'use client';

import { useRef, useState, useEffect } from 'react';
import Profile from './profile/Profile';
import Image from 'next/image';
// import leftArrow from '../../../public/assets/images/dome/left.png';
// import rightArrow from '../../../public/assets/images/dome/right.png';

export default function Testimonial() {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeButton, setActiveButton] = useState(null);

  const testimonials = [
    { title: '3ain 3osha', description: 'You can only give this place a high rating. This place for car racing games, new and up to date. The hardware is very advanced. ', imageUrl: '/assets/images/dome/sain.png' },
    { title: 'Ammar Al Tayara', description: 'Amazing place to enjoy you time, the atmosphere the food and the experience are great. You can driver your favorite Formula 1 car on your favorite track.', imageUrl: '/assets/images/dome/ammar.png' },
    { title: 'Alaa Tarawneh', description: 'One of the best places in UAE if not the whole world for real Sim Racing enthusiasts', imageUrl: '/assets/images/dome/alaa.png' },
    { title: 'Ivan Daka', description: 'Looks amazing! Recommend to visit and play some racings🏎️ it feels like you are inside the real sport car! Stuff is great and atmosphere looks amazing', imageUrl: '/assets/images/dome/ivan.png' },
    { title: 'Yahia Al Ayat', description: 'The perfect racing simulation in UAE', imageUrl: '/assets/images/dome/yahia.png' },
    { title: 'Hakeem Al Hawary', description: 'First time I try these amazing simulators, and what an amazing experience, I would highly recommend all those who are into car racing.', imageUrl: '/assets/images/dome/hakeem.png' },
    { title: 'Sone leh', description: 'Amazing experience can’t wait to be back again 👊👊👊💯', imageUrl: '/assets/images/dome/son.png' },
    { title: 'Sam caward', description: 'Amazing place, great atmosphere and the simulators were so fun would definitely recommend for a day out with friends', imageUrl: '/assets/images/dome/s.png' },
    { title: 'Mirko Popovic', description: 'What a fantastic place to spend time and try an insanely real racing simulator. Gt races were so good.', imageUrl: '/assets/images/dome/m.png' },
    { title: 'Alois vieujot', description: 'Incredible place to spend countless hours with friends and family! Absolutely loved it!', imageUrl: '/assets/images/dome/a.png' },
    { title: 'JADH BIN', description: 'The best simulatiom experience. You can feel the race. This place is worth on money. The staffs are very friendly', imageUrl: '/assets/images/dome/jadh.png' },
    { title: 'Rami Hamad', description: 'An amazing F1 experience !!! Certainly going back again. Highly recommended for groups and  adrenaline rush', imageUrl: '/assets/images/dome/rami.png' },
    { title: 'Mateen Mohammed', description: 'Very good experience', imageUrl: '/assets/images/dome/mateen.png' },
    { title: 'Dharmesh Rathod', description: 'Wonderful and amazing place for fun with racing Simulators....', imageUrl: '/assets/images/dome/dharmesh.png' },
    { title: 'Giorgio Max', description: 'Great simulators, amazing retro-futuristic gaming arena!!', imageUrl: '/assets/images/dome/giorgio.png' },
    { title: 'Mohammed “mhdphotographer”', description: 'I like Everything there 😍', imageUrl: '/assets/images/dome/mohammed.png' },
    { title: 'Federico Rossi', description: 'Best way to spend a sunday in Dubai.', imageUrl: '/assets/images/dome/federico.png' },
    { title: 'Muhammad Shahzad', description: 'Amazing experience, Hats off', imageUrl: '/assets/images/dome/m.png' },
    { title: 'Seun Ayoola', description: 'The location is easy to locate, and the simulators are amazing . Thanks Teleios', imageUrl: '/assets/images/dome/s.png' },
    
  ];

  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];
 
  // Handle mouse-based dragging for desktop
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX);
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // const handleMouseUp = () => {
  //   setIsDragging(false);
  //   snapToItem();
  // };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch-based dragging for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX);
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // const handleTouchEnd = () => {
  //   setIsDragging(false);
  //   snapToItem();
  // };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Snap to the nearest item after scroll
  const snapToItem = () => {
    const itemWidth = scrollContainerRef.current.firstChild.offsetWidth + 16;
    const scrollPosition = scrollContainerRef.current.scrollLeft;
    const closestIndex = Math.round(scrollPosition / itemWidth);
    const snapPosition = closestIndex * itemWidth;
    scrollContainerRef.current.scrollTo({ left: snapPosition, behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.firstChild.offsetWidth + 16;
      scrollContainerRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
      setActiveButton('next'); // Set active button
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.firstChild.offsetWidth + 16;
      scrollContainerRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      setActiveButton('prev'); // Set active button
    }
  };

  const handleScroll = () => {
    const scrollWidth = scrollContainerRef.current.scrollWidth / 2; // Width of the original content
    const scrollLeft = scrollContainerRef.current.scrollLeft;

    if (scrollLeft >= scrollWidth) {
      scrollContainerRef.current.scrollLeft = scrollLeft - scrollWidth; // Reset scroll position
    } else if (scrollLeft <= 0) {
      scrollContainerRef.current.scrollLeft = scrollWidth; // Reset to the end of original content
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const handleScroll = () => {
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      if (scrollContainer.scrollLeft >= maxScrollLeft) {
        scrollContainer.scrollLeft = scrollContainer.clientWidth; // Reset to the beginning set of items
      } else if (scrollContainer.scrollLeft <= 0) {
        scrollContainer.scrollLeft = maxScrollLeft - scrollContainer.clientWidth; // Reset to the last set of items
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden relative flex justify-center items-center py-[40px] md:py-[50px] lg:py-[100px]">
      <div className="max-w-7xl w-full px-4 md:px-8">
        <div className="mx-auto py-8">
          <div className="border-solid border-b-[1px] border-white border-opacity-50 text-end"></div>
          <div className="md:flex md:justify-between items-center mt-[36px] lg:mb-[41px]">
            <div>
              <h1 className="text-[32px] md:text-[54px] text-white font-black font-orbitron">WHAT PEOPLE <br/>SAY ABOUT US</h1>
            </div>
            {/* Top buttons for larger screens */}
            <div className="top-buttons flex items-center">
              <div className="mt-[20px] md:mt-[0px] w-65 h-45 ">
                <button
                  onClick={scrollPrev}
                  className="button-slanted cursor-pointer flex items-center justify-center px-6 py-4 border-[0.5px] border-opacity-30 border-white font-jura font-bold text-white hover:bg-gradient-to-r ml-2 hover:from-[#D007A6] hover:to-[#7E51F8] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0"
                >
                  <Image src="/assets/images/dome/left.png" alt="arrow" width={18} height={13} />
                </button>
              </div>
              <div className="mt-[20px] md:mt-[0px] w-65 h-45">
                <button
                  onClick={scrollNext}
                  className="button-slanted cursor-pointer flex items-center justify-center px-6 py-4 border-[0.5px] border-opacity-30 border-white font-jura font-bold text-white hover:bg-gradient-to-r ml-2 hover:from-[#D00746] hover:to-[#7E51F8] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0"
                >
                  <Image src="/assets/images/dome/right.png" alt="arrow" width={18} height={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          <div
            className="scroll-container flex justify-between overflow-hidden my-6"
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onScroll={handleScroll}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div key={index} >
                <Profile
                  title={testimonial.title}
                  description={testimonial.description}
                  imageUrl={testimonial.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>

        <div className=" lg:hidden flex justify-center space-x-4 mb-4">
        <button 
  onClick={scrollPrev} 
  className={`md:flex items-center justify-center px-2 py-2 rounded-lg ${activeButton === 'prev' ? 'bg-white' : 'bg-[#5c5c5c]'}`}
>
  {/* <Image src={leftArrow} alt="arrow" width={18} height={13} /> */}
</button>
<button 
  onClick={scrollNext} 
  className={`  md:flex items-center justify-center px-2 py-2 rounded-lg ${activeButton === 'next' ? 'bg-white' : 'bg-[#5c5c5c]'}`}
>
  {/* <Image src={rightArrow} alt="arrow" width={18} height={13} /> */}
</button>


        </div>
      </div>
    </div>
  );
}


