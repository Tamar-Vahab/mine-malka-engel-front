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

    // Function to handle user feedback (happy/sad)
    const handleFeedback = (reviewId, feedbackType) => {
        console.log(`User feedback for review ${reviewId}: ${feedbackType}`);
    };

    const { t, i18n } = useTranslation();
    let reviewList = useSelector(state => state.DataReducer_Reviews.ReviewsList);
    const [reviews, setReviews] = useState([]);
    const myDispatch = useDispatch();

    //TODO//
    //if i need to call the function from server
    // async function fetchReviewByProdID() {
    //     try {
    //         var response = await GetReviewByProd(param.numStars);
    //         setReviews(response.data); // Assuming response.data contains the list of reviews
    //         myDispatch(fillReviewsList(response.data));
    //     } catch {
    //         alert("ERR");
    //     }
    // }

    const renderStars = (rating) => {
        return (
            [...Array(5)].map((_, index) => (
                <FaStar key={index} style={{ color: index < rating ? 'gold' : 'lightgray' }} />
            ))
        );
    };

    useEffect(() => {
        // fetchReviewByProdID();
        const filteredReviews = reviewList.filter(review => review.Rating === parseInt(param.numStars));
        setReviews(filteredReviews);
    }, [param.numStars, reviewList]);

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
                        <div className="card mb-3" key={review.ReviewID}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h5 className="card-title">{review.ProductId}</h5>
                                    <span>{review.UserId}</span>
                                </div>
                                <div className="card-text mb-2">{renderStars(review.Rating)}</div>
                                <p className="card-text">{review.Comment}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group" role="group" aria-label="User feedback">
                                        <button className="btn btn-outline-success" onClick={() => handleFeedback(review.ReviewID, 'happy')}>
                                            😊 Happy
                                        </button>
                                        <button className="btn btn-outline-danger" onClick={() => handleFeedback(review.ReviewID, 'sad')}>
                                            😞 Sad
                                        </button>
                                    </div>
                                    <small className="text-muted">{review.CreatedAt}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">More Details</h5>
                            <p className="card-text">Placeholder for more details about the product.</p>
                            <textarea className="form-control mb-3" placeholder="Enter more details..."></textarea>
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};