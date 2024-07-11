import {produce} from "immer"
export const InitialState_FAQ = {
//משתנים גלובלים
         FAQlist:
        [  ]         
        
}
export const DataReducer_FAQ = produce((state, action)=>{
    switch(action.type)
    {
        case "SET_FAQLIST":{
            state.FAQlist = action.payload
            break
        }
        default:
            break;
    }
}, InitialState_FAQ)


