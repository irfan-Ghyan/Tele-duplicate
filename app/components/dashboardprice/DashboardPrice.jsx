'use client';

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { doGetCall, doPostCall, doDeleteCall, doPutCall } from "../../utils/api.js";

const DashboardPrice = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/bookings`;
      const response = await doGetCall(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch bookings: ${response.statusText}`);
      }

      const data = await response.json();
      const formattedBookings = data.data.map((booking) => ({
        ...booking,
        time: booking.time ? booking.time.slice(0, 5) : "",
        total_price: (booking.booking_type.price || 0) * (booking.no_of_people || 0),
      }));

      setBookings(formattedBookings || []);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const filteredData = useMemo(() =>
    bookings.filter(item =>
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.phone && item.phone.includes(searchTerm)) ||
      (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [bookings, searchTerm]);

  const totalPages = useMemo(() => Math.ceil(filteredData.length / itemsPerPage), [filteredData, itemsPerPage]);

  const currentItems = useMemo(() => {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    return filteredData.slice(firstIndex, lastIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const handlePopupInputChange = (e) => {
    const { name, value } = e.target;
    setEditingData((prev) => ({
      ...prev,
      [name]: value,
      total_price:
        name === "price" || name === "no_of_people"
          ? (name === "price" ? value : prev.price || 0) *
            (name === "no_of_people" ? value : prev.no_of_people || 0)
          : prev.total_price,
    }));
  };

  const handlePopupSubmit = async (e) => {
    e.preventDefault();

    const totalPrice = (editingData.price || 0) * (editingData.no_of_people || 0);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/bookings/${editingData.id}`;
      const response = await doPutCall(url, { ...editingData, total_price: totalPrice });

      if (response.ok) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === editingData.id
              ? {
                  ...booking,
                  booking_type: { ...booking.booking_type, price: editingData.price },
                  no_of_people: editingData.no_of_people,
                  total_price: totalPrice,
                }
              : booking
          )
        );

        setShowEditPopup(false); // Close the popup
      } else {
        console.error("Failed to update booking on the server.");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleEditClick = (booking) => {
    setEditingData({
      ...booking,
      price: booking.booking_type.price || "",
      no_of_people: booking.no_of_people || "",
    });
    setShowEditPopup(true);
  };

  const renderEditPopup = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-[400px]">
        <h3 className="text-lg font-semibold mb-4">Edit Booking</h3>
        <form onSubmit={handlePopupSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Price per Person</label>
            <input
              type="number"
              name="price"
              value={editingData?.price || ""}
              onChange={handlePopupInputChange}
              required
              className="w-full p-2 border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">No. of People</label>
            <input
              type="number"
              name="no_of_people"
              value={editingData?.no_of_people || ""}
              onChange={handlePopupInputChange}
              required
              className="w-full p-2 border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Total Price</label>
            <input
              type="text"
              value={editingData?.total_price || 0}
              readOnly
              className="w-full p-2 border border-gray-300 bg-gray-100"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowEditPopup(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white p-20 rounded-lg ">
      {loading && <div className="text-center text-lg text-gray-600">Loading...</div>}
      {error && <div className="text-center text-red-500 mb-4">{error}</div>}

      {!loading && !error && (
        <>
          {showEditPopup && renderEditPopup()}

          <table className="min-w-full divide-y divide-gray-400 border-collapse border border-gray-300 max-w-4xl">
            <thead className="bg-[#ececec]">
              <tr>
                <th className="p-2">Duration</th>
                <th className="p-2">Price</th>
                <th className="p-2">Total Price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">{item.duration}</td>
                  <td className="border p-2">{item.booking_type.price}</td>
                  <td className="border p-2">{item.total_price || 0}</td>
                  <td className="border p-2">
                    <button
                      className="text-blue-500"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default DashboardPrice;
