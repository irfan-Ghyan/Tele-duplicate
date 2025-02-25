'use client';

import React, { useState, useEffect } from 'react';
import { doPostCall, doDeleteCall, uploadImageCall, doGetCall } from '../../utils/api';
import Image from 'next/image';


const translations = {
  en: {
    switchLang: 'Switch to Arabic',
    hide: 'Hide',
    show: 'Show',
    loading: 'Loading...',
    error: 'Failed to load data. Please try again.',
    domeTitle: 'Session',
    title: 'Title',
    description: 'Description',
    uploadImages: 'Upload Images',
    images: 'Images',
    submit: 'Submit',
    update: 'Update Entry',
    submittedEntries: 'Submitted Entries',
    noEntries: 'No entries found.',
    edit: 'Edit',
    delete: 'Delete',
    actions: 'Actions',
  },
  ar: {
    switchLang: 'التبديل إلى اللغة الإنجليزية',
    hide: 'إخفاء',
    show: 'عرض',
    loading: 'جار التحميل...',
    error: 'فشل في تحميل البيانات. حاول مرة اخرى.',
    domeTitle: 'حصة',
    title: 'العنوان',
    description: 'الوصف',
    uploadImages: 'تحميل الصور',
    images: 'الصور',
    submit: 'إرسال',
    update: 'تحديث البيانات',
    submittedEntries: 'البيانات المقدمة',
    noEntries: 'لا توجد بيانات.',
    edit: 'تعديل',
    delete: 'حذف',
    actions: 'الإجراءات',
  },
};

const DashboardExperience = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


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

