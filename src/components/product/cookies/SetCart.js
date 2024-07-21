
import { getCookie, setCookie } from './CookieUtils.js';

export const addToCart = (product) => {
  let cart = JSON.parse(getCookie('cart') || '[]');
  cart.push(product);
  setCookie('cart', JSON.stringify(cart), 7); // נשמור את העוגיה ל-7 ימים
};

export const clearCart = () => {
  setCookie('cart', '[]', 7);
};

export const getCart = () => {
  debugger
  const nameEQ = "cart=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return JSON.parse(c.substring(nameEQ.length, c.length));
  }
  return [];
};

export const removeFromCart = (productId) => {
  // Retrieve current cart from storage
  let currentCart = getCart();

  // Filter out the product with matching productId
  currentCart = currentCart.filter(item => item.productID !== productId);

  // Update the cart in storage
  setCookie("cart", JSON.stringify(currentCart), 7);

  // Optionally return the updated cart if needed
  return currentCart;
};
