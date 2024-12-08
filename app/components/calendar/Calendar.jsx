// 'use client';

// import React from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// const CalendarComponent = ({ onChange, value }) => {
  
//   return (
//     <div className="calendar-container mx-auto mt-2">
//       <Calendar
//         onChange={onChange}
//         value={value}
//       />
//     </div>
//   );
// };

// export default CalendarComponent;



'use client';

import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ onChange, value, maxDate }) => {
  const minDate = new Date(); // Setting minDate to today's date
  return (
    <div className="calendar-container mx-auto mt-2">
      <Calendar
        onChange={onChange}
        value={value}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
};

export default CalendarComponent;
