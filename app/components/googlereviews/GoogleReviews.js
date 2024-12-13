

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
