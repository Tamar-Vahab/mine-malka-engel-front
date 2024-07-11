import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '../Layout Components/PageTitle';

//Home page
export const Joys = () => {
    const { t, i18n } = useTranslation();
    return (
        <div>
        <PageTitle title={t('joysPage.title')} />
    </div>  
    );
}