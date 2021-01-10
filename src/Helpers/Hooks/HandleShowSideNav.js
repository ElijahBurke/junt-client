import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as R from 'ramda';

const handleCloseNav = R.curry(
  (sideNav, closeButtonRef, showSideNav, setShowSideNavFalse, e) => {
    if ((!e.path.includes(sideNav) || e.path.includes(closeButtonRef)) && showSideNav) {
      setShowSideNavFalse();
    }
  },
);

// make this into a predicate function and use the when R.when to create another function

const HandleShowSideNav = R.curry(
  (sideNavRef, closeButtonRef, setShowSideNavFalse) => {
    const showSideNav = useSelector((state) => state.showSideNav);
    useEffect(() => {
      let eventListenerFunc;
      if (sideNavRef.current && closeButtonRef.current) {
        eventListenerFunc = handleCloseNav(
          sideNavRef.current, closeButtonRef.current, showSideNav, setShowSideNavFalse,
        );
        if (showSideNav) window.addEventListener('click', eventListenerFunc);
      }
      return () => { window.removeEventListener('click', eventListenerFunc); };
    }, [sideNavRef, closeButtonRef, showSideNav]);
    return showSideNav;
  },
);

export default HandleShowSideNav;
