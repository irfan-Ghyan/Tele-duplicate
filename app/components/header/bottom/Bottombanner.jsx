import Link from 'next/link';
import RotatingHeadings from '../rotatingheading/RotatingHeading';


const BottomBanner = () => {
  return (
    <div className="bg-banner-bg bg-cover bg-center flex items-center justify-center text-white relative pl-20 ">
      <div className="">
        <div className='mb-10'>
        <RotatingHeadings />
        </div>
      
      </div>
     
    </div>
  );
};

export default BottomBanner;