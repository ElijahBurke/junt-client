import React from 'react';
import { useSelector } from 'react-redux';
import './Applications.scss';
import AddTest from './AddTest/AddTest';

function Applications() {
  const user = useSelector((state) => state.user);
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
      </div>
    </div>
  );
}

export default Applications;
