import React, { useState, useEffect, useRef } from 'react';
import './TestInfo.scss';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';
import { useHistory } from 'react-router-dom';
import DisplayCards from './DisplayCards/DisplayCards';
import apiHelpers from '../../Helpers/Api/apiService';
import actionCreators from '../../Redux/actionCreators';

const defaultState = {
  applied: [],
  interview: [],
  rejected: [],
};

function TestInfo({ test }) {
  const applications = useSelector((state) => state.applications);
  const [appsSorted, setAppsSorted] = useState(defaultState);
  const [coverLetterState, setCoverLetterState] = useState(test.cover);
  const dispatch = useDispatch();
  const coverRef = useRef();
  const history = useHistory();

  useEffect(() => {
    setAppsSorted(defaultState);
    R.forEach((id) => {
      const application = applications[id];
      setAppsSorted((obj) => {
        const copy = { ...obj };
        if (application.rejected) copy.rejected = [...copy.rejected, application];
        else if (application.interview) copy.interview = [...copy.interview, application];
        else copy.applied = [...copy.applied, application];
        return copy;
      });
    })(test.applicationIds);
  }, [applications]);

  const copyToClipboard = (refToCopy) => () => {
    refToCopy.current.select();
    refToCopy.current.setSelectionRange(0, 99999);
    document.execCommand('copy');
  };

  const updateTestThroughAPI = (toUpdate) => (e) => {
    e.preventDefault();
    apiHelpers.postBody({ testId: test.id, toUpdate }, '/test/update')
      .then(((res) => {
        console.log(res);
        R.compose(dispatch, actionCreators.updateTest)(res);
      }));
  };

  const deleteTest = (testId) => () => apiHelpers.deleteViaParam('/test/delete', testId)
    .then(() => {
      R.compose(dispatch, actionCreators.deleteTest)(testId);
      history.goBack();
    });

  return (
    <div className="TestInfo__test-info">
      <div className="test-info__name">
        <div className="name__info">
          <div>
            Test Name:
          </div>
          <div>
            {test.name}
          </div>
        </div>
        <div className="name__time">
          <span>Created:</span>
          {' '}
          <span>
            {moment(test.createdAt).startOf('hour').fromNow()}
          </span>
        </div>
      </div>
      <div className="test-info__description">
        <div>
          Description:
        </div>
        <div>
          {test.desc}
        </div>
      </div>
      <div className="test-info__cover">
        <div>
          Here is your cover letter for this test:
        </div>
        <textarea
          type="text"
          name="notes"
          required
          value={coverLetterState}
          ref={coverRef}
          onChange={(e) => setCoverLetterState(e.target.value)}
        />
        <div className="notes__buttons">
          <button type="button" onClick={updateTestThroughAPI({ cover: coverLetterState })}>
            Save
          </button>
          <button type="button" onClick={copyToClipboard(coverRef)}>
            Copy
          </button>
        </div>
      </div>
      <div className="test-info__app-info">
        So Far You Have Applied For
        {` ${test.applicationIds.length} ` }
        Jobs Using This Test
      </div>
      {test.applicationIds.length > 0
      && (
      <table>
        <tr>
          <th>No Response</th>
          <th>Interview</th>
          <th>Rejected</th>
        </tr>
        <tr>
          <td>{appsSorted.applied.length}</td>
          <td>{appsSorted.interview.length}</td>
          <td>{appsSorted.rejected.length}</td>
        </tr>
      </table>
      )}
      { appsSorted.applied.length > 0
      && <DisplayCards title="No Response" applications={appsSorted.applied} />}
      { appsSorted.interview.length > 0
      && <DisplayCards title="Interview" applications={appsSorted.interview} />}
      { appsSorted.rejected.length > 0
      && <DisplayCards title="Rejected" applications={appsSorted.rejected} />}
      <div className="test-info__remove">
        Delete this test.
        <button type="button" onClick={deleteTest(test.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TestInfo;

TestInfo.propTypes = {
  test: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    applicationIds: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};
