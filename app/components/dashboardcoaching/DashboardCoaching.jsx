
// import React, { useState } from 'react';
// import { doPostCall, uploadImageCall, doDeleteCall, } from '../../utils/api';

// const DashboardCoaching = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [images, setImages] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [showSection, setShowSection] = useState(true);
//   const [language, setLanguage] = useState('en');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
  

//   const handleTitleChange = (e) => setTitle(e.target.value);
//   const handleDescriptionChange = (e) => setDescription(e.target.value);


//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files.map((file) => ({
//       file,
//       previewUrl: URL.createObjectURL(file),
//     }));
//     setImages((prevImages) => [...prevImages, ...newImages]);
//   };


//   const uploadImages = async () => {
//   const formData = new FormData();
//   const section = 'Coaching';
//   const imageName = `${section}_image`;

//   images.forEach((image) => {
//     formData.append('images[]', image.file);
//   });

//   formData.append('section', section);
//   formData.append('imageName', imageName);

//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//     const url = `${baseUrl}/api/content/uploadImages`;

//     const response = await uploadImageCall(url, formData, {
//       Accept: 'application/json',
//       Authorization: 'Bearer ' + localStorage.getItem('token'),
//     });

//     if (!response.ok) {
//       const errorData = await response.text();
//       console.error('Server Error:', errorData);
//       throw new Error(`Failed to upload images: ${response.statusText}`);
//     }

//     const result = await response.json();
//     console.log('Image Upload Successful:', result);

//     const cleanedUrls = result.file_paths.map((file) => ({
//       ...file,
//       url: file.url.replace(/\\/g, '/'),
//     }));

//     return result.file_paths;
//   } catch (error) {
//     console.error('Error during image upload:', error);
//     throw error;
//   }
// };



//   const handleRemoveImage = (index) => {
//     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (!title || !description) {
//       setError('Both title and description are required.');
//       return;
//     }

//     try {
//       const newEntry = { title, description };
//       const index = editingIndex !== null ? editingIndex : tableData.length;

//       const payload = {
//         pageName: 'Experience',
//         sectionName: 'Coaching',
//         fields: [
//           { fieldName: `title${tableData.length + 1}`, fieldValue: title },
//           { fieldName: `description${tableData.length + 1}`, fieldValue: description },
//         ],
//       };

//       const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//       const url = `${baseUrl}/api/content/setMultipleFieldValues`;
//       const response = await doPostCall(url, payload);
      

//       if (!response.ok) throw new Error('Failed to save data to the database.');

//       let uploadedImagePaths = [];
//       if (images.length > 0) {
//         uploadedImagePaths = await uploadImages();
//       }
  
//       setTableData((prevData) => [
//         ...prevData,
//         {
//           title,
//           description,
//           images: uploadedImagePaths,
//         },
//       ]);
  
//       setTitle('');
//       setDescription('');
//       setImages([]);
//     } catch (error) {
//       console.error('Error saving data:', error);
//       setError('Failed to save data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };



//   const handleDelete = async (index) => {
//     const entryToDelete = tableData[index];

//     try {

//       const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//       const url = `${baseUrl}/api/content/deleteSection/${entryToDelete.id}`; 
//       const response = await doDeleteCall(url, {
//         Authorization: 'Bearer ' + localStorage.getItem('token'),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete entry.');
//       }

//       setTableData((prevData) => prevData.filter((_, i) => i !== index));

//       console.log('Entry deleted successfully.');
//     } catch (error) {
//       console.error('Error deleting entry:', error);
//       setError('Failed to delete entry.');
//     }
//   };


//   const handleEdit = (index) => {
//     const entryToEdit = tableData[index];
//     if (!entryToEdit) {
//       setError('No entry found at index: ' + index);
//       return;
//     }

//     setTitle(entryToEdit.title || '');
//     setDescription(entryToEdit.description || '');
//     setEditingIndex(index);
//   };

//   const toggleSectionVisibility = () => {
//     setShowSection(!showSection);
//   };

