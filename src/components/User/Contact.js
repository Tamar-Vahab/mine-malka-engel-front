import { useTranslation } from 'react-i18next';
import { PageTitle } from '../Layout Components/PageTitle';



//Contact page
export const Contact = () => {
    const { t, i18n } = useTranslation();
    return (
        <div>
            <div>
            <PageTitle title={t('contactPage.title')} />
            </div>
            <h5>{t('contactPage.h5contact')}</h5>
        </div>
     );
}
