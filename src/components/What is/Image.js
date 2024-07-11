import { useTranslation } from 'react-i18next';
import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { PageTitle } from '../Empty pages/PageTitle';


export const Image = () => {
    const { t, i18n } = useTranslation();
    const product = {
        id: 1,
        name: 'דגם גפן',
        price: 50,
        image: 'product1.jpg',
        kind: 'פוסטר'
    };

    return (
        <div className="container mt-4">
           
            <Card style={{ width: '18rem' }}>
                <Card.Img
                    variant="top"
                    src="https://via.placeholder.com/400" // Placeholder image URL
                    alt="Product Image"
                />
                <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center text-center text-white">
                    <div>
                        <h3>{product.kind}</h3>
                        <h5>מחיר: {product.price} דולר</h5>
                    </div>
                    <img
                        src="https://via.placeholder.com/150" // Placeholder image URL for the house
                        alt="House"
                        style={{ width: '150px', marginTop: '20px' }}
                    />
                </Card.ImgOverlay>
            </Card>
        </div>
    );
}