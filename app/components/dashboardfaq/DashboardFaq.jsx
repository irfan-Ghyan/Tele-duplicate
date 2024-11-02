// 'use client'

// import React, { useState, useEffect} from "react";

// const DashboardFaq = () => {
//   // State for form fields
//   const [formData, setFormData] = useState({
//     title: "",
//     question: "",
//     answer: ""
//   });

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data:", formData);
//     setFormData({
//       title: "",
//       question: "",
//       answer: ""
//     });
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://192.168.70.151:8000/api/content/sections/Home');
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         const sections = data?.data?.sections || [];

//         const faqSection = sections.find(section => section.title === "FAQ");

//         console.log(faqSection);

//         if (faqSection) {
//           const titleField = faqSection.section_fields.find(field => field.key === 'q1');
//           const descriptionField = faqSection.section_fields.find(field => field.key === 'a1');

//           setTitle(titleField?.value || '');
//           setDescription(descriptionField?.value || '');
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="w-full relative py-[40px] md:py-[50px] lg:py-[100px] bg-white border-t-2 border-color-200 px-40">
//       <h1 className="text-4xl text-black font-black font-orbitron">
//         FAQ
//       </h1>
//     <div className="flex justify-between">
//     <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
//       <div className="mb-4">
//         <label className="block text-gray-700 font-bold mb-2">Question</label>
//         <textarea
//           name="question"
//           value={formData.question}
//           onChange={handleChange}
//           placeholder="Enter question"
//           className="w-full p-2 border border-gray-300"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 font-bold mb-2">Answer</label>
//         <textarea
//           name="answer"
//           value={formData.answer}
//           onChange={handleChange}
//           placeholder="Enter answer"
//           className="w-full p-2 border border-gray-300"
//           required
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-full p-4 bg-[#A62ED1] text-white hover:bg-[#A62ED1] "
//       >
//         Submit
//       </button>
//     </form>

//     <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">

//       <div className="mb-4">
//         <label className="block text-gray-700 font-bold mb-2">سؤال</label>
//         <textarea
//           name="question"
//           value={formData.question}
//           onChange={handleChange}
//           placeholder="Enter question"
//           className="w-full p-2 border border-gray-300"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 font-bold mb-2">إجابة</label>
//         <textarea
//           name="answer"
//           value={formData.answer}
//           onChange={handleChange}
//           placeholder="Enter answer"
//           className="w-full p-2 border border-gray-300"
//           required
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-full p-4 bg-[#A62ED1] text-white hover:bg-[#A62ED1] "
//       >
//         Submit
//       </button>
//     </form>
//     </div>
//     </div>
//   );
// };

// export default DashboardFaq;

// 'use client';

// import React, { useState, useEffect } from "react";

// const DashboardFaq = () => {
//   const [formData, setFormData] = useState({
//     question: "",
//     answer: ""
//   });

//   const [faqEntries, setFaqEntries] = useState([]);

//   const [editingIndex, setEditingIndex] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       pageName: "Home",
//       sectionName: "FAQ",
//       fields: [
//         {
//           fieldName: "q1",
//           fieldValue: formData.question
//         },
//         {
//           fieldName: "a1",
//           fieldValue: formData.answer
//         }
//       ]
//     };

//     try {
//       const response = await fetch('http://192.168.70.151:8000/api/content/setMultipleFieldValues', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });

//       console.log(response);

//       if (!response.ok) {
//         throw new Error("Failed to send data");
//       }

//       const result = await response.json();
//       console.log("API Response:", result);

//        // Add each field as an entry in faqEntries
//        setFaqEntries((prevEntries) => [
//         ...prevEntries,
//         { fieldName: "q1", fieldValue: formData.question },
//         { fieldName: "a1", fieldValue: formData.answer }
//       ]);

//       setFormData({ question: "", answer: "" });

//       // setFaqEntries((prevEntries) => [
//       //   ...prevEntries,
//       //   { question: formData.question, answer: formData.answer }
//       // ]);

//     } catch (error) {
//       console.error("Error sending data:", error);
//     }
// };

//   const handleEdit = (index) => {
//     setFormData({
//       q1: faqEntries[index].question,
//       a1: faqEntries[index].answer
//     });
//     setEditingIndex(index);
//   };

//   const handleDelete = (index) => {
//     setFaqEntries((prevEntries) => prevEntries.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="w-full relative py-[40px] md:py-[50px] lg:py-[100px] bg-white border-t-2 border-color-200 px-40">
//       <h1 className="text-4xl text-black font-black font-orbitron">FAQ</h1>
//       <div className="flex justify-between">
//         <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">Question</label>
//             <textarea
//               name="question"
//               value={formData.question}
//               onChange={handleChange}
//               placeholder="Enter question"
//               className="w-full p-2 border border-gray-300"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">Answer</label>
//             <textarea
//               name="answer"
//               value={formData.answer}
//               onChange={handleChange}
//               placeholder="Enter answer"
//               className="w-full p-2 border border-gray-300"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full p-4 bg-[#A62ED1]  text-white hover:bg-[#A62ED1] "
//           >
//             {editingIndex !== null ? 'Update' : 'Submit'}
//           </button>
//         </form>

//         <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">سؤال</label>
//             <textarea
//               name="question"
//               value={formData.question}
//               onChange={handleChange}
//               placeholder="Enter question"
//               className="w-full p-2 border border-gray-300"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">إجابة</label>
//             <textarea
//               name="answer"
//               value={formData.answer}
//               onChange={handleChange}
//               placeholder="Enter answer"
//               className="w-full p-2 border border-gray-300"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full p-4 bg-[#A62ED1]  text-white hover:bg-[#A62ED1] "
//           >
//             {editingIndex !== null ? 'تحديث' : 'يُقدِّم'}
//           </button>
//         </form>
//       </div>

//       <div className="mt-10">
//         <h2 className="text-xl font-bold mb-4">Submitted FAQs</h2>
//         <table className="w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 border border-gray-300">Question</th>
//               <th className="p-2 border border-gray-300">Answer</th>
//               <th className="p-2 border border-gray-300">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {faqEntries.map((entry, index) => (
//               <tr key={index} className="border border-gray-300">
//                 <td className="p-2 text-center">{entry.fieldName}</td>
//                 <td className="p-2 text-center">{entry.fieldValue}</td>
//                 <td className="p-2 text-center">
//                   <button
//                     onClick={() => handleEdit(index)}
//                     className="mr-2 text-blue-500 hover:underline"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(index)}
//                     className="text-red-500 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DashboardFaq;



"use client";

import React, { useState, useEffect } from "react";
import { useFaq } from '../../FaqContext';

const DashboardFaq = () => {
  const [formData, setFormData] = useState({ question: "", answer: ""});
  const [faqEntries, setFaqEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showSection, setShowSection] = useState(true);
  const { faqData, updateFaqData } = useFaq();


  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      let response = await fetch("http://192.168.70.151:8000/api/content/sections/Home");
      if (response.ok) {
       // debugger;
        response = await response.json()
        if(response.success){
        const faqSection = response.data.sections.find(section => section.title === "FAQ");
        const faq = { next: null, data: [] };

        if (faqSection) {
            faqSection.section_fields.forEach((field, index, fields) => {
                // Check if field key starts with 'q' and there is acorresponding 'a' field
                if (field.key.startsWith('q')) {
                    const answerField = fields.find(f => f.key === 'a' + field.key.slice(1));
                    if (answerField) {
                        faq['data'].push({
                            question: { key: field.key, value: field.value },
                            answer: { key: answerField.key, value: answerField.value
                            }
                        });
                    }
                }
            });
        }
        faq.next = faq.data.length+1
        updateFaqData(faq);  
        setFaqEntries(faq.data); 
        
        console.log(faq);
      }
    }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value,});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      pageName: "Home",
      sectionName: "FAQ",
      fields: [
        {
          fieldName: "question",
          fieldValue: formData.question,
        },
        {
          fieldName: "answer",
          fieldValue: formData.answer,
        },
      ],
    };

    try {
      const response = await fetch(
        "http://192.168.70.151:8000/api/content/setMultipleFieldValues",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      const result = await response.json();
      console.log("API Response:", result);


      const newEntry = {
        question: { key: editingIndex || `q${faqEntries.length + 1}`, value: formData.question },
        answer: { key: editingIndex ? `a${editingIndex.slice(1)}` : `a${faqEntries.length + 1}`, value: formData.answer }
      };

      setFaqEntries((prevEntries) => {
        if (editingIndex) {
          return prevEntries.map(entry => 
            entry.question.key === editingIndex ? newEntry : entry
          );
        } else {
          return [...prevEntries, newEntry];
        }
      });

      setFormData({ question: "", answer: "" });
      setEditingIndex(null);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };


  const handleEdit = (keyId) => {
    const entryToEdit = faqEntries.find(entry => entry.question.key === keyId);
    
    if (entryToEdit) {
      setFormData({
        question: entryToEdit.question.value,
        answer: entryToEdit.answer.value
      });
      setEditingIndex(keyId);
    }
  };
  
  const handleDelete = (keyId) => {
    setFaqEntries((prevEntries) => 
      prevEntries.filter(entry => entry.question.key !== keyId)
    );
  };


  const toggleSectionVisibility = () => {
    setShowSection(!showSection);
  };



  return (
    <div className="w-full relative py-[40px] md:py-[50px] lg:py-[100px] bg-white border-t-2 border-color-200 px-40">
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
      <h1 className="text-4xl text-black font-black font-orbitron">FAQ</h1>
      <div className="flex justify-between">
        <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Question
            </label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Enter question"
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Answer</label>
            <textarea
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              placeholder="Enter answer"
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-[#A62ED1] text-white hover:bg-[#A62ED1]"
          >
            {editingIndex !== null ? "Update" : "Submit"}
          </button>
        </form>

        <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">سؤال</label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Enter question"
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">إجابة</label>
            <textarea
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              placeholder="Enter answer"
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-[#A62ED1]  text-white hover:bg-[#A62ED1] "
          >
            {editingIndex !== null ? "تحديث" : "يُقدِّم"}
          </button>
        </form>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Submitted FAQs</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-300">Questions</th>
              <th className="p-2 border border-gray-300">Answers</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqEntries.map((entry) => (
              <tr key={entry.question.key}  className="border border-gray-300">
                <td className="p-2 text-center">{entry.question.value}</td>
                <td className="p-2 text-center">{entry.answer.value}</td>
                <td className="p-2 text-center">
                  <>
                    <button
                      onClick={() => handleEdit(entry.question.key)}
                      className="mr-2 text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.question.key)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </>
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

export default DashboardFaq;
