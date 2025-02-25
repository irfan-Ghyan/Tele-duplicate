
'use client';

import React, { useState, useEffect } from 'react';
import { doPostCall, doGetCall, uploadImageCall, doDeleteCall } from '../../utils/api';
import Image from 'next/image';

const translations = {
  en: {
    switchLang: 'Switch to Arabic',
    hide: 'Hide',
    show: 'Show',
    loading: 'Loading...',
    error: 'Failed to load data. Please try again.',
    domeTitle: 'Venue',
    title: 'Title',
    description: 'Description',
    uploadImages: 'Upload Images',
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
    domeTitle: 'قُبَّة',
    title: 'العنوان',
    description: 'الوصف',
    uploadImages: 'تحميل الصور',
    submit: 'إرسال',
    update: 'تحديث البيانات',
    submittedEntries: 'البيانات المقدمة',
    noEntries: 'لا توجد بيانات.',
    edit: 'تعديل',
    delete: 'حذف',
    actions: 'الإجراءات',
  },
};


const DashboardDomeSection = () => {
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

  const t = translations[language];

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // Image upload handler
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const url = `${baseUrl}/api/content/sections/Home`;
        const response = await doGetCall(url);

        if (!response.ok) {
          throw new Error('Failed to fetch data.');
        }

        const data = await response.json();
        const domeSection = data?.data?.sections.find((section) => section.title === 'Dome');
        if (domeSection) {
          const groupedSlides = domeSection.section_fields.reduce((acc, field) => {
            const match = field.key.match(/(title|description)(\d+)/);
            if (match) {
              const [, type, index] = match;
              if (!acc[index]) acc[index] = { id: index }; 
              acc[index][type] = type === 'image' ? field.value.split(',') : field.value;
            }
            return acc;
          }, {});

          const formattedData = Object.values(groupedSlides).map((entry) => ({
            id: entry.id,
            title: entry.title || '',
            description: entry.description || '',
            images: entry.image || [],
          }));
          setTableData(Object.values(formattedData));
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
  console.log(formData)
  
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
  
  const handleEdit = (index) => {
    const entryToEdit = tableData[index];

    setTitle(entryToEdit.title);
    setDescription(entryToEdit.description);
    setImages(entryToEdit.images || []);
    setEditingIndex(index);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const payload = {
        pageName: 'Home',
        sectionName: 'Dome',
        fields: [
          { fieldName: 'title', fieldValue: title },
          { fieldName: 'description', fieldValue: description },
        ],
      };

      if (isEditing && editingIndex !== null) {
        payload.id = tableData[editingIndex].id;
      }

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/setMultipleFieldValues`;
      const response = await doPostCall(url, payload);
      

      if (!response.ok) {
        throw new Error('Failed to save data to the database.');
      }

      if (images.length > 0) {
        const uploadedImagePaths = await uploadImages();
        payload.images = uploadedImagePaths;
      }

      const result = await response.json();


      if (isEditing && editingIndex !== null) {

        setTableData((prevData) => {
          const updatedData = [...prevData];
          updatedData[editingIndex] = {
            id: payload.id || prevData[editingIndex].id, 
            title,
            description,
            images: payload.images || [],
          };
          return updatedData;
        });
      } else {
        const newEntry = {
          id: result.id,
          title,
          description,
          images: payload.images || [],
        };
        setTableData((prevData) => [...prevData, newEntry]);
      }

      setTitle('');
      setDescription('');
      setImages([]);
      setIsEditing(false);
      setEditingIndex(null);
    } catch (error) {
      console.error('Error saving data:', error);
      setError('Failed to save data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (index) => {
    const entryToDelete = tableData[index];

    try {

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/deleteSection/${entryToDelete.id}`; 
      const response = await doDeleteCall(url, {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      });

      if (!response.ok) {
        throw new Error('Failed to delete entry.');
      }

      setTableData((prevData) => prevData.filter((_, i) => i !== index));

      console.log('Entry deleted successfully.');
    } catch (error) {
      console.error('Error deleting entry:', error);
      setError('Failed to delete entry.');
    }
  };

  

  return (
    <div className={`w-full py-10 bg-gray-200 border-t-2 px-40 ${language === 'ar' ? 'text-right' : 'text-left'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className='bg-white p-20 rounded-lg'>
      <div className="flex justify-between ">
      <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className="mb-4 p-2 text-[#063828]">
          {language === 'en' ? 'التبديل إلى اللغة العربية' : 'Switch to English'}
        </button>
        <button onClick={() => setShowSection(!showSection)} className="mb-4 p-2 text-[#063828]">
          {showSection ? translations[language].hide : translations[language].show}
        </button>
      </div>

      {showSection && (
        <>
          <h1 className="text-4xl text-[#063828] font-black font-orbitron">{t.domeTitle}</h1>

          {loading && <p className="text-blue-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2"> {t.title}</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="w-full p-2 border border-gray-300"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.description}</label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                className="w-full p-2 border border-gray-300"
                rows="3"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2"> {t.uploadImages}</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full"
              />
            </div>

            <button type="submit" className="w-full p-4 text-white bg-[#063828]">
              {isEditing ? 'Update Entry' : 'Submit'}
            </button>
          </form>     

        <div className="mt-20 ">
          {/* <h2 className="text-xl font-bold mb-4">{t.submittedEntries}</h2> */}
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border border-gray-300">{t.title}</th>
                <th className="p-2 border border-gray-300">{t.description}</th>
                <th className="p-2 border border-gray-300">{t.uploadImages}</th>
                <th className="p-2 border border-gray-300">{t.Actions}</th>
              </tr>
            </thead>
            <tbody>
          {tableData.length > 0 ? (
            tableData.map((entry, index) => (
              <tr key={entry.id} className="border border-gray-300">
                <td className="p-2">{entry.title}</td>
                <td className="p-2">{entry.description}</td>
                <td className="p-2">
                  {entry.images.length > 0 ? (
                    entry.images.map((image, i) => (
                      <Image
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
                  <button onClick={() => handleEdit(index)} className="text-blue-500 mr-2">
                  {t.edit}
                  </button>
                  <button onClick={() => handleDelete(index)} className="text-red-500">
                  {t.delete}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-2 text-center text-gray-500">
              {t.noEntries}
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

export default DashboardDomeSection;
