import React, { useState, useEffect } from 'react';
import { doPostCall, uploadImageCall, doGetCall, doDeleteCall } from '../../utils/api';
import Image from 'next/image';

const translations = {
  en: {
    switchLang: 'Switch to Arabic',
    hide: 'Hide',
    show: 'Show',
    loading: 'Loading...',
    error: 'Failed to load data. Please try again.',
    domeTitle: 'Team Building',
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
    domeTitle: 'بناء الفريق',
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

const DashboardBuildingEvents= () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const url = `${baseUrl}/api/content/sections/Corporate Events`;
        const response = await doGetCall(url);

        if (!response.ok) {
          throw new Error('Failed to fetch data.');
        }

        const data = await response.json();
        const domeSection = data?.data?.sections.find(
          (section) => section.title === 'Team Building'
        );
        if (domeSection) {
          const groupedSlides = domeSection.section_fields.reduce((acc, field) => {
            const match = field.key.match(/(title|description)(\d+)/);
            if (match) {
              const [, type, index] = match;
              if (!acc[index]) acc[index] = {};
              acc[index][type] = field.value;
              acc[index][`${type}_meta`] = field.key;
            }
            return acc;
          }, {});

          const firstEntry = Object.values(groupedSlides)[0];
          setTableData(firstEntry ? [firstEntry] : []);
          if (firstEntry) {
            setTitle(firstEntry.title || '');
            setDescription(firstEntry.description || '');
          }
        }
      } catch (error) {
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError('Both title and description are required.');
      return;
    }

    try {
      let uploadedImagePaths = [];
      if (images.length > 0) {
        uploadedImagePaths = await uploadImages();
      }

      const payload = {
        pageName: 'Corporate Events',
        sectionName: 'Team Building',
        fields: [
          { fieldName: tableData[0]?.title_meta || `title1_en`, fieldValue: title, language: 'en' },
          { fieldName: tableData[0]?.description_meta || `description1_en`, fieldValue: description, language: 'en' },
          { fieldName: tableData[0]?.title_meta || `title1_ar`, fieldValue: title, language: 'ar' },
          { fieldName: tableData[0]?.description_meta || `description1_ar`, fieldValue: description, language: 'ar' },
        ],
        images: uploadedImagePaths,
      };

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/setMultipleFieldValues`;

      const response = await doPostCall(url, payload);

      if (!response.ok) {
        throw new Error('Failed to save data to the database.');
      }

      // Update table data and form fields
      const updatedEntry = {
        title,
        description,
        images: uploadedImagePaths,
        title_meta: payload.fields[0].fieldName,
        description_meta: payload.fields[1].fieldName,
      };
      setTableData([updatedEntry]);
      setImages([]);
    } catch (error) {
      setError('Failed to save data. Please try again.');
    }
  };

  const uploadImages = async () => {
    const formData = new FormData();
    const section = 'Team Building';
    const imageName = `${section}_image`;

    images.forEach((image) => {
      formData.append('images[]', image.file);
    });

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
        throw new Error(errorData.message || 'Failed to upload images');
      }

      const result = await response.json();
      return result.file_paths || [];
    } catch (error) {
      throw error;
    }
  };

    const [language, setLanguage] = useState('en');
    const [showSection, setShowSection] = useState(true);
    const t = translations[language];

  return (
    <div className={`w-full py-10 bg-gray-200 border-t-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}
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
      <h1 className="text-4xl text-[#063828] font-black font-orbitron">{t.domeTitle}</h1>

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
            onChange={handleTitleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.Description}</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
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
            className="w-full p-2 border border-gray-300"
          />
        </div>

        <button type="submit" className="w-full p-4 bg-[#00352F] text-white">
          Submit
        </button>
      </form>
      <div className="mt-20">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
            <th className="p-2 border">{t.title}</th>
              <th className="p-2 border">{t.description}</th>
              <th className="p-2 border">{t.images}</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              <tr className="text-center">
                <td className="p-2 border">{tableData[0].title}</td>
                <td className="p-2 border">{tableData[0].description}</td>
                <td className="p-2 border">
                  {tableData[0].images && tableData[0].images.length > 0 && (
                    <Image
                      src={tableData[0].images[0].previewUrl}
                      alt="Entry"
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-2">{t.noEntries}</td>
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

export default DashboardBuildingEvents;

