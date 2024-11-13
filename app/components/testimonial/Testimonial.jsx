
// 'use client';

// import { useRef, useState, useEffect } from 'react';
// import Profile from './profile/Profile';
// import Image from 'next/image';
// import { useTranslation } from 'react-i18next';
// // import leftArrow from '../../../public/assets/images/dome/left.png';
// // import rightArrow from '../../../public/assets/images/dome/right.png';

// export default function Testimonial() {
//   const scrollContainerRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);
//   const [activeButton, setActiveButton] = useState(null);
//   const { t } = useTranslation(); 

//   const testimonials = [
//    {
//       title: t('testimonial.testimonials1.title'),
//       description: t('testimonial.testimonials1.description'),
//       imageUrl: '/assets/images/dome/sain.png'
//     },
//     {
//       title: t('testimonial.testimonials2.title'),
//       description: t('testimonial.testimonials2.description'),
//       imageUrl: '/assets/images/dome/ammar.png'
//     },
//     {
//       title: t('testimonial.testimonials3.title'),
//       description: t('testimonial.testimonials3.description'),
//       imageUrl: '/assets/images/dome/alaa.png'
//     },
//     {
//       title: t('testimonial.testimonials4.title'),
//       description: t('testimonial.testimonials4.description'),
//       imageUrl: '/assets/images/dome/ivan.png'
//     },
//     {
//       title: t('testimonial.testimonials5.title'),
//       description: t('testimonial.testimonials5.description'),
//       imageUrl: '/assets/images/dome/yahia.png'
//     },
//     {
//       title: t('testimonial.testimonials6.title'),
//       description: t('testimonial.testimonials6.description'),
//       imageUrl: '/assets/images/dome/hakeem.png'
//     },
//     {
//       title: t('testimonial.testimonials7.title'),
//       description: t('testimonial.testimonials7.description'),
//       imageUrl: '/assets/images/dome/son.png'
//     },
//     {
//       title: t('testimonial.testimonials8.title'),
//       description: t('testimonial.testimonials8.description'),
//       imageUrl: '/assets/images/dome/s.png'
//     },
//     {
//       title: t('testimonial.testimonials9.title'),
//       description: t('testimonial.testimonials9.description'),
//       imageUrl: '/assets/images/dome/m.png' 
//     },
//     {
//       title: t('testimonial.testimonials10.title'),
//       description: t('testimonial.testimonials10.description'),
//       imageUrl: '/assets/images/dome/a.png'
//     },
//     {
//       title: t('testimonial.testimonials11.title'),
//       description: t('testimonial.testimonials11.description'),
//       imageUrl: '/assets/images/dome/jadh.png'
//     },
//     {
//       title: t('testimonial.testimonials12.title'),
//       description: t('testimonial.testimonials12.description'),
//       imageUrl: '/assets/images/dome/rami.png' 
//     },
//     {
//       title: t('testimonial.testimonials13.title'),
//       description: t('testimonial.testimonials13.description'),
//       imageUrl: '/assets/images/dome/mateen.png'
//     },
//     {
//       title: t('testimonial.testimonials14.title'),
//       description: t('testimonial.testimonials14.description'),
//       imageUrl: '/assets/images/dome/dharmesh.png' 
//     },
//     {
//       title: t('testimonial.testimonials15.title'),
//       description: t('testimonial.testimonials15.description'),
//       imageUrl: '/assets/images/dome/giorgio.png'
//     },
//     {
//       title: t('testimonial.testimonials16.title'),
//       description: t('testimonial.testimonials16.description'),
//       imageUrl: '/assets/images/dome/mohammed.png'
//     },
  
//     {
//       title: t('testimonial.testimonials17.title'),
//       description: t('testimonial.testimonials17.description'),
//      imageUrl: '/assets/images/dome/s.png'
//     },

    
//   ];


//   const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];
 
