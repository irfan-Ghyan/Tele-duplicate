// import React from 'react';
// import Image from 'next/image';
// import flg from '../../../public/assets/images/flag.png'

// const ReserveSeat = () => {
//   return (
//     <div className='bg-[#B90894] max-w-full overflow-hidden border-dashed border-2 border-[#0c0116] w-full '>
//       <div className='marquee'>
//         <div className='marquee-content  '>
//         <div className='flex'>
//             <div>
//             <Image  
//             src={flg}
//             alt="Flag Icon"
//             width={12}
//             height={11}
//             className="w-[12px] h-[11px] mx-4 mt-4"
//           />
//           </div>  
//           <div>
//           <Image  
//             src={flg}
//             alt="Flag Icon"
//             width={12}
//             height={11}
//             className="w-[12px] h-[11px] mx-4 mt-4"
//           />
//           </div>
//           <div>
//             <h1 className='text-white font-orbitron text-[25px] font-bold mx-4'>Virtual GP - RESERVE YOUR SEAT NOW</h1>
//           </div>
//           <div>
//             <Image  
//             src={flg}
//             alt="Flag Icon"
//             width={12}
//             height={11}
//             className="w-[12px] h-[11px] mx-4 mt-4"
//           />
//           </div>  
//           <div>
//           <Image  
//             src={flg}
//             alt="Flag Icon"
//             width={12}
//             height={11}
//             className="w-[12px] h-[11px] mx-4 mt-4"
//           />
//           </div>
//           <div>
//             <h1 className='text-white font-orbitron text-[25px] font-bold mx-4'>Virtual GP - RESERVE YOUR SEAT NOW</h1>
//           </div>
//           <div>
//             <Image  
//             src={flg}
//             alt="Flag Icon"
//             width={12}
//             height={11}
//             className="w-[12px] h-[11px] mx-4 mt-4"
//           />
//           </div>  
//           <div>
//           <Image  
//             src={flg}
//             alt="Flag Icon"
//             width={12}
//             height={11}
//             className="w-[12px] h-[11px] mx-4 mt-4"
//           />
//           </div>
//           <div>
//             <h1 className='text-white font-orbitron text-[25px] font-bold mx-4'>Virtual GP - RESERVE YOUR SEAT NOW</h1>
//           </div>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReserveSeat;


import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import flg from '../../../public/assets/images/flag.png';

const ReserveSeat = () => {
  const { t } = useTranslation();

  return (
    <div className='bg-[#B90894] max-w-full overflow-hidden border-dashed border-2 border-[#0c0116] w-full'>
      <div className='marquee'>
        <div className='marquee-content'>
          <div className='flex'>
            <div>
              <Image
                src={flg}
                alt="Flag Icon"
                width={12}
                height={11}
                className="w-[12px] h-[11px] mx-4 mt-4"
              />
            </div>
            <div>
              <Image
                src={flg}
                alt="Flag Icon"
                width={12}
                height={11}
                className="w-[12px] h-[11px] mx-4 mt-4"
              />
            </div>
            <div>
              <h1 className='text-white font-orbitron text-[25px] font-bold mx-4'>
                {t('virtual_gp_reserve_seat')}
              </h1>
            </div>
            <div>
              <Image
                src={flg}
                alt="Flag Icon"
                width={12}
                height={11}
                className="w-[12px] h-[11px] mx-4 mt-4"
              />
            </div>
            <div>
              <Image
                src={flg}
                alt="Flag Icon"
                width={12}
                height={11}
                className="w-[12px] h-[11px] mx-4 mt-4"
              />
            </div>
            <div>
              <h1 className='text-white font-orbitron text-[25px] font-bold mx-4'>
                {t('virtual_gp_reserve_seat')}
              </h1>
            </div>
            <div>
              <Image
                src={flg}
                alt="Flag Icon"
                width={12}
                height={11}
                className="w-[12px] h-[11px] mx-4 mt-4"
              />
            </div>
            <div>
              <Image
                src={flg}
                alt="Flag Icon"
                width={12}
                height={11}
                className="w-[12px] h-[11px] mx-4 mt-4"
              />
            </div>
            <div>
              <h1 className='text-white font-orbitron text-[25px] font-bold mx-4'>
                {t('virtual_gp_reserve_seat')}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveSeat;
