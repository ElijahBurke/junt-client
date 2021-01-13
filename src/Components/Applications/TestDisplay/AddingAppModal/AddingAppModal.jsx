/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './AddingAppModal.scss';
import PropTypes from 'prop-types';
import * as R from 'ramda';

const defaultState = {
  company: '',
  role: '',
  url: '',
};

function AddingAppModal({ cover }) {
  const [formState, setFormState] = useState(defaultState);
  const [toUpdateCover, setToUpdateCover] = useState({});

  const onChange = R.curry((func, prop, e) => {
    func((state) => R.assoc(prop, e.target.value, state));
    return e.target.value;
  });

  // const replaceWithArr = (toReplace) => (arr) => R.replace(...arr, toReplace);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(R.toPairs(toUpdateCover));
    const replacedCover = R.reduce(
      (a, arr) => R.replace(...arr, a),
      cover,
      R.toPairs(toUpdateCover),
    );

    // Object.entries(toUpdateCover)
    //   .reduce((str, [toReplace, replaceWith]) => str.replace(toReplace, replaceWith), cover);
    console.log(replacedCover);
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
              Where role are you applying for?
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
            {R.compose(
              R.map(displayInfo),
              R.match(/\[(.*?)\]/g),
            )(cover)}
            <input type="submit" value="Submit" className="form__button" />
          </form>
        </div>
      </div>
      <div className="AddingAppModal__opacity-layer" />
    </>
  );
}

AddingAppModal.propTypes = {
  cover: PropTypes.string.isRequired,
};

export default AddingAppModal;
