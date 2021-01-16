import React, { useState } from 'react';
import DownArrow from './DownArrow.svg';
import './AddTest.scss';
import AddTestModal from './AddTestModal/AddTestModal';

function AddTest() {
  const [seeMore, setSeeMore] = useState(true);
  const [showAddTest, setShowAddTest] = useState(false);
  return (
    <>
      <section className="AddTest__add-test">
        <div className="add-test__header">
          <div className="header__title">
            A/B Testing
          </div>
          <div className="header__add">
            <button type="button" onClick={() => setShowAddTest(true)}>
              Add Test
            </button>
          </div>
        </div>
        {seeMore
      && (
      <>
        <div className="add-test__subtitle">
          Why A/B Test?
        </div>
        <div className="add-test__extra-info">
          <div>
            A/B testing, sometimes known as split testing, allows you to test
            multiple approaches and gain validated learning as to what approach
            is working best for you.
          </div>
          <div>
            Your tests should give your applications subtle differences so that you
            can gain insight into what is yeilding the best rate of return.
          </div>
        </div>
      </>
      )}
        <div className="add-test__see-more">
          <button className={seeMore ? 'rotated' : undefined} type="button" onClick={() => setSeeMore((curr) => !curr)}>
            <img src={DownArrow} alt="arrow down" />
          </button>
        </div>
      </section>
      {showAddTest
      && <AddTestModal setShowAddTest={setShowAddTest} />}
    </>
  );
}

export default AddTest;
