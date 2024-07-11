export const setUserList=(list)=>{
    return {type:"SET_USER_LIST",payload: list};
}
export const setCurrentUser=(user)=>{
    return {type:"SET_CURRENT_USER",payload: user};
}
export const connect=(t)=>{
    return {type:"SET_CURRENT",payload: t};
}
export const getOrdersByUserId=(id)=>{
    return {type:"SET_ORDERS_LIST",payload: id};
}
