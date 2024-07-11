import { Link, Outlet } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import { useState } from "react";
//Footer page
export const Footer = ({ showOnScroll }) => {
  const [showFooter, setShowFooter] = useState(showOnScroll);
  const { t, i18n } = useTranslation();


  useEffect(() => {
    if (showOnScroll) {
      const handleScroll = () => {
        const isScrollable = document.body.scrollHeight > window.innerHeight;
        setShowFooter(isScrollable);
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial scroll position
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      setShowFooter(true); // Always show the footer if showOnScroll is false
    }
  }, [showOnScroll]);



  return (


<footer style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              padding: '10px',
              marginTop: 'auto', // Push footer to the bottom
              borderTop: '1px solid #ccc', // Optional: Add a border at the top of the footer
        }}>
      <Link to="./myCommonQuestions" className="text-black text-decoration-none me-3">{t('footerPage.linkCommonQuestions')}</Link>
      <Link to="./MyAccount" className="text-black text-decoration-none me-3">{t('footerPage.linkMyAccount')}</Link>
      <Link to="./myContact" className="text-black text-decoration-none me-3">{t('footerPage.linkContact')}</Link>
      <Link to="./myDesignerBirkins" className="text-black text-decoration-none me-3">{t('footerPage.linkDesignerBirkins')}</Link>
      <Link to="./myCongratulationsToTheDonors" className="text-black text-decoration-none me-3">{t('footerPage.linkCongratulationsToTheDonors')}</Link>
      <Link to="./myJoys" className="text-black text-decoration-none me-3">{t('footerPage.linkJoys')}</Link>
      <Link to="./myEvents" className="text-black text-decoration-none me-3">{t('footerPage.linkEvents')}</Link>
      <Link to="./myLogin" className="text-black text-decoration-none me-3">{t('footerPage.linkLogin')}</Link>
      <Link to="./myTerms" className="text-black text-decoration-none me-3">{t('footerPage.linkTerms')}</Link>
      <p className="text-black text-decoration-none me-3"  >כל הזכויות שמורות@</p>


    </footer >
  );
}