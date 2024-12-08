// import React, { useState } from 'react';

// const DashboardVideo = () => {
//   const [currentVideo, setCurrentVideo] = useState("/assets/video/dome.webm");
//   const [uploadedVideos, setUploadedVideos] = useState([]);

//   const handleVideoUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const videoUrl = URL.createObjectURL(file);
//       setUploadedVideos([...uploadedVideos, videoUrl]);
//       setCurrentVideo(videoUrl);
//     }
//   };


//   return (
    
//     <div className="flex flex-col items-center bg-white p-20">
    
//       <div className="relative mb-8">
//         <video
//           preload="auto"
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="w-[1200px] h-[800px] object-cover"
//           src={currentVideo}
//         >
//           <source src={currentVideo} type="video/webm" />
//           Your browser does not support the video tag.
//         </video>
//       </div>

//       <div className="mb-4">
//         <input
//           type="file"
//           accept="video/*"
//           onChange={handleVideoUpload}
//           className="p-2 border border-gray-300 rounded cursor-pointer"
//         />
//       </div>

//       {uploadedVideos.length > 0 && (
//         <div className="mb-4">
//           <label className="mr-2">Choose a video:</label>
//           <select
//             onChange={(e) => setCurrentVideo(e.target.value)}
//             className="p-2 border border-gray-300 rounded"
//             value={currentVideo}
//           >
//             {uploadedVideos.map((video, index) => (
//               <option key={index} value={video}>
//                 Video {index + 1}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DashboardVideo;



import React, { useState } from 'react';
import { doPostCall } from '../../utils/api.js';

const DashboardVideo = () => {
  const [currentVideo, setCurrentVideo] = useState("/assets/video/dome.webm");
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
  
    if (!file) return;
  
    const formData = new FormData();
    formData.append('video', file);
  
    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}/api/content/uploadVideo`;
  
      // Pass formData directly
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

      {loading && <p className="text-blue-500">Uploading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

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
