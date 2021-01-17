/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './UserLoggedInInfo.scss';
import PropTypes from 'prop-types';

function UserLoggedInInfo({ user }) {
  return (
    <div className="UserLoggedInInfo__modal">
      <div className="modal__title">
        Thanks for logging in
        {' '}
        {user.name}
      </div>
      <div className="modal__sub-title">
        You&apos;re now being redirected to your applications page.
      </div>
    </div>
  );
}

export default UserLoggedInInfo;

UserLoggedInInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
