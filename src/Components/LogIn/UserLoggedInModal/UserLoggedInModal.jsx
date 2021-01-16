/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './UserLoggedInModal.scss';
import PropTypes from 'prop-types';

function UserLoggedInModal({ user }) {
  return (
    <>
      <div className="UserLoggedInModal__whole-page">
        <div className="whole-page__modal">
          <div className="modal__title">
            Thanks for logging in
            {' '}
            {user.name}
          </div>
          <div className="modal__sub-title">
            You&apos;re now being redirected to your applications page.
          </div>
        </div>
      </div>
      <div className="UserLoggedInModal__opacity-layer" />
    </>
  );
}

export default UserLoggedInModal;

UserLoggedInModal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
