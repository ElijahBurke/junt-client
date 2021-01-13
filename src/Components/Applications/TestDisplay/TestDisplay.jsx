import React, { useState } from 'react';
import './TestDisplay.scss';
import PropTypes from 'prop-types';
import AddingAppModal from './AddingAppModal/AddingAppModal';

function TestDisplay({ test }) {
  const [addingApplication, setAddingApplication] = useState(false);
  return (
    <>
      <section className="TestDisplay__test-display">
        <div className="add-test__header">
          <div className="header__title">
            {test.name}
          </div>
          <div className="header__add">
            <button type="button" onClick={() => setAddingApplication(true)}>
              +
            </button>
          </div>
        </div>
      </section>
      {addingApplication && (
        <AddingAppModal cover={test.cover} />
      )}
    </>
  );
}

TestDisplay.propTypes = {
  test: PropTypes.objectOf({
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  }).isRequired,
};

export default TestDisplay;
