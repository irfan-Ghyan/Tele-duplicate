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

const CalendarComponent = ({ onChange, value, minDate, maxDate }) => {
  return (
    <div className="calendar-container mx-auto mt-2">
      <Calendar
        onChange={onChange}
        value={value}
        minDate={minDate}  // Disable dates before selected date
        maxDate={maxDate}  // Disable dates after selected date
      />
    </div>
  );
};

export default CalendarComponent;
