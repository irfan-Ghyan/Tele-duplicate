// 'use client';

// import React, { useState } from 'react';
// import { doPostCall, doDeleteCall } from '../../utils/api';

// const DashboardExperience = () => {
//   const [language, setLanguage] = useState('en');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [images, setImages] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [showSection, setShowSection] = useState(true);
//   const [editingIndex, setEditingIndex] = useState(null);

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

//   const handleRemoveImage = (index) => {
//     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newEntry = {
//       title,
//       description,
//       images: images.map((img) => img.previewUrl),
//     };

//     const newIndex = editingIndex === null ? tableData.length + 1 : editingIndex;
//     const payload = {
//       pageName: 'Experience',
//       sectionName: 'Session',
//       fields: [
//         { fieldName: `title${newIndex}`, fieldValue: title },
//         { fieldName: `description${newIndex}`, fieldValue: description },
//       ],
//     };

//     try {
//       const url = "http://192.168.70.211:8000/api/content/setMultipleFieldValues";
//       const response = await doPostCall(url, payload);

//       if (!response.ok) throw new Error('Failed to save data to the database.');
//       const result = await response.json();
//       console.log('Data saved successfully:', result);

//       if (editingIndex === null) {
//         setTableData((prevData) => [...prevData, { ...newEntry, key: `title${newIndex}` }]);
//       } else {
//         setTableData((prevData) =>
//           prevData.map((entry, index) =>
//             index === editingIndex ? { ...newEntry, key: `title${newIndex}` } : entry
//           )
//         );
//       }

//       setTitle('');
//       setDescription('');
//       setImages([]);
//       setEditingIndex(null);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleEdit = (keyId) => {
//     const entryToEdit = tableData.find((entry) => entry.key === keyId);
//     if (entryToEdit) {
//       setTitle(entryToEdit.title);
//       setDescription(entryToEdit.description);
//       setImages(entryToEdit.images.map((imgUrl) => ({ previewUrl: imgUrl })));
//       setEditingIndex(keyId);
//     }
//   };

//   const handleDelete = async (keyId) => {
//     try {
//       const payload = {
//         pageName: "Experience",
//         sectionName: "Session",
//         fieldName: keyId,
//       };

//       const url = "http://192.168.70.211:8000/api/content/removeSectionField";
//       const response = await doDeleteCall(url, payload);

//       if (!response.ok) throw new Error("Failed to delete data");
//       const result = await response.json();
//       console.log("Delete API Response:", result);

//       if (result.success) {
//         setTableData((prevEntries) => prevEntries.filter((entry) => entry.key !== keyId));
//       }
//     } catch (error) {
//       console.error("Error deleting data:", error);
//     }
//   };

//   const labels = {
//     en: { heading: 'Sessions', title: 'Title', description: 'Description', submit: 'Submit', show: 'Show', hide: 'Hide', upload: 'Upload Images', edit: 'Edit', delete: 'Delete', actions: 'Actions' },
//     ar: { heading: 'الجلسات', title: 'عنوان', description: 'وصف', submit: 'إرسال', show: 'عرض', hide: 'إخفاء', upload: 'تحميل الصور', edit: 'يحرر', delete: 'يمسح', actions: 'الإجراءات' },
//   };

//   const getDirection = () => (language === 'ar' ? 'rtl' : 'ltr');

//   return (
//     <div className={`w-full py-10 px-40 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
//       <div className="flex justify-between">
//         <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className="mb-4 p-2 text-[#A62ED1]">
//           {language === 'en' ? 'التبديل إلى اللغة العربية' : 'Switch to English'}
//         </button>
//         <button onClick={() => setShowSection(!showSection)} className="mb-4 p-2 text-[#A62ED1]">
//           {showSection ? labels[language].hide : labels[language].show}
//         </button>
//       </div>

//       {showSection && (
//         <>
//           <h1 className="text-4xl text-black font-black">{labels[language].heading}</h1>
//           <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">{labels[language].title}</label>
//               <input type="text" value={title} onChange={handleTitleChange} className="w-full p-2 border border-gray-300" dir={getDirection()} required />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">{labels[language].description}</label>
//               <textarea value={description} onChange={handleDescriptionChange} className="w-full p-2 border border-gray-300" dir={getDirection()} rows="3" required />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">{labels[language].upload}</label>
//               <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="w-full p-2 border border-gray-300" />
//             </div>
//             <button type="submit" className="w-full p-4 bg-[#A62ED1] text-white">{labels[language].submit}</button>
//           </form>

//           <table className="w-full border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-2 border border-gray-300">{labels[language].title}</th>
//                 <th className="p-2 border border-gray-300">{labels[language].description}</th>
//                 <th className="p-2 border border-gray-300">{labels[language].actions}</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((entry, index) => (
//                 <tr key={index} className="border border-gray-300">
//                   <td className="p-2">{entry.title}</td>
//                   <td className="p-2">{entry.description}</td>
//                   <td className="p-2">
//                     <button onClick={() => handleEdit(entry.key)} className="mr-2 text-blue-500 hover:underline">{labels[language].edit}</button>
//                     <button onClick={() => handleDelete(entry.key)} className="text-red-500 hover:underline">{labels[language].delete}</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// };

