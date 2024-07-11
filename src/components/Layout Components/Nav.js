import { Link, Outlet } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import usFlag from '../../assets/flags/us_flag.png';
import ilFlag from '../../assets/flags/il_flag.png';
import { useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/DataActions/DataAction.Users";
import { useConnectUser } from "../User Forms/useConnectUser";
import { Button } from "react-bootstrap";
// Nav page
export const Nav = () => {
    const { t, i18n } = useTranslation();
    const currentUser = useSelector(s => s.DataReducer_Users.currentUser)
    const connected = useSelector(s => s.DataReducer_Users.connected)
    const {Logout} = useConnectUser()

  
    let myStyle = { backgroundColor: "rgb(207, 97, 221)" }
    //TODO//
    // i want to declare a global variable to save in what language are we currently!!
    //to check if i need....

    const handleLanguageChange = (lng) => {
        i18n.changeLanguage(lng);
        if (lng === 'he') {
            document.body.dir = 'rtl';  // Change direction to right-to-left
        } else {
            document.body.dir = 'ltr';  // Change direction to left-to-right
        }
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <h1 className="navbar-brand" to="/">Designery</h1>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to="./myShoppingCart"><FontAwesomeIcon icon={faShoppingCart} /><span className="cart-item-count"></span></Link> </li>
                        <li className="nav-item"><Link className="nav-link" to="./myHome">{t('navPage.linkHome')}</Link> </li>
                        <li className="nav-item"><Link className="nav-link" to="./myCommonQuestions">{t('navPage.linCommonQuestions')}</Link> </li>
                        { !connected &&<li className="nav-item"> <Link className="nav-link" to="./myLogin">{t('navPage.linkLogin')}</Link></li>}
                        {connected && <li className="nav-item"> <button className="nav-link" onClick={Logout}>Logout</button></li>}
                        <li className="nav-item"><Link className="nav-link" to="./myProductList">{t('navPage.linkProduct')}</Link> </li>
                        <li className="nav-item"><Link className="nav-link" to="./myAccount">Account</Link> </li>


                        <li className="nav-item"><Link className="nav-link" to="./myEmailForm">{t('navPage.linkStayTuned')}</Link> </li>

                        <li className="nav-item"><Link className="nav-link" to="./AllAdminPages">מסכי ניהול</Link> </li>
                        <li className="nav-item"><p className="nav-link" style ={myStyle}>{connected && currentUser.name || !connected && "NOT CONNECTED"}</p> </li>
                    </ul>
                </div>
                {i18n.language !== 'en' && (
                    <button
                        className="btn btn-light rounded-circle border d-flex align-items-center justify-content-center p-0"
                        style={{ width: '40px', height: '40px', margin: '0 10px', borderColor: '#ccc' }}
                        onClick={() => handleLanguageChange('en')}
                    >
                        <img src={usFlag} alt="English" style={{ width: '25px', height: '20px' }} />
                    </button>
                )}
                {i18n.language !== 'he' && (
                    <button
                        className="btn btn-light rounded-circle border d-flex align-items-center justify-content-center p-0"
                        style={{ width: '40px', height: '40px', margin: '0 10px', borderColor: '#ccc' }}
                        onClick={() => handleLanguageChange('he')}
                    >
                        <img src={ilFlag} alt="Hebrew" style={{ width: '25px', height: '20px' }} />
                    </button>
                )}
            </div>
        </nav>
    );
};
