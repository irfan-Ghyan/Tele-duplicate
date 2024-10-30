import React, { useState } from "react";

const DashboardFaq = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    title: "",
    question: "",
    answer: ""
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Aap yahan API call ya save function laga sakte hain
    setFormData({
      title: "",
      question: "",
      answer: ""
    });
  };

  return (
    <div className="w-full relative py-[40px] md:py-[50px] lg:py-[100px] bg-white border-t-2 border-color-200 px-40">
      <h1 className="text-4xl text-black font-black font-orbitron">
        FAQ
      </h1>
    <div className="flex justify-between">
    <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="w-full p-2 border border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Question</label>
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
        className="w-full p-4 bg-[#A62ED1] text-white hover:bg-[#A62ED1] "
      >
        Submit
      </button>
    </form>

    <form onSubmit={handleSubmit} className="w-full mb-8 max-w-4xl mt-10">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="w-full p-2 border border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Question</label>
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
        className="w-full p-4 bg-[#A62ED1] text-white hover:bg-[#A62ED1] "
      >
        Submit
      </button>
    </form>
    </div>
    </div>
  );
};

export default DashboardFaq;
