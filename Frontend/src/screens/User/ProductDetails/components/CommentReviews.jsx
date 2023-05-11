import React, { useState, useEffect } from 'react';
import axios from '../../../../config/axios';

function CommentReviews({ spaceid }) {

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState();
  const [reviews, setReviews] = useState([]);



  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.post('/api/user/getreviews', {
          spaceid
        }); // Include spaceId and userId as query parameters
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [spaceid]);



  const handleSubmit = async () => {
    // Assuming you have a login system and user is stored in local storage
    const userinfoString = await JSON.parse(localStorage.getItem('userInfo'));

    if (!userinfoString) {
      setErrorMessage('Please login to post a review');
      return;
    }

    console.log("Here is the commet", comment);

    try {
      const { data } = await axios.post('/api/user/submitreviews', {
        spaceID: spaceid,  // Replace this with actual space ID
        userID: userinfoString._id,
        userName: userinfoString.name,
        rating,
        comment,
      });

      // Reset form
      setRating(1);
      setComment('');
    } catch (error) {
      setErrorMessage('An error occurred while posting your review. Please try again.');
    }
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };


  return (
    <div>
      <div className='prose px-20 py-20'>
        <div>
          <h3>Comment and Reviews</h3>
        </div>
        <div className='flex'>
          <h5>Rating</h5>

          <div className="rating ml-5">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <input
                type="radio"
                name="rating-2"
                value={starValue}
                onChange={handleRatingChange}
                className={`mask mask-star-2 ${starValue <= rating ? "bg-orange-400" : ""}`}
              />
            ))}
          </div>

        </div>
      </div>

      <div className="divider">post reviews</div>

      <div className='px-20 flex gap-10'>
        <textarea
          className="textarea w-96 textarea-success"
          placeholder="Write a review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button className="btn" onClick={handleSubmit}>post</button>
        {errorMessage && <p>{errorMessage}</p>}
      </div>

      <div className="divider">reviews</div>

      <div className='mt-10 pl-20 pr-20 w-full'>
        <div className="card w-full bg-gray-300 shadow-xl text-primary-content">
          <div className="card-body">


            <div class="mt-8 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2">

              {reviews.map((review) => (
                <blockquote key={review._id}>
                  <header class="sm:flex sm:items-center">
                    <p className="mt-2 font-medium sm:ml-4 sm:mt-0 text-black">
                      {review.userName}
                    </p>
                  </header>
                  <p class="mt-2 text-gray-700">
                    {review.comment}
                  </p>
                  <footer class="mt-4">
                    <p class="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </footer>
                </blockquote>
              ))}

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentReviews