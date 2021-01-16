/* eslint-disable no-nested-ternary */
import React from 'react';
import './AppCard.scss';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as R from 'ramda';
import UseNavigate from '../../../../../Helpers/Hooks/UseNavigate';
import apiService from '../../../../../Helpers/Api/apiService';
import actionCreators from '../../../../../Redux/actionCreators';

function AppCard({ application }) {
  console.log(application);
  const navigate = UseNavigate();
  const dispatch = useDispatch();

  const updateStatus = (toUpdate) => () => apiService.postBody({ applicationId: application.id, toUpdate }, '/application/update')
    .then(R.compose(dispatch, actionCreators.updateApplication));

  return (
    <div className={`AppCard__app-card ${application.interview ? 'interview' : application.rejected ? 'rejected' : ''}`}>
      <div className="app-card__company">
        {application.company}
      </div>
      <div className="app-card__role">
        {application.role}
      </div>
      <div className="app-card__url">
        <a href={application.url} rel="noreferrer" target="_blank">
          Job Description
        </a>
      </div>
      <div className="app-card__buttons">
        <button type="button" onClick={updateStatus({ rejected: true, interview: false })}>👎</button>
        <button type="button" onClick={navigate(`application/${application.id}`)}>
          View
          {' '}
          {'>'}
        </button>
        <button type="button" onClick={updateStatus({ rejected: false, interview: true })}>👍</button>
      </div>
    </div>
  );
}

AppCard.propTypes = {
  application: PropTypes.shape({
    id: PropTypes.number.isRequired,
    interview: PropTypes.bool.isRequired,
    rejected: PropTypes.bool.isRequired,
    company: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  }).isRequired,
};

export default AppCard;
