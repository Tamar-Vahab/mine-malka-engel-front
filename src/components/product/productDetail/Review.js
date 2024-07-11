// // // // import { useEffect, useState } from "react";
// // // // import { useTranslation } from "react-i18next";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { GetAllReviews } from "../../../axios/ReviewsAxios";
// // // // import { FaStar } from 'react-icons/fa';
// // // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // // // import { useNavigate } from "react-router-dom";
// // // // import { fillReviewsList } from "../../../redux/DataActions/DataAction.Reviews";

// // // // //Review page
// // // // //TODO://
// // // // //this page need help sos!!!!!!!!!!!!!!!
// // // // export const Review = () => {
// // // //   // const { t, i18n } = useTranslation();
// // // //   let reviewList = useSelector(s => s.DataReducer_Reviews.ReviewsList);
// // // //   let [reviews, setReviews] = useState(reviewList);
// // // //   const myDispatch = useDispatch();
// // // //   // const navigate = useNavigate();

// // // //   //really the same like in Product page!!!!
// // // //   async function fetchReviews() {
// // // //     debugger
// // // //     if (reviewList.length == 0) {
// // // //       try {
// // // //         const response = await GetAllReviews();
// // // //         setReviews(response.data);
// // // //         myDispatch(fillReviewsList(response.data));
// // // //       } catch (err) {
// // // //         console.error('Error fetching reviews:', err);
// // // //       }
// // // //     } else {
// // // //       setReviews(reviewList);
// // // //     }
// // // //   }

// // // //   // Call the function automatically
// // // //   useEffect(f => {
// // // //     fetchReviews();
// // // //     //TODO//
// // // //     //why it does'nt work?
// // // //     //setReviews(reviewList);
// // // //   }, []);


// // // //   // // Calculate average rating
// // // //   // const averageRating = 3;//reviews.length ? (reviews.reduce((sum, review) => sum + review.Rating, 0) / reviews.length).toFixed(1) : 0;

// // // //   // // Calculate ratings distribution
// // // //   // const ratingsDistribution = [0, 0, 0, 0, 0]; // [5 stars, 4 stars, 3 stars, 2 stars, 1 star]
// // // //   // reviews.forEach(review => {
// // // //   //   ratingsDistribution[5 - review.Rating]++;
// // // //   // });

// // // //   // const totalRatings = reviews.length;

// // // //   // // Function to render star ratings based on a given rating
// // // //   // const renderStars = (rating) => {
// // // //   //   return (
// // // //   //     [...Array(5)].map((_, index) => (
// // // //   //       <FaStar key={index} style={{ color: index < rating ? 'gold' : 'lightgray' }} />
// // // //   //     ))
// // // //   //   );
// // // //   // };

// // // //   // const navigateToReviewForm = () => {
// // // //   //   alert('Navigate to review form');
// // // //   // };

// // // //   // const sentToSeeStars = (numOfStar) => {
// // // //   //   // Navigate to product details page with product ID
// // // //   //   // navigate(`/myShowReviews/${numOfStar}`);  
// // // //   // };

