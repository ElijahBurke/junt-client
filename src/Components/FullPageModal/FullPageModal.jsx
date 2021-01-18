/* eslint-disable react/prop-types */
/* eslint-disable radix */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import './FullPageModal.scss';

const FullPageModal = (Component) => function FullPage({ cb, ...props }) {
  useEffect(() => {
    const currScroll = window.scrollY;
    const handleScroll = () => {
      window.scrollTo(0, currScroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <div className="FullPageModal">
        <div className="FullPageModal__inner-container">
          <button type="submit" onClick={cb} className="inner-container__close-modal">
            x
          </button>
          <Component {...props} />
        </div>
      </div>
      <div className="whole-page__opacity-layer" />
    </>
  );
};

export default FullPageModal;
