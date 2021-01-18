import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from './Components/Nav/Nav';
import SideNav from './Components/Nav/SideNav/SideNav';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Tests from './Components/Tests/Tests';
import Applications from './Components/Applications/Applications';
import Dashboard from './Components/Dashboard/Dashboard';
import LogIn from './Components/LogIn/LogIn';
import AppInfo from './Components/AppInfo/AppInfo';
import TestInfo from './Components/TestInfo/TestInfo';
import CheckAuthenticated from './Helpers/Hooks/CheckAuthenticated';
import GetScreenWidth from './Helpers/Hooks/GetScreenWidth';

function App() {
  const [applications, tests] = useSelector((state) => [state.applications, state.tests]);
  const checkingAuth = CheckAuthenticated();
  const width = GetScreenWidth();
  return (
    <>
      <div className="nav-buffer" />
      <Nav />
      { width <= 875 && <SideNav /> }
      {checkingAuth
        ? <div className="checking" />
        : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tests" component={Tests} />
            <Route exact path="/applications" component={Applications} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/login" component={LogIn} />
            <Route
              exact
              path="/application/:id"
              render={
            (routeProps) => (applications[routeProps.match.params.id]
              ? <AppInfo application={applications[routeProps.match.params.id]} />
              : <h1>Nothing to display...</h1>)
          }
            />
            <Route
              exact
              path="/test/:id"
              render={
            (routeProps) => (tests[routeProps.match.params.id]
              ? <TestInfo test={tests[routeProps.match.params.id]} />
              : <h1>Nothing to display...</h1>)
          }
            />
          </Switch>
        )}
      <Footer />
    </>
  );
}

export default App;
