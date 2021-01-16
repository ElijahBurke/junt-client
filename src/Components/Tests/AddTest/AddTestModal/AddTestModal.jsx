/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import * as R from 'ramda';
import './AddTestModal.scss';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import apiHelpers from '../../../../Helpers/Api/apiService';
import actionCreators from '../../../../Redux/actionCreators';

const coverletterLabel = 'Enter A Copy Of The Cover Letter You Plan To Use For This Test. Input any variables inside [] and you\'ll have the chance to put add these later';

const coverletterPlaceholder = `Hi [name of person receiving message]!
I'm really interested in this role [why you're interested in this role]. I think I would be an excellent fit as [why you're a fit for this role].
I'm an expert in JavaScript who has a plethora of experience working with a variety of different frameworks...`;

const defaultFormState = {
  name: 'Test to add applications to',
  desc: 'I want to test whether I can add applications to this test',
  cover: coverletterPlaceholder,
};

function AddTestModal({ setShowAddTest }) {
  const [formState, setFormState] = useState(defaultFormState);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onChange = R.curry((prop, e) => {
    setFormState((state) => R.assoc(prop, e.target.value, state));
    return e.target.value;
  });

  const onSubmit = (e) => {
    e.preventDefault();
    apiHelpers.postBody({ ...formState, userId: user.id }, '/test/add')
      .then(R.compose(dispatch, actionCreators.addTest))
      .then(() => setShowAddTest(false));
  };

  return (
    <>
      <div className="AddTestModal__whole-page">
        <div className="AddTestModal__modal">
          <form onSubmit={onSubmit}>
            <label>
              Enter A Brief Name For Your Test Here
              <input
                type="text"
                name="name"
                required
                value={formState.name}
                onChange={onChange('name')}
                minLength="1"
                maxLength="40"
                placeholder="e.g. Focus On Personal Projects"
              />
            </label>
            <label>
              Enter At Least 30 Charachters Describing what aspects of your application
              you plan to test here.
              <textarea
                type="text"
                name="text"
                required
                minLength="30"
                value={formState.desc}
                onChange={onChange('desc')}
                placeholder="e.g. I want to use a cover letter that really focuses on my personal projects to show my skills. In particular the skills I want to focus on are..."
              />
            </label>
            <label>
              {coverletterLabel}
              <textarea
                type="text"
                name="text"
                required
                value={formState.cover}
                onChange={onChange('cover')}
                minLength="100"
                placeholder={coverletterPlaceholder}
              />
            </label>
            <input type="submit" value="Submit" className="form__button" />
          </form>
        </div>
      </div>
      <div className="AddTestModal__opacity-layer" />
    </>
  );
}

AddTestModal.propTypes = {
  setShowAddTest: PropTypes.func.isRequired,
};

export default AddTestModal;
