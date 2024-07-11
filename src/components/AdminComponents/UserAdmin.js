import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Modal, Button } from 'react-bootstrap';
import { GetAllUsers } from '../../axios/UsersAxios'; // Assuming this is the function to get orders by user ID
import { GetOrderByUserId } from '../../axios/OrderAxios';

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState(false); // State for showing user details modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []);

  const fetchOrders = async (userId) => {
    try {
      const response = await GetOrderByUserId(userId);
      setOrders(response.data);
    } catch (error) {
      console.error(`Error fetching orders for user ${userId}:`, error);
    }
  };

  const handleUserClick = async (userId) => {
    setSelectedUserId(userId);
    setShowUserDetails(true); // Show user details modal
    await fetchOrders(userId);
  };

  const handleCloseUserDetails = () => {
    setShowUserDetails(false); // Close user details modal
    setSelectedUserId(null); // Reset selectedUserId when closing modal
    setOrders([]); // Clear orders when closing modal
  };

  return (
    <Container>
      <h1 className="my-4">מסך ניהול משתמשים</h1>
      <Row>
        <Col md={12}>
          <ListGroup>
            {users.map(user => (
              <ListGroup.Item key={user.userID}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p><strong>תז' המשתמש:</strong> {user.userID}</p>
                    <p><strong>שם:</strong> {user.name}</p>
                    <p><strong>מייל:</strong> {user.email}</p>
                    <p><strong>פלאפון:</strong> {user.phoneNumber}</p>
                    <p><strong>סיסמא :</strong> {user.passwordHash}</p>
                    <p><strong>נוצר בתאריך:</strong> {user.createdAt}</p>
                  </div>
                  <button className="btn btn-primary" onClick={() => handleUserClick(user.userID)}>
                    Show Orders
                  </button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Modal show={showUserDetails} onHide={handleCloseUserDetails}>
        <Modal.Header closeButton>
          <Modal.Title>פירוט הזמנות עבור משתמש: {selectedUserId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {orders.map(order => (
              <ListGroup.Item key={order.orderID}>
                <p><strong>מס' הזמנה:</strong> {order.orderID}</p>
                <p><strong>נוצר בתאריך:</strong> {order.createdAt}</p>
                <p><strong>סטטוס:</strong> {order.status}</p>
                <p><strong>סך תשלום :</strong> {order.totalAmount}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUserDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserAdmin;
