import React, { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PageTitle } from '../Layout Components/PageTitle';
import { CartDisplay } from './CartDisplay';
import { Button } from 'react-bootstrap';
import { getCart } from '../product/cookies/SetCart';



// export const itemsSubject = new BehaviorSubject([]);

export const ShoppingCart = () => {
  const [cart, setCart] = useState(getCart());
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const subscription = itemsSubject.subscribe((cartItems) => {
  //     setItems(cartItems);
  //     calculateTotal(cartItems);
  //   });


  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, []);

  // const calculateTotal = (cartItems) => {
  //   const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  //   setTotal(totalAmount);
  // };

  // const addItem = (item) => {
  //   const currentItems = itemsSubject.value;
  //   const existingItemIndex = currentItems.findIndex(i => i.id === item.id);

  //   if (existingItemIndex >= 0) {
  //     const updatedItems = [...currentItems];
  //     updatedItems[existingItemIndex].quantity += item.quantity;
  //     itemsSubject.next(updatedItems);
  //   } else {
  //     itemsSubject.next([...currentItems, item]);
  //   }
  // };




  // const removeItem = (item) => {
  //   const updatedItems = itemsSubject.value.filter(i => i.id !== item.id);
  //   itemsSubject.next(updatedItems);
  // };

  // const clearBasket = () => {
  //   itemsSubject.next([]);
  // };


  


  return (
    <div className="shopping-cart">
      <div className="nav-item">
        <br></br><br></br>
        <FontAwesomeIcon icon={faShoppingCart} size="2x" />
      </div>
      <div>
        <PageTitle title={t('shoppingCartPage.title')} />
      </div>
      {cart.length < 0 ? (
        <p>{t('shoppingCartPage.p1')}</p>) : (
        <CartDisplay></CartDisplay>
      )}
    
      {/* <button onClick={goToCheckout}>{t('shoppingCartPage.checkoutButton')}</button> */}
    </div>
  );
};

