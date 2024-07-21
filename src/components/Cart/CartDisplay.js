import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getCart } from "../product/cookies/SetCart";
import { setCookie } from "../product/cookies/CookieUtils";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const CartDisplay = () => {
  const [cart, setCart] = useState(getCart());
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language === "en" ? "En" : "He";

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    setCookie("cart", JSON.stringify(newCart), 7);
  };

  const goToCheckout = () => {
    if (cart.length === 0) {
      alert(t('shoppingCartPage.emptyCartMessage'));
      return;
    }
    navigate('/myOrderForm');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {t('shoppingCartPage.cartTitle')}
      </Typography>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <List>
          {cart.map((product, index) => (
            <ListItem key={index} divider sx={{ alignItems: 'center' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}${product.imageURL}`}
                    alt={product[`name${currentLanguage}`]}
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText
                    primary={
                      <Button
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'black',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          outline: 'none',
                          padding: 0
                        }}
                        onClick={() => navigate(`/myProduct/${product.productID}`)}
                      >
                        {product[`name${currentLanguage}`]}
                      </Button>
                    }
                    secondary={`${t('Price')}: ${product.price} ₪`}
                  />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText
                    primary={`${t('Total')}: ${(product.price * (product.quantity || 1)).toFixed(2)} ₪`}
                  />
                </Grid>
                <Grid item xs={1}>
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemove(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
        <Grid container justifyContent="flex-end" sx={{ marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={goToCheckout}
          >
            {t("Proceed to Checkout")}
          </Button>
        </Grid>
        <Box mt={2} />
      </Paper>
    </Container>
  );
};
