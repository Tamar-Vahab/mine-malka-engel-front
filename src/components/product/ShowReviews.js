import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GetReviewByProd } from "../../axios/ReviewsAxios";
import { FaStar } from 'react-icons/fa';
import { fillReviewsList } from "../../redux/DataActions/DataAction.Reviews";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

export const ShowReviews = () => {
    let param = useParams();
    const { t, i18n } = useTranslation();
    let reviewList = useSelector(state => state.DataReducer_Reviews.ReviewsProduct);
    const [reviews, setReviews] = useState(reviewList.filter(review => review.rating === parseInt(param.numStars)));

    // Function to handle user feedback (happy/sad)
    const handleFeedback = (reviewId, feedbackType) => {
        console.log(`User feedback for review ${reviewId}: ${feedbackType}`);
    };

    const renderStars = (rating) => {
        return (
            [...Array(5)].map((_, index) => (
                <FaStar key={index} style={{ color: index < rating ? 'gold' : 'lightgray' }} />
            ))
        );
    };

    return (
        //TODO//
        //continue working!!!!!!!!!!!
        <div className="container">
            <br></br>
            <h3>The all reviews for {param.numStars} stars</h3>
            <p>this is a personaly opinios from our custemers</p>
            <div className="">
                <div className="col-md-16">
                    {reviews.map(review => (
                        <div className="card mb-3" key={review.reviewID}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h5 className="card-title">{review.productId}</h5>
                                    <span>{review.userId}</span>
                                </div>
                                <div className="card-text mb-2">{renderStars(review.rating)}</div>
                                <p className="card-text">{review.comment}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group" role="group" aria-label="User feedback">
                                        <button className="btn btn-outline-success" onClick={() => handleFeedback(review.reviewID, 'happy')}>
                                            😊 Happy
                                        </button>
                                        <button className="btn btn-outline-danger" onClick={() => handleFeedback(review.reviewID, 'sad')}>
                                            😞 Sad
                                        </button>
                                    </div>
                                    <small className="text-muted">{review.createdAt}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">More Details</h5>
                            <p className="card-text">Placeholder for more details about the product.</p>
                            <textarea className="form-control mb-3" placeholder="Enter more details..." ></textarea>
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};