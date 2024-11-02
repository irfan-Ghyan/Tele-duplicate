"use client";

import React, { useState, useEffect } from "react";
import { useFaq } from "../../FaqContext";

const DashboardFaq = () => {
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [faqEntries, setFaqEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showSection, setShowSection] = useState(true);
  const { faqData, updateFaqData } = useFaq();


const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({ ...prevData, [name]: value }));
};


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let response = await fetch(
        "http://192.168.70.151:8000/api/content/sections/Home"
      );
      if (response.ok) {
        response = await response.json();
        if (response.success) {
          const faqSection = response.data.sections.find(
            (section) => section.title === "FAQ"
          );
          const faq = { next: null, data: [] };

          if (faqSection) {
            faqSection.section_fields.forEach((field, index, fields) => {
              if (field.key.startsWith("q")) {
                const answerField = fields.find(
                  (f) => f.key === "a" + field.key.slice(1)
                );
                if (answerField) {
                  faq["data"].push({
                    question: { key: field.key, value: field.value },
                    answer: { key: answerField.key, value: answerField.value },
                  });
                }
              }
            });
          }
          faq.next = faq.data.length + 1;
          updateFaqData(faq);
          setFaqEntries(faq.data.reverse());
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      pageName: "Home",
      sectionName: "FAQ",
      fields: editingIndex !== null ? [
        {
          fieldName: editingIndex, // use the key of the entry being edited
          fieldValue: formData.question,
        },
        {
          fieldName: `a${editingIndex.slice(1)}`, // Corresponding answer field key
          fieldValue: formData.answer, 
        },
      ] : [
        {
          fieldName: `q${faqEntries.length + 1}`, // For new entries
          fieldValue: formData.question,
        },
        {
          fieldName: `a${faqEntries.length + 1}`, // For new entries
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
  
      const result = await response.json();
  
      if (result.success) {
        if (editingIndex !== null) {
          // Update the existing entry
          setFaqEntries((prevEntries) =>
            prevEntries.map((entry) =>
              entry.question.key === editingIndex
                ? {
                    question: { key: editingIndex, value: formData.question },
                    answer: { key: `a${editingIndex.slice(1)}`, value: formData.answer },
                  }
                : entry
            )
          );
        } else {
          // Add the new entry
          const newEntry = {
            question: {
              value: result.data[0]['key'],
              value: result.data[0]['value'],
            },
            answer: {
              value: result.data[1]['key'],
              value: result.data[1]['value'],
            },
          };
          setFaqEntries((prevEntries) => [...prevEntries, newEntry]);
        }
  
        setFormData({ question: "", answer: "" });
        setEditingIndex(null); // Reset editing index
      } else {
        console.error("Error from API:", result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   const payload = {
  //     pageName: "Home",
  //     sectionName: "FAQ",
  //     fields: [
  //       {
  //         fieldName: `q${faqEntries.length + 1}`,
  //         fieldValue: formData.question,
  //       },
  //       {
  //         fieldName: `a${faqEntries.length + 1}`,
  //         fieldValue: formData.answer, 
  //       },
  //     ],
  //   };
  
  //   try {
  //     const response = await fetch(
  //       "http://192.168.70.151:8000/api/content/setMultipleFieldValues",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(payload),
  //       }
  //     );
  
  //     const result = await response.json();
  
  //     if (result.success) {
  //       debugger;
  //       const newEntry = {
  //         question: {
  //           value: result.data[0]['key'],
  //           value: result.data[0]['value'],
  //         },
  //         answer: {
  //           value: result.data[1]['key'],
  //           value: result.data[1]['value'],
  //         },
  //       };
  
  //       setFaqEntries((prevEntries) => [...prevEntries, newEntry]);
  //       setFormData({ question: "", answer: "" });
  //       setEditingIndex(null);
  //     } else {
  //       console.error("Error from API:", result.message || "Unknown error");
  //     }
  //   } catch (error) {
  //     console.error("Error sending data:", error);
  //   }
  // };
  
  
  const handleEdit = (keyId) => {
    const entryToEdit = faqEntries.find(
      (entry) => entry.question.key === keyId
    );

    if (entryToEdit) {
      setFormData({
        question: entryToEdit.question.value,
        answer: entryToEdit.answer.value,
      });
      setEditingIndex(keyId);
    }
  };

  const handleDelete = async (keyId) => {
    try {
      const payload = {
        pageName: "Home",
        sectionName: "FAQ",
        fieldName: keyId,
      };

      const response = await fetch(
        "http://192.168.70.151:8000/api/content/removeSectionField",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      const result = await response.json();
      console.log("Delete API Response:", result);

      if (result.success) {
        // Remove the entry from the state
        setFaqEntries((prevEntries) =>
          prevEntries.filter((entry) => entry.question.key !== keyId)
        );
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
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
          {showSection ? "Hide" : "Show"}
        </button>
      </div>

      {showSection && (
        <>
          <h1 className="text-4xl text-black font-black font-orbitron">FAQ</h1>
          <div className="flex justify-between">
            <form
              onSubmit={handleSubmit}
              className="w-full mb-8 max-w-4xl mt-10"
            >
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
                <label className="block text-gray-700 font-bold mb-2">
                  Answer
                </label>
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

            <form
              onSubmit={handleSubmit}
              className="w-full mb-8 max-w-4xl mt-10"
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  سؤال
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
                <label className="block text-gray-700 font-bold mb-2">
                  إجابة
                </label>
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
                  <tr
                    key={entry.question.key}
                    className="border border-gray-300"
                  >
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
