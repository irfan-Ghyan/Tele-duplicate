import React, { useState } from 'react';

const DashboardVideo = () => {
  // State to hold the current video URL
  const [currentVideo, setCurrentVideo] = useState("/assets/video/dome.webm");

  // State to hold uploaded video files
  const [uploadedVideos, setUploadedVideos] = useState([]);

  // Handle video file upload
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setUploadedVideos([...uploadedVideos, videoUrl]);
      setCurrentVideo(videoUrl); // Optionally set the new video as the current one immediately
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-20">
      {/* Video Display */}
      <div className="relative mb-8">
        <video
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
          className="w-[1200px] h-[800px] object-cover"
          src={currentVideo}
        >
          <source src={currentVideo} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="mb-4">
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="p-2 border border-gray-300 rounded cursor-pointer"
        />
      </div>

      {uploadedVideos.length > 0 && (
        <div className="mb-4">
          <label className="mr-2">Choose a video:</label>
          <select
            onChange={(e) => setCurrentVideo(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            value={currentVideo}
          >
            {uploadedVideos.map((video, index) => (
              <option key={index} value={video}>
                Video {index + 1}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default DashboardVideo;