// // // //   return (
// // // //     <div>
// // // //       {reviews.map((r, i)=>(
// // // //         <div>{r.Rating}</div>
// // // //         ))}
// // // //     </div>
// // // //     // <div className="container mt-4" style={{ direction: 'rtl', textAlign: 'right' }}>
// // // //     //   <div className="row">
// // // //     //     <div className="col-md-4 mb-4">
// // // //     //       <div className="p-4 bg-white rounded shadow-sm">
// // // //     //         <h2 className="mb-4" style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', fontWeight: 'bold', color: '#333' }}>ביקורות מוצר של לקוחות</h2>
// // // //     //         <div className="d-flex align-items-center mb-3">
// // // //     //           {renderStars(averageRating)}
// // // //     //           <span className="ml-2" style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#333' }}>{averageRating} מתוך 5 כוכבים</span>
// // // //     //         </div>
// // // //     //         <p className="font-weight-bold" style={{ fontSize: '1.2em', color: '#666' }}>{averageRating} מתוך 5</p>
// // // //     //         <p className="font-weight-bold" style={{ fontSize: '1.2em', color: '#666' }}>{totalRatings} דירוגים גלובליים</p>
// // // //     //         <div>
// // // //     //           {ratingsDistribution.map((percent, index) => (
// // // //     //             <div key={index} className="d-flex align-items-center mb-2">
// // // //     //               <span className="font-weight-bold" style={{ color: '#555' }}>
// // // //     //                 <button className="btn btn-light " onClick={() => sentToSeeStars(5 - index)}>
// // // //     //                   {5 - index} כוכבים
// // // //     //                 </button>
// // // //     //               </span>
// // // //     //               <div className="progress w-100 mx-2" style={{ height: '1.5rem', backgroundColor: '#f1f1f1' }}>
// // // //     //                 <div className="progress-bar bg-warning" style={{ width: `${(percent / totalRatings) * 100}%`, borderRadius: '0' }}></div>
// // // //     //               </div>
// // // //     //               <span className="font-weight-bold" style={{ color: '#555' }}>{((percent / totalRatings) * 100).toFixed(0)}%</span>
// // // //     //             </div>
// // // //     //           ))}
// // // //     //         </div>
// // // //     //         <h3 className="mt-4" style={{ fontSize: '1.3em', fontWeight: 'bold', color: '#d9534f' }}>אפס סובלנות לביקורות מזויפות</h3>
// // // //     //         <button className="btn btn-lg btn-dark my-3" onClick={navigateToReviewForm} style={{ borderRadius: '0', fontWeight: 'bold', backgroundColor: '#333', color: '#fff' }}>כתוב ביקורת על מוצר זה</button>
// // // //     //         <p className="font-weight-bold" style={{ fontSize: '1.1em', color: '#666' }}>שתפו אחרים בדעותיכם</p>
// // // //     //         <button className="btn btn-lg btn-secondary" style={{ borderRadius: '0', fontWeight: 'bold', backgroundColor: '#6c757d', color: '#fff' }}>כתוב ביקורת צרכן</button>
// // // //     //       </div>
// // // //     //     </div>
// // // //     //   </div>
// // // //     // </div>
// // // //   );
// // // // };

// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { GetAllReviews } from "../../../axios/ReviewsAxios";
// // import { FaStar } from 'react-icons/fa';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { fillReviewsList } from "../../../redux/DataActions/DataAction.Reviews";
// // import { ShowReviews } from "../ShowReviews";

// // export const Review = () => {
// //   const reviewList = useSelector(state => state.DataReducer_Reviews.ReviewsList);
// //   const [reviews, setReviews] = useState(reviewList);
// //   const [rating, setRating] = useState(0);  // Add state for rating
// //   const [hoverRating, setHoverRating] = useState(0); // Add state for hover rating
// //   const dispatch = useDispatch();

// //   async function fetchReviews() {
// //     if (reviewList.length === 0) {
// //       try {
// //         const response = await GetAllReviews();
// //         setReviews(response.data);
// //         dispatch(fillReviewsList(response.data));
// //       } catch (err) {
// //         console.error('Error fetching reviews:', err);
// //       }
// //     } else {
// //       setReviews(reviewList);
// //     }
// //   }

// //   useEffect(() => {
// //     fetchReviews();
// //   }, []);

// //   const handleStarClick = (index) => {
// //     setRating(index + 1); // Save the rating as 1-based index
// //   };

// //   const handleMouseEnter = (index) => {
// //     setHoverRating(index + 1); // Set hover rating as 1-based index
// //   };

// //   const handleMouseLeave = () => {
// //     setHoverRating(0); // Reset hover rating when mouse leaves
// //   };

