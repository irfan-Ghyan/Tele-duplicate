// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { IoMdClose } from 'react-icons/io';
// import flg from '../../../../public/assets/images/flag.png';

// const TopBanner = ({ onClose }) => {
//   return (
//     <div className="fixed top-0 left-0 right-0 z-50 bg-[#ce21b7] h-[36px] flex items-center justify-between text-white px-4">
//       <div></div>
//       <div>
//         <div className="flex items-center">
//           <div className="mr-2">
//             <Image
//               src={flg}
//               alt="Flag Icon"
//               width={12}
//               height={11}
//               className="w-[12px] h-[11px]"
//             />
//           </div>
//           <p className="text-[8px] md:text-[12px]">
//             JOIN THE ULTIMATE CAR RACING EXPERIENCE!
//           </p>
//           <div className="button-slanted w-[94px] h-[22px] bg-purple-900 text-white ml-2 rounded-tl-lg rounded-br-lg flex items-center justify-center">
//             <Link href="https://feverup.com/m/187813" target="_blank" rel="noopener noreferrer" className="text-[8px] md:text-[12px]">
//               <span className="button-slanted-content">Book Now</span>
//             </Link>
//           </div>
//         </div>
//       </div>
//       <div className="cursor-pointer" onClick={onClose}>
//         <IoMdClose size={20} />
//       </div>
//     </div>
//   );
// };

// export default TopBanner;


'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import flg from '../../../../public/assets/images/flag.png';

const TopBanner = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#c09e5f] h-[36px] flex items-center justify-between text-white px-4">
      <div></div>
      <div>
        <div className="flex items-center">
          <div className="mr-2">
            <Image
              src={flg}
              alt="Flag Icon"
              width={12}
              height={11}
              className="w-[12px] h-[11px]"
            />
          </div>
          <p className="text-[8px] md:text-[12px]">
            {t('join_car_racing_experience')}
          </p>
          <div className="button-slanted w-[94px] h-[22px] bg-[#df2a27] text-white ml-2 rounded-tl-lg rounded-br-lg flex items-center justify-center">
            <Link
              href="https://feverup.com/m/187813"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[8px] md:text-[12px]"
            >
              <span className="button-slanted-content">{t('book_now')}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={onClose}>
        <IoMdClose size={20} />
      </div>
    </div>
  );
};

export default TopBanner;
