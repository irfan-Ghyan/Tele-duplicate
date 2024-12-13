
import React, { useState, useEffect } from 'react';
import { doPostCall, uploadImageCall, doGetCall, doDeleteCall } from '../../utils/api';

const DashboardSafetyDriving= () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const url = `${baseUrl}/api/content/sections/Education`;
        const response = await doGetCall(url);

        if (!response.ok) {
          throw new Error('Failed to fetch data.');
        }

        const data = await response.json();
        const domeSection = data?.data?.sections.find(
          (section) => section.title === 'Safety Driving'
        );
        if (domeSection) {
          const groupedSlides = domeSection.section_fields.reduce((acc, field) => {
            const match = field.key.match(/(title|description)(\d+)/);
            if (match) {
              const [, type, index] = match;
              if (!acc[index]) acc[index] = {};
              acc[index][type] = field.value;
              acc[index][`${type}_meta`] = field.key;
            }
            return acc;
          }, {});

          const firstEntry = Object.values(groupedSlides)[0];
          setTableData(firstEntry ? [firstEntry] : []);
          if (firstEntry) {
            setTitle(firstEntry.title || '');
            setDescription(firstEntry.description || '');
          }
        }
      } catch (error) {
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError('Both title and description are required.');
      return;
    }

    try {
      let uploadedImagePaths = [];
      if (images.length > 0) {
        uploadedImagePaths = await uploadImages();
      }

      const payload = {
        pageName: 'Education',
        sectionName: 'Safety Driving',
        fields: [
          { fieldName: tableData[0]?.title_meta || `title1`, fieldValue: title },
          { fieldName: tableData[0]?.description_meta || `description1`, fieldValue: description },
        ],
        images: uploadedImagePaths,
      };

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/setMultipleFieldValues`;

      const response = await doPostCall(url, payload);

      if (!response.ok) {
        throw new Error('Failed to save data to the database.');
      }

      // Update table data and form fields
      const updatedEntry = {
        title,
        description,
        images: uploadedImagePaths,
        title_meta: payload.fields[0].fieldName,
        description_meta: payload.fields[1].fieldName,
      };
      setTableData([updatedEntry]);
      setImages([]);
    } catch (error) {
      setError('Failed to save data. Please try again.');
    }
  };

  const uploadImages = async () => {
    const formData = new FormData();
    const section = 'Safety Driving';
    const imageName = `${section}_image`;

    images.forEach((image) => {
      formData.append('images[]', image.file);
    });

    formData.append('section', section);
    formData.append('imageName', imageName);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/uploadImages`;

      const response = await uploadImageCall(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload images');
      }

      const result = await response.json();
      return result.file_paths || [];
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="w-full py-[40px] md:py-[50px] lg:py-[100px] bg-white border-t-2 border-color-200 px-40">
      <h1 className="text-4xl text-[#063828] font-black font-orbitron">Safety Driving</h1>

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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300"
          />
        </div>

        <button type="submit" className="w-full p-4 bg-[#063828] text-white">
          Submit
        </button>
      </form>

      <div className="mt-20">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Image</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              <tr className="text-center">
                <td className="p-2 border">{tableData[0].title}</td>
                <td className="p-2 border">{tableData[0].description}</td>
                <td className="p-2 border">
                  {tableData[0].images && tableData[0].images.length > 0 && (
                    <img
                      src={tableData[0].images[0].previewUrl}
                      alt="Entry"
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-2">No entries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardSafetyDriving;
