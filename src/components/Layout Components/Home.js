import { useTranslation } from 'react-i18next';
import { RecommendedProducts } from '../What is/RecommendedProducts';
import Banner  from './Banner';
import { StayTuned } from '../User Forms/StayTuned';

export const Home = () => {
    const { t, i18n } = useTranslation();
    return (
       <div>
        <h1>hello from tami</h1>
        <h2>tami would like to show you that its work!! BH!!!!!!!11</h2>
        <Banner/>
        <RecommendedProducts/>
        <StayTuned></StayTuned>
       </div>
    );
}


