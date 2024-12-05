
'use client';

import React, { useState, useEffect } from 'react';
import { doPostCall, doDeleteCall, uploadImageCall } from '../../utils/api';

const DashboardExperience = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


//   const uploadImages = async () => {
//     let formData = new FormData();
//     const section = 'Session';
//     const imageName = `${section}_image`;
  
//     images.forEach((image, index) => {

//       formData.append('images[]', image.file);
//     });
  
//     formData.append('section', section);
//     formData.append('imageName', imageName);
  
// console.log(formData)
    
  
//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//       const url = `${baseUrl}/api/content/uploadImages`;
//       const response = await uploadImageCall(url, {
//         method: 'POST',
//         body: formData,
//       });
  
//       // const response = await uploadImageCall(url, formData, {
//       //   Accept: 'application/json',
//       //   Authorization: 'Bearer ' + localStorage.getItem('token'),
//       // });

//       console.log(response);

//       if (!response.ok) {
//         const errorData = await response.text();
//         console.error('Server responded with error:', errorData);
//         throw new Error(`Failed to upload images: ${response.statusText}`);
//       }

//       const result = await response.json();

//       console.log('Images uploaded successfully:', result);
//       const cleanedUrls = result.file_paths.map((file) => ({
//         ...file,
//         url: file.url.replace(/\\/g, '/'),
//       }));

//       return result.file_paths;
//     } catch (error) {
//       console.error('Error uploading images:', error);
//       throw error;
//     }
//   };


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

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError('Both title and description are required.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // const newEntry = { title, description };
      const index = editingIndex !== null ? editingIndex : tableData.length;

      let uploadedImagePaths = [];
      if (images.length > 0) {
        uploadedImagePaths = await uploadImages(); 
      }

      const payload = {
        pageName: 'Experience',
        sectionName: 'Session',
        fields: [
          { fieldName: `title${index + 1}`, fieldValue: title },
          { fieldName: `description${index + 1}`, fieldValue: description },
        ],
        images: uploadedImagePaths,
      };

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/setMultipleFieldValues`;
      const response = await doPostCall(url, payload);

      if (!response.ok) throw new Error('Failed to save data to the database.');
      const result = await response.json();

      const newEntry = {
        id: tableData[editingIndex]?.id || tableData.length + 1,
        title,
        description,
        images: uploadedImagePaths,
      };

      // if (images.length > 0) {
      //   const uploadedImagePaths = await uploadImages();
      //   payload.images = uploadedImagePaths;
      // }


      if (editingIndex !== null) {
        setTableData((prevData) =>
          prevData.map((entry, i) =>
            i === editingIndex ? { ...newEntry, key: `title${index + 1}` } : entry
          )
        );
      } else {
        setTableData((prevData) => [...prevData, { ...newEntry, key: `title${index + 1}` }]);
      }

      setTitle('');
      setDescription('');
      setEditingIndex(null);
      setImages([]);
    } catch (error) {
      setError('Error saving data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

 
  const handleEdit = (index) => {
    const entryToEdit = tableData[index];
    if (!entryToEdit) {
      setError('No entry found at index: ' + index);
      return;
    }

    setTitle(entryToEdit.title || '');
    setDescription(entryToEdit.description || '');
    setEditingIndex(index);
  };
  

  const uploadImages = async () => {
    const formData = new FormData();
    const section = 'Dome';
    const imageName = `${section}_image`;
  
    // Append images
    images.forEach((image) => {
      formData.append('images[]', image.file);
    });
  
    // Append metadata
    formData.append('section', section);
    formData.append('imageName', imageName);
  
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/uploadImages`;
  
      const response = await uploadImageCall(url, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Upload failed:', errorData.message || 'Unknown error');
        throw new Error(errorData.message || 'Failed to upload images');
      }
  
      const result = await response.json();
      console.log('Image Upload Successful:', result);
  
      // Return uploaded file paths
      return result.file_paths || [];
    } catch (error) {
      console.error('Error during image upload:', error);
      throw error;
    }
  };

  const fetchTableData = async () => {
  setLoading(true);
  setError('');
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}/api/content/sections/Experience`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        const sessionData = data.data.sections.find((section) => section.title === 'Experience');
        if (sessionData) {
          const formattedData = sessionData.section_fields.reduce((acc, field) => {
            const match = field.key.match(/(title|description)(\d+)/);
            if (match) {
              const [, type, index] = match;
              if (!acc[index]) acc[index] = { key: index };
              acc[index][type] = field.value;
              if (!acc[index].images) {
                acc[index].images = []; 
              }
            }
            return acc;
          }, []);
          setTableData(formattedData);
        }
      }
    } else {
      setError('Failed to fetch table data');
    }
  } catch (error) {
    setError('Error fetching table data: ' + error.message);
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (keyId) => {
  setIsDeleting(true);
  setError('');
  try {
    const confirmed = window.confirm('Are you sure you want to delete this record?');
    if (!confirmed) return;

    const payload = {
      pageName: 'Experience',
      sectionName: 'Session',
      fieldName: keyId,
    };
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}/api/content/removeSectionField`;
    const response = await doDeleteCall(url, payload);

    if (response.ok) {
      setTableData((prevEntries) => prevEntries.filter((entry) => entry.key !== keyId));
    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Failed to delete the record.');
    }
  } catch (error) {
    setError('Error deleting data: ' + error.message);
  } finally {
    setIsDeleting(false);
  }
};


  return (
    <div className="bg-white w-full py-10 px-40">
      <h1 className="text-4xl font-black text-[#063828]">Session</h1>
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300"
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
                className="w-full"
              />
        </div>
        <button type="submit" className="w-full p-4 bg-[#063828] text-white" disabled={loading}>
          {editingIndex !== null ? 'Update' : 'Submit'}
        </button>
      </form>

    
      <div className="mt-20">
  <h2 className="text-xl font-bold mb-4">Submitted Entries</h2>
  <table className="w-full border border-gray-300">
    <thead>
      <tr className="bg-gray-100">
        <th className="p-2 border border-gray-300">Title</th>
        <th className="p-2 border border-gray-300">Description</th>
        <th className="p-2 border border-gray-300">Images</th>
        <th className="p-2 border border-gray-300">Actions</th>
      </tr>
    </thead>
    <tbody>
      {tableData.length > 0 ? (
        tableData.map((entry, index) => (
          <tr key={index} className="border border-gray-300">
            <td className="p-2">{entry.title || "N/A"}</td>
            <td className="p-2">{entry.description || "N/A"}</td>
            <td className="p-2">
              {entry.images && entry.images.length > 0 ? (
                <div className="flex flex-wrap">
                  {entry.images.map((image, i) => (
                    <img
                      key={i}
                      src={image}
                      alt={`Image ${i}`}
                      className="w-12 h-12 object-cover mr-2"
                    />
                  ))}
                </div>
              ) : (
                <span>No images</span>
              )}
            </td>
            <td className="p-2">
              <button
                onClick={() => handleEdit(index)}
                className="text-blue-500 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(entry.key)}
                className="text-red-500"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="text-center p-2">
            No entries found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
      </div>

    </div>
  );
};

export default DashboardExperience;
