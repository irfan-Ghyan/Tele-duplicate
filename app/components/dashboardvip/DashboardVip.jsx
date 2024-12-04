

import React, { useState, useEffect } from 'react';
import {doPostCall, uploadImageCall, doGetCall} from '../../utils/api';

const DashboardVip = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showSection, setShowSection] = useState(true);
  const [language, setLanguage] = useState('en'); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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


  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      setError(''); // Reset error state

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const url = `${baseUrl}/api/content/sections/Dome`;
        const response = await doGetCall(url);

        if (!response.ok) {
          throw new Error('Failed to fetch data.');
        }

        const data = await response.json();
        const domeSection = data?.data?.sections.find((section) => section.title === 'VIP Experience');
        if (domeSection) {
          const groupedSlides = domeSection.section_fields.reduce((acc, field) => {
            const match = field.key.match(/(title|description)(\d+)/);
            if (match) {
              const [, type, index] = match;
              if (!acc[index]) acc[index] = {};
              acc[index][type] = field.value;
            }
            return acc;
          }, {});
          setTableData(Object.values(groupedSlides));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (index) => {
    const entry = tableData[index];
    setTitle(entry.title);
    setDescription(entry.description);
    setImages(entry.images || []); // Set images (if any)
    setIsEditing(true); // Indicate that we're in edit mode
    setEditingIndex(index); // Store the index of the item being edited
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !description) {
      setError('Both title and description are required.');
      return;
    }
  
    try {
      let uploadedImagePaths = [];
      if (images.length > 0) {
        uploadedImagePaths = await uploadImages(); // Upload images if any
      }
  
      const payload = {
        pageName: 'Dome',
        sectionName: 'VIP Experience',
        fields: [
          {
            fieldName: `title${editingIndex !== null ? editingIndex + 1 : tableData.length + 1}`,
            fieldValue: title,
          },
          {
            fieldName: `description${editingIndex !== null ? editingIndex + 1 : tableData.length + 1}`,
            fieldValue: description,
          },
        ],
        images: uploadedImagePaths,
      };
  
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/setMultipleFieldValues`;
  
      const response = await doPostCall(url, payload);
  
      if (!response.ok) {
        const responseBody = await response.text();
        console.error('Update API response:', responseBody);
        throw new Error('Failed to save data to the database.');
      }
  
      // Update tableData
      const newEntry = {
        id: tableData[editingIndex]?.id || tableData.length + 1,
        title,
        description,
        images: uploadedImagePaths,
      };
  
      if (editingIndex !== null) {
        setTableData((prevData) => {
          const updatedData = [...prevData];
          updatedData[editingIndex] = newEntry; // Replace the edited entry
          return updatedData;
        });
        setEditingIndex(null); // Reset editing index
        setIsEditing(false); // Reset editing mode
      } else {
        setTableData((prevData) => [...prevData, newEntry]); // Add new entry
      }
  
      // Reset form fields after submission
      setTitle('');
      setDescription('');
      setImages([]);
    } catch (error) {
      console.error('Error saving data:', error.message || error);
      setError('Failed to save data. Please try again.');
    }
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  
  //   if (!title || !description) {
  //     setError('Both title and description are required.');
  //     return;
  //   }
  
  //   try {
  //     let uploadedImagePaths = [];
  //     if (images.length > 0) {
  //       uploadedImagePaths = await uploadImages(); 
  //     }
  
  //     const payload = {
  //       pageName: 'Dome',
  //       sectionName: 'VIP Experience',
  //       fields: [
  //         { fieldName: `title${editingIndex !== null ? editingIndex + 1 : tableData.length + 1}`, fieldValue: title },
  //         { fieldName: `description${editingIndex !== null ? editingIndex + 1 : tableData.length + 1}`, fieldValue: description },
  //       ],
  //       images: uploadedImagePaths,
  //     };
  
  //     const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  //     const url = `${baseUrl}/api/content/setMultipleFieldValues`;
  
  //     const response = await doPostCall(url, payload);
  
  //     if (!response.ok) {
  //       const responseBody = await response.text();
  //       console.error('Update API response:', responseBody);
  //       throw new Error('Failed to save data to the database.');
  //     }
  
  //     // Update tableData
  //     const newEntry = {
  //       id: tableData[editingIndex]?.id || tableData.length + 1,
  //       title,
  //       description,
  //       images: uploadedImagePaths,
  //     };
  
  //     if (editingIndex !== null) {
  //       setTableData((prevData) => {
  //         const updatedData = [...prevData];
  //         updatedData[editingIndex] = newEntry;
  //         return updatedData;
  //       });
  //       setEditingIndex(null);
  //       setIsEditing(false);
  //     } else {
  //       setTableData((prevData) => [...prevData, newEntry]);
  //     }
  
  //     // Reset form fields
  //     setTitle('');
  //     setDescription('');
  //     setImages([]);
  //   } catch (error) {
  //     console.error('Error saving data:', error.message || error);
  //     setError('Failed to save data. Please try again.');
  //   } 
  // };
  
  
  const handleDelete = async (index) => {
    const entryToDelete = tableData[index];

    const payload = {
      pageName: "Dome",
      sectionName: "VIP Experience",
      fieldName: entryToDelete.title, 
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${baseUrl}/api/content/removeSectionField`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      const result = await response.json();
      console.log("Delete API Response:", result);

      if (result.success) {
  
        setTableData((prevEntries) => prevEntries.filter((_, idx) => idx !== index));
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  
  // const handleEdit = (index) => {
  //   const entry = tableData[index];
  //   setTitle(entry.title);
  //   setDescription(entry.description);
  //   setImages(entry.images || []); 
  //   setIsEditing(true);
  //   setEditingIndex(index);
  // };
  

  
  const uploadImages = async () => {
    const formData = new FormData();
    const section = 'VIP Experience';
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
  
  
  const toggleSectionVisibility = () => {
    setShowSection(!showSection);
  };

    const labels = {
    en: { heading: 'VIP EXPERIENCE', title: 'Title', description: 'Description', submit: 'Submit', upload: 'Upload Images', update: 'Update Entry', show: 'Show', hide: 'Hide', upload: 'Upload Images', image: 'Image', actions: 'Actions', noentries: 'No entries found.',edit: 'Edit', delete: 'Delete' },
    ar: { heading: 'تجربة كبار الشخصيات', title: 'عنوان', description: 'وصف', submit: 'إرسال', upload: 'تحميل الصور', update: 'تحديث', show: 'عرض', hide: 'إخفاء', upload: 'تحميل الصور', image: 'صورة', actions: 'الإجراءات', noentries: 'لم يتم العثور على إدخالات.', edit: 'يحرر', delete: 'يمسح' },
  };

  const getDirection = () => (language === 'ar' ? 'rtl' : 'ltr');

  return (
    <div className={`w-full py-[40px] md:py-[50px] lg:py-[100px] bg-white border-t-2 border-color-200 px-40 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="flex justify-between">
        <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className="mb-4 p-2 text-[#063828]">
          {language === 'en' ? 'التبديل إلى اللغة العربية' : 'Switch to English'}
        </button>
        <button onClick={() => setShowSection(!showSection)} className="mb-4 p-2 text-[#063828]">
          {showSection ? labels[language].hide : labels[language].show}
        </button>
      </div>

      {showSection && (
        <>
        <h1 className="text-4xl text-[#063828] font-black font-orbitron">{labels[language].heading}</h1>
        <div className='flex justify-between'>
            {/* <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{labels[language].title}</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">{labels[language].description}</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="w-full p-2 border border-gray-300 "
            dir={getDirection()}
            rows="3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{labels[language].upload}</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300"
          />
        </div>

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


        <button
          type="submit"
          className="w-full p-4 bg-[#063828] text-white hover:bg-[#063828]"
        >
          {isEditing ? labels[language].update : labels[language].submit}
        </button>
      </form> */}

<form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">{labels[language].title}</label>
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
    <label className="block text-sm font-medium text-gray-700 mb-2">{labels[language].description}</label>
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
    <label className="block text-sm font-medium text-gray-700 mb-2">{labels[language].upload}</label>
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={handleImageUpload}
      className="w-full p-2 border border-gray-300"
    />
  </div>

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

  <button
    type="submit"
    className="w-full p-4 bg-[#063828] text-white hover:bg-[#063828]"
  >
    {isEditing ? labels[language].update : labels[language].submit}
  </button>
</form>


      </div>
{/*     
      <div className='mt-20'>
      
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
          {tableData && tableData.length > 0 ? (
            tableData.map((entry, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{entry.title}</td>
                <td className="p-2 border">{entry.description}</td>
                <td className="p-2 border">
                  {entry.images && entry.images.length > 0 && (
                    <img
                      src={entry.images[0].previewUrl}
                      alt="Entry"
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleEdit(index)}
                    className="mr-2 text-blue-500"
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
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-2">No entries found.</td>
            </tr>
          )}
        </tbody>
      </table>
      </div> */}
      </>
        )}
    </div>
  );
};

export default DashboardVip;



