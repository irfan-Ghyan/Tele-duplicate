'use client'

import React, { useState } from 'react';

const DashboardVenueBranding = () => {
  const [title, setTitle] = useState('');
  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showSection, setShowSection] = useState(true);

  // Handle title change
  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      pageName: "Corporateevents",
      sectionName: "Venue Branding",
      fields: [
        {
          fieldName: "title",
          fieldValue: formData.title,
        },
        {
          fieldName: "description",
          fieldValue: formData.description,
        },
      ],
    };
    
    try {
      const response = await fetch("http://192.168.70.136:8000/api/content/setMultipleFieldValues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageName: "Corporateevents",
          sectionName: "Venue Branding",
          body: JSON.stringify(payload),
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to save data to the database.");
      }
      
      const result = await response.json();
      console.log("Data saved successfully:", result);
      
      // Clear form after submission
      setFormData({
        title: "",
        description: "",
        imageUrl: null,
      });
      
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const toggleSectionVisibility = () => {
    setShowSection(!showSection);
  };


  // Handle edit action
  const handleEdit = (index) => {
    const entry = tableData[index];
    setTitle(entry.title);
    setDescription(entry.description);
    setImages(entry.images);
    setIsEditing(true);
    setEditingIndex(index);
  };

  // const handleDelete = async (keyId) => {
  //   try {
  //     const payload = {
  //       pageName: "Home",
  //       sectionName: "FAQ",
  //       fieldName: keyId,
  //     };

  //     const response = await fetch(
  //       "http://192.168.70.151:8000/api/content/removeSectionField",
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to delete data");
  //     }

  //     const result = await response.json();
  //     console.log("Delete API Response:", result);

  //     if (result.success) {
  //       setFaqEntries((prevEntries) =>
  //         prevEntries.filter((entry) => entry.question.key !== keyId)
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error deleting data:", error);
  //   }
  // };



  return (
    <div className="w-full">
      <div className="flex justify-end">
        <button
          onClick={toggleSectionVisibility}
          className="mb-4 p-2 text-[#A62ED1]"
        >
          {showSection ? "Hide" : "Show"}
        </button>
      </div>

      {showSection && (
        <>
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

      </div>
      {/* <div className="mt-10">
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
      </div> */}
      </>
      )}
    </div>
  );
};

export default DashboardVenueBranding;
