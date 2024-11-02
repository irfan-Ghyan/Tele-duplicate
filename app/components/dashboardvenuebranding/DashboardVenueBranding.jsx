'use client'

import React, { useState } from 'react';

const DashboardVenueBranding = () => {
  const [title, setTitle] = useState('');
  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Handle title change
  const handleTitleChange = (e) => setTitle(e.target.value);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = { title };
    console.log(e.target.value);
    console.log(tableData);

    if (isEditing) {
      // Update existing entry
      const updatedData = [...tableData];

      updatedData[editingIndex] = newEntry;
      setTableData(updatedData);
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      // Add new entry to table
      setTableData([...tableData, newEntry]);
    }

    // Clear form field
    setTitle('');
  };

  // Handle edit action
  const handleEdit = (index) => {
    const entry = tableData[index];
    setTitle(entry.title);
    setIsEditing(true);
    setEditingIndex(index);
  };

  // Handle delete action
  const handleDelete = (index) => {
    setTableData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
        <div className='flex justify-between'> 
      <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-[#A62ED1] text-white rounded hover:bg-[#A62ED1]"
        >
          {isEditing ? 'Update Title' : 'Submit Title'}
        </button>
      </form>

      <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">عنوان</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-[#A62ED1] text-white rounded hover:bg-[#A62ED1]"
        >
          {isEditing ? 'تحديث العنوان' : 'إرسال العنوان'}
        </button>
      </form>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Submitted Titles</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((entry, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{entry.title}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardVenueBranding;
