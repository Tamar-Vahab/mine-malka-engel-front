
import { produce } from "immer"

export const InitialState_Reviews = {
    ReviewsList:
        [
        //     {
        //         ReviewID: 1,
        //         ProductID: 2,
        //         UserID: 3,
        //         Rating: 5,
        //         Comment: "a buetefully review",
        //         CreatedAt: "2015-09-90"
        //     },
        //     {
        //         ReviewI: 2,
        //         ProductID: 4,
        //         UserID: 3,
        //         Rating: 3,
        //         Comment: "a wanderfull review",
        //         CreatedAt: "2020-09-90"
        //     },
        //     {
        //         ReviewID: 1,
        //         ProductID: 2,
        //         UserID: 3,
        //         Rating: 5,
        //         Comment: "a buetefully review",
        //         CreatedAt: "2015-09-90"
        //     },
        //     {
        //         ReviewI: 2,
        //         ProductID: 4,
        //         UserID: 3,
        //         Rating: 4,
        //         Comment: "a wanderfull review",
        //         CreatedAt: "2020-09-90"
        //     },
        //     {
        //         ReviewID: 1,
        //         ProductID: 2,
        //         UserID: 3,
        //         Rating: 4,
        //         Comment: "a buetefully review",
        //         CreatedAt: "2015-09-90"
        //     },
        //     {
        //         ReviewI: 2,
        //         ProductID: 4,
        //         UserID: 3,
        //         Rating: 5,
        //         Comment: "a wanderfull review",
        //         CreatedAt: "2020-09-90"
        //     },
        //     {
        //         ReviewID: 1,
        //         ProductID: 2,
        //         UserID: 3,
        //         Rating: 5,
        //         Comment: "a buetefully review",
        //         CreatedAt: "2015-09-90"
        //     },
        //     {
        //         ReviewI: 2,
        //         ProductID: 4,
        //         UserID: 3,
        //         Rating: 5,
        //         Comment: "a wanderfull review",
        //         CreatedAt: "2020-09-90"
        //     }
        ],
        ReviewsProduct: []
}
export const DataReducer_Reviews = produce((state, action) => {
    switch (action.type) {
        case 'FILL_REVIEWS_LIST': {
            state.ReviewsList = action.payload;
            break;
        }
        case 'FILL_REVIEWS_FOR_PRODUCT': {
            state.ReviewsProduct = action.payload;
            break;
        }
        default:
            break;
    }
}, InitialState_Reviews);
