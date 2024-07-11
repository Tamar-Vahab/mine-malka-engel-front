import { produce } from "immer"
export const InitialState_Users = {
    UserList: [],
    currentUser: {},
    connected: false,
    ordersList:[]
}

export const DataReducer_Users = produce ((state, action) => {
    switch (action.type) {
        case "SET_USER_LIST": {
            state.UserList = action.payload
            break
        }
        case "SET_CURRENT_USER": {
            state.currentUser = action.payload
            break
        }
        case "SET_CURRENT": {
            state.connected = action.payload
            break
        }
        case "SET_ORDERS_LIST": {
            state.ordersList = action.payload
            break;
        }
        default:
            break;
    }
}, InitialState_Users)

