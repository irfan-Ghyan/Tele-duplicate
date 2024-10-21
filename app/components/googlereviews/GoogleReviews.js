// // components/GoogleReviews.js or any other component file

// import React, { useEffect, useState } from 'react';

// const GoogleReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     fetch('/')
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.reviews) {
//           setReviews(data.reviews);
//         } else {
//           setError(true);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching reviews:', err);
//         setError(true);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading reviews...</p>;
//   if (error) return <p>Error loading reviews.</p>;

//   return (
//     <div>
//       <h2>Google Reviews</h2>
//       {reviews.length > 0 ? (
//         <ul>
//           {reviews.map((review, index) => (
//             <li key={index}>
//               <p>{review.author_name}: {review.text}</p>
//               <p>Rating: {review.rating}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No reviews available.</p>
//       )}
//     </div>
//   );
// };

// export default GoogleReviews;


// components/GoogleReviews.js



import React, { useEffect, useState } from 'react';


const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;


  useEffect(() => {
    fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}&fields=reviews,rating,user_ratings_total`)
  

      .then(response => response.json())
      .then(data => {
        setReviews(data.reviews || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error loading reviews:", error);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p className='text-white'>Loading reviews...</p>;
  if (!reviews.length) return <p className='text-white'>No reviews available.</p>;

  return (
    <div >
      <h2>Customer Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index}>
          <p>{review.authorName}</p>
          <p>{review.comment}</p>
          <p>Rating: {review.starRating}</p>
        </div>
      ))}
    </div>
  );
};

export default GoogleReviews;
