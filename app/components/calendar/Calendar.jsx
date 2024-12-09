// // 'use client';

// // import React from 'react';
// // import Calendar from 'react-calendar';
// // import 'react-calendar/dist/Calendar.css';

// // const CalendarComponent = ({ onChange, value, maxDate }) => {
// //   const minDate = new Date();
  
// //   return (
// //     <div className="calendar-container mx-auto mt-2">
// //       <Calendar
// //         onChange={onChange}
// //         value={value}
// //         minDate={minDate}
// //         maxDate={maxDate}
// //       />
// //     </div>
// //   );
// // };

// // export default CalendarComponent;



// 'use client';

// import React from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// const CalendarComponent = ({ onChange, value }) => {
//   const minDate = new Date();

//   const tileClassName = ({ date }) => {
//     const selectedDate = new Date(value).toLocaleDateString('en-CA');
//     const currentDate = new Date().toLocaleDateString('en-CA');
//     const tileDate = new Date(date).toLocaleDateString('en-CA');

//     if (tileDate === selectedDate) {
//       return 'selected-date';
//     }
//     if (tileDate === currentDate && tileDate !== selectedDate) {
//       return 'current-date';
//     }
//     return '';
//   };

//   return (
//     <div className="calendar-container mx-auto mt-2">
//       <Calendar
//         onChange={onChange}
//         value={value}
//         minDate={new Date()} 
//         // maxDate={maxDate}
//         tileClassName={tileClassName}
//         tileDisabled={({ date }) => date < new Date()}
//       />
//     </div>
//   );
// };

// export default CalendarComponent;




'use client';

import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ onChange, value }) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0); // Set to midnight of today

  const tileClassName = ({ date }) => {
    const selectedDate = new Date(value).toLocaleDateString('en-CA');
    const currentDate = new Date().toLocaleDateString('en-CA');
    const tileDate = new Date(date).toLocaleDateString('en-CA');

    if (tileDate === selectedDate) {
      return 'selected-date';
    }
    if (tileDate === currentDate && tileDate !== selectedDate) {
      return 'current-date';
    }
    return '';
  };

  return (
    <div className="calendar-container mx-auto mt-2">
      <Calendar
        onChange={onChange}
        value={value}
        minDate={new Date()} 
        tileClassName={tileClassName}
        tileDisabled={({ date }) => date < startOfToday}
      />
    </div>
  );
};

export default CalendarComponent;
