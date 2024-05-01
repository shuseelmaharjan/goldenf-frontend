import React from 'react';
import LogOut from './LogOut';

const Home = ({ user }) => {
  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome! {user}</div>
      </div>
      <div>This is the home page.</div>
      <LogOut/>
    </div>
  );
};

export default Home;
