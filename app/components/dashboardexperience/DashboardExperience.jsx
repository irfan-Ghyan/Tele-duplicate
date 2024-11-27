

// import React, { useState, useEffect } from 'react';
// import { doPostCall, doDeleteCall } from '../../utils/api';

// const DashboardExperience = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [tableData, setTableData] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(false);


//   // Fetch table data from backend on component mount
//   useEffect(() => {
//     fetchTableData();
//   }, []);

//   const fetchTableData = async () => {
//     try {
//       const url = 'http://192.168.70.249:8000/api/content/sections/Experience';
//       const response = await fetch(url);
  
//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           const sessionData = data.data.sections.find((section) => section.title === 'Session');
//           if (sessionData) {
//             const formattedData = sessionData.section_fields.reduce((acc, field) => {
//               const match = field.key.match(/(title|description)(\d+)/);
//               if (match) {
//                 const [, type, index] = match;
//                 if (!acc[index]) acc[index] = { key: index };
//                 acc[index][type] = field.value;
//               }
//               return acc;
//             }, []);
//             console.log('Formatted Data:', formattedData); // Debug here
//             setTableData(formattedData);
//           }
//         }
//       } else {
//         console.error('Failed to fetch table data');
//       }
//     } catch (error) {
//       console.error('Error fetching table data:', error);
//     }
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!title || !description) {
//       alert('Both title and description are required.');
//       return;
//     }
  
//     try {
//       const newEntry = { title, description };
//       const index = editingIndex !== null ? editingIndex : tableData.length;
  
//       const payload = {
//         pageName: 'Experience',
//         sectionName: 'Session',
//         fields: [
//           { fieldName: `title${index + 1}`, fieldValue: title },
//           { fieldName: `description${index + 1}`, fieldValue: description },
//         ],
//       };
  
//       const url = 'http://192.168.70.249:8000/api/content/setMultipleFieldValues';
//       const response = await doPostCall(url, payload);
  
//       if (!response.ok) throw new Error('Failed to save data to the database.');
//       const result = await response.json();
//       console.log('Data saved successfully:', result);
  
//       if (editingIndex !== null) {
//         setTableData((prevData) =>
//           prevData.map((entry, i) =>
//             i === editingIndex ? { ...newEntry, key: `title${index + 1}` } : entry
//           )
//         );
//       } else {
//         setTableData((prevData) => [...prevData, { ...newEntry, key: `title${index + 1}` }]);
//       }
  
//       setTitle('');
//       setDescription('');
//       setEditingIndex(null);
//     } catch (error) {
//       console.error('Error saving data:', error);
//     }
//   };
  

//   const handleDelete = async (keyId) => {
//   try {
//     const confirmed = window.confirm("Are you sure you want to delete this record?");
//     if (!confirmed) return;

//     const payload = {
//       pageName: "Experience",
//       sectionName: "Session",
//       fieldName: keyId,
//     };

//     console.log("Delete Payload:", payload);

//     const url = "http://192.168.70.249:8000/api/content/removeSectionField";
//     const response = await doDeleteCall(url, payload);

//     console.log("Delete Response Status:", response.status);

//     if (!response.ok) {
//       throw new Error("Failed to delete data from the backend.");
//     }

//     const result = await response.json();
//     console.log("Delete API Result:", result);

//     if (result.success) {
//       // Remove the deleted entry from the frontend state
//       setTableData((prevEntries) => prevEntries.filter((entry) => entry.key !== keyId));
//     } else {
//       console.error("Backend failed to delete the record:", result.message);
//     }
//   } catch (error) {
//     console.error("Error deleting data:", error.message);
//   }
// };


//   const handleEdit = (index) => {
//     const entryToEdit = tableData[index];
//     if (!entryToEdit) {
//       console.error('No entry found at index:', index);
//       return;
//     }
  
//     setTitle(entryToEdit.title || '');
//     setDescription(entryToEdit.description || '');
//     setEditingIndex(index);
//   };
  

//   return (
//     <div className="w-full py-10 px-40">
//       <h1 className="text-4xl font-black text-[#063828]">Session</h1>
//       <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 border border-gray-300"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 border border-gray-300"
//             rows="3"
//             required
//           />
//         </div>
//         <button type="submit" className="w-full p-4 bg-[#063828] text-white">
//           {editingIndex !== null ? 'Update' : 'Submit'}
//         </button>
//       </form>

//       <table className="w-full border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border border-gray-300">Title</th>
//             <th className="p-2 border border-gray-300">Description</th>
//             <th className="p-2 border border-gray-300">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.filter((entry) => !entry.deleted).map((entry, index) => (
//             <tr key={index} className="border border-gray-300">
//               <td className="p-2">{entry.title}</td>
//               <td className="p-2">{entry.description}</td>
//               <td className="p-2">
//                 <button
//                   onClick={() => handleEdit(index)}
//                   className="mr-2 text-blue-500 hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(entry.key)}
//                   className="text-red-500 hover:underline"
//                   disabled={isDeleting}
//                 >
//                   {isDeleting ? "Deleting..." : "Delete"}
//                 </button>
//               </td>
//               </tr>
//             ))}
//         </tbody>

//       </table>
//     </div>
//   );
// };

// export default DashboardExperience;


import React, { useState, useEffect } from 'react';
import { doPostCall, doDeleteCall } from '../../utils/api';

const DashboardExperience = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tableData, setTableData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  // Fetch table data from backend on component mount
  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    setLoading(true);
    setError('');
    try {
      const url = 'http://192.168.70.249:8000/api/content/sections/Experience';
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const sessionData = data.data.sections.find((section) => section.title === 'Session');
          if (sessionData) {
            const formattedData = sessionData.section_fields.reduce((acc, field) => {
              const match = field.key.match(/(title|description)(\d+)/);
              if (match) {
                const [, type, index] = match;
                if (!acc[index]) acc[index] = { key: index };
                acc[index][type] = field.value;
              }
              return acc;
            }, []);
            setTableData(formattedData);
          }
        }
      } else {
        setError('Failed to fetch table data');
      }
    } catch (error) {
      setError('Error fetching table data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError('Both title and description are required.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const newEntry = { title, description };
      const index = editingIndex !== null ? editingIndex : tableData.length;

      const payload = {
        pageName: 'Experience',
        sectionName: 'Session',
        fields: [
          { fieldName: `title${index + 1}`, fieldValue: title },
          { fieldName: `description${index + 1}`, fieldValue: description },
        ],
      };

      const url = 'http://192.168.70.249:8000/api/content/setMultipleFieldValues';
      const response = await doPostCall(url, payload);

      if (!response.ok) throw new Error('Failed to save data to the database.');
      const result = await response.json();
      console.log('Data saved successfully:', result);

      if (editingIndex !== null) {
        setTableData((prevData) =>
          prevData.map((entry, i) =>
            i === editingIndex ? { ...newEntry, key: `title${index + 1}` } : entry
          )
        );
      } else {
        setTableData((prevData) => [...prevData, { ...newEntry, key: `title${index + 1}` }]);
      }

      setTitle('');
      setDescription('');
      setEditingIndex(null);
    } catch (error) {
      setError('Error saving data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (keyId) => {
    setIsDeleting(true);
    setError('');
    try {
      const confirmed = window.confirm('Are you sure you want to delete this record?');
      if (!confirmed) return;

      const payload = {
        pageName: 'Experience',
        sectionName: 'Session',
        fieldName: keyId,
      };

      const url = 'http://192.168.70.249:8000/api/content/removeSectionField';
      const response = await doDeleteCall(url, payload);

      if (!response.ok) {
        throw new Error('Failed to delete data from the backend.');
      }

      const result = await response.json();
      if (result.success) {
        setTableData((prevEntries) => prevEntries.filter((entry) => entry.key !== keyId));
      } else {
        setError('Failed to delete the record: ' + result.message);
      }
    } catch (error) {
      setError('Error deleting data: ' + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (index) => {
    const entryToEdit = tableData[index];
    if (!entryToEdit) {
      setError('No entry found at index: ' + index);
      return;
    }

    setTitle(entryToEdit.title || '');
    setDescription(entryToEdit.description || '');
    setEditingIndex(index);
  };

  return (
    <div className="w-full py-10 px-40">
      <h1 className="text-4xl font-black text-[#063828]">Session</h1>
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300"
            rows="3"
            required
          />
        </div>
        <button type="submit" className="w-full p-4 bg-[#063828] text-white" disabled={loading}>
          {editingIndex !== null ? 'Update' : 'Submit'}
        </button>
      </form>

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
                <button onClick={() => handleEdit(index)} className="mr-2 text-blue-500 hover:underline">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entry.key)}
                  className="text-red-500 hover:underline"
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardExperience;
