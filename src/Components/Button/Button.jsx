import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

function Button({ text, borderless, onClick }) {
  return (
    <button
      className="Button__button"
      type="button"
      style={{ border: `${borderless ? 'none' : ''}` }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  borderless: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  borderless: false,
};

export default Button;
