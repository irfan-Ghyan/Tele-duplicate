'use client'

import React, { useState } from "react";

const BookingListing = () => {
  // Sample data for the table
  const data = Array.from({ length: 50 }, (_, index) => ({
    date: `Date ${index + 1}`,
    time: `Time ${index + 1}`,
    number: index + 1,
    name: `Name ${index + 1}`,
    phone: `Phone${(index + 1) * 10}`,
    status: `Status ${index + 1}`,
    action: "Edit",
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate the index of the last item on the current page
  const lastIndex = currentPage * itemsPerPage;
  // Calculate the index of the first item on the current page
  const firstIndex = lastIndex - itemsPerPage;
  // Get the current items to display
  const currentItems = data.slice(firstIndex, lastIndex);

  // Handle pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full p-4">
      <table className="min-w-full divide-y divide-gray-400 border-collapse border border-gray-300">
        <thead className="bg-[#ececec] ">
          <tr>
            <th className="px-6 py-4 text-center text-md font-bold text-gray-900 uppercase tracking-wider">DATE</th>
            <th className="px-6 py-4 text-center text-md font-bold text-gray-900 uppercase tracking-wider">TIME</th>
            <th className="px-6 py-4 text-center text-md font-bold text-gray-900 uppercase tracking-wider">#</th>
            <th className="px-6 py-4 text-center text-md font-bold text-gray-900 uppercase tracking-wider">NAME</th>
            <th className="px-6 py-4 text-center text-md font-bold text-gray-900 uppercase tracking-wider">PHONE</th>
            <th className="px-6 py-4 text-center text-md font-bold text-gray-900 uppercase tracking-wider">STATUS</th>
            <th className="px-6 py-4 text-center text-md font-bold text-gray-900 uppercase tracking-wider">ACTION</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 border border-gray-300">
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">{item.date}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">{item.time}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">{item.number}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">{item.name}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">{item.phone}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">{item.status}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 border border-gray-300">{item.action}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="w-[120px] lg:w-[140px] h-[44px] px-8 py-6 button-slanted font-jura font-bold bg-gradient-to-r from-[#7E51F8] to-[#D007A6] text-white rounded-tl-lg rounded-br-lg flex items-center justify-center transition duration-300"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="w-[120px] lg:w-[140px] h-[44px] px-8 py-6 button-slanted font-jura font-bold bg-gradient-to-r from-[#7E51F8] to-[#D007A6] text-white rounded-tl-lg rounded-br-lg flex items-center justify-center transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookingListing;
