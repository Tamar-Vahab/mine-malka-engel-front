import { useTranslation } from 'react-i18next';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from '../../axios/ProductAxios';
import { setProductList } from '../../redux/DataActions/DataAction.Product';

export const RecommendedProducts = () => {
    const { t } = useTranslation();
    const productsList = useSelector(s => s.DataReducer_Products?.Prodlist || []); 
    const myDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProducts() {
            try {
                if (!productsList || productsList.length === 0) { 
                    var response = await GetAllProducts();
                    if (!response) {
                        myDispatch(setProductList([]));
                    }
                    else {
                        myDispatch(setProductList(response));
                    }
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, [productsList, myDispatch]);

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
            <h1>{t('recommendedProducts.title')}</h1>
            <Container>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {productsList
                        .filter(product => product.isRecommended) // סינון להצגת מוצרים מומלצים בלבד
                        .map((product, index) => (
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
                                            onClick={() => navigate(`/myProduct/${product.productID}`)}
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
        </div>
    );
};



