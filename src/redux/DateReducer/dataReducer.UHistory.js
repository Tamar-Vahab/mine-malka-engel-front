import { produce } from "immer"
export const InitialState_UHistory = {
    //משתנים גלובלים
    UHistorylist:
        [
            // {
            //     id: 1,
            //     questionH: "אאא",
            //     answerH: "ua. Ufhghfhrtthttht",
            //     questionE: "אאא",
            //     answerE: "ua. Ufhghfhrtthttht",
            //     Rating: 5
            // },
            //     {
            //         id: 2,
            //         question: "אאאב",
            //         answer: "ua. Ufhghfhrtthttht",
            //         Rating: 4
            //     },
            //     {
            //         id: 6,
            //         question: "אאאב ג ד",
            //         answer: "ua. Ufhghfhrtthttht",
            //         Rating: 1
            //     },
            //     {
            //         id: 4,
            //         question: "אאא נ",
            //         answer: "ua. Ufhghfhrtthttht",
            //         Rating: 0
            //     }             
        ]
}
export const DataReducer_UHistory = produce((state, action) => {
    switch (action.type) {
        case "SET_UHistoryLIST": {
            state.UHistorylist = action.payload
            break
        }
        default:
            break;
    }
}, InitialState_UHistory)