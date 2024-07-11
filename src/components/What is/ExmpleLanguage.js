// Login.js
import { useTranslation } from 'react-i18next';
import { PageTitle } from './PageTitle';


const ExmpleLanguage = () => {
    const { t, i18n } = useTranslation();

    const handleLogin = () => {
        // Handle login logic here
    };

    return (
        <div>
            <div>
                <PageTitle title={t('loginPage.title')} />
            </div>            <form onSubmit={handleLogin}>
                <label>{t('loginPage.username')}</label>
                <input type="text" name="username" />
                <label>{t('loginPage.password')}</label>
                <input type="password" name="password" />
                <button type="submit">{t('loginPage.loginButton')}</button>
            </form>
        </div>
    );
};

export default ExmpleLanguage;
