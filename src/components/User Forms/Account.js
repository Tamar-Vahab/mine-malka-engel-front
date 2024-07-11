import { useSelector } from "react-redux";
import { Profile } from "./Profile";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { OrderHistory } from "../Order/OrderHistory";
import { Container, Row, Col } from "react-bootstrap";

export const Account = () => {
    const { t, i18n } = useTranslation();
    const connected = useSelector(s => s.DataReducer_Users.connected);

    return (
        <Container>
            {!connected ? (
                <div className="text-center mt-5">
                    <h1>{t('accountPage.errCon')}</h1>
                    <Link to="/myLogin" className="btn btn-primary mt-3">
                        {t('accountPage.signIn')}
                    </Link>
                </div>
            ) : (
                <Row className="mt-5">
                    <Col md={6}>
                        <Profile />
                    </Col>
                    <Col md={6}>
                        <OrderHistory />
                    </Col>
                </Row>
            )}
        </Container>
    );
};
