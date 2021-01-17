import React from 'react';
import { useSelector } from 'react-redux';
import './Tests.scss';
import * as R from 'ramda';
import AddTest from './AddTest/AddTest';
import TestDisplay from './TestDisplay/TestDisplay';

function Tests() {
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
    <div className="Tests__tests">
      <div className="tests__inner-container">
        {!user.name
        && (
        <div className="inner-container__not-logged-in">
          Log In To Begin Adding Tests
        </div>
        )}
        <AddTest />
        {ifTestsDisplayTests(tests)}
      </div>
    </div>
  );
}

export default Tests;
