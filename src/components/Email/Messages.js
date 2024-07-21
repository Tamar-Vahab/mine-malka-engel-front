import { useTranslation } from 'react-i18next';
import { Card, Container, Row, Col, Badge, Form, Button } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessage } from '../../axios/EmailAxios';
import { setMessagesList } from '../../redux/DataActions/DataAction.Message';

export const Message = () => {
    const { t, i18n } = useTranslation();
    const productsList = useSelector(s => s.DataReducer_Message.MessagesList || []);
    const [products, setProducts] = useState(productsList);
    const [error, setError] = useState(false);
    const myDispatch = useDispatch();

    // const navigate = useNavigate();
    // async function fetchMessages() {
    //     try {
    //         if (!productsList || productsList.length === 0) {
    //             var response = await getMessage();
    //             if (!response) {
    //                 setProducts([]);
    //             }
    //             else {
    //                 setProducts(response);
    //                 myDispatch(setMessagesList(response));
    //             }
    //         } else {
    //             setProducts(productsList);
    //         }
    //     } catch (error) {
    //         setError(true);
    //     }
    // }

    async function fetchMessages() {
        try {
            if (!productsList || productsList.length === 0) {
                var response = await getMessage();
                if (!response) {
                    setProducts([]);
                } else {
                    setProducts(response);
                    myDispatch(setMessagesList(response));
                }
            } else {
                setProducts(productsList);
            }
        } catch (error) {
            setError(true);
        }
    }    
    useEffect(() => {
        fetchMessages();
    }, [productsList]);
    
    return (
        <Container>
            {error ? (
                <p>There was an error fetching the products.</p>
            ) : (
                <Row>
                    {products.map(product => (
                        <Col key={product.id} sm={12} md={6} lg={4}>
                            <Card className="mb-4">
                                <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Title>{product.email}</Card.Title>
                                <Card.Title>{product.message}</Card.Title>
                           
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};
