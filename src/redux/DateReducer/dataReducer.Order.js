import { produce } from "immer"
export const InitialState_Orders = {
//משתנים גלובלים
         Orderslist:[  ]        
}
export const DataReducer_Orders = produce((state, action)=>{
    switch(action.type)
    {
        case "FILL_ORDERS_LIST":{
            state.Orderslist = action.payload
            break
        }
        default:
            break;
    }
}, InitialState_Orders)
