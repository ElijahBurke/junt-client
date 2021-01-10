import React from 'react';
import './Hero.scss';
import Button from '../Button/Button';
import UseNavigate from '../../Helpers/Hooks/UseNavigate';
import GetScreenWidth from '../../Helpers/Hooks/GetScreenWidth';
import HeroImg from './HeroImg.svg';
import DownArrow from './DownArrow.svg';

function Hero() {
  const navigate = UseNavigate();
  const width = GetScreenWidth();
  return (
    <div className="Hero__hero" style={{ height: `${width < 850 ? '90vh' : ''}` }}>
      <div className="hero__inner-container" style={{ flexDirection: `${width < 850 ? 'column' : ''}` }}>
        <div className="inner-container__text" style={{ width: `${width <= 850 ? '90%' : ''}` }}>
          <div className="text__title" style={{ textAlign: `${width <= 850 ? 'center' : ''}` }}>
            Your Job Search Dashboard
          </div>
          <div className="text__subtitle" style={{ textAlign: `${width <= 850 ? 'center' : ''}` }}>
            The tool that adds agile techniques to optimize your job search.
          </div>
          <div className="text__login" style={{ justifyContent: `${width <= 850 ? 'center' : ''}` }}>
            <div className="button__container">
              <Button text="Log In" onClick={navigate('login')} />
            </div>
          </div>
        </div>
        {width > 650
        && (
        <div className="inner-container__image" style={{ height: `${width <= 850 ? '40%' : ''}` }}>
          <img src={HeroImg} alt="for hero" />
        </div>
        )}
        {width <= 850
        && (
        <div className="inner-container__see-more">
          <img src={DownArrow} alt="arrow pointing down" />
        </div>
        )}
      </div>
    </div>
  );
}

export default Hero;
