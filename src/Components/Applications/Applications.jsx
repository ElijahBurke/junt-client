import React from 'react';
import { useSelector } from 'react-redux';
import './Applications.scss';
import AddTest from './AddTest/AddTest';
import TestDisplay from './TestDisplay/TestDisplay';

function Applications() {
  const [user, tests] = useSelector((state) => [state.user, state.tests]);
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
        {tests.length > 0
      && (
        tests.map((test) => <TestDisplay key={test.name} test={test} />)
      )}
      </div>
    </div>
  );
}

export default Applications;
