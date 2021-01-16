import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Hero from '../Hero/Hero';
import HomeInfo from './HomeInfo/HomeInfo';
import './Home.scss';
import UseNavigate from '../../Helpers/Hooks/UseNavigate';

function Home() {
  const user = useSelector((state) => state.user);
  const navigate = UseNavigate();
  useEffect(() => { if (user.name) navigate('tests')(); }, [user]);
  return (
    <>
      <Hero />
      <HomeInfo />
    </>
  );
}

export default Home;
