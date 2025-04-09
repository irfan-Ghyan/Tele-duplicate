

const isMoEngageAvailable = () => {
    return (
      typeof window !== "undefined" &&
      "Moengage" in window &&
      window.Moengage !== undefined &&
      typeof window.Moengage.track_event === "function"
    );
  };
  
  const waitForMoEngage = (timeout = 5000) => {
    return new Promise((resolve) => {
      if (isMoEngageAvailable()) {
        return resolve(true);
      }
  
      const timeoutId = setTimeout(() => {
        observer.disconnect();
        resolve(false);
      }, timeout);

      const interval = setInterval(() => {
        if (isMoEngageAvailable()) {
          clearTimeout(timeoutId);
          clearInterval(interval);
          resolve(true);
        }
      }, 100);
  
      const observer = new MutationObserver(() => {
        if (isMoEngageAvailable()) {
          clearTimeout(timeoutId);
          clearInterval(interval);
          observer.disconnect();
          resolve(true);
        }
      });
  
      observer.observe(document, { childList: true, subtree: true });
    });
  };
  
  

  export const trackEvent = async (eventName, eventAttributes) => {
    try {
      const available = await waitForMoEngage();
  
      if (available) {
        window.Moengage.track_event(eventName, eventAttributes);
        console.log(`MoEngage event tracked: ${eventName}`, eventAttributes);
      } else {
        console.warn("MoEngage not available for tracking event after waiting:", eventName);
  
        if (typeof window !== "undefined") {
          window._moePendingEvents = window._moePendingEvents || [];
          window._moePendingEvents.push({ name: eventName, attributes: eventAttributes });
        }
      }
    } catch (error) {
      console.error("Error tracking MoEngage event:", error);
    }
  };
  

  export const trackBookingEvent = (bookingData) => {
    const formattedDate =
      bookingData.date instanceof Date ? bookingData.date.toISOString().split("T")[0] : bookingData.date;
  
    trackEvent("Booking (Race) - Website", {
      "Race Options": bookingData.raceOption,
      "Booking Seats": bookingData.seats,
      "Select Duration": bookingData.duration,
      "Select Date": formattedDate,
      "Select Time Slot": bookingData.timeSlot,
      "First Name": bookingData.firstName,
      "Last Name": bookingData.lastName,
      Email: bookingData.email,
      "Phone Number": bookingData.phoneNumber,
      Status: bookingData.status,
      Language: bookingData.language,
    });
  };
  
  // Track individual steps in the booking process
  export const trackBookingStep = (step, data) => {
    trackEvent(`Booking Step: ${step}`, data);
  };
  

// utils/tracking.js
export const trackPageView = (pageName, additionalProps = {}) => {
  const props = {
    page: pageName,
    ...additionalProps
  };
  
  if (window.Moengage) {
    window.Moengage.track_event('Page View', props);
  }
  
  // For Google Tag Manager
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'pageView',
      ...props
    });
  }
};

export const trackBooking = (bookingDetails) => {
  if (window.Moengage) {
    window.Moengage.track_event('Booking', bookingDetails);
  }
  
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'booking',
      ...bookingDetails
    });
  }
};

export const trackBookingConfirmation = (confirmationDetails) => {
  if (window.Moengage) {
    window.Moengage.track_event('Booking Confirmation', confirmationDetails);
  }
  
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'bookingConfirmation',
      ...confirmationDetails
    });
  }
};

export const trackAbandonedBooking = (abandonmentDetails) => {
  if (window.Moengage) {
    window.Moengage.track_event('Abandoned Booking', abandonmentDetails);
  }
  
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'abandonedBooking',
      ...abandonmentDetails
    });
  }
};

export const trackContactUs = (contactDetails) => {
  if (window.Moengage) {
    window.Moengage.track_event('Contact Us', contactDetails);
  }
  
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'contactUs',
      ...contactDetails
    });
  }
};

export const trackEventInterest = (eventDetails) => {
  if (window.Moengage) {
    window.Moengage.track_event('Event Interest', eventDetails);
  }
  
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'eventInterest',
      ...eventDetails
    });
  }
};

export const trackBookNowVisit = (visitDetails) => {
  if (window.Moengage) {
    window.Moengage.track_event('Book Now Visit', visitDetails);
  }
  
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'bookNowVisit',
      ...visitDetails
    });
  }
};