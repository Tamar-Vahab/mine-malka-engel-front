import React from 'react';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

/*******************************************/
///i dont know if we useing this page!!! //
const CartSummary = ({ total, onCheckout }) => {
  const { t } = useTranslation();

  return (
    <div className="cart-summary card">
      <div className="card-body">
        <h5 className="card-title">{t('cartSummaryPage.summaryTitle')}</h5>
        <p className="card-text">
          {t('cartSummaryPage.total')}: <strong>${total.toFixed(2)}</strong>
        </p>
        <button className="btn btn-success w-100" onClick={onCheckout}>
          {t('shoppingCartPage.checkoutButton')}
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
