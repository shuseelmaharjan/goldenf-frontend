import React from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';


const ChangePassword = () => {
  return (
    <div className='main d-flex' style={{width:'100%', height:'100vh'}}>
        <Sidebar/>
        <div className="wrapper">
          <Topbar/>
          <div className="main-content">
            <div className="container">
                <div className="row">
                    <h5>Change Password</h5>
                </div>
              <div className="box">
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ChangePassword
