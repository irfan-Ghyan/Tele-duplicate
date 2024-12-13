
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
