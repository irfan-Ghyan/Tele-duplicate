import React, { useState } from 'react';
import ReactTimePicker from 'react-time-picker';

const TimePicker = ({ onTimeChange }) => {
  const [times, setTimes] = useState({
    time1: '09:00',
    time2: '09:10',
    time3: '09:20',
    time4: '09:30',
    time5: '09:40',
    time6: '09:50',
    time7: '10:00',
    time8: '22:20',
    time9: '22:30',
    time10: '22:40',
    time11: '22:50',
    time12: '23:00',
    time13: '23:20',
    time14: '23:30',
    time15: '23:40'
  });

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activeTime, setActiveTime] = useState(null);

  const handleButtonClick = (timeKey) => {
    setActiveTime(timeKey);
    setShowTimePicker(true);
  };

  const handleTimeChange = (value) => {
    setTimes(prevTimes => ({
      ...prevTimes,
      [activeTime]: value
    }));
    setShowTimePicker(false);
    onTimeChange(activeTime, value); 
  };

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const timeEntries = Object.entries(times);
  const timeChunks = chunkArray(timeEntries, 5);



  return (
    <div>
      {timeChunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className='flex'>
          {chunk.map(([timeKey, timeValue]) => (
            <div
              key={timeKey}
              className={`button-slanted mt-[26px] cursor-pointer w-[82px] h-[51px] font-jura font-normal md:font-bold border-[0.5px] border-opacity-30 border-white text-white m-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center relative overflow-hidden ${
                chunkIndex === timeChunks.length - 1
                  ? 'bg-white bg-opacity-50  hover:bg-gradient-to-r hover:from-[#7E51F8] hover:to-[#D007A6]'
                  : 'bg-border-[0.5px] bg-opacity-30 bg-transparent hover:bg-gradient-to-r hover:from-[#7E51F8] hover:to-[#D007A6]'
              }`}
            >
              <button
                onClick={() => handleButtonClick(timeKey)}
                className='button-slanted-content w-full h-full flex items-center justify-center'
              >
                {timeValue}
              </button>
              {showTimePicker && activeTime === timeKey && (
                <div className='absolute top-full'>
                  <ReactTimePicker
                    onChange={handleTimeChange}
                    value={times[activeTime]}
                    disableClock={true}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TimePicker;
