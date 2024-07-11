
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { GetAllOrders, PutOrder } from '../../axios/OrderAxios';
import { useDispatch, useSelector } from 'react-redux';
import { fillOrdersList } from '../../redux/DataActions/DataAction.Order';

const OrderManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState({ id: null, status: '' });
  const dispatch = useDispatch();
  const ordersList = useSelector(state => state.DataReducer_Orders.Orderslist);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(ordersList);
  }, [ordersList]);
  
  useEffect(() => {
    fetchOrdersFromServer();
  }, []);

  const fetchOrdersFromServer = async () => {
    try {
      const response = await GetAllOrders();
      setOrders(response);
      dispatch(fillOrdersList(response));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleStatusChange = async () => {
    try {
      debugger
      const result = await PutOrder({id:orderToUpdate.id, status:orderToUpdate.status});
      console.log(result);
      if (result === true) {
        const updatedOrders = await GetAllOrders();
        dispatch(fillOrdersList(updatedOrders));
        setOrders(updatedOrders);
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  
  const handleOpenModal = (id) => {
    debugger
    const order = orders.find(order => order.orderID === id);
    if (order && (order.status === 'Pending' || order.status === 'Proccess')) {
      setOrderToUpdate({ id:order.orderID, status: order.status });
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStatusSelection = (status) => {
    setOrderToUpdate({ ...orderToUpdate, status });
  };

  return (
    <div className="container">
      <h2 className="mt-4">ניהול הזמנות</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            
            <th>סטטוס</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            
            <tr key={order.orderID}>
              <td>{index + 1}</td>
              
              <td>{order.status}</td>
              <td>
                {(order.status === 'Pending' || order.status === 'Proccess') && (
                  <Button variant="primary" onClick={()=>handleOpenModal(order.orderID)}>
                    שנה סטטוס
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>שינוי סטטוס הזמנה</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>בחר סטטוס חדש להזמנה:</p>
          {orderToUpdate.status === 'Pending' && (
            <Button variant="success" onClick={() => handleStatusSelection('Proccess')}>
              מעבר לביצוע
            </Button>
          )}
          {orderToUpdate.status === 'Proccess' && (
            <Button variant="info" onClick={() => handleStatusSelection('Completed')}>
              הזמנה הושלמה
            </Button>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            ביטול
          </Button>
          <Button variant="primary" onClick={handleStatusChange}>
            שמור שינוי
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderManager;