//   // Handle mouse-based dragging for desktop
//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
//     setScrollLeft(scrollContainerRef.current.scrollLeft);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     e.preventDefault();
//     const x = e.pageX - scrollContainerRef.current.offsetLeft;
//     const walk = (x - startX);
//     scrollContainerRef.current.scrollLeft = scrollLeft - walk;
//   };

//   // const handleMouseUp = () => {
//   //   setIsDragging(false);
//   //   snapToItem();
//   // };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   // Handle touch-based dragging for mobile
//   const handleTouchStart = (e) => {
//     setIsDragging(true);
//     setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
//     setScrollLeft(scrollContainerRef.current.scrollLeft);
//   };

//   const handleTouchMove = (e) => {
//     if (!isDragging) return;
//     const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
//     const walk = (x - startX);
//     scrollContainerRef.current.scrollLeft = scrollLeft - walk;
//   };

//   // const handleTouchEnd = () => {
//   //   setIsDragging(false);
//   //   snapToItem();
//   // };

//   const handleTouchEnd = () => {
//     setIsDragging(false);
//   };

//   // Snap to the nearest item after scroll
//   const snapToItem = () => {
//     const itemWidth = scrollContainerRef.current.firstChild.offsetWidth + 16;
//     const scrollPosition = scrollContainerRef.current.scrollLeft;
//     const closestIndex = Math.round(scrollPosition / itemWidth);
//     const snapPosition = closestIndex * itemWidth;
//     scrollContainerRef.current.scrollTo({ left: snapPosition, behavior: 'smooth' });
//   };

//   const scrollNext = () => {
//     if (scrollContainerRef.current) {
//       const itemWidth = scrollContainerRef.current.firstChild.offsetWidth + 16;
//       scrollContainerRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
//       setActiveButton('next'); // Set active button
//     }
//   };

//   const scrollPrev = () => {
//     if (scrollContainerRef.current) {
//       const itemWidth = scrollContainerRef.current.firstChild.offsetWidth + 16;
//       scrollContainerRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
//       setActiveButton('prev'); // Set active button
//     }
//   };

//   const handleScroll = () => {
//     const scrollWidth = scrollContainerRef.current.scrollWidth / 2; // Width of the original content
//     const scrollLeft = scrollContainerRef.current.scrollLeft;

//     if (scrollLeft >= scrollWidth) {
//       scrollContainerRef.current.scrollLeft = scrollLeft - scrollWidth; // Reset scroll position
//     } else if (scrollLeft <= 0) {
//       scrollContainerRef.current.scrollLeft = scrollWidth; // Reset to the end of original content
//     }
//   };

//   useEffect(() => {
//     const scrollContainer = scrollContainerRef.current;
//     const handleScroll = () => {
//       const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
//       if (scrollContainer.scrollLeft >= maxScrollLeft) {
//         scrollContainer.scrollLeft = scrollContainer.clientWidth; // Reset to the beginning set of items
//       } else if (scrollContainer.scrollLeft <= 0) {
//         scrollContainer.scrollLeft = maxScrollLeft - scrollContainer.clientWidth; // Reset to the last set of items
//       }
//     };

