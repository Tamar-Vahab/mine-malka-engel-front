import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Alert, ListGroup } from 'react-bootstrap';
import { GetOrderByUserId } from "../../axios/OrderAxios";

export const OrderHistory = ({ connect }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.DataReducer_Users.currentUser);
  const connected = useSelector(state => state.DataReducer_Users.connected);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (connected) {
      fetchOrders(currentUser.userID);
    }
  }, [connected, currentUser]);
  
  const fetchOrders = async (userId) => {
    try {
      const response = await GetOrderByUserId(userId);
      setOrders(response.data);
    } catch (error) {
      console.error(`Error fetching orders for user ${userId}:`, error);
    }
  };

  const handleFetchOrders = () => {
    if (connected) {
      fetchOrders(currentUser.userID);
    }
  };

  return (
    <div className="order-history">
      {!connected && (
        <Alert variant="danger">
          <Alert.Heading>{t('OrderHistoryPage.not connect1')}</Alert.Heading>
          <p>
            {t('OrderHistoryPage.not connect2')}
          </p>
        </Alert>
      )}
      {connected && (
        <div>
          <h2>{t('OrderHistoryPage.ordersFor')} {currentUser.name}</h2>
          <ListGroup>
            {orders.map(order => (
              <ListGroup.Item key={order.orderId}>
                <p><strong>{t('OrderHistoryPage.createdAt')}:</strong> {order.createdAt}</p>
                <p><strong>{t('OrderHistoryPage.status')}:</strong> {order.status}</p>
                <p><strong>{t('OrderHistoryPage.totalAmount')}:</strong> {order.totalAmount}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
};
