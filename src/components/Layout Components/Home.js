import { useTranslation } from 'react-i18next';
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { FaArrowUp, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { RecommendedProducts } from '../product/RecommendedProducts';
import { StayTuned } from '../User Forms/StayTuned';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllCategories } from '../../axios/CategoryAxios';
import { setCategoryList } from '../../redux/DataActions/DataAction.Category';
import ilFlagImage from '../../assets/HomeImages/לוגו.png';
import { Card } from 'react-bootstrap';

const ImageContainer1 = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 550px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.1;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  padding: 10px;
  border-radius: 5px;
  color: #000;
  max-width: 100%;
  text-align: center;
  font-size: 1.5rem;
  font-family: 'Arial', sans-serif;
  z-index: 1;
  left: 50%;
  top: 70%;
  transform: translateX(-50%);
  line-height: 1.5;
  margin-top: 70px;
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  z-index: 1000;
`;

// const Categories = styled.section`
//   display: flex;
//   padding: 10px;
//   justify-content: space-around;
//   flex-wrap: wrap;
// `;

// const Category = styled.div`
//   flex: 1 1 calc(33% - 20px);
//   margin: 10px;
//   height: 300px;
//   background-size: cover;
//   background-position: center;
//   border-radius: 5px;
//   display: flex;
//   align-items: flex-end;
//   justify-content: center;
//   position: relative;
//   overflow: hidden;
//   cursor: pointer;
// `;

// const CategoryLink = styled.div`
//   text-decoration: none;
//   color: #fff;
//   background-color: rgba(0, 0, 0, 0.5);
//   padding: 10px;
//   border-radius: 5px;
//   font-size: 1.2em;
//   z-index: 1;
//   position: relative;
// `;

// const CategoryOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 0;
// `;
const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
`;

const CategoryContainer = styled.div`
  flex: 1 1 calc(33% - 20px);
  margin: 10px;
  position: relative;
  overflow: hidden;
`;

const CategoryCard = styled(Card)`
  border: none;
  transition: transform 0.2s;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const CategoryImage = styled(Card.Img)`
  height: 350px;
  object-fit: cover;
  transition: transform 0.3s;
`;

const CategoryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  ${CategoryContainer}:hover & {
    opacity: 1;
  }
`;

const CategoryLink = styled.div`
  text-decoration: none;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 1.2em;
`;

const RecommendedProductsSection = styled.section`
  display: flex;
  overflow: hidden;
  padding: 10px;
  position: relative;
`;

const ProductsContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;
// const ProductImage = styled.img`
//   width: 150px;
//   height: auto;
//   object-fit: cover;
// `;
const ShortInfo = styled.section`
  text-align: center;
  padding: 20px;
`;

const StayUpdated = styled.section`
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  ${(props) => (props.direction === 'left' ? 'left: 0;' : 'right: 0;')}
`;

