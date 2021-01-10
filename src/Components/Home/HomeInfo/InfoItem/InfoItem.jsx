import React from 'react';
import './InfoItem.scss';
import PropTypes from 'prop-types';

function InfoItem({ data }) {
  return (
    <div className="InfoItem__info-item">
      <div className="info-item__inner-container">
        <div className="inner-container__text">
          <div className="text__title">
            {data.title}
          </div>
          <div className="text__body">
            {data.body}
          </div>
        </div>
        <div className="inner-container__img">
          <img src={data.img} alt="" />
        </div>
      </div>
    </div>
  );
}

InfoItem.propTypes = {
  data: PropTypes.objectOf({
    title: PropTypes.string,
    body: PropTypes.string,
    img: PropTypes.string,
  }).isRequired,
};

export default InfoItem;
