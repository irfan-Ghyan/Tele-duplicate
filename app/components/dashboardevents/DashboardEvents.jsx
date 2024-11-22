import React, { useState, useEffect } from 'react';
import {doPostCall} from '../../utils/api';

const DashboardEvents = () => {
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


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://192.168.70.136:8000/api/content/sections/Dome');
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       const sections = data?.data?.sections || [];

  //       const domeSection = sections.find(section => section.title === "SIM Configurator");

  //       if (domeSection) {
  //         const titleField = domeSection.section_fields.find(field => field.key === 'title');
  //         const descriptionField = domeSection.section_fields.find(field => field.key === 'description');

  //         setTitle(titleField?.value || '');
  //         setDescription(descriptionField?.value || '');

  //         // Populate tableData with each section's title and description
  //         const sectionData = sections.map((section) => ({
  //           title: section.section_fields.find(field => field.key === 'title')?.value || '',
  //           description: section.section_fields.find(field => field.key === 'description')?.value || '',
  //         }));

  //         setTableData(sectionData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      pageName: "Dome",
      sectionName: "SIM Configurator",
      fields: [
        { fieldName: "title", fieldValue: title },
        { fieldName: "description", fieldValue: description },
      ],
    };
  
    try {
      const url = "http://192.168.70.211:8000/api/content/setMultipleFieldValues";
      const response = await doPostCall(url, payload);
  
      if (!response.ok) throw new Error("Failed to save data to the database.");
  
      const result = await response.json();
      console.log("Data saved successfully:", result);
  
  
      if (isEditing) {
        setTableData((prevData) =>
          prevData.map((entry, index) =>
            index === editingIndex ? { title, description } : entry
          )
        );
      } else {
      
        setTableData((prevData) => [...prevData, { title, description }]);
      }
  
      setTitle("");
      setDescription("");
      setImages([]);
      setIsEditing(false);
      setEditingIndex(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleDelete = async (index) => {
  //   const entryToDelete = tableData[index];

  //   const payload = {
  //     pageName: "Dome",
  //     sectionName: "SIM Configurator",
  //     fieldName: entryToDelete.title, 
  //   };

  //   try {
  //     const response = await fetch("http://192.168.70.136:8000/api/content/removeSectionField", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to delete data");
  //     }

  //     const result = await response.json();
  //     console.log("Delete API Response:", result);

  //     if (result.success) {
  
  //       setTableData((prevEntries) => prevEntries.filter((_, idx) => idx !== index));
  //     }
  //   } catch (error) {
  //     console.error("Error deleting data:", error);
  //   }
  // };
  
  const handleEdit = (index) => {
    const entry = tableData[index];
    setTitle(entry.title);
    setDescription(entry.description);
    setImages(entry.images || []); 
    setIsEditing(true);
    setEditingIndex(index);
  };
  
  
  
  const toggleSectionVisibility = () => {
    setShowSection(!showSection);
  };

  const labels = {
    en: { heading: 'Virtual GP', title: 'Title', description: 'Description', submit: 'Submit', upload: 'Upload Images', update: 'Update Entry', show: 'Show', hide: 'Hide', upload: 'Upload Images', image: 'Image', actions: 'Actions', noentries: 'No entries found.',edit: 'Edit', delete: 'Delete' },
    ar: { heading: 'سباق الجائزة الكبرى الظاهري', title: 'عنوان', description: 'وصف', submit: 'إرسال', upload: 'تحميل الصور', update: 'تحديث', show: 'عرض', hide: 'إخفاء', upload: 'تحميل الصور', image: 'صورة', actions: 'الإجراءات', noentries: 'لم يتم العثور على إدخالات.', edit: 'يحرر', delete: 'يمسح' },
  };

  const getDirection = () => (language === 'ar' ? 'rtl' : 'ltr');

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
          {isEditing ? labels[language].update : labels[language].submit}
        </button>
      </form>

      </div>
    
      {/* <div className='mt-20'>
      
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

export default DashboardEvents;



