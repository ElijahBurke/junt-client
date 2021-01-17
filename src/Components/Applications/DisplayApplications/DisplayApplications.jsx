import React, { useState } from 'react';
import * as R from 'ramda';
import './DisplayApplications.scss';
import PropTypes from 'prop-types';
import AppCard from '../../Tests/TestDisplay/DisplayApplications/AppCard/AppCard';

function DisplayApplications({ applications, title }) {
  const [collapsed, setCollapsed] = useState(false);

  const displayAppCard = (application) => (
    <AppCard
      key={application.id}
      application={application}
    />
  );

  return (
    <div className="DisplayApplications__section">
      <div className="section__title">
        <div className="title__main">
          {title}
        </div>
        {applications.length > 0
        && (
        <button className="title__button" type="button" onClick={() => setCollapsed((curr) => !curr)}>
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
        )}
      </div>
      <div className="section__applications">
        {
          !collapsed && (
            R.map(displayAppCard, applications)
          )
        }
      </div>
    </div>
  );
}

export default DisplayApplications;

DisplayApplications.propTypes = {
  applications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
  title: PropTypes.string.isRequired,
};
