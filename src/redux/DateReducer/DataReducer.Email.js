import { produce } from "immer"
export const InitialState_Email = {
    //משתנים גלובלים
    email:
        []
}
export const DataReducer_Email = produce((state, action) => {
    switch (action.type) {
        case "ADD_Email": {
            state.email = action.payload
            break
        }
    }
}, InitialState_Email)