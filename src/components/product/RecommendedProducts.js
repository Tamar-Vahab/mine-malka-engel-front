

import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GetAllProducts } from '../../axios/ProductAxios';
import { setProductList } from '../../redux/DataActions/DataAction.Product';

const PageContainer = styled.div`
  position: relative;
  padding: 20px;
  background-color: #f9f9f9;
`;

const ScrollContainer = styled.div`
  display: flex;
  overflow: auto;
  padding: 10px 0;
`;

const ProductsWrapper = styled.div`
  display: flex;
  gap: 20px;
  transition: transform 0.3s ease-in-out;
`;

const ProductCard = styled(Card)`
  width: 250px;
  min-width: 250px;
  border: none;
  transition: transform 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const RecommendedProducts = () => {
  const { t } = useTranslation();
  const productsList = useSelector((state) => state.DataReducer_Products?.Prodlist || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [productIndex, setProductIndex] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        if (!productsList || productsList.length === 0) {
          const response = await GetAllProducts();
          if (!response) {
            dispatch(setProductList([]));
          } else {
            dispatch(setProductList(response));
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, [dispatch, productsList]);

  return (
    <PageContainer>
      <ScrollContainer ref={containerRef}>
        <ProductsWrapper style={{ transform: `translateX(-${productIndex * 250}px)` }}>
          {productsList
            .filter((product) => product.isRecommended)
            .map((product, index) => (
              <ProductCard
                key={index}
                onClick={() => navigate(`/myProduct/${product.productID}`)}
              >
                <div style={{ overflow: 'hidden', position: 'relative' }}>
                  <Card.Img
                    variant="top"
                    src={`${process.env.REACT_APP_API_URL}${product.imageURL}`}
                    alt={product.name}
                    style={{
                      height: '250px',
                      objectFit: 'cover',
                      transition: 'transform 0.3s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
                <Card.Body>
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
                      color: '#007bff',
                    }}
                  >
                    {t('productListPage.moreDetails')}
                  </Link>
                </Card.Body>
              </ProductCard>
            ))}
        </ProductsWrapper>
      </ScrollContainer>
    </PageContainer>
  );
};

