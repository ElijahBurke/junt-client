import React, { useState } from 'react';
import './TestDisplay.scss';
import PropTypes from 'prop-types';
import AddingAppModal from './AddingAppModal/AddingAppModal';
import DisplayApplications from './DisplayApplications/DisplayApplications';
import DownArrow from '../AddTest/DownArrow.svg';

function TestDisplay({ test }) {
  const [seeMore, setSeeMore] = useState(true);
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

        {test.applicationIds.length > 0 && seeMore
          && <DisplayApplications applicationIds={test.applicationIds} />}
        <div className="TestDisplay__see-more">
          <button className={seeMore ? 'rotated' : undefined} type="button" onClick={() => setSeeMore((curr) => !curr)}>
            <img src={DownArrow} alt="arrow down" />
          </button>
        </div>
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
  test: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    applicationIds: PropTypes.arrayOf(PropTypes.numbers),
  }).isRequired,
};

export default TestDisplay;
