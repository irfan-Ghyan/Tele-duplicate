
'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const RotatingHeadings = () => {
  const { t } = useTranslation();
  const headings = [t('challenge_overdrive'), t('experience_thrill')];
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadingIndex((prevIndex) => (prevIndex + 1) % headings.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [headings.length]);

  return (
    <div className="h-[90px] relative">
      <div className="scrolling-text-container">
        <div className="scrolling-text">
          {headings.map((heading, index) => (
            <h1
              key={index}
              className="h1-border text-[40px] sm:text-[60px] md:text-[100px] lg:text-[100px] font-black font-orbitron mb-2 inline-block mx-4"
            >
              {heading}
            </h1>
          ))}
        </div>
        <div className="scrolling-text">
          {headings.map((heading, index) => (
            <h1
              key={index}
              className="h1-border text-[40px] sm:text-[60px] md:text-[100px] lg:text-[100px] font-black font-orbitron mb-2 inline-block mx-4"
            >
              {heading}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RotatingHeadings;
