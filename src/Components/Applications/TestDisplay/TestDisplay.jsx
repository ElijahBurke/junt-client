import React, { useState } from 'react';
import './TestDisplay.scss';
import PropTypes from 'prop-types';
import AddingAppModal from './AddingAppModal/AddingAppModal';
import DisplayApplications from './DisplayApplications/DisplayApplications';

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

        {test.applicationIds.length > 0
          && <DisplayApplications applicationIds={test.applicationIds} />}
        )
      </section>
      {addingApplication && (
        <AddingAppModal
          cover={test.cover}
          idFromTest={test.id}
          setAddingApplication={setAddingApplication}
        />
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
