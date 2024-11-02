

// 'use client';

// import React, { useState, useEffect } from 'react';

// const DashboardDomeSection = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [images, setImages] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://192.168.70.151:8000/api/content/sections/Home');
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         const sections = data?.data?.sections || [];

//         const domeSection = sections.find(section => section.title === "Dome");

//         // console.log(domeSection);

//         if (domeSection) {
//           const titleField = domeSection.section_fields.find(field => field.key === 'title');
//           const descriptionField = domeSection.section_fields.find(field => field.key === 'description');

//           setTitle(titleField?.value || '');
//           setDescription(descriptionField?.value || '');
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleTitleChange = (e) => setTitle(e.target.value);
//   const handleDescriptionChange = (e) => setDescription(e.target.value);

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files.map((file) => {
//       return {
//         file,
//         previewUrl: URL.createObjectURL(file),
//       };
//     });
//     setImages((prevImages) => [...prevImages, ...newImages]);
//   };

//   const handleRemoveImage = (index) => {
//     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   const handleSubmit = (e) => {

//     console.log(e.target.value);
//     e.preventDefault();
 
//     const newEntry = {
//       title,
//       description,
//       images,
//     };

//     if (isEditing) {
//       const updatedData = [...tableData];
//       updatedData[editingIndex] = newEntry;
//       setTableData(updatedData);
//       setIsEditing(false);
//       setEditingIndex(null);
//     } else {
//       setTableData([...tableData, newEntry]);
//     }

//     setTitle('');
//     setDescription('');
//     setImages([]);
//   };

//   const handleEdit = (index) => {
//     const entry = tableData[index];
//     setTitle(entry.title);
//     setDescription(entry.description);
//     setImages(entry.images);
//     setIsEditing(true);
//     setEditingIndex(index);
//   };

//   const handleDelete = (index) => {
//     setTableData((prevData) => prevData.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="w-full py-[40px] md:py-[50px] lg:py-[100px] bg-white border-t-2 border-color-200 px-40">
//       <h1 className="text-4xl text-black font-black font-orbitron">DOME</h1>
//       <div className='flex justify-between'>
//         <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={handleTitleChange}
//               className="w-full p-2 border border-gray-300"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//             <textarea
//               value={description}
//               onChange={handleDescriptionChange}
//               className="w-full p-2 border border-gray-300"
//               rows="3"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleImageUpload}
//               className="w-full p-2 border border-gray-300"
//             />
//           </div>

//           <div className="mb-4 grid grid-cols-3 gap-4">
//             {images.map((img, index) => (
//               <div key={index} className="relative">
//                 <img src={img.previewUrl} alt="Preview" className="w-full h-24 object-cover rounded" />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveImage(index)}
//                   className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
//                 >
//                   &times;
//                 </button>
//               </div>
//             ))}
//           </div>

//           <button
//             type="submit"
//             className="w-full p-4 bg-[#A62ED1]  text-white hover:bg-[#A62ED1]"
//           >
//             {isEditing ? 'Update Entry' : 'Submit'}
//           </button>
//         </form>

//         <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">عنوان</label>
//             <input
//               type="text"
//               value={title}
//               onChange={handleTitleChange}
//               className="w-full p-2 border border-gray-300"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">وصف</label>
//             <textarea
//               value={description}
//               onChange={handleDescriptionChange}
//               className="w-full p-2 border border-gray-300"
//               rows="3"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">تحميل الصور</label>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleImageUpload}
//               className="w-full p-2 border border-gray-300"
//             />
//           </div>

//           <div className="mb-4 grid grid-cols-3 gap-4">
//             {images.map((img, index) => (
//               <div key={index} className="relative">
//                 <img src={img.previewUrl} alt="Preview" className="w-full h-24 object-cover rounded" />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveImage(index)}
//                   className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
//                 >
//                   &times;
//                 </button>
//               </div>
//             ))}
//           </div>

//           <button
//             type="submit"
//             className="w-full p-4 bg-[#A62ED1]  text-white hover:bg-[#A62ED1]"
//           >
//             {isEditing ? 'Update Entry' : 'يُقدِّم'}
//           </button>
//         </form>
//       </div>

//       <div className='mt-20'>
//         <h2 className="text-xl font-bold mb-4">Submitted Entries</h2>
//         <table className="w-full border border-gray-300 text-center">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 border border-gray-300">Title</th>
//               <th className="p-2 border border-gray-300">Description</th>
//               <th className="p-2 border border-gray-300">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((entry, index) => (
//               <tr key={index} className="border border-gray-300">
//                 <td className="p-2">{entry.title}</td>
//                 <td className="p-2">{entry.description}</td>
//                 <td className="p-2">
//                   <button onClick={() => handleEdit(index)} className="text-blue-500 mr-2">Edit</button>
//                   <button onClick={() => handleDelete(index)} className="text-red-500">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DashboardDomeSection;


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.70.151:8000/api/content/sections/Home');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      title,
      description,
      images,
    };

    if (isEditing) {
      const updatedData = [...tableData];
      updatedData[editingIndex] = newEntry;
      setTableData(updatedData);
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      setTableData([...tableData, newEntry]);
    }

    setTitle('');
    setDescription('');
    setImages([]);
  };

  const handleEdit = (index) => {
    const entry = tableData[index];
    setTitle(entry.title);
    setDescription(entry.description);
    setImages(entry.images);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setTableData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const toggleSectionVisibility = () => {
    setShowSection(!showSection);
  };

  return (
    <div className="w-full py-[40px] md:py-[50px] lg:py-[100px] bg-white border-t-2 border-color-200 px-40">
      <div className="flex justify-end">
  <button
    onClick={toggleSectionVisibility}
    className="mb-4 p-2 text-[#A62ED1]"
  >
    {showSection ? 'Hide' : 'Show'}
  </button>
</div>


      {showSection && (
        <>
          <h1 className="text-4xl text-black font-black font-orbitron">Dome</h1>
          <div className="flex justify-between">
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
                  className="w-full p-2 border border-gray-300"
                  rows="3"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full p-4 bg-[#A62ED1]  text-white hover:bg-[#A62ED1]"
              >
                {isEditing ? 'Update Entry' : 'Submit'}
              </button>
            </form>

            <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">سؤال</label>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full p-2 border border-gray-300"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">إجابة</label>
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  className="w-full p-2 border border-gray-300"
                  rows="3"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full p-4 bg-[#A62ED1]  text-white hover:bg-[#A62ED1]"
              >
                {isEditing ? 'تحديث"' : 'يُقدِّم"'}
              </button>
            </form>

          </div>

          <div className="mt-20">
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
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardDomeSection;
