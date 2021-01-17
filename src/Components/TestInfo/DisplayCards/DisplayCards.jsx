import React from 'react';
import './DisplayCards.scss';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import AppCard from '../../Tests/TestDisplay/DisplayApplications/AppCard/AppCard';

function DisplayCards({ title, applications }) {
  const displayAppCard = (application) => (
    <AppCard
      key={application.id}
      application={application}
    />
  );
  return (
    <div className="DisplayCards__app-cards">
      <div className="app-cards__title">
        {title}
      </div>
      <div className="app-cards__display">
        {R.map(displayAppCard, applications)}
      </div>
    </div>
  );
}

export default DisplayCards;

DisplayCards.propTypes = {
  title: PropTypes.string.isRequired,
  applications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
};
