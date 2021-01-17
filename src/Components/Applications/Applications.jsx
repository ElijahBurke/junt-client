import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as R from 'ramda';
import './Applications.scss';
import UseNavigate from '../../Helpers/Hooks/UseNavigate';
import DisplayApplications from './DisplayApplications/DisplayApplications';

const defaultState = {
  applied: [],
  interview: [],
  rejected: [],
};

function Applications() {
  const [appsSorted, setAppsSorted] = useState({
    applied: [],
    interview: [],
    rejected: [],
  });
  const applications = useSelector((state) => state.applications);
  const navigate = UseNavigate();

  useEffect(() => {
    setAppsSorted(defaultState);
    R.forEach((id) => {
      const application = applications[id];
      setAppsSorted((obj) => {
        const copy = { ...obj };
        if (application.rejected) copy.rejected = [...copy.rejected, application];
        else if (application.interview) copy.interview = [...copy.interview, application];
        else copy.applied = [...copy.applied, application];
        return copy;
      });
    })(R.keys(applications));
    // const checking = R.reduce((a, b) => {
    //   if (b.interview) a.interview.push(b);
    //   else if (b.rejected) a.rejected.push(b);
    //   else a.applied.push(b);
    //   return a;
    // }, { ...defaultState }, R.values(applications));
    // console.log(checking);
    // setAppsSorted(checking);
    // console.log(appsSorted);
  }, [applications]);

  return (
    <div className="Applications__applications">
      {
        R.isEmpty(applications) && (
          <div className="applications__none">
            Here you can view all of your in progress applications. Go to
            {' '}
            <button type="button" onClick={navigate('tests')}>Tests</button>
            {' '}
            to start adding applications to track!
          </div>
        )
      }
      {
        R.compose(
          R.map((key) => (
            <DisplayApplications
              key={key}
              title={key}
              applications={appsSorted[key]}
            />
          )),
          R.keys,
        )(appsSorted)
      }
      {/* <DisplayApplications
        title="Applied"
        applications={appsSorted.applied}
      />
      <DisplayApplications
        title="Interview"
        applications={appsSorted.interview}
      />
      <DisplayApplications
        title="Rejected"
        applications={appsSorted.rejected}
      /> */}
    </div>
  );
}

export default Applications;
