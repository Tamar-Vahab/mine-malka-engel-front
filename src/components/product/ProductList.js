import { useTranslation } from 'react-i18next';
import { Card, Container, Row, Col, Badge, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from '../../axios/ProductAxios';
import { setProductList } from '../../redux/DataActions/DataAction.Product';

export const ProductList = () => {
    debugger
    const { t, i18n } = useTranslation();
    const productsList = useSelector(s => s.DataReducer_Products?.Prodlist || []);
    const [products, setProducts] = useState(productsList);
    const [error, setError] = useState(false);
    const myDispatch = useDispatch();
    const navigate = useNavigate();

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);

    const filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);

    async function fetchProducts() {
        debugger
        try {
            if (!productsList || productsList.length === 0) {
                var response = await GetAllProducts();
                if (!response) {
                    setProducts([]);
                }
                else {
                    setProducts(response);
                    myDispatch(setProductList(response));
                }
            } else {
                setProducts(productsList);
            }
        } catch (error) {
            setError(true);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container fluid style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
            <Row>
                <Col md={3}>
                    <h2>{t('productListPage.title')}</h2>
                    <Form>
                        <Form.Group controlId="minPrice">
                            <Form.Label>{t('productListPage.minPrice')}</Form.Label>
                            <Form.Control
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(Number(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group controlId="maxPrice" className="mt-3">
                            <Form.Label>{t('productListPage.maxPrice')}</Form.Label>
                            <Form.Control
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                            />
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={9}>
                    {error || filteredProducts.length === 0 ? (
                        <div>
                            <br></br>
                            <h3>{t('productListPage.noProducts')}</h3>
                            <p>{t('productListPage.technicalIssue')}</p>
                        </div>
                    ) : (
                        <Container>
                            <Row xs={1} md={2} lg={3} className="g-4">
                                {filteredProducts.map((product, index) => (
                                    <Col key={index}>
                                        <Card style={{
                                            position: 'relative',
                                            border: 'none',
                                            transition: 'transform 0.2s',
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                        }}>
                                            <div style={{
                                                overflow: 'hidden',
                                                position: 'relative'
                                            }}>
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
                                                <Card.Title>{product.name}</Card.Title>
                                                <Card.Text style={{
                                                    fontSize: '18px',
                                                    color: '#888'
                                                }}>
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
                        </Container>
                    )}
                </Col>
            </Row>
        </Container>
    );
};
