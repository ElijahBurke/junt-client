import React, { useState } from 'react';
import './TestDisplay.scss';
import PropTypes from 'prop-types';
import AddingAppForm from './AddingAppForm/AddingAppForm';
import DisplayApplications from './DisplayApplications/DisplayApplications';
import UseNavigate from '../../../Helpers/Hooks/UseNavigate';
import FullPageModal from '../../FullPageModal/FullPageModal';

const AddingAppModal = FullPageModal(AddingAppForm);

function TestDisplay({ test }) {
  const [seeMore, setSeeMore] = useState(true);
  const [addingApplication, setAddingApplication] = useState(false);
  const navigate = UseNavigate();
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
          {test.applicationIds.length > 0
          && (
          <button type="button" onClick={() => setSeeMore((curr) => !curr)}>
            See
            {' '}
            { seeMore ? 'less' : 'more' }
          </button>
          )}
          <button type="button" onClick={navigate(`test/${test.id}`)}>
            View Test
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
    applicationIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default TestDisplay;
