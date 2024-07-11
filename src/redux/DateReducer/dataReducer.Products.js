import { produce } from "immer"

export const InitialState_Products = {
    //משתנים גלובלים
    Prodlist:
        [
           
                // {
                //     id: "2",
                //     name: 'דגם h',
                //     price: 50,
                //     image: 'product1.jpg',
                //     kind: 'פוסטר',
                //     url: "מזכרות / קטלוג מוצרים / אירועים / דגם גפן / פוסטר מק",
                //     size: "אורך:  13.0ס״מ רוחב:  13.0ס״מ"
                // },
                // {
                //     id:"3" ,
                //     name: 'דגם ssss',
                //     price: 50,
                //     image: 'product1.jpg',
                //     kind: 'ASSSDD',
                //     url: "מזכרות / קטלוג מוצרים / אירועים / דגם גפן / פוסטר מק",
                //     size: "אורך:  13.0ס״מ רוחב:  13.0ס״מ"
                // },
                // {
                //     id: "1",
                //     name: 'דגם גפן',
                //     price: 50,
                //     image: 'product1.jpg',
                //     kind: 'GHGJGJ',
                //     url: "מזכרות / קטלוג מוצרים / אירועים / דגם גפן / פוסטר מק",
                //     size: "אורך:  13.0ס״מ רוחב:  13.0ס״מ"
                // }
           
        ]
}
export const DataReducer_Products = produce((state, action) => {
    switch (action.type) {
        case "SET_PRODUCT_LIST": {
            state.Prodlist = action.payload
            break
        }

        default:
            break;
    }
}, InitialState_Products)