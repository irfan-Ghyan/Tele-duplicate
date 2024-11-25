'use client';

import React, { useState, useEffect } from 'react';
import { doPostCall, doGetCall } from '../../utils/api';

const DashboardDomeSection = () => {
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


  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://192.168.70.205:8000/api/content/sections/Home';
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
              if (!acc[index]) acc[index] = {};
              acc[index][type] = field.value;
            }
            return acc;
          }, {});

          setSlides(Object.values(groupedSlides));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const uploadImages = async () => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`image${index}`, image.file);
    });
    formData.append("section", "dome");
    formData.append("imageName", title);
  
    const url = "http://192.168.70.205:8000/api/content/uploadImages";
    const response = await doPostCall(url, formData);
  
    if (!response.ok) throw new Error("Failed to upload images.");
  
    const result = await response.json();
    console.log("Images uploaded successfully:", result);
    return result.file_paths;
  };



  // const handleImageUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   console.log(files); 
  //   const newImages = files.map((file) => ({
  //     file,
  //     previewUrl: URL.createObjectURL(file),
  //   }));
  //   setImages((prevImages) => [...prevImages, ...newImages]);
  // };
  

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
    
      const payload = {
        pageName: "Home",
        sectionName: "Dome",
        fields: [
          { fieldName: "title", fieldValue: title },
          { fieldName: "description", fieldValue: description },
        ],
      };
  
      if (images.length > 0) {
        const uploadedImagePaths = await uploadImages();
        payload.images = uploadedImagePaths;
      }
  
      const url = "http://192.168.70.205:8000/api/content/setMultipleFieldValues";
      const response = await doPostCall(url, payload);
  
      if (!response.ok) {
        throw new Error("Failed to save data to the database.");
      }
  
      const result = await response.json();
      console.log("Data saved successfully:", result);
  
      const newEntry = {
        title,
        description,
        images: payload.images || [],
      };
  
      setTableData((prevData) => [...prevData, newEntry]);

      setTitle("");
      setDescription("");
      setImages([]);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  
  const labels = {
    en: { heading: 'DOME', title: 'Title', description: 'Description', submit: 'Submit', update: 'Update Entry', show: 'Show', hide: 'Hide', upload: 'Upload Images' },
    ar: { heading: 'اقبة', title: 'عنوان', description: 'وصف', submit: 'إرسال', update: 'تحديث', show: 'عرض', hide: 'إخفاء', upload: 'تحميل الصور' },
  };

  const getDirection = () => (language === 'ar' ? 'rtl' : 'ltr');


  const handleEdit = (index) => {
    const entryToEdit = tableData[index];
  
    // Populate the form fields with the selected entry's values
    setTitle(entryToEdit.title);
    setDescription(entryToEdit.description);
    setImages(entryToEdit.images.map((img) => ({ file: null, previewUrl: img })));
    setIsEditing(true);
    setEditingIndex(index);
  };

  const handleDelete = async (index) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this entry?");
      if (!confirmed) return;
  
      const entryToDelete = tableData[index];
  
      const payload = {
        pageName: "Home",
        sectionName: "Dome",
        fieldName: entryToDelete.title,
      };
  
      const url = "http://192.168.70.205:8000/api/content/removeSectionField";
      const response = await doPostCall(url, payload);
  
      if (!response.ok) {
        throw new Error("Failed to delete entry from the server.");
      }
  
      const result = await response.json();
      if (result.success) {
        // Remove the entry from the table
        setTableData((prevData) => prevData.filter((_, i) => i !== index));
        console.log("Entry deleted successfully:", result);
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };
  

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    try {
      const updatedEntry = {
        title,
        description,
        images: images.map((img) => img.previewUrl),
      };
  
      const payload = {
        pageName: "Home",
        sectionName: "Dome",
        fields: [
          { fieldName: "title", fieldValue: updatedEntry.title },
          { fieldName: "description", fieldValue: updatedEntry.description },
        ],
      };
  
      const url = "http://192.168.70.211:8000/api/content/setMultipleFieldValues";
      const response = await doPostCall(url, payload);
  
      if (!response.ok) {
        throw new Error("Failed to update entry.");
      }
  
      const result = await response.json();
      console.log("Entry updated successfully:", result);
  
      // Update the table data
      setTableData((prevData) =>
        prevData.map((entry, i) => (i === editingIndex ? updatedEntry : entry))
      );
  
      // Reset form and editing state
      setTitle("");
      setDescription("");
      setImages([]);
      setIsEditing(false);
      setEditingIndex(null);
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  return (
    <>
    <div className={`w-full py-10 bg-white border-t-2 px-40 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
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
                className="w-full"
              />
            </div>

            <div className="mb-4 flex flex-wrap gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image.previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded" />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <button
  type="submit"
  className="w-full p-4 text-white bg-[#063828]"
>
  {isEditing ? "Update Entry" : "Submit"}
</button>

            {/* <button
              type="submit"
              className="w-full p-4 text-white bg-[#063828]"
            >
              {isEditing ? labels[language].update : labels[language].submit}
            </button> */}
          </form>
        </>
      )}
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
        {entry.images.length > 0 ? (
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
    
  </>
  );
};

export default DashboardDomeSection;
