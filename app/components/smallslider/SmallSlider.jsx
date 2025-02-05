'use client';

import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const CustomPrevArrow = ({ onClick }) => (
  <button className="absolute left-0 lg:left-20 transform -translate-y-1/2 z-10" style={{ top: '50%' }} onClick={onClick}>
    <Image src="/assets/images/dome/left-arrow.png" alt="Previous" width={20} height={20} className='w-5 h-5 lg:w-10 lg:h-10' />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button className="absolute right-0 lg:right-20 transform -translate-y-1/2 z-10" style={{ top: '50%' }} onClick={onClick}>
    <Image src="/assets/images/dome/righ-arrow.png" alt="Next" width={20} height={20} className='w-5 h-5 lg:w-10 lg:h-10' />
  </button>
);

const menuItems = [
  [1, "Mansaf", "Traditional Jordanian dish with lamb and yogurt sauce.", "20 SAR"],
  [2, "Kabsa", "Saudi rice dish with meat, spices, and vegetables.", "25 SAR"],
  [3, "Shawarma", "Grilled meat served with garlic sauce and pita bread.", "15 SAR"],
  [4, "Baklava", "Sweet pastry filled with nuts and honey.", "10 SAR"],
  [5, "Hummus", "Creamy chickpea dip served with olive oil and pita.", "12 SAR"],
  [6, "Falafel", "Deep-fried balls made from ground chickpeas or fava beans.", "8 SAR"],
  [7, "Tabbouleh", "Lebanese salad with parsley, tomatoes, and bulgur.", "14 SAR"],
  [8, "Fattoush", "Levantine salad with toasted bread and fresh vegetables.", "14 SAR"],
  [9, "Kunafa", "Sweet cheese pastry soaked in syrup.", "18 SAR"],
  [10, "Mandi", "Yemeni dish of spiced rice and meat cooked underground.", "30 SAR"]
];

const generatePDF = () => {
  const doc = new jsPDF();
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Food Menu", 105, 15, { align: "center" });

  doc.setFontSize(12);
  autoTable(doc, {
    startY: 25,
    head: [["ID", "Name", "Description", "Price"]],
    body: menuItems,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [160, 130, 95] }
  });

  doc.save("Food_Menu.pdf");
};

const SmallSlider = () => {
  const { t } = useTranslation();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    centerMode: true,
    centerPadding: '20%',
    appendDots: dots => (
      <div style={{ bottom: '-50px' }}>
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    customPaging: i => <div className="custom-dot"></div>,
    responsive: [
      { breakpoint: 1024, settings: { centerPadding: '10%' } },
      { breakpoint: 768, settings: { centerPadding: '5%' } }
    ]
  };

  return (
    <>
      <div className="mt-4 text-start mb-10 max-w-7xl mx-auto">
        <p className="text-[#e3ce90] font-jura text-[14px] lg:text-[18px] text-justify font-bold px-[8px] py-10 ">
          {t('WHAT_TO_EXPECT')}
        </p>
        <button 
          onClick={generatePDF} 
          className="px-4 py-2 text-[#e3ce90] text-[24px] font-orbitron font-bold "
        >
          Download Menu PDF
        </button>
      </div>

      <div className="slider-wrapper h-auto py-10 ">
        <div className="slider-container py-4 relative mb-20">
          <Slider {...settings}>
            <div className="slide">
              <Image src="/assets/images/dome/slide2.png" alt="Slide2" width={1400} height={400} />
            </div>
            <div className="slide">
              <Image src="/assets/images/dome/slide2.png" alt="Slide2" width={1400} height={400} />
            </div>
            <div className="slide">
              <Image src="/assets/images/dome/slide2.png" alt="Slide2" width={1400} height={400} />
            </div>
            <div className="slide">
              <Image src="/assets/images/dome/slide2.png" alt="Slide2" width={1400} height={400} />
            </div>
          </Slider>
        </div>

        <style jsx>{`
          .slider-wrapper {
            position: relative;
            width: 100%;
            overflow: hidden;
            padding-bottom: 50px;
          }
          .slider-container {
            position: relative;
            width: 100%;
          }
          .slide {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 10px;
          }
          :global(.slick-dots) {
            position: absolute;
            bottom: -30px;
            width: 100%;
            display: flex !important;
            justify-content: center;
            padding: 0;
            margin: 0;
            list-style: none;
          }
          :global(.slick-dots li) {
            margin: 0 5px;
          }
          :global(.custom-dot) {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: white;
            border: 1px solid #ccc;
            opacity: 0.5;
            transition: all 0.3s ease;
          }
          :global(.slick-dots li.slick-active .custom-dot) {
            width: 14px;
            height: 14px;
            opacity: 1;
            background: white;
          }
        `}</style>
      </div>
    </>
  );
};

export default SmallSlider;
