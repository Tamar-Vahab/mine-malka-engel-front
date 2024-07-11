import { useTranslation } from 'react-i18next';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from '../../../axios/ProductAxios';
import { setProductList } from '../../../redux/DataActions/DataAction.Product';
import { Review } from './Review';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Wording } from './Wording';
import { addToCart, getCart, saveCart } from '../cookies/SetCart';
import { setCookie } from '../cookies/CookieUtils';

export const Product = () => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language === "en" ? "En" : "He";
    const productsList = useSelector(state => state.DataReducer_Products.Prodlist);
    const { id } = useParams();
    const [products, setProducts] = useState(productsList);
    const myDispatch = useDispatch();
    const imageRef = useRef(null);
    const scrollToRef = useRef(null);
    const [cart, setCart] = useState(getCart());

    async function fetchProducts() {
        if (productsList.length === 0) {
            const response = await GetAllProducts();
            setProducts(response);
            myDispatch(setProductList(response));
        } else {
            setProducts(productsList);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        setCart(getCart());
    }, []);

    const product = products.find(product => product.productID == id);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleMouseMove = (e) => {
        const img = imageRef.current;
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        img.style.transformOrigin = `${x}px ${y}px`;
        img.style.transform = 'scale(1.3)';
    };

    const handleMouseOut = () => {
        const img = imageRef.current;
        img.style.transform = 'scale(1)';
    };

    const handleScroll = () => {
        scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleAddToCart = (product) => {
        const cartCopy = [...cart];
        const productIndex = cartCopy.findIndex(p => p.productID === product.productID);
        if (productIndex !== -1) {
            cartCopy[productIndex].quantity = (parseInt(cartCopy[productIndex].quantity, 10) || 1) + 1;
            setCart(cartCopy);
            setCookie("cart", JSON.stringify(cartCopy), 7); // עדכון ה-Cookie

        } else {
            addToCart(product);
            setCart(getCart());
        }
    };

    const productInCart = cart.find(item => item.productID === product.productID);

    return (
        <Container className="mt-4">
            <Row>
                <Col md={5} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        overflow: 'hidden',
                        position: 'relative',
                        width: '100%',
                    }}>
                        <img
                            ref={imageRef}
                            src={`${process.env.REACT_APP_API_URL}${product.imageURL}`}
                            alt={product[`name${currentLanguage}`]}
                            style={{
                                width: '100%',
                                height: 'auto',
                                transition: 'transform 0.005s, transform-origin 0.005s'
                            }}
                            onMouseMove={handleMouseMove}
                            onMouseOut={handleMouseOut}
                        />
                        <Button className="btn btn-light" onClick={handleScroll} >* {t('productPage.review')}</Button>
                    </div>
                </Col>
                <Col md={7}>
                    <h2>{product[`name${currentLanguage}`]}</h2>
                    <p>{product[`description${currentLanguage}`]}</p>
                    <p className="text-muted">מחיר: {product.price} ש"ח</p>
                    <Wording />
                    <br />
                    <button className='btn btn-dark' onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    {productInCart && (
                        <div>
                            <p>You have ordered {productInCart.quantity || 1} of this product</p>
                        </div>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <div style={{ marginTop: '150px' }} ref={scrollToRef}>
                        <Review />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
