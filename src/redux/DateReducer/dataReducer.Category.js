import { produce } from "immer"
export const InitialState_Category = {
    //משתנים גלובלים
    Categorylist:
        [],

    ProducrtToCategory:[ ]

}
export const DataReducer_Categry = produce((state, action) => {
    switch (action.type) {
        case "SET_CATEGORY_LIST": {
            state.Categorylist = action.payload
            break
        }case "SET_PTODUCTS_CATEGORY_LIST": {
            state.ProducrtToCategory = action.payload
            break
        }
        default:
            break;
    }
}, InitialState_Category)