//   const labels = {
//     en: {
//       heading: 'Coaching',
//       title: 'Title',
//       description: 'Description',
//       submit: 'Submit',
//       update: 'Update Entry',
//       show: 'Show',
//       hide: 'Hide',
//       upload: 'Upload Images',
//       image: 'Image',
//       actions: 'Actions',
//       noentries: 'No entries found.',
//       edit: 'Edit',
//       delete: 'Delete',
//     },
//     ar: {
//       heading: 'التدريب ',
//       title: 'عنوان',
//       description: 'وصف',
//       submit: 'إرسال',
//       update: 'تحديث',
//       show: 'عرض',
//       hide: 'إخفاء',
//       upload: 'تحميل الصور',
//       image: 'صورة',
//       actions: 'الإجراءات',
//       noentries: 'لم يتم العثور على إدخالات.',
//       edit: 'يحرر',
//       delete: 'يمسح',
//     },
//   };

//   const getDirection = () => (language === 'ar' ? 'rtl' : 'ltr');

//   return (
//     <div
//       className={`w-full py-[40px] md:py-[50px] lg:py-[100px] bg-white border-t-2 border-color-200 px-40 ${
//         language === 'ar' ? 'text-right' : 'text-left'
//       }`}
//     >
//       <div className="flex justify-between">
//         <button
//           onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
//           className="mb-4 p-2 text-[#063828]"
//         >
//           {language === 'en' ? 'التبديل إلى اللغة العربية' : 'Switch to English'}
//         </button>
//         <button
//           onClick={() => setShowSection(!showSection)}
//           className="mb-4 p-2 text-[#063828]"
//         >
//           {showSection ? labels[language].hide : labels[language].show}
//         </button>
//       </div>

//       {showSection && (
//         <>
//           <h1 className="text-4xl text-[#002718] font-black font-orbitron">
//             {labels[language].heading}
//           </h1>
//           <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 {labels[language].title}
//               </label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={handleTitleChange}
//                 className="w-full p-2 border border-gray-300"
//                 dir={getDirection()}
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 {labels[language].description}
//               </label>
//               <textarea
//                 value={description}
//                 onChange={handleDescriptionChange}
//                 className="w-full p-2 border border-gray-300"
//                 dir={getDirection()}
//                 rows="3"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageUpload}
//                 className="w-full"
//               />
//             </div>

//             {images.map((img, index) => (
//               <div key={index} className="relative">
//                 <img
//                   src={img.previewUrl}
//                   alt="Preview"
//                   className="w-full h-24 object-cover rounded"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveImage(index)}
//                   className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
//                 >
//                   &times;
//                 </button>
//               </div>
//             ))}

//             {loading ? (
//               <p className="text-blue-500 text-center">Processing...</p>
//             ) : (
//               <button
//                 type="submit"
//                 className="w-full p-4 bg-[#063828] text-white hover:bg-[#002718]"
//               >
//                 {isEditing ? labels[language].update : labels[language].submit}
//               </button>
//             )}

//             {error && <p className="text-red-500 text-center mt-2">{error}</p>}
//           </form>
//         </>
//       )}


// <div className="mt-20">
//         <h2 className="text-xl font-bold mb-4">Submitted Entries</h2>
//         <table className="w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 border border-gray-300">Title</th>
//               <th className="p-2 border border-gray-300">Description</th>
//               <th className="p-2 border border-gray-300">Images</th>
//               <th className="p-2 border border-gray-300">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((entry, index) => (
//               <tr key={index} className="border border-gray-300">
//                 <td className="p-2">{entry.title}</td>
//                 <td className="p-2">{entry.description}</td>
//                 <td className="p-2">
//                   {entry.images.length > 0 ? (
//                     entry.images.map((image, i) => (
//                       <img key={i} src={image} alt={`Image ${i}`} className="w-12 h-12 object-cover mr-2" />
//                     ))
//                   ) : (
//                     <span>No images</span>
//                   )}
//                 </td>
//                 <td className="p-2">
//                   <button
//                     onClick={() => handleEdit(index)}
//                     className="text-blue-500 mr-2"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(index)}
//                     className="text-red-500"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DashboardCoaching;



