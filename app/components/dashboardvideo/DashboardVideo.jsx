import React, { useState } from 'react';

const DashboardVideo = () => {
  const [currentVideo, setCurrentVideo] = useState("/assets/video/dome.webm");
  const [uploadedVideos, setUploadedVideos] = useState([]);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setUploadedVideos([...uploadedVideos, videoUrl]);
      setCurrentVideo(videoUrl);
    }
  };


  return (
    
    <div className="flex flex-col items-center bg-white p-20">
    
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

