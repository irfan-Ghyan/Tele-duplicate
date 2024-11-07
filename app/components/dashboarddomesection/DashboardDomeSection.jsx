'use client';

import React, { useState, useEffect } from 'react';

const DashboardDomeSection = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showSection, setShowSection] = useState(true);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.70.136:8000/api/content/sections/Home');
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const sections = data?.data?.sections || [];

        const domeSection = sections.find(section => section.title === "Dome");

        if (domeSection) {
          const titleField = domeSection.section_fields.find(field => field.key === 'title');
          const descriptionField = domeSection.section_fields.find(field => field.key === 'description');

          setTitle(titleField?.value || '');
          setDescription(descriptionField?.value || '');
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      pageName: "Home",
      sectionName: "Dome",
      fields: [
        {
          fieldName: "title",
          fieldValue: title,
        },
        {
          fieldName: "description",
          fieldValue: description,
        },
      ],
    };
  
    try {
      const response = await fetch("http://192.168.70.136:8000/api/content/setMultipleFieldValues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save data to the database.");
      }
  
      const result = await response.json();
      console.log("Data saved successfully:", result);
  
      setTitle("");
      setDescription("");
      setImages([]);
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


  const labels = {
    en: { heading: 'DOME', title: 'Title', description: 'Description', submit: 'Submit', update: 'Update Entry', show: 'Show', hide: 'Hide', upload: 'Upload Images' },
    ar: { heading: 'اقبة', title: 'عنوان', description: 'وصف', submit: 'إرسال', update: 'تحديث', show: 'عرض', hide: 'إخفاء', upload: 'تحميل الصور' },
  };

  const getDirection = () => (language === 'ar' ? 'rtl' : 'ltr');

  return (
    <div className={`w-full py-[40px] md:py-[50px] lg:py-[100px] bg-white border-t-2 border-color-200 px-40 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="flex justify-between">
        <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className="mb-4 p-2 text-[#A62ED1]">
          {language === 'en' ? 'التبديل إلى اللغة العربية' : 'Switch to English'}
        </button>
        <button onClick={() => setShowSection(!showSection)} className="mb-4 p-2 text-[#A62ED1]">
          {showSection ? labels[language].hide : labels[language].show}
        </button>
      </div>


      {showSection && (
        <>
          <h1 className="text-4xl text-black font-black font-orbitron">{labels[language].heading}</h1>
          <div className="flex justify-between">
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

              <button
                type="submit"
                className="w-full p-4 bg-[#A62ED1]  text-white hover:bg-[#A62ED1]"
              >
                {isEditing ? labels[language].update : labels[language].submit}
              </button>
            </form>


          </div>

          {/* <div className="mt-20">
            <h2 className="text-xl font-bold mb-4">Submitted Entries</h2>
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border border-gray-300">Title</th>
                  <th className="p-2 border border-gray-300">Description</th>
                  <th className="p-2 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((entry, index) => (
                  <tr key={index} className="border border-gray-300">
                    <td className="p-2">{entry.title}</td>
                    <td className="p-2">{entry.description}</td>
                    <td className="p-2">
                      <button onClick={() => handleEdit(index)} className="text-blue-500 mr-2">Edit</button>
                      <button onClick={() => handleDelete(index)} className="text-red-500">Delete</button>
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

export default DashboardDomeSection;