const fetchTableData = async () => {
  setLoading(true);
  setError('');
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}/api/content/sections/Experience`;
    const response = await doGetCall(url);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    if (data.success) {
      const sessionData = data.data.sections.find((section) => section.title === 'Session');

      if (sessionData) {
        const formattedData = sessionData.section_fields.reduce((acc, field) => {
          const match = field.key.match(/(title|description|image)(\d+)/);
          if (match) {
            const [, type, index] = match;
            if (!acc[index]) acc[index] = { key: index, images: [] };

            if (type === 'image') {
              acc[index].images.push(field.value);
            } else {
              acc[index][type] = field.value;
              acc[index][`${type}_meta`] = field.key;
            }
          }
          return acc;
        }, {});

        setTableData(Object.values(formattedData));
      }
    } else {
      setError('No data found.');
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    setError(err.message || 'Error fetching data');
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  fetchTableData();
}, []);

  
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!title || !description) {
//     setError('Both title and description are required.');
//     return;
//   }

//   setLoading(true);
//   setError('');
//   try {
//     const index = tableData.length + 1;

//     let uploadedImagePaths = [];
//     if (images.length > 0) {
//       uploadedImagePaths = await uploadImages();
//     }

//     const payload = {
//       pageName: 'Experience',
//       sectionName: 'Session',
//       fields: [
//         { fieldName: `title${index}`, fieldValue: title },
//         { fieldName: `description${index}`, fieldValue: description },
//       ],
//       images: uploadedImagePaths,
//     };

//     const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//     const url = `${baseUrl}/api/content/setMultipleFieldValues`;
//     const response = await doPostCall(url, payload);

//     if (!response.ok) throw new Error('Failed to save data to the database.');

//     if (images.length > 0) {
//       const uploadedImagePaths = await uploadImages();
//       payload.images = uploadedImagePaths;
//     }

//     const newEntry = {
//       title,
//       description,
//       images: uploadedImagePaths,
//       title_meta: `title${index}`,
//       description_meta: `description${index}`,
//     };

//     setTableData((prevData) => [...prevData, newEntry]);
//     setTitle('');
//     setDescription('');
//     setImages([]);
//   } catch (error) {
//     setError('Error saving data: ' + error.message);
//   } finally {
//     setLoading(false);
//   }
// };
  


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title || !description) {
    setError('Both title and description are required.');
    return;
  }

  setLoading(true);
  setError('');

  try {
    let uploadedImagePaths = [];
    if (images.length > 0) {
      uploadedImagePaths = await uploadImages();
    }

    const payload = {
      pageName: 'Experience',
      sectionName: 'Session',
      fields: [
        { fieldName: `title${editingIndex !== null ? editingIndex + 1 : tableData.length + 1}`, fieldValue: title },
        { fieldName: `description${editingIndex !== null ? editingIndex + 1 : tableData.length + 1}`, fieldValue: description },
      ],
      images: uploadedImagePaths,
    };

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}/api/content/setMultipleFieldValues`;
    const response = await doPostCall(url, payload);

    if (!response.ok) throw new Error('Failed to save data to the database.');

    const updatedEntry = {
      title,
      description,
      images: uploadedImagePaths,
      title_meta: `title${editingIndex !== null ? editingIndex + 1 : tableData.length + 1}`,
      description_meta: `description${editingIndex !== null ? editingIndex + 1 : tableData.length + 1}`,
    };

    if (editingIndex !== null) {
      // Update the existing entry
      setTableData((prevData) =>
        prevData.map((entry, index) => (index === editingIndex ? { ...entry, ...updatedEntry } : entry))
      );
      setEditingIndex(null); // Reset editing index
    } else {
      // Add a new entry
      setTableData((prevData) => [...prevData, updatedEntry]);
    }

    setTitle('');
    setDescription('');
    setImages([]);
  } catch (error) {
    setError('Error saving data: ' + error.message);
  } finally {
    setLoading(false);
  }
};

  const uploadImages = async () => {
    const formData = new FormData();
    const section = 'Session';
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


  const handleDelete = async (title_meta, description_meta) => {
    if (!title_meta && !description_meta) {
      setError('Title or Description metadata is missing.');
      console.error('Missing parameters for deletion:', { title_meta, description_meta });
      return;
    }
  
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/removeSectionField`;
  
      // Delete Title
      if (title_meta) {
        const titlePayload = {
          pageName: 'Experience',
          sectionName: 'Session',
          fieldName: title_meta,
        };
        console.log('Deleting Title with payload:', titlePayload);
  
        const titleResponse = await doDeleteCall(url, titlePayload);
        if (!titleResponse.ok) {
          const titleError = await titleResponse.json();
          throw new Error(`Failed to delete title: ${titleError.message}`);
        }
      }
  
      // Delete Description
      if (description_meta) {
        const descPayload = {
          pageName: 'Experience',
          sectionName: 'Session',
          fieldName: description_meta,
        };
        console.log('Deleting Description with payload:', descPayload);
  
        const descResponse = await doDeleteCall(url, descPayload);
        if (!descResponse.ok) {
          const descError = await descResponse.json();
          throw new Error(`Failed to delete description: ${descError.message}`);
        }
      }
  
      // Remove entry from tableData
      setTableData((prevEntries) =>
        prevEntries.filter(
          (entry) => entry.title_meta !== title_meta && entry.description_meta !== description_meta
        )
      );
      setError('');
    } catch (error) {
      console.error('Error deleting data:', error.message);
      setError(`Error deleting data: ${error.message}`);
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


const handleImageDelete = async (imageName, entryIndex) => {
  const payload = {
    section: "Session",
    imageName: imageName,
  };

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}/api/content/deleteImages`;

    const response = await doDeleteCall(url, payload);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete image");
    }

    const result = await response.json();
    console.log("Image deleted successfully:", result);

    setTableData((prevData) =>
      prevData.map((entry, index) =>
        index === entryIndex
          ? { ...entry, images: entry.images.filter((img) => img !== imageName) }
          : entry
      )
    );
  } catch (error) {
    console.error("Error deleting image:", error.message);
    setError(`Error deleting image: ${error.message}`);
  }
};

  const [language, setLanguage] = useState('en');
  const [showSection, setShowSection] = useState(true);

  const t = translations[language];

  return (
    <div className={`w-full py-10 bg-gray-200 border-t-2 px-40 ${language === 'ar' ? 'text-right' : 'text-left'}`}
    dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      <div className='bg-white p-20 rounded-lg '>
        <div className='flex justify-between'>
        <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className="mb-4 p-2 text-[#063828]">
          {language === 'en' ? 'التبديل إلى اللغة العربية' : 'Switch to English'}
        </button>
        <button onClick={() => setShowSection(!showSection)} className="mb-4 p-2 text-[#063828]">
          {showSection ? translations[language].hide : translations[language].show}
        </button>
        </div>
      <h1 className="text-4xl font-black text-[#063828]">{t.domeTitle}</h1>
      
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {showSection && (
        <>
      <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.title}</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.description}</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300"
            rows="3"
            required
          />
        </div>
        <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.uploadImages}</label>
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
        <h2 className="text-xl font-bold mb-4">{t.submitted_entries}</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-300">{t.title}</th>
              <th className="p-2 border border-gray-300">{t.description}</th>
              <th className="p-2 border border-gray-300">{t.images}</th>
              <th className="p-2 border border-gray-300">{t.actions}</th>
            </tr>
          </thead>
          <tbody>
          {tableData.length > 0 ? (
            tableData.map((entry, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="p-2">{entry.title || 'N/A'}</td>
                <td className="p-2">{entry.description || 'N/A'}</td>
               <td className='p-2'>
                {entry.images && entry.images.length > 0 ? (
                        <div className="flex flex-wrap">
                          {entry.images.map((image, i) => (
                            <div key={i} className="relative">
                              <Image
                                src={image}
                                alt={`Image ${i}`}
                                className="w-12 h-12 object-cover mr-2"
                              />
                              <button
                                onClick={() => handleImageDelete(image, index)}
                                className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded"
                              >
                                X
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span>No images</span>
                      )}
               </td>
                <td className="p-2">                   
                  <button onClick={() => handleEdit(index)} className="text-blue-500">
                  {t.edit}
                  </button>
                  <button
                    onClick={() => handleDelete(entry.title_meta, entry.description_meta)}
                    className="text-red-500"
                  >
                    {t.delete}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-2">
              {t.no_entries}
              </td>
            </tr>
          )}
        </tbody>

        </table>

      </div>
      </>
      )}
      </div>
    </div>
  );
};

export default DashboardExperience;
