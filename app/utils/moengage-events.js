import { trackEvent } from "./moengage";

// Track when user selects race option
export const trackRaceOptionSelection = (option) => {
  trackEvent("Race Option Selected", {
    "Race Options": option,
  });
};

// Track when user selects seats
export const trackSeatsSelection = (seats) => {
  trackEvent("Seats Selected", {
    "Booking Seats": seats,
  });
};

// Track when user selects duration
export const trackDurationSelection = (duration) => {
  trackEvent("Duration Selected", {
    "Select Duration": duration,
  });
};

// Track when user selects date
export const trackDateSelection = (date) => {
  trackEvent("Date Selected", {
    "Select Date": date.toISOString().split("T")[0],
  });
};

// Track when user selects time slot
export const trackTimeSlotSelection = (timeSlot) => {
  trackEvent("Time Slot Selected", {
    "Select Time Slot": timeSlot,
  });
};

// Track when user enters personal information
export const trackPersonalInfoEntered = (firstName, lastName, email, phoneNumber) => {
  trackEvent("Personal Information Entered", {
    "First Name": firstName,
    "Last Name": lastName,
    Email: email,
    "Phone Number": phoneNumber,
  });
};

