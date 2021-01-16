import React from 'react';
import './DisplayApplications.scss';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import AppCard from './AppCard/AppCard';

function DisplayApplications({ applicationIds }) {
  const applications = useSelector((state) => state.applications);
  return (
    <div className="DisplayApplications__display-applications">
      {
      applicationIds.map((id) => <AppCard key={id} application={applications[id]} />)
}
    </div>
  );
}

DisplayApplications.propTypes = {
  applicationIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default DisplayApplications;