// //   return (
// //     <div className="container">
// //             {/* <ShowReviews></ShowReviews> */}
// //       <div className="row">
// //         <div className="col-md-6">
// //           <h2>הוסיפו חוות דעת</h2>
// //           <form>
// //             <div className="form-group">
// //               <label>שם המתחאר</label>
// //               <input type="text" className="form-control" />
// //             </div>
// //             <div className="form-group">
// //               <label>מסי טלפון</label>
// //               <input type="text" className="form-control" />
// //             </div>
// //             <div className="form-group">
// //               <label>תאריך אירוח</label>
// //               <input type="date" className="form-control" />
// //             </div>
// //             <div className="form-group">
// //               <label>דירוג</label>
// //               <div className="star-rating">
// //                 {Array.from({ length: 5 }, (_, index) => (
// //                   <FaStar
// //                     key={index}
// //                     color={(index < (hoverRating || rating)) ? "gold" : "gray"}
// //                     onClick={() => handleStarClick(index)}
// //                     onMouseEnter={() => handleMouseEnter(index)}
// //                     onMouseLeave={handleMouseLeave}
// //                     style={{ cursor: 'pointer' }}
// //                   />
// //                 ))}
// //               </div>
// //             </div>
// //             <div className="form-group">
// //               <label>כותרת</label>
// //               <input type="text" className="form-control" />
// //             </div>
// //             <div className="form-group">
// //               <label>הודעה</label>
// //               <textarea className="form-control"></textarea>
// //             </div>
// //             <button type="submit" className="btn btn-primary">שליחה</button>
// //           </form>
// //         </div>
// //         <div className="col-md-6">
// //           <h2>חוות דעת על הוילה</h2>
// //           {reviews.length === 0 ? (
// //             <p>Loading...</p>
// //           ) : (
// //             reviews.map((review, index) => (
// //               <div key={index} className="review-item">
// //                 <div className="review-header">
// //                   <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
// //                   <span className="review-rating">
// //                     {Array.from({ length: 5 }, (_, i) => (
// //                       <FaStar key={i} color={i < review.rating ? "gold" : "gray"} />
// //                     ))}
// //                   </span>
// //                 </div>
// //                 <div className="review-body">
// //                   <p>{review.comment}</p>
// //                 </div>
// //               </div>
// //             ))
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // // // import { useEffect, useState } from "react";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { GetAllReviews } from "../../../axios/ReviewsAxios";
// // // // import { FaStar } from 'react-icons/fa';
// // // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // // import { fillReviewsList } from "../../../redux/DataActions/DataAction.Reviews";

// // // // export const Review = () => {
// // // //   const [rating, setRating] = useState(0);
// // // //   const [hoverRating, setHoverRating] = useState(0);
// // // //   let reviewList = useSelector(s => s.DataReducer_Reviews.ReviewsList);
// // // //   let [reviews, setReviews] = useState(reviewList);
// // // //   const myDispatch = useDispatch();

// // // //   async function fetchReviews() {
// // // //     if (reviewList.length === 0) {
// // // //       try {
// // // //         const response = await GetAllReviews();
// // // //         setReviews(response.data);
// // // //         myDispatch(fillReviewsList(response.data));
// // // //       } catch (err) {
// // // //         console.error('Error fetching reviews:', err);
// // // //       }
// // // //     } else {
// // // //       setReviews(reviewList);
// // // //     }
// // // //   }

// // // //   useEffect(() => {
// // // //     fetchReviews();
// // // //   }, []);