// export default DashboardExperience;


'use client';

import React, { useState } from 'react';
import { doPostCall, doDeleteCall } from '../../utils/api';

const DashboardExperience = () => {
  const [language, setLanguage] = useState('en');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showSection, setShowSection] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEntry = {
      title,
      description,
      images: images.map((img) => img.previewUrl),
    };

    const newIndex = editingIndex === null ? tableData.length + 1 : editingIndex;
    const payload = {
      pageName: 'Experience',
      sectionName: 'Session',
      fields: [
        { fieldName: `title${newIndex}`, fieldValue: title },
        { fieldName: `description${newIndex}`, fieldValue: description },
      ],
    };

    try {
      const url = "http://192.168.70.211:8000/api/content/setMultipleFieldValues";
      const response = await doPostCall(url, payload);

      if (!response.ok) throw new Error('Failed to save data to the database.');
      const result = await response.json();
      console.log('Data saved successfully:', result);

      if (editingIndex === null) {
        setTableData((prevData) => [...prevData, { ...newEntry, key: `title${newIndex}` }]);
      } else {
        setTableData((prevData) =>
          prevData.map((entry, index) =>
            index === editingIndex ? { ...newEntry, key: `title${newIndex}` } : entry
          )
        );
      }

      setTitle('');
      setDescription('');
      setImages([]);
      setEditingIndex(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (keyId) => {
    const entryToEdit = tableData.find((entry) => entry.key === keyId);
    if (entryToEdit) {
      setTitle(entryToEdit.title);
      setDescription(entryToEdit.description);
      setImages(entryToEdit.images.map((imgUrl) => ({ previewUrl: imgUrl })));
      setEditingIndex(keyId);
    }
  };

  const handleDelete = async (keyId) => {
    try {
      const payload = {
        pageName: "Experience",
        sectionName: "Session",
        fieldName: keyId,
      };

      const url = "http://192.168.70.211:8000/api/content/removeSectionField";
      const response = await doDeleteCall(url, payload);

      if (!response.ok) throw new Error("Failed to delete data");
      const result = await response.json();
      console.log("Delete API Response:", result);

      if (result.success) {
        setTableData((prevEntries) => prevEntries.filter((entry) => entry.key !== keyId));
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const labels = {
    en: { heading: 'Sessions', title: 'Title', description: 'Description', submit: 'Submit', show: 'Show', hide: 'Hide', upload: 'Upload Images', edit: 'Edit', delete: 'Delete', actions: 'Actions' },
    ar: { heading: 'الجلسات', title: 'عنوان', description: 'وصف', submit: 'إرسال', show: 'عرض', hide: 'إخفاء', upload: 'تحميل الصور', edit: 'يحرر', delete: 'يمسح', actions: 'الإجراءات' },
  };

  const getDirection = () => (language === 'ar' ? 'rtl' : 'ltr');

  return (
    <div className={`w-full py-10 px-40 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
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
          <h1 className="text-4xl text-[#002718] font-black">{labels[language].heading}</h1>
          <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{labels[language].title}</label>
              <input type="text" value={title} onChange={handleTitleChange} className="w-full p-2 border border-gray-300" dir={getDirection()} required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{labels[language].description}</label>
              <textarea value={description} onChange={handleDescriptionChange} className="w-full p-2 border border-gray-300" dir={getDirection()} rows="3" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{labels[language].upload}</label>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="w-full p-2 border border-gray-300" />
            </div>
            <button type="submit" className="w-full p-4 bg-[#063828] text-white">{labels[language].submit}</button>
          </form>

          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border border-gray-300">{labels[language].title}</th>
                <th className="p-2 border border-gray-300">{labels[language].description}</th>
                <th className="p-2 border border-gray-300">Images</th> {/* Added Image column */}
                <th className="p-2 border border-gray-300">{labels[language].actions}</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((entry, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="p-2">{entry.title}</td>
                  <td className="p-2">{entry.description}</td>
                  <td className="p-2">
                    {/* Display images */}
                    {entry.images.length > 0 ? (
                      entry.images.map((image, i) => (
                        <img key={i} src={image} alt={`Image ${i}`} className="w-12 h-12 object-cover mr-2" />
                      ))
                    ) : (
                      <span>No images</span>
                    )}
                  </td>
                  <td className="p-2">
                    <button onClick={() => handleEdit(entry.key)} className="mr-2 text-blue-500 hover:underline">{labels[language].edit}</button>
                    <button onClick={() => handleDelete(entry.key)} className="text-red-500 hover:underline">{labels[language].delete}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default DashboardExperience;