export const Home = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const topButton = () => {
      if (window.pageYOffset > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', topButton);

    return () => window.removeEventListener('scroll', topButton);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [translateX, setTranslateX] = useState(0);

  const handleNextSlide = () => {
    if (containerRef.current) {
      const newTranslateX = translateX - containerRef.current.clientWidth / 2;
      setTranslateX(newTranslateX);
      containerRef.current.style.transform = `translateX(${newTranslateX}px)`;
    }
  };

  const handlePrevSlide = () => {
    if (containerRef.current) {
      const newTranslateX = translateX + containerRef.current.clientWidth / 2;
      setTranslateX(newTranslateX);
      containerRef.current.style.transform = `translateX(${newTranslateX}px)`;
    }
  };

  const handleArrowClick = (direction) => {
    if (direction === 'next') {
      handleNextSlide();
    } else {
      handlePrevSlide();
    }
  };


  const handleCategoryClick = (idCategory) => {
    debugger
    navigate(`/myProductByCategory/${idCategory}`);
  };
  const categories = useSelector(state => state.DataReducer_Categry.Categorylist);
  const dispatch = useDispatch();
  const [categorysl, setCategorysl] = useState(categories);

  useEffect(() => {
    debugger
    const fetchcategory = async () => {
      if (categories.length > 0) {
        setCategorysl(categories);
      }
      else {
        try {
          const data = await GetAllCategories();
          debugger

          setCategorysl(data);
          // debugger
          // alert()
          dispatch(setCategoryList(data));
        }
        catch (error) {
          console.error(error);
        }

      }
    }
    fetchcategory();
  }, [categories, dispatch]);

  return (
    <div className="Home">
      <ShortInfo id="short-info">
        <ImageContainer1>
          <img src={ilFlagImage} alt="תמונה" />
          <TextContainer
            dangerouslySetInnerHTML={{ __html: t('homePage.information') }}
            style={{
              top: '25%',
              left: i18n.language === 'he' ? '50%' : '70%',
              right: i18n.language === 'he' ? 'auto' : '70%',
              transform: 'translate(-50%, -50%)',
              textAlign: i18n.language === 'he' ? 'center' : 'right',
            }}
          />
        </ImageContainer1>
      </ShortInfo>

      <ScrollToTopButton onClick={scrollToTop} isVisible={isVisible}>
        <FaArrowUp />
      </ScrollToTopButton>
      {/* <div> */}

      {/* <Categories id="categories">
      {categories.map(category => (
        <Category
          key={category.categoryID}
          style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}${category.imageURL})` }}
          onClick={() => handleCategoryClick(category.categoryID)}
        >
          <CategoryOverlay />
          <CategoryLink>{category.nameHe}</CategoryLink>
        </Category>
      ))}
    </Categories>
  </div> */}

      {/* <div>
        <Categories id="categories">
          {categories.map(category => (
            <div>
            <Card>
              <Card.Img 
                src={`${process.env.REACT_APP_API_URL}${category.imageURL}`}>
              </Card.Img>
            </Card>
            <Category
            
              key={category.categoryID}
              // src={`${process.env.REACT_APP_API_URL}${category.imageURL}`}
              // style={{ backgroundImage:`${process.env.REACT_APP_API_URL}${category.imageURL}`} }//`url(${category.ImageURL})` }}
              onClick={() => handleCategoryClick(category.categoryID)}
            >
              <CategoryOverlay />
              <CategoryLink>{category.nameHe}</CategoryLink>
            </Category>
            </div>
          ))}
        </Categories>
      </div> */}



      {/* <div>
        <Categories id="categories">
          {categories.map(category => (
            <div key={category.categoryID}>
              <Card style={{
                position: 'relative',
                border: 'none',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  overflow: 'hidden',
                  position: 'relative'
                }}></div>
                <Card.Img
                  style={{
                    height: '250px',
                    objectFit: 'cover',
                    transition: 'transform 0.3s'
                  }}
                  src={`${process.env.REACT_APP_API_URL}${category.imageURL}`} />
              </Card>
              <Category onClick={() => handleCategoryClick(category.categoryID)}>
                <CategoryOverlay />
                <CategoryLink>{category.nameHe}</CategoryLink>
              </Category>
            </div>
          ))}
        </Categories>
      </div> */}
<div>
<Categories>
    {categories.map(category => (
      <CategoryContainer key={category.categoryID}>
        <CategoryCard>
          <CategoryImage src={`${process.env.REACT_APP_API_URL}${category.imageURL}`} />
          <CategoryOverlay>
            <CategoryLink onClick={() => handleCategoryClick(category.categoryID)}>
              {category.nameHe}
            </CategoryLink>
          </CategoryOverlay>
        </CategoryCard>
      </CategoryContainer>
    ))}
  </Categories>
  </div>
      {/* <Categories id="categories">
        <Category style={{ backgroundImage: `url(${ilFlagImage0})` }} onClick={() => handleCategoryClick(9)}>
          <CategoryOverlay />
          <CategoryLink>אצולה</CategoryLink>
        </Category>
        <Category style={{ backgroundImage: `url(${ilFlagImage1})` }} onClick={() => handleCategoryClick(10)}>
          <CategoryOverlay />
          <CategoryLink>אשרי חלקיך</CategoryLink>
        </Category>
        <Category style={{ backgroundImage: `url(${ilFlagImage2})` }} onClick={() => handleCategoryClick(11)}>
          <CategoryOverlay />
          <CategoryLink>אתם מטהרין</CategoryLink>
        </Category>
        <Category style={{ backgroundImage: `url(${ilFlagImage3})` }} onClick={() => handleCategoryClick(12)}>
          <CategoryOverlay />
          <CategoryLink>בקרעסטיר</CategoryLink>
        </Category>
        <Category style={{ backgroundImage: `url(${ilFlagImage4})` }} onClick={() => handleCategoryClick(13)}>
          <CategoryOverlay />
          <CategoryLink>געפילן</CategoryLink>
        </Category>
        <Category style={{ backgroundImage: `url(${ilFlagImage5})` }} onClick={() => handleCategoryClick(7)}>
          <CategoryOverlay />
          <CategoryLink>חלקינו עמהם</CategoryLink>
        </Category>
        <Category style={{ backgroundImage: `url(${ilFlagImage6})` }} onClick={() => handleCategoryClick(15)}>
          <CategoryOverlay />
          <CategoryLink>כבוד התורה</CategoryLink>
        </Category>
        <Category style={{ backgroundImage: `url(${ilFlagImage7})` }} onClick={() => handleCategoryClick(16)}>
          <CategoryOverlay />
          <CategoryLink>מבשר טוב</CategoryLink>
        </Category>
        <Category style={{ backgroundImage: `url(${ilFlagImage8})` }} onClick={() => handleCategoryClick(17)}>
          <CategoryOverlay />
          <CategoryLink>מזוני רויחי</CategoryLink>
        </Category>
        <Category style={{ backgroundImage: `url(${ilFlagImage9})` }} onClick={() => handleCategoryClick(18)}>
          <CategoryOverlay />
          <CategoryLink>מתיצבים</CategoryLink>
        </Category>
        <Category style={{ backgroundImage: `url(${ilFlagImage10})` }} onClick={() => handleCategoryClick(19)}>
          <CategoryOverlay />
          <CategoryLink>שמחים לשמרו</CategoryLink>
        </Category>
        <Category style={{ backgroundImage: `url(${ilFlagImage11})` }} onClick={() => handleCategoryClick(20)}>
          <CategoryOverlay />
          <CategoryLink>תומכיה מאושר</CategoryLink>
        </Category>
      </Categories> */}

      <RecommendedProductsSection id="recommended-products">
        <ArrowButton direction="left" onClick={() => handleArrowClick('prev')}>
          <FaArrowLeft />
        </ArrowButton>
        <ProductsContainer ref={containerRef}>
          <RecommendedProducts />
        </ProductsContainer>
        <ArrowButton direction="right" onClick={() => handleArrowClick('next')}>
          <FaArrowRight />
        </ArrowButton>
      </RecommendedProductsSection>
      <StayUpdated id="stay-updated">
        <StayTuned />
      </StayUpdated>
    </div>
  );
};

export default Home;