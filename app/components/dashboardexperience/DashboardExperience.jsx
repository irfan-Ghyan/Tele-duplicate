
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
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  // Fetch table data from backend on component mount
  // useEffect(() => {
  //   fetchTableData();
  // }, []);

  // const fetchTableData = async () => {
  //   setLoading(true);
  //   setError('');
  //   try {
  //     const url = 'http://192.168.70.249:8000/api/content/sections/Home';
  //     const response = await fetch(url);

  //     if (response.ok) {
  //       const data = await response.json();
  //       if (data.success) {
  //         const sessionData = data.data.sections.find((section) => section.title === 'Experience');
  //         if (sessionData) {
  //           const formattedData = sessionData.section_fields.reduce((acc, field) => {
  //             const match = field.key.match(/(title|description)(\d+)/);
  //             if (match) {
  //               const [, type, index] = match;
  //               if (!acc[index]) acc[index] = { key: index };
  //               acc[index][type] = field.value;
  //             }
  //             return acc;
  //           }, []);
  //           setTableData(formattedData);
  //         }
  //       }
  //     } else {
  //       setError('Failed to fetch table data');
  //     }
  //   } catch (error) {
  //     setError('Error fetching table data: ' + error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const uploadImages = async () => {
    const formData = new FormData();
    const section = 'Dome';
    const imageName = `${section}_image`;

    images.forEach((image, index) => {
      formData.append('images[]', image.file);
    });

    formData.append('section', section);
    formData.append('imageName', imageName);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/uploadImages`;

      const response = await uploadImageCall(url, formData, {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server responded with error:', errorData);
        throw new Error(`Failed to upload images: ${response.statusText}`);
      }

      const result = await response.json();

      console.log('Images uploaded successfully:', result);
      const cleanedUrls = result.file_paths.map((file) => ({
        ...file,
        url: file.url.replace(/\\/g, '/'),
      }));

      return result.file_paths;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
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
      const newEntry = { title, description };
      const index = editingIndex !== null ? editingIndex : tableData.length;

      const payload = {
        pageName: 'Experience',
        sectionName: 'Session',
        fields: [
          { fieldName: `title${index + 1}`, fieldValue: title },
          { fieldName: `description${index + 1}`, fieldValue: description },
        ],
      };

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/setMultipleFieldValues`;
      const response = await doPostCall(url, payload);

      if (!response.ok) throw new Error('Failed to save data to the database.');
      const result = await response.json();

      if (images.length > 0) {
        const uploadedImagePaths = await uploadImages();
        payload.images = uploadedImagePaths;
      }


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
    } catch (error) {
      setError('Error saving data: ' + error.message);
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
      // const url = 'http://192.168.70.249:8000/api/content/removeSectionField';
      const response = await doDeleteCall(url, payload);

      if (!response.ok) {
        throw new Error('Failed to delete data from the backend.');
      }

      const result = await response.json();
      if (result.success) {
        setTableData((prevEntries) => prevEntries.filter((entry) => entry.key !== keyId));
      } else {
        setError('Failed to delete the record: ' + result.message);
      }
    } catch (error) {
      setError('Error deleting data: ' + error.message);
    } finally {
      setIsDeleting(false);
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
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
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


  return (
    <div className="w-full py-10 px-40">
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
            {tableData.map((entry, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="p-2">{entry.title}</td>
                <td className="p-2">{entry.description}</td>
                <td className="p-2">
                {Array.isArray(entry.images) && entry.images.length > 0 ? (
                  entry.images.map((image, i) => (
                    <img key={i} src={image} alt={`Image ${i}`} className="w-12 h-12 object-cover mr-2" />
                  ))
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
                    onClick={() => handleDelete(index)}
                    className="text-red-500"
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

export default DashboardExperience;
