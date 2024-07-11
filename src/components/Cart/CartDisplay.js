
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getCart } from "../product/cookies/SetCart";
import { setCookie } from "../product/cookies/CookieUtils";
import { useNavigate } from "react-router-dom";
import { OrderForm } from "../Order/OrderForm";

//##################################################//
//this is th page that loads in the shopping cart //
export const CartDisplay = () => {
  // קבלת כל המוצרים מה-Cookies
  const [cart, setCart] = useState(getCart());
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language === "en" ? "En" : "He";

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    setCookie("cart", JSON.stringify(newCart), 7); // עדכון ה-Cookie
  };

  const handleQuantityChange = (index, quantity) => {
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
    setCookie("cart", JSON.stringify(newCart), 7); // עדכון ה-Cookie
  };

  const goToCheckout = () => {
    if (cart.length === 0) {
      alert(t('shoppingCartPage.emptyCartMessage'));
      return;
    }
    navigate('/myOrderForm');
  };

  return (
    <div className="container mt-4">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>{t("Product Name")}</th>
            <th>{t("Quantity")}</th>
            <th>{t("Price")}</th>
            <th>{t("Total")}</th>
            <th>{t("Actions")}</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => (
            <tr key={index}>
              <td><button 
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'black',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  outline: 'none'
              }}
              onClick={()=>{navigate(`/myProduct/${product.productID}`)}}>{product[`name${currentLanguage}`]}</button></td>
              <td>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  value={product.quantity || 1}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </td>
              <td>{product.price}</td>
              <td>{(product.price * (product.quantity || 1)).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(index)}
                >
                  {t("Remove")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right">
        {/* <button className="btn btn-primary" onClick={goToCheckout} >{t("Proceed to Checkout")}</button> */}
        <OrderForm></OrderForm>
      </div>
    </div>
  );
};