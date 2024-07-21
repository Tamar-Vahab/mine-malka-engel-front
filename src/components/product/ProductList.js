import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from '../../axios/ProductAxios';
import { setProductList } from '../../redux/DataActions/DataAction.Product';
import { addToCart, removeFromCart, getCart } from './cookies/SetCart';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    TextField,
    Box,
    Tooltip,
    Button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import InfoIcon from '@mui/icons-material/Info';

export const ProductList = () => {
    debugger
    const { t } = useTranslation();
    const productsList = useSelector((s) => s.DataReducer_Products?.Prodlist || []);
    const [products, setProducts] = useState(productsList);
    const [error, setError] = useState(false);
    const myDispatch = useDispatch();
    const navigate = useNavigate();

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [cart, setCart] = useState(getCart());

    const filteredProducts = products.filter((product) => product.price >= minPrice && product.price <= maxPrice);

    async function fetchProducts() {
        try {
            if (!productsList || productsList.length === 0) {
                const response = await GetAllProducts();
                if (!response) {
                    setProducts([]);
                } else {
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

    const handleAddToCart = (product) => {
        addToCart(product);
        setCart(getCart());
    };

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        setCart(getCart());
    };

    return (
        <Container sx={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Typography variant="h4">{t('productListPage.title')}</Typography>
                    <Box component="form">
                        <TextField
                            label={t('productListPage.minPrice')}
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(Number(e.target.value))}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label={t('productListPage.maxPrice')}
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            fullWidth
                            margin="normal"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    {error || filteredProducts.length === 0 ? (
                        <Box textAlign="center" mt={5}>
                            <Typography variant="h5">{t('productListPage.noProducts')}</Typography>
                            <Typography>{t('productListPage.technicalIssue')}</Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={3}>
                            {filteredProducts.map((product, index) => {
                                const productInCart = cart.find((item) => item.productID === product.productID);

                                return (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card
                                            sx={{
                                                position: 'relative',
                                                border: 'none',
                                                transition: 'transform 0.2s',
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                                ':hover': { transform: 'scale(1.02)' }
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="250"
                                                image={`${process.env.REACT_APP_API_URL}${product.imageURL}`}
                                                alt={product.name}
                                                onClick={() => navigate(`/myProduct/${product.productID}`)}
                                                sx={{
                                                    cursor: 'pointer',
                                                    transition: 'transform 0.3s',
                                                    ':hover': { transform: 'scale(1.1)' }
                                                }}
                                            />
                                            <CardContent>
                                                <Typography variant="h6">{product.name}</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {product.price} ₪
                                                </Typography>
                                                <Box mt={2} textAlign="center">
                                                    <Tooltip
                                                        title={
                                                            productInCart
                                                                ? t('הסר מסל')
                                                                : t('הוסף לסל')
                                                        }
                                                    >
                                                        <IconButton
                                                            color={productInCart ? 'secondary' : 'primary'}
                                                            onClick={() =>
                                                                productInCart
                                                                    ? handleRemoveFromCart(product.productID)
                                                                    : handleAddToCart(product)
                                                            }
                                                        >
                                                            {productInCart ? (
                                                                <RemoveShoppingCartIcon />
                                                            ) : (
                                                                <ShoppingCartIcon />
                                                            )}
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={t('פרטים נוספים')}>
                                                        <IconButton
                                                            color="info"
                                                            onClick={() => navigate(`/myProduct/${product.productID}`)}
                                                            sx={{ mt: 1 }}
                                                        >
                                                            <InfoIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};