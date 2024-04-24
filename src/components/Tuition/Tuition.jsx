import React from 'react'
import AppNavbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
const Tuition = () => {
  return (
    <>
    <AppNavbar/>
    <div style={{ marginTop: '120px' }}>
      <div className="container py-3">
        <div className="row text-center mb-3">
          <h3>Tuition</h3>
          <div className="underline" style={{ width: '50px', height: '5px', margin: '0 auto', backgroundColor: '#f29200' }}></div>
        </div>
      </div>
    </div>
    <Footer/>
  </>
  )
}

export default Tuition
