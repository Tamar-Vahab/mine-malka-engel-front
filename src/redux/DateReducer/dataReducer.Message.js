import { produce } from "immer"

export const InitialState_Message = {
    MessagesList:[]      
}
export const DataReducer_Message = produce((state, action) => {
    switch (action.type) {
        case "SET_Messages_LIST": {
            state.MessagesList = action.payload
            break
        }
        default:
            break;
    }
}, InitialState_Message)