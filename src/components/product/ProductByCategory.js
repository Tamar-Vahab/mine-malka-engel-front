
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button, Modal, Form, Card, Collapse, ListGroup, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { GetProductsByCategory } from '../../axios/ProductAxios';

const ProductByCategory = () => {
    const { t } = useTranslation();
    const { idCategory } = useParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async (idCategory) => {
        try {
            const products = await GetProductsByCategory(idCategory);
            setProducts(products);
        } catch (error) {
            console.error("Error fetching products:", error);
            alert("An error occurred while fetching the products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(idCategory);
    }, [idCategory]);

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
            <h1>{idCategory}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : products.length > 0 ? (
                <Row xs={1} md={2} lg={4} className="g-4">
                    {products.map(product => (
                        <Col key={product.productID} md={3}>
                            <Card className="mb-2"
                                style={{
                                    position: 'relative',
                                    border: 'none',
                                    transition: 'transform 0.2s',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                }}>
                                <div style={{ overflow: 'hidden', position: 'relative' }}>
                                    <Card.Img
                                        variant="top"
                                        src={`${process.env.REACT_APP_API_URL}${product.imageURL}`}
                                        onClick={() => { navigate(`/myProduct/${product.productID}`) }}
                                        alt={product.name}
                                        style={{
                                            height: '250px',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s'
                                        }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                </div>
                                <Card.Body>
                                    <Card.Title>{product.nameHe}</Card.Title>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text style={{ fontSize: '18px', color: '#888' }}>
                                        {product.price} ₪
                                    </Card.Text>
                                    <Link
                                        to={`/myProduct/${product.productID}`}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            marginTop: '10px',
                                            textAlign: 'center',
                                            textDecoration: 'none',
                                            color: '#007bff'
                                        }}
                                    >
                                        {t('productListPage.moreDetails')}
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <div>
                    <br />
                    <h3>{t('productListPage.noProducts')}</h3>
                    <p>{t('productListPage.technicalIssue')}</p>
                </div>
            )}
        </div>
    );
};

export default ProductByCategory;

