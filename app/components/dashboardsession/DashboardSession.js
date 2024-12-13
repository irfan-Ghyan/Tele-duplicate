


import React, { useState, useEffect } from 'react';
import {doPostCall} from '../../utils/api';

const DashboardExperience = () => {
  const [language, setLanguage] = useState('en');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showSection, setShowSection] = useState(true);

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

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://192.168.70.136:8000/api/content/sections/Experience');
  //       if (!response.ok) throw new Error('Network response was not ok');
        
  //       const data = await response.json();
  //       const sections = data?.data?.sections || [];

  //       const domeSection = sections.find((section) => section.title === 'Session');
  //       if (domeSection) {
  //         const titleField = domeSection.section_fields.find((field) => field.key === 'title');
  //         const descriptionField = domeSection.section_fields.find((field) => field.key === 'description');
  //         setTitle(titleField?.value || '');
  //         setDescription(descriptionField?.value || '');

  //         const sectionData = sections.map((section) => ({
  //           title: section.section_fields.find((field) => field.key === 'title')?.value || '',
  //           description: section.section_fields.find((field) => field.key === 'description')?.value || '',
  //         }));
  //         setTableData(sectionData);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      pageName: 'Experience',
      sectionName: 'Session',
      fields: [
        { fieldName: 'title', fieldValue: title },
        { fieldName: 'description', fieldValue: description },
      ],
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/setMultipleFieldValues`;
      const response = await doPostCall(url, payload);
      // const response = await fetch('http://192.168.70.136:8000/api/content/setMultipleFieldValues', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // });

      if (!response.ok) throw new Error('Failed to save data to the database.');

      const result = await response.json();
      console.log('Data saved successfully:', result);

      if (isEditing) {
        setTableData((prevData) =>
          prevData.map((entry, index) =>
            index === editingIndex ? { title, description } : entry
          )
        );
      } else {
        setTableData((prevData) => [...prevData, { title, description }]);
      }

      // Clear form fields after submission
      setTitle('');
      setDescription('');
      setImages([]);
      setIsEditing(false);
      setEditingIndex(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const labels = {
    en: { heading: 'Sessions', title: 'Title', description: 'Description', submit: 'Submit', update: 'Update Entry', show: 'Show', hide: 'Hide', upload: 'Upload Images' },
    ar: { heading: 'الجلسات', title: 'عنوان', description: 'وصف', submit: 'إرسال', update: 'تحديث', show: 'عرض', hide: 'إخفاء', upload: 'تحميل الصور' },
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

            <button type="submit" className="w-full p-4 bg-[#A62ED1] text-white hover:bg-[#A62ED1]">
              {isEditing ? labels[language].update : labels[language].submit}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default DashboardExperience;