// // // //   return (
// // // //     <div className="container">
// // // //       <div className="row">
// // // //         <div className="col-md-6">
// // // //           <h2>הוסיפו חוות דעת</h2>
// // // //           <form>
// // // //             <div className="form-group">
// // // //               <label>שם המתחאר</label>
// // // //               <input type="text" className="form-control" />
// // // //             </div>
// // // //             <div className="form-group">
// // // //               <label>מסי טלפון</label>
// // // //               <input type="text" className="form-control" />
// // // //             </div>
// // // //             <div className="form-group">
// // // //               <label>תאריך אירוח</label>
// // // //               <input type="date" className="form-control" />
// // // //             </div>
// // // //             <div className="form-group">
// // // //               <label>דירוג</label>
// // // //               <div className="star-rating">
// // // //                 {Array.from({ length: 5 }, (_, index) => (
// // // //                   <FaStar
// // // //                     key={index}
// // // //                     color={index < rating ? "gold" : "gray"}
// // // //                     onClick={() => setRating(index + 1)}
// // // //                     onMouseEnter={() => setHoverRating(index + 1)}
// // // //                     onMouseLeave={() => setHoverRating(0)}
// // // //                     style={{ cursor: 'pointer' }}
// // // //                   />
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //             <div className="form-group">
// // // //               <label>כותרת</label>
// // // //               <input type="text" className="form-control" />
// // // //             </div>
// // // //             <div className="form-group">
// // // //               <label>הודעה</label>
// // // //               <textarea className="form-control"></textarea>
// // // //             </div>
// // // //             <button type="submit" className="btn btn-primary">שליחה</button>
// // // //           </form>
// // // //         </div>
// // // //         <div className="col-md-6">
// // // //           <h2>חוות דעת על הוילה</h2>
// // // //           {reviews.length === 0 ? (
// // // //             <p>Loading...</p>
// // // //           ) : (
// // // //             reviews.map((review, index) => (
// // // //               <div key={index} className="review-item">
// // // //                 <div className="review-header">
// // // //                   <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
// // // //                   <span className="review-rating">
// // // //                     {Array.from({ length: 5 }, (_, i) => (
// // // //                       <FaStar key={i} color={i < review.rating ? "gold" : "gray"} />
// // // //                     ))}
// // // //                   </span>
// // // //                 </div>
// // // //                 <div className="review-body">
// // // //                   <p>{review.comment}</p>
// // // //                 </div>
// // // //               </div>
// // // //             ))
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };
// // // // import { useEffect, useState } from "react";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { GetAllReviews } from "../../../axios/ReviewsAxios";
// // // // import { FaStar } from 'react-icons/fa';
// // // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // // import { fillReviewsList } from "../../../redux/DataActions/DataAction.Reviews";
// // // // import { ShowReviews } from "../ShowReviews";

// // // // export const Review = () => {
// // // //   const reviewList = useSelector(state => state.DataReducer_Reviews.ReviewsList);
// // // //   const [reviews, setReviews] = useState(reviewList);
// // // //   const [rating, setRating] = useState(0);  // הוספת משתנה rating
// // // //   const [hoverRating, setHoverRating] = useState(0); // הוספת משתנה hoverRating
// // // //   const dispatch = useDispatch();

// // // //   async function fetchReviews() {
// // // //     if (reviewList.length === 0) {
// // // //       try {
// // // //         const response = await GetAllReviews();
// // // //         setReviews(response.data);
// // // //         dispatch(fillReviewsList(response.data));
// // // //       } catch (err) {
// // // //         console.error('Error fetching reviews:', err);
// // // //       }
// // // //     } else {
// // // //       setReviews(reviewList);
// // // //     }
// // // //   }

// // // //   useEffect(() => {
// // // //     fetchReviews();
// // // //   }, []);

// // // //   const handleStarClick = (index) => {
// // // //     setRating(index + 1); // שמירת הדירוג כ-1 מבוסס אינדקס
// // // //   };

// // // //   const handleMouseEnter = (index) => {
// // // //     setHoverRating(index + 1); // הגדרת דירוג הצפה כ-1 מבוסס אינדקס
// // // //   };

// // // //   const handleMouseLeave = () => {
// // // //     setHoverRating(0); // איפוס דירוג הצפה כשהעכבר עוזב
// // // //   };

