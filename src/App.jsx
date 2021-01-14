import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import SideNav from './Components/Nav/SideNav/SideNav';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Applications from './Components/Applications/Applications';
import Dashboard from './Components/Dashboard/Dashboard';
import LogIn from './Components/LogIn/LogIn';
import AppInfo from './Components/AppInfo/AppInfo';

function App() {
  return (
    <>
      <div className="nav-buffer" />
      <Nav />
      <SideNav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/applications" component={Applications} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/application/:id" render={(routeProps) => <AppInfo id={routeProps.match.params.id} />} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
