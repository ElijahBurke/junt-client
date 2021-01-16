/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import './AddingAppModal.scss';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { useDispatch } from 'react-redux';
import apiHelpers from '../../../../Helpers/Api/apiService';
import actionCreators from '../../../../Redux/actionCreators';

const defaultState = {
  company: '',
  role: '',
  url: '',
  notes: '',
};

function AddingAppModal({ cover, idFromTest, setAddingApplication }) {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(defaultState);
  const [toUpdateCover, setToUpdateCover] = useState({});
  const [updatedCoverLetter, setUpdatedCoverLetter] = useState(false);
  const updatedCoverLetterRef = useRef();

  const onChange = R.curry((func, prop, e) => {
    func((state) => R.assoc(prop, e.target.value, state));
    return e.target.value;
  });

  const copyToClipboard = (refToCopy) => () => {
    refToCopy.current.select();
    refToCopy.current.setSelectionRange(0, 99999);
    document.execCommand('copy');
  };

  const buildAppObject = R.curry(
    (userId, testId, form, cover) => R.merge(
      {
        userId,
        testId,
        cover,
      },
      form,
    ),
  );

  const replaceCover = R.reduce(
    (a, arr) => R.replace(...arr, a),
    cover,
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const buildAppObjectAndStore = R.compose(
      apiHelpers.postBody(R.__, '/application/add'),
      buildAppObject(1, idFromTest, formState),
      replaceCover,
      R.toPairs,
    );
    buildAppObjectAndStore(toUpdateCover)
      .then((res) => {
        setUpdatedCoverLetter(res.cover);
        R.compose(dispatch, actionCreators.addApplication)(res);
      });
  };

  const displayInfo = (str) => (
    <label key={str}>
      {str}
      <textarea
        type="text"
        name={str}
        required
        value={toUpdateCover[str]}
        onChange={onChange(setToUpdateCover, str)}
        minLength="1"
        maxLength="40"
        placeholder="Replace with content specific to this job"
      />
    </label>
  );
  return (
    <>
      <div className="AddingAppModal__whole-page">
        <div className="AddingAppModal__modal">
          {!updatedCoverLetter
            ? (
              <form onSubmit={onSubmit}>
                <label>
                  Where are you applying?
                  <input
                    type="text"
                    name="company"
                    required
                    value={formState.company}
                    onChange={onChange(setFormState, 'company')}
                    minLength="1"
                    maxLength="40"
                    placeholder="Company Name"
                  />
                </label>
                <label>
                  What role are you applying for?
                  <input
                    type="text"
                    name="role"
                    required
                    value={formState.role}
                    onChange={onChange(setFormState, 'role')}
                    minLength="1"
                    maxLength="40"
                    placeholder="Job Title"
                  />
                </label>
                <label>
                  URL for job spec
                  <input
                    type="text"
                    name="url"
                    required
                    value={formState.url}
                    onChange={onChange(setFormState, 'url')}
                    placeholder="http://www.jobspec.com"
                  />
                </label>
                <label>
                  Any Extra Notes?
                  <textarea
                    type="text"
                    name="notes"
                    value={formState.notes}
                    onChange={onChange(setFormState, 'notes')}
                    placeholder="Any Extra Notes You Want To Save?"
                  />
                </label>
                {R.compose(
                  R.map(displayInfo),
                  R.match(/\[(.*?)\]/g),
                )(cover)}
                <input type="submit" value="Submit" className="form__button" />
              </form>
            ) : (
              <div className="modal__job-added">
                <div className="job-added__title">
                  Job Succesfuly Added.
                  Here is your cover letter:
                </div>
                <textarea
                  type="text"
                  name="updated cover letter"
                  required
                  value={updatedCoverLetter}
                  ref={updatedCoverLetterRef}
                  readOnly
                />
                <div className="job-added__buttons">
                  <button type="button" onClick={() => setAddingApplication(false)}>
                    Close
                  </button>
                  <button type="button" onClick={copyToClipboard(updatedCoverLetterRef)}>
                    Copy
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
      <div className="AddingAppModal__opacity-layer" />
    </>
  );
}

AddingAppModal.propTypes = {
  cover: PropTypes.string.isRequired,
  idFromTest: PropTypes.number.isRequired,
  setAddingApplication: PropTypes.func.isRequired,
};

export default AddingAppModal;
