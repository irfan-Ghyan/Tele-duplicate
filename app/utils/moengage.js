

const isMoEngageAvailable = () => {
    return (
      typeof window !== "undefined" &&
      "Moengage" in window &&
      window.Moengage !== undefined &&
      typeof window.Moengage.track_event === "function"
    );
  };
  
  // Add a function to wait for MoEngage to be available:
  
  const waitForMoEngage = (timeout = 5000) => {
    return new Promise((resolve) => {
      // If MoEngage is already available, resolve immediately
      if (isMoEngageAvailable()) {
        return resolve(true);
      }
  
      // Set a timeout to avoid waiting indefinitely
      const timeoutId = setTimeout(() => {
        observer.disconnect();
        resolve(false);
      }, timeout);
  
      // Check periodically
      const interval = setInterval(() => {
        if (isMoEngageAvailable()) {
          clearTimeout(timeoutId);
          clearInterval(interval);
          resolve(true);
        }
      }, 100);
  
      // Also observe DOM changes to detect script loading
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
  
  // Update the trackEvent function to wait for MoEngage:
  
  export const trackEvent = async (eventName, eventAttributes) => {
    try {
      // Wait for MoEngage to be available (with a 5-second timeout)
      const available = await waitForMoEngage();
  
      if (available) {
        // MoEngage is loaded via script
        window.Moengage.track_event(eventName, eventAttributes);
        console.log(`MoEngage event tracked: ${eventName}`, eventAttributes);
      } else {
        console.warn("MoEngage not available for tracking event after waiting:", eventName);
  
        // Store events to track later when MoEngage becomes available
        if (typeof window !== "undefined") {
          window._moePendingEvents = window._moePendingEvents || [];
          window._moePendingEvents.push({ name: eventName, attributes: eventAttributes });
        }
      }
    } catch (error) {
      console.error("Error tracking MoEngage event:", error);
    }
  };
  
  // Track booking event with all required attributes
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
  

