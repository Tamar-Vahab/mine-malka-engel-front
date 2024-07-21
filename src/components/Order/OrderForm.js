import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { PageTitle } from '../Layout Components/PageTitle';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, getCart } from '../product/cookies/SetCart';
import { GetOrderByOrderId, PostOrder, PutAllPropOfOrder, } from '../../axios/OrderAxios';
import { PostOrderItemList } from '../../axios/OrderItemAxios';
import { PopUp } from '../Cart/popUp';

export const OrderForm = () => {
    const { t, i18n } = useTranslation();
    const { currentUser, connected } = useSelector(u => u.DataReducer_Users);
    const navigate = useNavigate();
    const [currentCart, setCurrentCart] = useState(getCart());

    const func_submit = async () => {
        if (!connected)
            navigate('/myToConnect')
        else {
            if (currentCart.length == 0) { alert('Please select prducts to order'); }
            else {
                //Add order//
                const order = {
                    "OrderID": 0,
                    "UserID": currentUser.userID,
                    "TotalAmount": 0,
                    "Status": "Processing",
                    "CreatedAt": "2024-07-07T09:31:32.38"
                }
                const result = await PostOrder(order);
                const orderidToAdd = result;
                // end //
                if (!orderidToAdd) {
                    alert("Failed to create order, please try again later");
                    return;
                }
                else {
                    // add item order // 
                    currentCart.map(async (product, index) => {
                        const listItemOrder = []
                        currentCart.map((product, i) => {
                            if (product.quantity == undefined)
                                product.quantity = 1;
                            //TODO//
                            //if the quantity is more than 1 - i have to fix this problem!
                            const itemOrder = {
                                "OrderItemID": 0,
                                "OrderID": orderidToAdd,
                                "ProductID": product.productID,
                                "Quantity": product.quantity,
                                "Price": product.price
                            }
                            listItemOrder.push(itemOrder);
                        })
                        const result = await PostOrderItemList(listItemOrder);
                        // end //
                        let tAmount = 0;
                        for (let i = 0; i < listItemOrder.length; i++) {
                            tAmount = tAmount + listItemOrder[i].Price * listItemOrder[i].Quantity
                        }
                        let order = await GetOrderByOrderId(orderidToAdd);
                        order.totalAmount = tAmount;
                        let resultFrUpdate = await PutAllPropOfOrder(orderidToAdd, order);
                        if (resultFrUpdate) {
                            alert("Order sent successfully!")
                        }
                        else
                            alert(result);
                        //delete all data from cookies
                        clearCart();
                        navigate('/myHome')
                    })
                }
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="mb-4">
                <PageTitle title={t('orderFormPage.title')} />
            </div>
            <h3>פרטי אשראי!</h3>
            <button onClick={func_submit} className="btn btn-primary">{t('orderFormPage.buttonSubmitOrder')}</button>
        </div>
    )
}
