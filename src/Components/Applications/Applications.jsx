import React from 'react';
import { useSelector } from 'react-redux';
import './Applications.scss';
import * as R from 'ramda';
import AddTest from './AddTest/AddTest';
import TestDisplay from './TestDisplay/TestDisplay';

function Applications() {
  const [user, tests] = useSelector((state) => [state.user, state.tests]);
  const displayTests = R.curry(
    (testObj, testId) => <TestDisplay key={testId} test={testObj[testId]} />,
  );
  const ifTestsDisplayTests = R.ifElse(
    R.complement(R.isEmpty),
    R.compose(
      R.map(displayTests(tests)),
      R.keys,
    ),
    () => {},
  );
  return (
    <div className="Applications__applications">
      <div className="applications__inner-container">
        {!user.name
        && (
        <div className="inner-container__not-logged-in">
          Make Sure To Log In To Save Your Progress
        </div>
        )}
        <AddTest />
        {ifTestsDisplayTests(tests)}
      </div>
    </div>
  );
}

export default Applications;
