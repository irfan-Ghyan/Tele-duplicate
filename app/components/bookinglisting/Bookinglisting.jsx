'use client';

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { doGetCall, doPostCall, doDeleteCall } from "../../utils/api.js";

const BookingListing = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [language, setLanguage] = useState("en");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    no_of_people: "",
    booking_type: "",
    duration: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
  });

  const setTime = [
    "09:00", "09:20", "09:40", "10:00", "10:20", "10:40", "11:00", "11:20","11:40", "12:00", 
    "12:20","12:40", "13:00", "13:20", "13:40", "14:00", "14:20", "14:40", "15:00", "15:20", "15:40", "16:00",
    "16:20", "16:40", "17:00", "17:00", "17:20", "17:40", "18:00", "18:20", "18:40", "19:00", "19:20", "19:40",
    "20:00", "20:20", "20:40", "21:00", "21:20", "22:40", "23:00", "23:20", "23:40", "24:00",
  ];
  const [timeSlots, setTimeSlots] = useState(setTime);


  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const url = "http://192.168.70.211:8000/api/bookings"
      let response = await doGetCall(url);
      // const response = await fetch("http://192.168.70.211:8000/api/bookings");

      const data = await response.json();
      const formattedBookings = data.data.map((booking) => ({
        ...booking,
        time: booking.time ? booking.time.slice(0, 5) : "",
      }));

      setBookings(data.data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  


  useEffect(() => {
    async function fetchTimeSlots() {
      try {
        const response = await fetch("http://192.168.70.211:8000/api/bookings/availableSlots");
        if (!response.ok) {
          console.error("Failed to fetch time slots, status:", response.status);
          return;
        }

        const data = await response.json();
        console.log("Fetched time slots data:", data); 

        if (Array.isArray(data)) {
          setTimeSlots(data);
        } else {
          console.error("Unexpected data format. Expected an array:", data);
        }

      } catch (error) {
        console.error("Error fetching time slots:", error);
      }
    }

    fetchTimeSlots();
  }, []);



  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => 
    bookings.filter(item => 
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.phone && item.phone.includes(searchTerm)) ||
      // (item.booking_type && item.booking_type.includes(searchTerm)) ||
      (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [bookings, searchTerm]);
  

  const totalPages = useMemo(() => Math.ceil(filteredData.length / itemsPerPage), [filteredData, itemsPerPage]);
  const currentItems = useMemo(() => {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    return filteredData.slice(firstIndex, lastIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const formattedTime = formData.time?.slice(0, 5); 
    const url = editingId
      ? `http://192.168.70.211:8000/api/bookings/${editingId}`
      : "http://192.168.70.211:8000/api/bookings";

    const method = editingId ? "PUT" : "POST";

    const payload = { ...formData, time: formattedTime };

    try {
      const response = await doPostCall(url, payload, method);
      // const response = await fetch(url, {
      //   method,
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ ...formData, time: formattedTime }),
      // });
     

      if (response.ok) {
        setFormData({
          name: "",
          phone: "",
          email: "",
          no_of_people: "",
          booking_type: "",
          duration: "",
          date: "",
          time: ""
          
        });
        setEditingId(null);
        setShowForm(false);
        fetchBookings();
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    finally {
    setLoading(false);  
  }
  };
  
  const handleCreateClick = () => {
    setShowForm(true);
    setEditingId(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      no_of_people: "",
      booking_type: "",
      duration: "",
      date: "",
      time: "",
    });
  };

  const handleEditClick = (booking) => {
    setFormData({
      name: booking.name,
      phone: booking.phone,
      email: booking.email,
      no_of_people: booking.no_of_people,
      booking_type: booking.type,
      duration: booking.duration,
      date: booking.date,
      time: booking.time,
      
    });
    setEditingId(booking.id);
    setShowForm(true);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

  if (name === 'no_of_people' && value > 2) {
    alert('Number of people cannot exceed 10');
    return; 
  }

  setFormData({
    ...formData,
    [name]: value
  });
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const handleDelete = async (id) => {
    const deleteUrl = `http://192.168.70.211:8000/api/bookings/${id}`;
    
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        // const response = await fetch(deleteUrl, { method: "DELETE" });
        const response = await doDeleteCall(deleteUrl);
  
        if (response.ok) {

          setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
        } else {
          console.error("Failed to delete booking");
        }
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };
  

  const translations = {
    en: {
      name: "Name",
      phone: "Phone",
      email: "Email",
      noOfPeople: "No of People",
      duration: "Duration (in minutes)",
      date: "Date",
      time: "Time",
      type: "Type",
      submit: "Submit",
      create: "Create +",
      search: "Search by name, phone, or email",
      itemsPerPage: "Items per page",
      previous: "Previous",
      next: "Next",
      page: "Page",
      of: "of",
      switchTo: "Switch to Arabic"
    },
    ar: {
      name: "اسم",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      noOfPeople: "عدد الأشخاص",
      duration: "المدة (بالدقائق)",
      date: "التاريخ",
      time: "الوقت",
      type: " يكتب",
      submit: "إرسال",
      create: "إنشاء +",
      search: "ابحث بالاسم أو الهاتف أو البريد الإلكتروني",
      itemsPerPage: "عدد العناصر في الصفحة  ",
      previous: "السابق",
      next: "التالي",
      page: "الصفحة",
      of: "من",
      switchTo: "التبديل إلى الإنجليزية"
    }
  };

  const renderForm = () => (
    <form onSubmit={handleFormSubmit} className="mb-20 p-10 border border-gray-300 mx-20">
      <div className="mb-4">
        <label>{translations[language].name}</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-2 border border-gray-300" />
      </div>
      <div className="mb-4">
        <label>{translations[language].phone}</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full p-2 border border-gray-300" />
      </div>
      <div className="mb-4">
        <label>{translations[language].email}</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full p-2 border border-gray-300" />
      </div>
      <div className="mb-4">
        <label>{translations[language].noOfPeople}</label>
        <input
    type="number"
    name="no_of_people"
    value={formData.no_of_people}
    onChange={handleInputChange}
    required
    className="w-full p-2 border border-gray-300"
    min="1"
  />
      </div>
      <div className="mb-4">
      <label>Type</label>
  <select
    name="booking_type"
    value={formData.booking_type}
    onChange={handleInputChange}
    required
    className="w-full p-2 border border-gray-300"
  >
    <option value="">Select type</option>
    <option value="normal">Normal</option>
    <option value="vip">VIP</option>
    <option value="lounge">Lounge</option>
  </select>
      </div>
      <div className="mb-4">
      <label>Duration</label>
        <select
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300"
        >
          <option value="">Select duration</option>
          <option value="20">20 minutes</option>
          <option value="40">40 minutes</option>
          <option value="60">60 minutes</option>
        </select>
      </div>
      <div className="mb-4">
      <label>Date</label>
      <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300"
        />
      </div>
      <div className="mb-4">
      <label>Time</label>
      <select
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300"
        >
          <option value="">Select a time slot</option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="w-[160px] h-[40px] bg-[#063828] text-white">
      {editingId ? "Update" : translations[language].submit}
      </button>
    </form>
  );


  
  return (
    <div className="w-full">
      {loading ? <div>Loading...</div> : (
        <>
      <button onClick={toggleLanguage} className="mb-4 p-2 text-[#063828]">
        {translations[language].switchTo}
      </button>

      <div className="flex flex-col mb-4">
        <div className="flex justify-between mb-2">
          <input
            type="text"
            placeholder={translations[language].search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-3/5 p-4 border border-gray-300"
          />
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="w-1/5 p-4 border border-gray-300"
          >
            <option value={5}>{translations[language].itemsPerPage}</option>
            <option value={10}>10 {translations[language].itemsPerPage}</option>
            <option value={15}>15 {translations[language].itemsPerPage}</option>
            <option value={20}>20 {translations[language].itemsPerPage}</option>
          </select>
        </div>

        <button
          className="w-[160px] h-[60px] bg-[#063828] text-white py-4 mt-10 mb-4"
          onClick={handleCreateClick}
        >
          {translations[language].create}
        </button>
      </div>

      {showForm && renderForm()}

      <table className="min-w-full divide-y divide-gray-400 border-collapse border border-gray-300">
        <thead className="bg-[#ececec]">
          <tr>
            
            <th className="p-2">{translations[language].name}</th>
            <th className="p-2">{translations[language].phone}</th>
            <th className="p-2">{translations[language].email}</th>
            <th className="p-2">{translations[language].noOfPeople}</th>
            <th className="p-2">{translations[language].type}</th>
            <th className="p-2">{translations[language].duration}</th>
            <th className="p-2">{translations[language].date}</th>
            <th className="p-2">{translations[language].time}</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.id}>
             
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.phone}</td>
              <td className="border p-2">{item.email}</td>
              <td className="border p-2">{item.no_of_people}</td>
              <td className="border p-2">{item.booking_type.name}</td>
              <td className="border p-2">{item.duration}</td>
              <td className="border p-2">{item.date}</td>
              <td className="border p-2">{item.time}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">
                 <button className="text-blue-500" onClick={() => handleEditClick(item)}>Edit</button>
                 <button className="text-red-500 ml-2" onClick={() => handleDelete(item.id)}>Delete</button>
               </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="p-2 bg-[#063828] text-white px-4">
          {translations[language].previous}
        </button>
        <span className="p-2">
          {translations[language].page} {currentPage} {translations[language].of} {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="p-2 bg-[#063828] text-white px-4">
          {translations[language].next}
        </button>
      </div>
      </>
      )}
    </div>
  );
};

export default BookingListing;



