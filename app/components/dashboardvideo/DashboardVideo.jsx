
import React, { useState, useEffect } from 'react';
import { doPostCall, doGetCall } from '../../utils/api.js';

const DashboardVideo = () => {
  const [currentVideo, setCurrentVideo] = useState("");
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch existing videos on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError('');
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const apiUrl = `${baseUrl}/api/content/getMainVideo`;

        const response = await doGetCall(apiUrl);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch videos.');
        }

        const data = await response.json();
        if (data.success) {
          setUploadedVideos(data.data[0].url);
          setCurrentVideo(data.data[0].url);
        } else {
          throw new Error(data.message || 'No videos found.');
        }
      } catch (error) {
        setError(error.message || 'Error fetching videos.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
  
    if (!file) return;
  
    const formData = new FormData();
    formData.append('video', file);
  
    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Fallback if env var not set
      const url = `${baseUrl}/api/content/uploadVideo`;
  
      const response = await doPostCall(url, formData);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload video.');
      }
  
      const data = await response.json();
    
      if (data.success && data.file_path) {
        setUploadedVideos((prev) => [...prev, data.file_path]);
        setCurrentVideo(data.file_path);

        setSuccessMessage('Video uploaded successfully!');
      } else {
        throw new Error(data.message || 'Unexpected response from the server.');
      }
    } catch (error) {
      setError(error.message || 'Error uploading video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-200 p-20">
      <div className="relative mb-8">
        {currentVideo ? (
          <video
            preload="auto"
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full h-[800px] object-cover"
            src={currentVideo}
          >
            <source src={currentVideo} type="video/webm" />
            {/* Ensure the MIME type matches your video format */}
          </video>
        ) : (
          <p>No video selected.</p>
        )}
      </div>

      <div className="mb-4">
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="p-2 border border-gray-300 rounded cursor-pointer"
        />
      </div>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
};

export default DashboardVideo;
