'use client'

import React, { useState } from 'react';

const DashboardBuildingEvents = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);


  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);


  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => {
      return {
        file,
        previewUrl: URL.createObjectURL(file),
      };
    });
    setImages((prevImages) => [...prevImages, ...newImages]);
  };


  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newEntry = {
      title,
      description,
      images,
    };

    if (isEditing) {
   
      const updatedData = [...tableData];
      updatedData[editingIndex] = newEntry;
      setTableData(updatedData);
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      // Add new entry to table
      setTableData([...tableData, newEntry]);
    }

    // Clear form fields
    setTitle('');
    setDescription('');
    setImages([]);
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
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="w-full p-2 border border-gray-300 "
            rows="3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300"
          />
        </div>

        <div className="mb-4 grid grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img src={img.previewUrl} alt="Preview" className="w-full h-24 object-cover rounded" />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full p-4 bg-[#A62ED1] text-white hover:bg-[#A62ED1]"
        >
          {isEditing ? 'Update Entry' : 'Submit'}
        </button>
      </form>

      <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">عنوان</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">وصف</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="w-full p-2 border border-gray-300 "
            rows="3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">تحميل الصور</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300"
          />
        </div>

        <div className="mb-4 grid grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img src={img.previewUrl} alt="Preview" className="w-full h-24 object-cover rounded" />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full p-4 bg-[#A62ED1] text-white hover:bg-[#A62ED1]"
        >
          {isEditing ? 'Update Entry' : 'Submit'}
        </button>
      </form>
      
      </div>
      

      
          <div className='mt-20'>
      <h2 className="text-xl font-bold mb-4">Submitted Entries</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((entry, index) => (
            <tr key={index} className="text-center">
              <td className="p-2 border">{entry.title}</td>
              <td className="p-2 border">{entry.description}</td>
              <td className="p-2 border">
                {entry.images[0] && (
                  <img
                    src={entry.images[0].previewUrl}
                    alt="Preview"
                    className="w-16 h-16 object-cover mx-auto rounded"
                  />
                )}
              </td>
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

export default DashboardBuildingEvents;
