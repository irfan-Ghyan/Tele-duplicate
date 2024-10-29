import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import SessionCard from "./sessioncard/SessionCard";

const DashboardSession = () => {
  const scrollContainerRef = useRef(null);
  const [experiences, setExperiences] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: null,
    slot: "",
  });

  const { t } = useTranslation();

  useEffect(() => {
    const fetchExperiences = async () => {
      const data = [
        {
          title: t("20-Minute Sprint"),
          description: t(
            "Jump into a quick 20-minute sprint where your goal is to set the fastest lap. Perfect for those looking for a short, intense racing experience."
          ),
          imageUrl: "/assets/images/experience/mintue1.jpg",
          slot: "20-Minute Sprint",
        },
      ];
      setExperiences(data);
    };

    fetchExperiences();

    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setIsScrolling(true);
        if (scrollContainerRef.current.scrollLeft > 100) {
          setShowScrollButton(true);
        } else {
          setShowScrollButton(false);
        }
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [t]);

  const scrollToTop = () => {
    scrollContainerRef.current.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, imageUrl });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setExperiences([...experiences, formData]);
    setFormData({
      title: "",
      description: "",
      imageUrl: null,
      slot: "",
    });
  };

  // Handle delete experience
  const handleDelete = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  // Handle edit experience (for simplicity, directly setting data in form)
  const handleEdit = (index) => {
    const experience = experiences[index];
    setFormData({
      title: experience.title,
      description: experience.description,
      imageUrl: experience.imageUrl,
      slot: experience.slot,
    });
    // Remove the experience being edited to avoid duplication on form submit
    handleDelete(index);
  };

  return (
    <div className="w-full relative py-[40px] md:py-[50px] lg:py-[100px] bg-white border-t-2 border-color-200 px-40">
      <h1 className="text-4xl text-black font-black font-orbitron">
        EXPERIENCE
      </h1>

      <div
        className="scroll-container flex justify-between my-66"
        ref={scrollContainerRef}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-lg mt-10 max-w-lg"
        >
          <h3 className="text-lg font-semibold mb-4">Add New Experience</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slot
            </label>
            <select
              name="slot"
              value={formData.slot}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300"
            >
              <option value="">Select Slot</option>
              <option value="20-Minute Sprint">20-Minute Sprint</option>
              <option value="40-Minute Session">40-Minute Session</option>
              <option value="60-Minute Session">60-Minute Session</option>
              <option value="Private Events">Private Events</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300"
            />
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-[#ce21b7]  text-white hover:bg-[#ce21b7f5]  mt-8"
          >
            ADD EXPERIENCE
          </button>
        </form>

        {experiences.map((experience, index) => (
          <div
            key={index}
            className="card-wrapper w-full md:w-[386px] px-8"
            style={{ minWidth: "386px", marginRight: "16px" }}
          >
            <SessionCard
              title={experience.title}
              description={experience.description}
              imageUrl={experience.imageUrl}
              button={experience.button}
              link={experience.link}
            />
          </div>
        ))}

        <form
          onSubmit={handleSubmit}
          className="w-full rounded-lg mt-10 max-w-lg"
        >
          <h3 className="text-lg font-semibold mb-4">أضف تجربة جديدة</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              وصف
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              فتحة
            </label>
            <select
              name="slot"
              value={formData.slot}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300"
            >
              <option value="">حدد فتحة</option>
              <option value="20-Minute Sprint">سباق 20 دقيقة</option>
              <option value="40-Minute Session">جلسة مدتها 40 دقيقة</option>
              <option value="60-Minute Session">جلسة مدتها 60 دقيقة</option>
              <option value="Private Events">الأحداث الخاصة</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300"
            />
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-[#ce21b7]  text-white hover:bg-[#ce21b7f5]  mt-8"
          >
            أضف الخبرة
          </button>
        </form>
      </div>

      <div className="mt-20">
        <h3 className="text-lg font-semibold mb-4">Experience List</h3>
        <table className="w-full text-left border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Edit</th>
              <th className="border p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((experience, index) => (
              <tr key={index}>
                <td className="border p-2">{experience.title}</td>
                <td className="border p-2">{experience.description}</td>
                <td className="border p-2">{experience.slot}</td>
                <td className="border p-2">
                  {experience.imageUrl && (
                    <Image
                      src={experience.imageUrl}
                      alt="Experience Image"
                      width={50}
                      height={50}
                    />
                  )}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showScrollButton && (
        <div className="fixed bottom-6 right-6 md:hidden">
          <button
            onClick={scrollToTop}
            className="bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-600 transition duration-300"
          >
            <Image
              src="/assets/images/rightarrow.png"
              alt="scroll to top"
              width={24}
              height={24}
            />
          </button>
        </div>
      )}

      <style jsx>{`
        .scroll-container {
          scroll-snap-type: x mandatory;
        }
        .card-wrapper {
          scroll-snap-align: start;
        }
      `}</style>
    </div>
  );
};

export default DashboardSession;
