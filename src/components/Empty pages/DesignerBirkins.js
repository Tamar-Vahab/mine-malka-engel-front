
import { useTranslation } from 'react-i18next';
import { PageTitle } from '../Layout Components/PageTitle';

export const DesignerBirkins = () => {
const { t, i18n } = useTranslation();
    return (
       <div>
        <div>
            <PageTitle title={t('designerBirkinsPage.title')}/>
        </div>
       </div>
    );
}