// // // //   return (
// // // //     <div className="container">
// // // //       <ShowReviews />
// // // //       <div className="row">
// // // //         <div className="col-md-6">
// // // //           <h2>הוסיפו חוות דעת</h2>
// // // //           <form>
// // // //             <div className="form-group">
// // // //               <label>שם המתחאר</label>
// // // //               <input type="text" className="form-control" />
// // // //             </div>
// // // //             <div className="form-group">
// // // //               <label>מסי טלפון</label>
// // // //               <input type="text" className="form-control" />
// // // //             </div>
// // // //             <div className="form-group">
// // // //               <label>תאריך אירוח</label>
// // // //               <input type="date" className="form-control" />
// // // //             </div>
// // // //             <div className="form-group">
// // // //               <label>דירוג</label>
// // // //               <div className="star-rating">
// // // //                 {Array.from({ length: 5 }, (_, index) => (
// // // //                   <FaStar
// // // //                     key={index}
// // // //                     color={(index < (hoverRating || rating)) ? "gold" : "gray"}
// // // //                     onClick={() => handleStarClick(index)}
// // // //                     onMouseEnter={() => handleMouseEnter(index)}
// // // //                     onMouseLeave={handleMouseLeave}
// // // //                     style={{ cursor: 'pointer' }}
// // // //                   />
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //             <div className="form-group">
// // // //               <label>כותרת</label>
// // // //               <input type="text" className="form-control" />
// // // //             </div>
// // // //             <div className="form-group">
// // // //               <label>הודעה</label>
// // // //               <textarea className="form-control"></textarea>
// // // //             </div>
// // // //             <button type="submit" className="btn btn-primary">שליחה</button>
// // // //           </form>
// // // //         </div>
// // // //         <div className="col-md-6">
// // // //           <h2>חוות דעת על הוילה</h2>
// // // //           {reviews.length === 0 ? (
// // // //             <p>Loading...</p>
// // // //           ) : (
// // // //             reviews.map((review, index) => (
// // // //               <div key={index} className="review-item">
// // // //                 <div className="review-header">
// // // //                   <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
// // // //                   <span className="review-rating">
// // // //                     {Array.from({ length: 5 }, (_, i) => (
// // // //                       <FaStar key={i} color={i < review.rating ? "gold" : "gray"} />
// // // //                     ))}
// // // //                   </span>
// // // //                 </div>
// // // //                 <div className="review-body">
// // // //                   <p>{review.comment}</p>
// // // //                 </div>
// // // //               </div>
// // // //             ))
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // import { useEffect, useState } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { GetAllReviews } from "../../../axios/ReviewsAxios";
// // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // import { fillReviewsList } from "../../../redux/DataActions/DataAction.Reviews";

// // // export const Review = () => {
// // //   const reviewList = useSelector(state => state.DataReducer_Reviews.ReviewsList);
// // //   const [reviews, setReviews] = useState([]);
// // //   const dispatch = useDispatch();

// // //   async function fetchReviews() {
// // //     console.log('Fetching reviews...');
// // //     if (reviewList.length === 0) {
// // //       try {
// // //         const response = await GetAllReviews();
// // //         console.log('Fetched reviews:', response.data);
// // //         setReviews(response.data);
// // //         dispatch(fillReviewsList(response.data));
// // //       } catch (err) {
// // //         console.error('Error fetching reviews:', err);
// // //       }
// // //     } else {
// // //       console.log('Using reviews from state:', reviewList);
// // //       setReviews(reviewList);
// // //     }
// // //   }

// // //   useEffect(() => {
// // //     fetchReviews();
// // //   }, []);

// // //   console.log('Rendered reviews:', reviews);

// // //   return (
// // //     <div>
// // //       {reviews.map((review) => (
// // //         <p key={review.ReviewID}>{review.ReviewID}</p>
// // //       ))}
// // //     </div>
// // //   );
// // // };

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { GetAllReviews } from "../../../axios/ReviewsAxios";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { fillReviewsList } from "../../../redux/DataActions/DataAction.Reviews";

// export const Review = () => {
//   const reviewList = useSelector(state => state.DataReducer_Reviews.ReviewsList);
//   const [reviews, setReviews] = useState(reviewList); // Initialize with reviewList
//   const dispatch = useDispatch();

//   async function fetchReviews() {
//     console.log('Fetching reviews...');
//     if (reviewList.length === 0) {
//       try {
//         const response = await GetAllReviews();
//         console.log('Fetched reviews:', response.data);
//         setReviews(response.data);
//         dispatch(fillReviewsList(response.data));
//       } catch (err) {
//         console.error('Error fetching reviews:', err);
//       }
//     } else {
//       console.log('Using reviews from state:', reviewList);
//       setReviews(reviewList);
//     }
//   }

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   console.log('Rendered reviews:', reviews);

//   return (
//     <div>
//       {reviews.map((review, index) => (
//         <p key={index}>{review.ReviewID}</p>
//       ))}
//     </div>
//   );
// };


import { useEffect, useState } from "react";
import { GetAllReviews } from "../../../axios/ReviewsAxios";

export const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await GetAllReviews();
        console.log('Fetched reviews:', response.data);
        setReviews(response.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    }
    fetchReviews();
  }, []);

  return (
    <div>
      {reviews.map((review, index) => (
        <p key={index}>{review.ReviewID}</p>
      ))}
    </div>
  );
};