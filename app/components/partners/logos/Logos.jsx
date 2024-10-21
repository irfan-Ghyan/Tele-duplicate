// Profile.js
import React from 'react';
import Image from 'next/image';

const Logos = ({ imageUrl }) => {
 

  return (
    <div className="grid grid-cols-1 ml-[13px] md:grid-cols-4 lg:ml-[0px] lg:grid-cols-4 gap-x-4">
      <div className="mb-6 flex border-[1px] border-[#ffffff] border-opacity-30 w-[280px] h-[120px] flex-col p-[20px] md:p-[32px] ">
        <div className='flex justify-center items-center '>
          <div>
            <Image
              src={imageUrl}
              alt='partner'
              width={200}
              height={50}
              className="w-[200px] h-[50px] flex  "
            />
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default Logos;
