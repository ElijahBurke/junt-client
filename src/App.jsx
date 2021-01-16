import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from './Components/Nav/Nav';
import SideNav from './Components/Nav/SideNav/SideNav';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Tests from './Components/Tests/Tests';
import Dashboard from './Components/Dashboard/Dashboard';
import LogIn from './Components/LogIn/LogIn';
import AppInfo from './Components/AppInfo/AppInfo';
import CheckAuthenticated from './Helpers/Hooks/CheckAuthenticated';

function App() {
  const applications = useSelector((state) => state.applications);
  const checkingAuth = CheckAuthenticated();
  return (
    <>
      {!checkingAuth
    && (
    <>
      <div className="nav-buffer" />
      <Nav />
      <SideNav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/tests" component={Tests} />
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
      </Switch>
      <Footer />
    </>
    )}
    </>
  );
}

export default App;
