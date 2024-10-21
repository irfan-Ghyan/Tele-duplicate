

import React, { useRef, useState, useEffect } from 'react';
import CardComponent from './cardcomponent/CardComponent';
import Image from 'next/image';
// import leftArrow from '../../../../public/assets/icons/left.png';
// import rightArrow from '../../../../public/assets/images/rightarrow.png';

const Experience = () => {
  const scrollContainerRef = useRef(null);
  const [experiences, setExperiences] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const fetchExperiences = async () => {
      const data = [
        { title: '20-Minute Sprint', description: 'Jump into a quick 20-minute sprint where your goal is to set the fastest lap. Perfect for those looking for a short, intense racing experience.', imageUrl: '/assets/images/experience/mintue1.jpg', button:'BOOK NOW', link: 'https://feverup.com/m/187813' },
        { title: '40-Minute Session', description: 'Choose between a sprint for the fastest lap or a qualifying and race session with your friends. A great option for fun and friendly competition.', imageUrl: '/assets/images/experience/30mn.png', button:'BOOK NOW', link: 'https://feverup.com/m/187813' },
        { title: '60-Minute Session', description: 'Enjoy the full experience with a 60-minute session. Choose between a sprint for the fastest lap or a full qualifying and race session with your friends for the ultimate racing showdown.', imageUrl: '/assets/images/experience/60mn.png', button:'BOOK NOW', link: 'https://feverup.com/m/187813' },
        { title: 'Private Events', description: 'Whether it\'s a corporate event, birthday party, or team-building exercise, we offer fully customizable packages tailored to your needs.', imageUrl: '/assets/images/experience/privateevent.jpg', button:'ENQUIRE NOW', link: 'https://wa.me/971566628585' },
      ];
      setExperiences(data);
  
    };

    fetchExperiences();

    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setIsScrolling(true);
        if (scrollContainerRef.current.scrollLeft > 100) {
          setShowScrollButton(true);
        } else {
          setShowScrollButton(false);
        }
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

 

  const scrollToTop = () => {
    scrollContainerRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full relative py-[40px] md:py-[50px] lg:py-[100px]">
      <div className="border-solid border-b-[1px] border-white border-opacity-50 text-end">
        <h1 className="text-[14px] text-white font-normal font-orbitron pb-4">EXPERIENCE</h1>
      </div>
      <div className="md:flex justify-between mt-[36px] md:mb-[41px]">
        <div>
          <h1 className="text-[32px] md:text-[54px] text-white font-black font-orbitron">
            EXPERIENCES
          </h1>
        </div>
      </div>

      <div
        className="scroll-container flex flex-wrap justify-center overflow-hidden my-66"
        ref={scrollContainerRef}
      >
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="card-wrapper w-full md:w-[286px] py-4 "
            style={{ minWidth: '286px', marginRight: '16px' }}
          >
            <CardComponent
              title={experience.title === '40-Minute Session' ? `⭐ ${experience.title}` : experience.title}
              description={experience.description}
              imageUrl={experience.imageUrl}
              button={experience.button}
              link={experience.link}
            />
          </div>
        ))}
      </div>

      {/* Mobile Scroll Button */}
      {showScrollButton && (
        <div className="fixed bottom-6 right-6 md:hidden">
          <button
            onClick={scrollToTop}
            className="bg-purple-500 text-white  p-4 rounded-full shadow-lg hover:bg-purple-600 transition duration-300"
          >
            <Image src="/assets/images/rightarrow.png" alt="scroll to top" width={24} height={24} />
          </button>
        </div>
      )}

      <style jsx>{`
        .scroll-container {
          scroll-snap-type: x mandatory;
        }
        .card-wrapper {
          scroll-snap-align: start;
        }
      `}</style>
    </div>
  );
};

export default Experience;
