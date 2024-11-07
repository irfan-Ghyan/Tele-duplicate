"use client";

import React, { useState, useEffect } from "react";
import { useFaq } from "../../FaqContext";

const DashboardFaq = () => {
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [faqEntries, setFaqEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showSection, setShowSection] = useState(true);
  const { faqData, updateFaqData } = useFaq();
  const [language, setLanguage] = useState('en');


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
        "http://192.168.70.136:8000/api/content/sections/Home"
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
          fieldName: editingIndex, 
          fieldValue: formData.question,
        },
        {
          fieldName: `a${editingIndex.slice(1)}`, 
          fieldValue: formData.answer, 
        },
      ] : [
        {
          fieldName: `q${faqEntries.length + 1}`, 
          fieldValue: formData.question,
        },
        {
          fieldName: `a${faqEntries.length + 1}`, 
          fieldValue: formData.answer, 
        },
      ],
    };
  
    try {
      const response = await fetch(
        "http://192.168.70.136:8000/api/content/setMultipleFieldValues",
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
        setEditingIndex(null);
      } else {
        console.error("Error from API:", result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  
  
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
        "http://192.168.70.136:8000/api/content/removeSectionField",
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

  const labels = {
    en: { heading: 'FAQ', title: 'Question', description: 'Answer', submit: 'Submit', update: 'Update Entry', show: 'Show', hide: 'Hide', upload: 'Upload Images', edit: 'Edit', delete: 'Delete', actions: 'Actions',},
    ar: { heading: 'التعليمات', title: 'سؤال', description: 'وصف', submit: 'إجابة', update: 'تحديث', show: 'عرض', hide: 'إخفاء', upload: 'تحميل الصور', edit: 'يحرر', delete: 'يمسح', actions: 'الإجراءات', },
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
          <div className="flex justify-between">
            <form
              onSubmit={handleSubmit}
              className="w-full mb-8 max-w-4xl mt-10"
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                {labels[language].title}
                </label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  placeholder="Enter question"
                  className="w-full p-2 border border-gray-300"
                  dir={getDirection()}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                {labels[language].description}
                </label>
                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  placeholder="Enter answer"
                  className="w-full p-2 border border-gray-300"
                  dir={getDirection()}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full p-4 bg-[#A62ED1] text-white hover:bg-[#A62ED1]"
              >
                {editingIndex !== null ? labels[language].update : labels[language].submit}
              </button>
            </form>

          </div>

          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Submitted FAQs</h2>
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border border-gray-300">{labels[language].title}</th>
                  <th className="p-2 border border-gray-300">{labels[language].description}</th>
                  <th className="p-2 border border-gray-300">{labels[language].actions}</th>
                </tr>
              </thead>
              <tbody>
                {faqEntries.map((entry) => (
                  <tr
                    key={entry.question.key}
                    className="border border-gray-300"
                  >
                    <td className="p-2">{entry.question.value}</td>
                    <td className="p-2">{entry.answer.value}</td>
                    <td className="p-2">
                      <>
                        <button
                          onClick={() => handleEdit(entry.question.key)}
                          className="mr-2 text-blue-500 hover:underline"
                        >
                          {labels[language].edit}
                        </button>
                        <button
                          onClick={() => handleDelete(entry.question.key)}
                          className="text-red-500 hover:underline"
                        >
                           {labels[language].delete}
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