//     scrollContainer.addEventListener('scroll', handleScroll);
//     return () => {
//       scrollContainer.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <div className="w-full overflow-hidden relative flex justify-center items-center py-[40px] md:py-[50px] lg:py-[100px]">
//       <div className="max-w-7xl w-full px-4 md:px-8">
//         <div className="mx-auto py-8">
//           <div className="border-solid border-b-[1px] border-white border-opacity-50 text-end"></div>
//           <div className="md:flex md:justify-between items-center mt-[36px] lg:mb-[41px]">
//             <div>
//               <h1 className="text-[32px] md:text-[54px] text-white font-black font-orbitron">{t('WHAT PEOPLE SAY ABOUT US')}</h1>
//             </div>
//             {/* Top buttons for larger screens */}
//             <div className="top-buttons flex items-center">
//               <div className="mt-[20px] md:mt-[0px] w-65 h-45 ">
//                 <button
//                   onClick={scrollPrev}
//                   className="button-slanted cursor-pointer flex items-center justify-center px-6 py-4 border-[0.5px] border-opacity-30 border-white font-jura font-bold text-white hover:bg-gradient-to-r ml-2 hover:from-[#D007A6] hover:to-[#7E51F8] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0"
//                 >
//                   <Image src="/assets/images/dome/left.png" alt="arrow" width={18} height={13} />
//                 </button>
//               </div>
//               <div className="mt-[20px] md:mt-[0px] w-65 h-45">
//                 <button
//                   onClick={scrollNext}
//                   className="button-slanted cursor-pointer flex items-center justify-center px-6 py-4 border-[0.5px] border-opacity-30 border-white font-jura font-bold text-white hover:bg-gradient-to-r ml-2 hover:from-[#D00746] hover:to-[#7E51F8] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0"
//                 >
//                   <Image src="/assets/images/dome/right.png" alt="arrow" width={18} height={13} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="container mx-auto">
//           <div
//             className="scroll-container flex justify-between overflow-hidden my-6"
//             ref={scrollContainerRef}
//             onMouseDown={handleMouseDown}
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleMouseUp}
//             onMouseUp={handleMouseUp}
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//             onScroll={handleScroll}
//             style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
//           >
//             {extendedTestimonials.map((testimonial, index) => (
//               <div key={index} >
//                 <Profile
//                   title={testimonial.title}
//                   description={testimonial.description}
//                   imageUrl={testimonial.imageUrl}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className=" lg:hidden flex justify-center space-x-4 mb-4">
//         <button 
//   onClick={scrollPrev} 
//   className={`md:flex items-center justify-center px-2 py-2 rounded-lg ${activeButton === 'prev' ? 'bg-white' : 'bg-[#5c5c5c]'}`}
// >
//   {/* <Image src={leftArrow} alt="arrow" width={18} height={13} /> */}
// </button>
// <button 
//   onClick={scrollNext} 
//   className={`  md:flex items-center justify-center px-2 py-2 rounded-lg ${activeButton === 'next' ? 'bg-white' : 'bg-[#5c5c5c]'}`}
// >
//   {/* <Image src={rightArrow} alt="arrow" width={18} height={13} /> */}
// </button>


//         </div>
//       </div>
//     </div>
//   );
// }




'use client';

