import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const PageTitle = ({ title }) => {
    const { t, i18n } = useTranslation();

    return (
        <div className="page-title">
            <h1>{title}</h1>
        </div>
    );
};

PageTitle.propTypes = {
    title: PropTypes.string.isRequired
};

