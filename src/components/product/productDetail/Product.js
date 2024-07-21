import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from '../../../axios/ProductAxios';
import { setProductList } from '../../../redux/DataActions/DataAction.Product';
import { Review } from './Review';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { Wording } from './Wording';
import { addToCart, getCart, removeFromCart } from '../cookies/SetCart';
import { fillReviewsProduct } from '../../../redux/DataActions/DataAction.Reviews';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdditionalComments } from './AdditionalComments';

export const Product = () => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language === 'en' ? 'En' : 'He';
    const productsList = useSelector(state => state.DataReducer_Products.Prodlist);
    const { id } = useParams();
    const [products, setProducts] = useState(productsList);
    const myDispatch = useDispatch();
    const imageRef = useRef(null);
    const scrollToRef = useRef(null);
    const [cart, setCart] = useState(getCart());
    const navigate = useNavigate();

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
        myDispatch(fillReviewsProduct());
    }, []);

    const product = products.find(product => product.productID == id);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleMouseMove = e => {
        const img = imageRef.current;
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        img.style.transformOrigin = `${x}px ${y}px`;
        img.style.transform = 'scale(1.5)';
    };

    const handleMouseOut = () => {
        const img = imageRef.current;
        img.style.transform = 'scale(1)';
    };

    const handleAddToCart = product => {
        addToCart(product);
        setCart(getCart());
    };

    const handleRemoveFromCart = productId => {
        removeFromCart(productId);
        setCart(getCart());
    };

    const productInCart = cart.find(item => item.productID === product.productID);

    return (
        <Container sx={{ mt: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            position: 'relative',
                            width: '100%',
                            height: 'auto'
                        }}
                    >
                        <img
                            ref={imageRef}
                            src={`${process.env.REACT_APP_API_URL}${product.imageURL}`}
                            alt={product[`name${currentLanguage}`]}
                            style={{
                                width: '100%',
                                height: 'auto',
                                transition: 'transform 0.2s ease-out',
                                cursor: 'pointer'
                            }}
                            onMouseMove={handleMouseMove}
                            onMouseOut={handleMouseOut}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>{product[`name${currentLanguage}`]}</Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.6 }} gutterBottom>
                        {product[`description${currentLanguage}`]}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        מחיר: {product.price} ש"ח
                    </Typography>
                    <Wording />
                    <AdditionalComments />
                    <Box mt={2}>
                        {productInCart ? (
                            <>
                                <Typography variant="body2" color="error" gutterBottom>
                                    {t('הזמנת ממוצר זה! ')}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleRemoveFromCart(product.productID)}
                                >
                                    <DeleteIcon /> {t('הסר מהסל ')}
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleAddToCart(product)}
                            >
                                {t('הוסף לסל ')}
                            </Button>
                        )}
                    </Box>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ mt: 10 }}>
                <Grid item xs={12}>
                    <Box ref={scrollToRef}>
                        <Typography variant="h5">{id}</Typography>
                        <Review productId={id} />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};