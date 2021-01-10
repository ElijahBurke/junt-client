import React from 'react';
import './App.scss';
import Nav from './Components/Nav/Nav';
import SideNav from './Components/Nav/SideNav/SideNav';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <>
      <div className="nav-buffer" />
      <Nav />
      <SideNav />
      <Home />
      <Footer />
    </>
  );
}

export default App;
