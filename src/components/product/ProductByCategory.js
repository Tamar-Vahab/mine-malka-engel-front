import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { setProductsToCategoryList } from '../../actions/CategoryActions';
// import { GetProductsByCategory } from '../../axios/CategoryAxios';
// import { setProductsToCategoryList } from '../../redux/DataActions/DataAction.Category';
import { useParams, useNavigate } from 'react-router';
import {  Button, Modal, Form, Card, Collapse, ListGroup, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { GetProductsByCategory } from '../../axios/ProductAxios';

// רכיב להצגת מוצרים לפי קטגוריה
const ProductByCategory = () => {
    const { t, i18n } = useTranslation();

    const dispatch = useDispatch();
    const { idCategory } = useParams()
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    // יצירת state לניהול מצב טעינה ושגיאות
    const [loading, setLoading] = useState(true);
    const showProducts = async (idCategory) => {
        debugger
        if (expandedCategories.includes(idCategory)) {
            setExpandedCategories(expandedCategories.filter(id => id !== idCategory));
        } else {
            try {
                const products = await GetProductsByCategory(idCategory);
                setProducts(prevProducts => ({
                    ...prevProducts,
                    [idCategory]: products
                }));
                setExpandedCategories([...expandedCategories, idCategory]);
            } catch (error) {
                console.error("Error fetching products:", error);
                alert("An error occurred while fetching the products.");
            }
        }

    };

    // שימוש ב-useEffect כדי לשלוף את המוצרים מהשרת כאשר הקטגוריה משתנה
    useEffect(() => {
        debugger
        showProducts(idCategory);
    }, []);

    // אם עדיין אין מוצרים עבור הקטגוריה הזו, שלוף מהשרת



    // הצגת המוצרים לאחר השליפה
    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>

            <h1>{idCategory}</h1>
            {/* <h2>{expandedCategories}</h2> */}
            <Collapse in={expandedCategories.includes(idCategory)}>
                <div className="mt-3">
                    {products[idCategory] ?.length > 0 ? (
                        <Row xs={1} md={2} lg={4} className="g-4">
                            {products[idCategory].map(product => (
                                <Col idCategorykey={product.productID} md={3}>
                                    <Card className="mb-2"
                                        style={{
                                            position: 'relative',
                                            border: 'none',
                                            transition: 'transform 0.2s',
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                        }}>
                                        <div style={{
                                            overflow: 'hidden',
                                            position: 'relative'
                                        }}><Card.Img
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
                                            /></div>
                                        <Card.Body>
                                            <Card.Title>{product.nameHe}</Card.Title>
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

                    ) : (<div style={{ backgroundColor: '#' }}>
                        <br></br>
                        <h3>{t('productListPage.noProducts')}</h3> {/* הוספת כותרת למקרה של תקלה */}
                        <p>{t('productListPage.technicalIssue')}</p> {/* הצגת הודעה על תקלה */}
                    </div>)}
                </div>
            </Collapse>
        </div>
    );

}
export default ProductByCategory;
