'use client'

import React, { useState } from 'react';

const DashboardVenueBranding = () => {
  const [title, setTitle] = useState('');
  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showSection, setShowSection] = useState(true);
  const [language, setLanguage] = useState('en');

  // Handle title change
  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      pageName: "Corporateevents",
      sectionName: "Venue Branding",
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
          pageName: "Corporateevents",
          sectionName: "Venue Branding",
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
    en: { heading: 'VENUE BRANDING', title: 'Title', description: 'Description', submit: 'Submit', upload: 'Upload Images', update: 'Update Entry', show: 'Show', hide: 'Hide', upload: 'Upload Images', image: 'Image', actions: 'Actions', noentries: 'No entries found.',edit: 'Edit', delete: 'Delete' },
    ar: { heading: 'العلامة التجارية للمكان', title: 'عنوان', description: 'وصف', submit: 'إرسال', upload: 'تحميل الصور', update: 'تحديث', show: 'عرض', hide: 'إخفاء', upload: 'تحميل الصور', image: 'صورة', actions: 'الإجراءات', noentries: 'لم يتم العثور على إدخالات.', edit: 'يحرر', delete: 'يمسح' },
  };

 const getDirection = () => (language === 'ar' ? 'rtl' : 'ltr');

  return (
    <div className="w-full bg-white p-20 rounded-lg">
      {/* <div className="flex justify-between">
        <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className="mb-4 p-2 text-[#063828]">
          {language === 'en' ? 'التبديل إلى اللغة العربية' : 'Switch to English'}
        </button>
        <button onClick={() => setShowSection(!showSection)} className="mb-4 p-2 text-[#063828]">
          {showSection ? labels[language].hide : labels[language].show}
        </button>
      </div> */}
  

      {showSection && (
        <div className=''>
         <h1 className="text-4xl text-[#063828] font-black font-orbitron">{labels[language].heading}</h1>
        <div className='flex justify-between'> 
      <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-[#00352F] text-white rounded hover:bg-[#00352F]"
        >
          {isEditing ? 'Update Title' : 'Submit Title'}
        </button>
      </form>

      </div>
      {/* <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Submitted Titles</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((entry, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{entry.title}</td>
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
      </div> */}
      </div>
      )}
    </div>
  );
};

export default DashboardVenueBranding;






// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Head from 'next/head';
// import { useTranslation } from 'react-i18next';
// import { getImageCall } from '@/app/utils/api';

// const DomeData = () => {
//   const { t } = useTranslation();
//   const [latestEntry, setLatestEntry] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//       // Fetch the section data
//       const sectionResponse = await fetch(`${baseUrl}/api/content/sections/Corporate Events`);
//       if (!sectionResponse.ok) {
//         throw new Error('Failed to fetch section data from the server.');
//       }

//       const sectionData = await sectionResponse.json();
//       let entry = null;

//       console.log('title', sectionData);
//       if (sectionData.success) {
//         const domeSection = sectionData.data.sections.find((section) => section.title === 'Venues Branding');

//         if (domeSection && domeSection.section_fields) {
//           const latestField = domeSection.section_fields
//             .filter((field) => field.key.startsWith('title'))
//             .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];

//           const descriptionField = domeSection.section_fields.find(
//             (field) => field.key === `description${latestField.key.replace('title', '')}`
//           );

//           if (latestField && descriptionField) {
//             entry = {
//               title: latestField.value,
//               description: descriptionField.value,
//               imageUrl: '', // Placeholder for now
//             };
//           }

//           // Fetch the image data dynamically
//           const imageResponse = await getImageCall(`${baseUrl}/api/content/getImages/Venues Branding`);
//           if (imageResponse.ok) {
//             const imageData = await imageResponse.json();
//             if (imageData.success && imageData.data.length > 0) {
//               entry.imageUrl = imageData.data[0].url;
//             }
//           }

//           setLatestEntry(entry);  // Update state with all data together
//         }
//       }
//     } catch (err) {
//       setError(err.message || 'An error occurred while fetching data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Head>
//         <link rel="preload" href={latestEntry?.imageUrl || '/assets/images/dome/default-image.jpg'} as="image" />
//       </Head>

//       <div
//         className="relative w-full max-w-full overflow-hidden h-[750px] sm:h-[600px] md:h-[500px] lg:h-[600px] xl:h-[785px] bg-cover bg-right lg:bg-center px-4 md:px-0"
//         style={{
//           backgroundImage: latestEntry?.imageUrl
//             ? `url(${latestEntry.imageUrl})`
//             : `url('http://192.168.70.219:8000/storage/images/Gaming Room/Gaming Room_image_0.jpg')`,
//         }}
//       >
//         <div className="w-full bg-[#11072C] bg-opacity-60 lg:bg-opacity-0 md:bg-opacity-0 xl:bg-opacity-0 px-4">
//           <div className="bottom-0 px-4 md:flex md:flex-col md:pr-6 py-[25px] lg:py-[100px] max-w-7xl mx-auto mt-[200px] sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0">
//             <div className="px-4 flex flex-col justify-between md:mt-[36px] md:mb-[41px]">
//               {loading && (
//                 <div className="text-center text-[#e3ce90] font-bold text-xl">
//                   {t('Loading...')}
//                 </div>
//               )}

//               {error && (
//                 <div className="text-center text-red-500 font-bold text-xl">
//                   {t('Error:')} {error}
//                 </div>
//               )}

//               {!loading && !error && latestEntry?.title && latestEntry?.description && (
//                 <div className="py-[15px] lg:py-[30px] xl:pt-[70px] lg:mt-[0px]">
//                   <h1 className="text-[34px] md:text-[54px] text-[#e3ce90] font-black font-orbitron drop-shadow-4xl">
//                   {latestEntry?.title || 'No title available'}
//                   </h1>
//                   <p className="md:w-[400px] lg:w-[550px] xl:w-[600px] md:text-[14px] lg:text-[18px] text-[#e3ce90] font-bold font-jura mt-6 text-balance drop-shadow-4xl text-justify">
//                   {latestEntry?.description || 'No description available'}
//                   </p>
//                 </div>
//               )}


//               <div className="flex items-start m-bottom">
//                 <div className="py-10">
//                   <Link href="/experience" className="button-slanted w-[200px] lg:w-[233px] h-[44px] px-8 py-6 button font-jura font-bold bg-gradient-to-r from-[#c09e5f] to-[#e3ce90] text-[#002718] ml-2 transition duration-300 rounded-tl-lg rounded-br-lg flex items-center justify-center">
//                     <span className="button-slanted-content">{t('VIEW_OPTIONS')}</span>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DomeData;
