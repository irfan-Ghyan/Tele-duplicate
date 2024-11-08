'use client';

import React, { useEffect, useState } from "react";

const BookingListing = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [language, setLanguage] = useState("en");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    no_of_people: "",
    duration: "",
    date: "",
    time: "",
    booking_type_id : "e158ffdc-96b2-11ef-88a4-6c24081c603b"
  });

  // const itemsPerPage = 10;

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://192.168.70.211:8000/api/bookings");
      const data = await response.json();
      setBookings(data.data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to the first page whenever items per page changes
  };

  const filteredData = bookings.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.phone.includes(searchTerm) ||
                          item.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredData.slice(firstIndex, lastIndex);

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
    
    try {
      const response = await fetch("http://192.168.70.211:8000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Booking created:", result);
  
        setFormData({
          name: "",
          phone: "",
          email: "",
          no_of_people: "",
          duration: "",
          date: "",
          time: "",
          booking_type_id : "e158ffdc-96b2-11ef-88a4-6c24081c603b"
        });
        setShowForm(false);
  
        fetchBookings();
      } else {
        console.error("Failed to create booking");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  const handleCreateClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };


  const translations = {
    en: {
      name: "Name",
      phone: "Phone",
      email: "Email",
      noOfPeople: "No of People",
      type: "Type",
      duration: "Duration (in minutes)",
      date: "Date",
      time: "Time",
      submit: "SUBMIT"
    },
    ar: {
      name: "اسم",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      noOfPeople: "عدد الأشخاص",
      type: " يكتب",
      duration: "المدة (بالدقائق)",
      date: "التاريخ",
      time: "الوقت",
      submit: "إرسال"
    }
  }

  const renderForm = () => (
    <form onSubmit={handleFormSubmit} className="mb-20 p-10 border border-gray-300 mx-20">
      <div className="mb-4 ">
        <label>{translations[language].name}</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label>{translations[language].phone}</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label>{translations[language].email}</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300"
        />
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
        />
      </div>
      <div className="mb-4">
        <label>{translations[language].type}</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label>{translations[language].duration}</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label>{translations[language].date}</label>
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
        <label>{translations[language].time}</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300"
        />
      </div>
      <button type="submit" onClick={handleFormSubmit}  className="w-[160px] h-[40px] bg-[#A62ED1] text-white hover:bg-[#A62ED1] ">SUBMIT</button>
    </form>
  );



  return (
    <div className="w-full">
       <button onClick={toggleLanguage} className="mb-4 p-2 text-[#A62ED1]">
        {language === "en" ? "Switch to Arabic" : "Switch to English"}
      </button>
     
      <div className="flex flex-col mb-4">
        <div className="flex justify-between mb-2">
          <input
            type="text"
            placeholder="Search by name, phone, or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-3/5 p-4 border border-gray-300"
          />
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="w-1/5 p-4 border border-gray-300"
          >
            <option value={5}>5 Items per page</option>
            <option value={10}>10 Items per page</option>
            <option value={15}>15 Items per page</option>
            <option value={20}>20 Items per page</option>
          </select>

        </div>

        <button
          className="w-[160px] h-[60px] bg-[#A62ED1] text-white hover:bg-[#A62ED1] py-4 mt-10 mb-4"
          onClick={handleCreateClick}
        >
          CREATE +
        </button>
      </div>

      {showForm && renderForm()}


      <table className="min-w-full divide-y divide-gray-400 border-collapse border border-gray-300">
        <thead className="bg-[#ececec]">
          <tr>
            <th className="px-6 py-4 text-center text-md font-bold text-gray-900 uppercase tracking-wider">NAME</th>
            <th className="px-6 py-4 text-center text-md font-bold text-gray-900 uppercase tracking-wider">PHONE</th>
            <th className="px-6 py-4 text-center text-md font-bold text-gray-900 uppercase tracking-wider">Email</th>
            <th className="px-6 py-4 text-center text-md font-bold text-gray-900 uppercase tracking-wider">No Of People</th>
            <th className="px-6 py-4 text-center text-md font-bold text-gray-900 uppercase tracking-wider">TYPE</th>
            <th className="px-6 py-4 text-center text-md font-bold text-gray-900 uppercase tracking-wider">DURATION</th> 
            <th className="px-6 py-4 text-center text-md font-bold text-gray-900 uppercase tracking-wider">DATE</th>
            <th className="px-6 py-4 text-center text-md font-bold text-gray-900 uppercase tracking-wider">TIME</th>
            <th className="px-6 py-4 text-center text-md font-bold text-gray-900 uppercase tracking-wider">ACTION</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 border border-gray-300">
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">{item.name}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">{item.phone}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">{item.email}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">{item.no_of_people}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">{item.booking_type.name}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">{item.duration}min</td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">{item.date}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">{item.time}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">
                <button className="text-blue-500">Edit</button>
                <button className="text-red-500 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="w-[160px] h-[44px] bg-[#A62ED1] text-white hover:bg-[#A62ED1]"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="w-[160px] h-[44px] bg-[#A62ED1] text-white hover:bg-[#A62ED1]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookingListing;



// 'use client';

// import React, { useEffect, useState } from "react";

// const BookingListing = () => {
//   const [bookings, setBookings] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showForm, setShowForm] = useState(false);
//   const [language, setLanguage] = useState("en");
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     no_of_people: "",
//     type: "",
//     duration: "",
//     date: "",
//     time: "",
//     booking_type_id: "e158ffdc-96b2-11ef-88a4-6c24081c603b"
//   });

//   const fetchBookings = async () => {
//     try {
//       const response = await fetch("http://192.168.70.136:8000/api/bookings");
//       const data = await response.json();
//       setBookings(data.data || []);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(parseInt(e.target.value));
//     setCurrentPage(1);
//   };

//   const filteredData = bookings.filter(item => {
//     const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.phone.includes(searchTerm) ||
//       item.type.includes(searchTerm) ||
//       item.email.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSearch;
//   });

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const lastIndex = currentPage * itemsPerPage;
//   const firstIndex = lastIndex - itemsPerPage;
//   const currentItems = filteredData.slice(firstIndex, lastIndex);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(prev => prev + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(prev => prev - 1);
//     }
//   };

//   // const handleFormSubmit = async (e) => {
//   //   e.preventDefault();
    
//   //   try {
//   //     const response = await fetch("http://192.168.70.136:8000/api/bookings", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json"
//   //       },
//   //       body: JSON.stringify(formData)
//   //     });
  
//   //     if (response.ok) {
//   //       const result = await response.json();
//   //       setFormData({
//   //         name: "",
//   //         phone: "",
//   //         email: "",
//   //         no_of_people: "",
//   //         duration: "",
//   //         date: "",
//   //         time: "",
//   //         booking_type_id: "e158ffdc-96b2-11ef-88a4-6c24081c603b"
//   //       });
//   //       setShowForm(false);
//   //       fetchBookings();
//   //     } else {
//   //       console.error("Failed to create booking");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error submitting form:", error);
//   //   }
//   // };
  
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const url = editingId
//         ? `http://192.168.70.136:8000/api/bookings/${editingId}`
//         : "http://192.168.70.136:8000/api/bookings";

//       const method = editingId ? "PUT" : "POST";
  
//     try {
//       const response = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(formData)
//       });
  
//       if (response.ok) {
//         const result = await response.json();
//         setFormData({
//           name: "",
//           phone: "",
//           email: "",
//           no_of_people: "",
//           type: "",
//           duration: "",
//           date: "",
//           time: "",
//           booking_type_id: "e158ffdc-96b2-11ef-88a4-6c24081c603b"
//         });
//         setEditingId(null);
//         setShowForm(false);
//         fetchBookings(); 
//       } else {
//         console.error("Failed to submit form");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };
  
//   const handleCreateClick = () => {
//     setShowForm(true);
//     setEditingId(null);
//     setFormData({
//       name: "",
//       phone: "",
//       email: "",
//       no_of_people: "",
//       type: "",
//       duration: "",
//       date: "",
//       time: "",
//       booking_type_id: "e158ffdc-96b2-11ef-88a4-6c24081c603b"
//     });
//   };

//   const handleEditClick = (booking) => {
//     setFormData({
//       name: booking.name,
//       phone: booking.phone,
//       email: booking.email,
//       no_of_people: booking.no_of_people,
//       type: booking.type,
//       duration: booking.duration,
//       date: booking.date,
//       time: booking.time,
//       booking_type_id: booking.booking_type_id
//     });
//     setEditingId(booking.id);
//     setShowForm(true);
//   };
  
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const toggleLanguage = () => {
//     setLanguage((prev) => (prev === "en" ? "ar" : "en"));
//   };


//   const translations = {
//     en: {
//       name: "Name",
//       phone: "Phone",
//       email: "Email",
//       noOfPeople: "No of People",
//       duration: "Duration (in minutes)",
//       date: "Date",
//       time: "Time",
//       submit: "Submit",
//       create: "Create +",
//       search: "Search by name, phone, or email",
//       itemsPerPage: "Items per page",
//       previous: "Previous",
//       next: "Next",
//       page: "Page",
//       of: "of",
//       switchTo: "Switch to Arabic"
//     },
//     ar: {
//       name: "اسم",
//       phone: "رقم الهاتف",
//       email: "البريد الإلكتروني",
//       noOfPeople: "عدد الأشخاص",
//       duration: "المدة (بالدقائق)",
//       date: "التاريخ",
//       time: "الوقت",
//       submit: "إرسال",
//       create: "إنشاء +",
//       search: "ابحث بالاسم أو الهاتف أو البريد الإلكتروني",
//       itemsPerPage: "عدد العناصر في الصفحة  ",
//       previous: "السابق",
//       next: "التالي",
//       page: "الصفحة",
//       of: "من",
//       switchTo: "التبديل إلى الإنجليزية"
//     }
//   };

//   const renderForm = () => (
//     <form onSubmit={handleFormSubmit} className="mb-20 p-10 border border-gray-300 mx-20">
//       <div className="mb-4">
//         <label>{translations[language].name}</label>
//         <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-2 border border-gray-300" />
//       </div>
//       <div className="mb-4">
//         <label>{translations[language].phone}</label>
//         <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full p-2 border border-gray-300" />
//       </div>
//       <div className="mb-4">
//         <label>{translations[language].email}</label>
//         <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full p-2 border border-gray-300" />
//       </div>
//       <div className="mb-4">
//         <label>{translations[language].noOfPeople}</label>
//         <input type="number" name="no_of_people" value={formData.no_of_people} onChange={handleInputChange} required className="w-full p-2 border border-gray-300" />
//       </div>
//       <div className="mb-4">
//         <label>{translations[language].duration}</label>
//         <input type="number" name="duration" value={formData.duration} onChange={handleInputChange} required className="w-full p-2 border border-gray-300" />
//       </div>
//       <div className="mb-4">
//         <label>{translations[language].date}</label>
//         <input type="date" name="date" value={formData.date} onChange={handleInputChange} required className="w-full p-2 border border-gray-300" />
//       </div>
//       <div className="mb-4">
//         <label>{translations[language].time}</label>
//         <input type="time" name="time" value={formData.time} onChange={handleInputChange} required className="w-full p-2 border border-gray-300" />
//       </div>
//       <button type="submit" className="w-[160px] h-[40px] bg-[#A62ED1] text-white hover:bg-[#A62ED1]">
//       {editingId ? "Update" : translations[language].submit}
//       </button>
//     </form>
//   );

//   return (
//     <div className="w-full">
//       <button onClick={toggleLanguage} className="mb-4 p-2 text-[#A62ED1]">
//         {translations[language].switchTo}
//       </button>

//       <div className="flex flex-col mb-4">
//         <div className="flex justify-between mb-2">
//           <input
//             type="text"
//             placeholder={translations[language].search}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-3/5 p-4 border border-gray-300"
//           />
//           <select
//             value={itemsPerPage}
//             onChange={handleItemsPerPageChange}
//             className="w-1/5 p-4 border border-gray-300"
//           >
//             <option value={5}>{translations[language].itemsPerPage}</option>
//             <option value={10}>10 {translations[language].itemsPerPage}</option>
//             <option value={15}>15 {translations[language].itemsPerPage}</option>
//             <option value={20}>20 {translations[language].itemsPerPage}</option>
//           </select>
//         </div>

//         <button
//           className="w-[160px] h-[60px] bg-[#A62ED1] text-white hover:bg-[#A62ED1] py-4 mt-10 mb-4"
//           onClick={handleCreateClick}
//         >
//           {translations[language].create}
//         </button>
//       </div>

//       {showForm && renderForm()}

//       <table className="min-w-full divide-y divide-gray-400 border-collapse border border-gray-300">
//         <thead className="bg-[#ececec]">
//           <tr>
            
//             <th className="p-2">{translations[language].name}</th>
//             <th className="p-2">{translations[language].phone}</th>
//             <th className="p-2">{translations[language].email}</th>
//             <th className="p-2">{translations[language].noOfPeople}</th>
//             <th className="p-2">{translations[language].type}</th>
//             <th className="p-2">{translations[language].duration}</th>
//             <th className="p-2">{translations[language].date}</th>
//             <th className="p-2">{translations[language].time}</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map(item => (
//             <tr key={item.id}>
             
//               <td className="border p-2">{item.name}</td>
//               <td className="border p-2">{item.phone}</td>
//               <td className="border p-2">{item.email}</td>
//               <td className="border p-2">{item.no_of_people}</td>
//               <td className="border p-2">{item.type}</td>
//               <td className="border p-2">{item.duration}</td>
//               <td className="border p-2">{item.date}</td>
//               <td className="border p-2">{item.time}</td>
//               <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">
//                  <button className="text-blue-500" onClick={() => handleEditClick(item)}>Edit</button>
//                  <button className="text-red-500 ml-2">Delete</button>
//                </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="flex justify-between mt-4">
//         <button onClick={handlePrevPage} disabled={currentPage === 1} className="p-2 bg-[#A62ED1] text-white">
//           {translations[language].previous}
//         </button>
//         <span className="p-2">
//           {translations[language].page} {currentPage} {translations[language].of} {totalPages}
//         </span>
//         <button onClick={handleNextPage} disabled={currentPage === totalPages} className="p-2 bg-[#A62ED1] text-white">
//           {translations[language].next}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookingListing;
