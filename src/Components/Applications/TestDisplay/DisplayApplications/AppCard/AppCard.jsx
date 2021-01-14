import React from 'react';
import './AppCard.scss';
import PropTypes from 'prop-types';

function AppCard({ application }) {
  console.log(application);
  return (
    <>

    </>
  );
}

AppCard.propTypes = {
  application: PropTypes.objectOf({
    company: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  }).isRequired,
};

export default AppCard;