import { useRef, useState, useEffect } from 'react';
import Profile from './profile/Profile';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Testimonial() {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeButton, setActiveButton] = useState(null);
  const { t, i18n } = useTranslation(); 

  const getTestimonials = () => [
   {
      title: t('testimonial.testimonials1.title'),
      description: t('testimonial.testimonials1.description'),
      imageUrl: '/assets/images/dome/sain.png'
    },
    {
      title: t('testimonial.testimonials2.title'),
      description: t('testimonial.testimonials2.description'),
      imageUrl: '/assets/images/dome/ammar.png'
    },
    {
      title: t('testimonial.testimonials3.title'),
      description: t('testimonial.testimonials3.description'),
      imageUrl: '/assets/images/dome/alaa.png'
    },
    {
      title: t('testimonial.testimonials4.title'),
      description: t('testimonial.testimonials4.description'),
      imageUrl: '/assets/images/dome/ivan.png'
    },
    {
      title: t('testimonial.testimonials5.title'),
      description: t('testimonial.testimonials5.description'),
      imageUrl: '/assets/images/dome/yahia.png'
    },
    {
      title: t('testimonial.testimonials6.title'),
      description: t('testimonial.testimonials6.description'),
      imageUrl: '/assets/images/dome/hakeem.png'
    },
    {
      title: t('testimonial.testimonials7.title'),
      description: t('testimonial.testimonials7.description'),
      imageUrl: '/assets/images/dome/son.png'
    },
    {
      title: t('testimonial.testimonials8.title'),
      description: t('testimonial.testimonials8.description'),
      imageUrl: '/assets/images/dome/s.png'
    },
    {
      title: t('testimonial.testimonials9.title'),
      description: t('testimonial.testimonials9.description'),
      imageUrl: '/assets/images/dome/m.png' 
    },
    {
      title: t('testimonial.testimonials10.title'),
      description: t('testimonial.testimonials10.description'),
      imageUrl: '/assets/images/dome/a.png'
    },
    {
      title: t('testimonial.testimonials11.title'),
      description: t('testimonial.testimonials11.description'),
      imageUrl: '/assets/images/dome/jadh.png'
    },
    {
      title: t('testimonial.testimonials12.title'),
      description: t('testimonial.testimonials12.description'),
      imageUrl: '/assets/images/dome/rami.png' 
    },
    {
      title: t('testimonial.testimonials13.title'),
      description: t('testimonial.testimonials13.description'),
      imageUrl: '/assets/images/dome/mateen.png'
    },
    {
      title: t('testimonial.testimonials14.title'),
      description: t('testimonial.testimonials14.description'),
      imageUrl: '/assets/images/dome/dharmesh.png' 
    },
    {
      title: t('testimonial.testimonials15.title'),
      description: t('testimonial.testimonials15.description'),
      imageUrl: '/assets/images/dome/giorgio.png'
    },
    {
      title: t('testimonial.testimonials16.title'),
      description: t('testimonial.testimonials16.description'),
      imageUrl: '/assets/images/dome/mohammed.png'
    },
  
    {
      title: t('testimonial.testimonials17.title'),
      description: t('testimonial.testimonials17.description'),
     imageUrl: '/assets/images/dome/s.png'
    },

  ];

  const [testimonials, setTestimonials] = useState(getTestimonials);

  useEffect(() => {
    // Update testimonials when the language changes
    setTestimonials(getTestimonials());
  }, [i18n.language]);

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

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.firstChild.offsetWidth + 16;
      scrollContainerRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
      setActiveButton('next');
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.firstChild.offsetWidth + 16;
      scrollContainerRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      setActiveButton('prev'); 
    }
  };

  return (
    <div className="w-full overflow-hidden relative flex justify-center items-center py-[40px] md:py-[50px] lg:py-[100px]">
      <div className="max-w-7xl w-full px-4 md:px-8">
        <div className="mx-auto py-8">
          <div className="border-solid border-b-[1px] border-[#c09e5f] border-opacity-50 text-end"></div>
          <div className="md:flex md:justify-between items-center mt-[36px] lg:mb-[41px]">
            <div>
              <h1 className="text-[32px] md:text-[54px] text-[#c09e5f] font-black font-orbitron">{t('WHAT PEOPLE SAY ABOUT US')}</h1>
            </div>
            <div className="top-buttons flex items-center">
              <div className="mt-[20px] md:mt-[0px] w-65 h-45">
                <button
                  onClick={scrollPrev}
                  className="button-slanted cursor-pointer flex items-center justify-center px-6 py-4 border-[0.5px] border-opacity-30 border-[#e3ce90] font-jura font-bold text-[#e3ce90] hover:bg-gradient-to-r ml-2 hover:from-[#c09e5f] hover:to-[#e3ce90] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0"
                >
                  <Image src="/assets/images/dome/left.png" alt="arrow" width={18} height={13} />
                </button>
              </div>
              <div className="mt-[20px] md:mt-[0px] w-65 h-45">
                <button
                  onClick={scrollNext}
                  className="button-slanted cursor-pointer flex items-center justify-center px-6 py-4 border-[0.5px] border-opacity-30 border-[#e3ce90] font-jura font-bold text-[#e3ce90] hover:bg-gradient-to-r ml-2 hover:from-[#c09e5f] hover:to-[#e3ce90] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0"
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
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div key={index}>
                <Profile
                  title={testimonial.title}
                  description={testimonial.description}
                  imageUrl={testimonial.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
