/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import * as R from 'ramda';
import './AppInfo.scss';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import apiHelpers from '../../Helpers/Api/apiService';
import actionCreators from '../../Redux/actionCreators';

function AppInfo({ application }) {
  const history = useHistory();
  const [coverLetterState, setCoverLetterState] = useState(application.cover);
  const [noteState, setNoteState] = useState(application.notes);
  const dispatch = useDispatch();
  const updatedCoverLetterRef = useRef();
  const noteRef = useRef();

  const copyToClipboard = (refToCopy) => () => {
    refToCopy.current.select();
    refToCopy.current.setSelectionRange(0, 99999);
    document.execCommand('copy');
  };

  const updateApplicationThroughAPI = (toUpdate) => (e) => {
    e.preventDefault();
    apiHelpers.postBody({ applicationId: application.id, toUpdate }, '/application/update')
      .then(R.compose(dispatch, actionCreators.updateApplication));
  };

  const deleteApplication = (app) => () => apiHelpers.deleteViaParam('/application/delete', app.id)
    .then(() => {
      R.compose(dispatch, actionCreators.deleteApplication)(app);
      history.goBack();
    });

  return (
    <div className="app-info__display">
      <div className="display__company">
        <div className="company__info">
          <div>
            Company Name:
          </div>
          <div>
            {application.company}
          </div>
        </div>
        <div className="company__time">
          <span>Created:</span>
          {' '}
          <span>
            {moment(application.createdAt).startOf('hour').fromNow()}
          </span>
        </div>
      </div>
      <div className="display__role">
        <div>
          Job Role:
        </div>
        <div>
          {application.role}
        </div>
      </div>
      <div className="display__url">
        <div>
          You Can Find A Link To The Job Description
          {' '}
          <a
            href={application.url.includes('https://') ? application.url : `https://${application.url}`}
            rel="noreferrer"
            target="_blank"
          >
            Here.

          </a>
        </div>
      </div>
      <div className="display__status">
        <div>
          Currently, you have
          {' '}
          <span>
            {application.interview ? 'been offered an interview' : application.rejected ? 'been rejected' : 'applied'}
          </span>
          {' '}
          for this position. Update your status:
        </div>
        <div className="status__buttons">
          <button type="button" onClick={updateApplicationThroughAPI({ rejected: !application.rejected, interview: false })}>👎</button>
          <button type="button" onClick={updateApplicationThroughAPI({ rejected: false, interview: !application.interview })}>👍</button>
        </div>
      </div>
      <div className="display__cover">
        <div>
          Here is the cover letter you used:
        </div>
        <textarea
          type="text"
          name="updated cover letter"
          required
          value={coverLetterState}
          ref={updatedCoverLetterRef}
          onChange={(e) => setCoverLetterState(e.target.value)}
        />
        <div className="cover__buttons">
          <button type="button" onClick={updateApplicationThroughAPI({ cover: coverLetterState })}>
            Save
          </button>
          <button type="button" onClick={copyToClipboard(updatedCoverLetterRef)}>
            Copy
          </button>
        </div>
      </div>
      <div className="display__notes">
        <div>
          Here Are Your Notes For This Application:
        </div>
        <textarea
          type="text"
          name="notes"
          required
          value={noteState}
          ref={noteRef}
          onChange={(e) => setNoteState(e.target.value)}
        />
        <div className="notes__buttons">
          <button type="button" onClick={updateApplicationThroughAPI({ notes: noteState })}>
            Save
          </button>
          <button type="button" onClick={copyToClipboard(noteRef)}>
            Copy
          </button>
        </div>
      </div>
      <div className="display__remove">
        Remove This Application.
        <button type="button" onClick={deleteApplication(application)}>
          Delete
        </button>
      </div>
    </div>
  );
}

AppInfo.propTypes = {
  application: PropTypes.shape({
    id: PropTypes.number.isRequired,
    company: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    interview: PropTypes.bool.isRequired,
    rejected: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default AppInfo;