'use client'

import React, { useState, useEffect } from 'react';
import { doPostCall, uploadImageCall, doDeleteCall, } from '../../utils/api';

const DashboardCoaching = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showSection, setShowSection] = useState(true);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);


  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const url = `${baseUrl}/api/content/sections/Experience`;
        const response = await fetch(url);
    
        if (!response.ok) {
          throw new Error('Failed to fetch data from the server');
        }
    
        const data = await response.json();
        const coachingSection = data?.data?.sections.find(
          (section) => section.title === 'Coaching'
        );
    
        if (coachingSection) {
          const tableData = coachingSection.section_fields.map((field, index) => ({
            id: index, // Or use a unique identifier from the API
            title: field.key.includes('title') ? field.value : '',
            description: field.key.includes('description') ? field.value : '',
            images: [], // Update with actual image URLs if available
          }));
          setTableData(tableData);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  
  const uploadImages = async () => {
    const formData = new FormData();
    const section = 'Coaching';
    const imageName = `${section}_image`;
  
    images.forEach((image) => {
      formData.append('images[]', image.file); 
    });
  
    formData.append('section', section);
    formData.append('imageName', imageName);
  
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/uploadImages`;
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });
  
      const result = await response.json();
  
      if (!response.ok || !result.success) {
        console.error('Upload failed:', result.message || 'Unknown error');
        throw new Error('Failed to upload images');
      }
  
      console.log('Image Upload Successful:', result);
  
      if (result.file_paths.length > 0) {
        return result.file_paths; // Return the uploaded file paths
      } else {
        console.warn('No file paths returned from the API');
        return [];
      }
    } catch (error) {
      console.error('Error during image upload:', error);
      throw error;
    }
  };
  

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    if (!title || !description) {
      setError('Both title and description are required.');
      setLoading(false);
      return;
    }
  
    try {
      let uploadedImagePaths = [];
      if (images.length > 0) {
        uploadedImagePaths = await uploadImages();
      }
  
      const payload = {
        pageName: 'Experience',
        sectionName: 'Coaching',
        fields: [
          { fieldName: `title${editingIndex !== null ? editingIndex + 1 : tableData.length + 1}`, fieldValue: title },
          { fieldName: `description${editingIndex !== null ? editingIndex + 1 : tableData.length + 1}`, fieldValue: description },
        ],
        images: uploadedImagePaths,
      };
  
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/setMultipleFieldValues`;
      const response = await doPostCall(url, payload);
  
      if (!response.ok) {
        const responseBody = await response.text(); // Debug response if not OK
        console.error('Update API response:', responseBody);
        throw new Error('Failed to save data to the database.');
      }
  
      const newEntry = {
        id: tableData[editingIndex]?.id || tableData.length + 1, // Retain existing ID or generate a new one
        title,
        description,
        images: uploadedImagePaths,
      };
  
      if (editingIndex !== null) {
        // Update existing entry
        setTableData((prevData) => {
          const updatedData = [...prevData];
          updatedData[editingIndex] = newEntry;
          return updatedData;
        });
        setEditingIndex(null);
        setIsEditing(false);
      } else {
        // Add new entry
        setTableData((prevData) => [...prevData, newEntry]);
      }
  
      setTitle('');
      setDescription('');
      setImages([]);
    } catch (error) {
      console.error('Error saving data:', error.message || error);
      setError('Failed to save data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (index) => {
    const entryToDelete = tableData[index]; // Get the entry to delete
    if (!entryToDelete || !entryToDelete.id) {
      setError('Entry does not have a valid ID to delete.');
      return;
    }
  
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/deleteSection/${entryToDelete.id}`;
  
      const response = await doDeleteCall(url, {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      });
  
      if (!response.ok) {
        const responseBody = await response.text(); // Capture response for debugging
        console.error('Delete API response:', responseBody);
        throw new Error('Failed to delete entry from the database.');
      }
  
      // Update tableData state to remove the deleted entry
      setTableData((prevData) => prevData.filter((_, i) => i !== index));
      console.log('Entry deleted successfully:', entryToDelete.id);
    } catch (error) {
      console.error('Error deleting entry:', error.message || error);
      setError('Failed to delete entry. Please try again.');
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
    setImages(entryToEdit.images || []);
    setEditingIndex(index);
    setIsEditing(true);
    console.log('Editing entry:', entryToEdit);
  };
  

  const toggleSectionVisibility = () => {
    setShowSection(!showSection);
  };

  const labels = {
    en: {
      heading: 'Coaching',
      title: 'Title',
      description: 'Description',
      submit: 'Submit',
      update: 'Update Entry',
      show: 'Show',
      hide: 'Hide',
      upload: 'Upload Images',
      image: 'Image',
      actions: 'Actions',
      noentries: 'No entries found.',
      edit: 'Edit',
      delete: 'Delete',
    },
    ar: {
      heading: 'التدريب ',
      title: 'عنوان',
      description: 'وصف',
      submit: 'إرسال',
      update: 'تحديث',
      show: 'عرض',
      hide: 'إخفاء',
      upload: 'تحميل الصور',
      image: 'صورة',
      actions: 'الإجراءات',
      noentries: 'لم يتم العثور على إدخالات.',
      edit: 'يحرر',
      delete: 'يمسح',
    },
  };

  const getDirection = () => (language === 'ar' ? 'rtl' : 'ltr');

  return (
    <div
      className={`w-full py-[40px] md:py-[50px] lg:py-[100px] bg-white border-t-2 border-color-200 px-40 ${
        language === 'ar' ? 'text-right' : 'text-left'
      }`}
    >
      <div className="flex justify-between">
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="mb-4 p-2 text-[#063828]"
        >
          {language === 'en' ? 'التبديل إلى اللغة العربية' : 'Switch to English'}
        </button>
        <button
          onClick={() => setShowSection(!showSection)}
          className="mb-4 p-2 text-[#063828]"
        >
          {showSection ? labels[language].hide : labels[language].show}
        </button>
      </div>

      {showSection && (
        <>
          <h1 className="text-4xl text-[#002718] font-black font-orbitron">
            {labels[language].heading}
          </h1>
          <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {labels[language].title}
              </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="w-full p-2 border border-gray-300"
                dir={getDirection()}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {labels[language].description}
              </label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                className="w-full p-2 border border-gray-300"
                dir={getDirection()}
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

            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img.previewUrl}
                  alt="Preview"
                  className="w-full h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  &times;
                </button>
              </div>
            ))}

            {loading ? (
              <p className="text-blue-500 text-center">Processing...</p>
            ) : (
              <button
                type="submit"
                className="w-full p-4 bg-[#063828] text-white hover:bg-[#002718]"
              >
                {isEditing ? labels[language].update : labels[language].submit}
              </button>
            )}

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        </>
      )}

<div className="mt-20">
  <h2 className="text-xl font-bold mb-4">Submitted Entries</h2>
  <table className="w-full border border-gray-300">
    <thead>
      <tr className="bg-gray-100">
        <th className="p-2 border border-gray-300">Title & Description</th>
        <th className="p-2 border border-gray-300">Images</th>
        <th className="p-2 border border-gray-300">Actions</th>
      </tr>
    </thead>
    <tbody>
      {tableData.map((entry, index) => (
        <tr key={index} className="border border-gray-300">
          <td className="p-2">
            <div>
              <p><strong>Title:</strong> {entry.title}</p>
              <p><strong>Description:</strong> {entry.description}</p>
            </div>
          </td>
          <td className="p-2">
            {entry.images.length > 0 ? (
              entry.images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  alt={`Image ${i}`}
                  className="w-12 h-12 object-cover mr-2"
                />
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

export default DashboardCoaching;
