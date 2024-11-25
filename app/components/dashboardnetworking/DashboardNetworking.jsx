'use client'

import React, { useState } from 'react';

const DashboardNetworking = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showSection, setShowSection] = useState(true);
    const [language, setLanguage] = useState('en');


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


  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   const newEntry = {
  //     title,
  //     description,
  //     images,
  //   };

  //   if (isEditing) {
   
  //     const updatedData = [...tableData];
  //     updatedData[editingIndex] = newEntry;
  //     setTableData(updatedData);
  //     setIsEditing(false);
  //     setEditingIndex(null);
  //   } else {
  //     // Add new entry to table
  //     setTableData([...tableData, newEntry]);
  //   }

  //   // Clear form fields
  //   setTitle('');
  //   setDescription('');
  //   setImages([]);
  // };

  // Handle edit action
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      pageName: "CopporateEvents",
      sectionName: "Team Building",
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
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${baseUrl}/api/content/setMultipleFieldValues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageName: "CopporateEvents",
          sectionName: "Team Building",
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
  const labels = {
    en: { heading: 'NETWORKING', title: 'Title', description: 'Description', submit: 'Submit', upload: 'Upload Images', update: 'Update Entry', show: 'Show', hide: 'Hide', upload: 'Upload Images', image: 'Image', actions: 'Actions', noentries: 'No entries found.',edit: 'Edit', delete: 'Delete' },
    ar: { heading: 'الشبكات', title: 'عنوان', description: 'وصف', submit: 'إرسال', upload: 'تحميل الصور', update: 'تحديث', show: 'عرض', hide: 'إخفاء', upload: 'تحميل الصور', image: 'صورة', actions: 'الإجراءات', noentries: 'لم يتم العثور على إدخالات.', edit: 'يحرر', delete: 'يمسح' },
  };

 const getDirection = () => (language === 'ar' ? 'rtl' : 'ltr');

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
    <div className={`w-full py-[40px] md:py-[50px] lg:py-[100px]px-40 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
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
          className="w-full p-4 bg-[#063828] text-white hover:bg-[#063828]"
        >
          {isEditing ? 'Update Entry' : 'Submit'}
        </button>
      </form>

      </div>
      

      
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
      </>
      )}
    </div>
  );
};

export default DashboardNetworking;
