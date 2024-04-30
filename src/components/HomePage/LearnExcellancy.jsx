import React from 'react';

const LearnExcellancy = () => {
  return (
    <div className="container-fluid mt-4 py-3" style={{ background: '#E9F5FE' }}>
      <div className="row text-center mb-3">
        <div className="col">
          <h5>You Can Learn</h5>
          <h3>Start your journey to a better life with our practical learning approach</h3>
        </div>
      </div>

      <div className="row my-2 justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card bg-light border-0 shadow-sm mb-4">
            <div className="card-body d-flex align-items-center">
              <div className="icon mr-4" style={{fontSize: '2.5rem' }}>
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <div className='mx-3'>
                <h4 className="card-title" style={{color:'#f29200'}}>Excellency</h4>
                <p className="card-text">Learn from the best and excel in your field.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-5">
          <div className="card bg-light border-0 shadow-sm mb-4">
            <div className="card-body d-flex align-items-center">
              <div className="icon mr-4" style={{ fontSize: '2.5rem' }}>
                <i className="fa-solid fa-trophy"></i>
              </div>
              <div className='mx-3'>
                <h4 className="card-title" style={{color:'#f29200'}}>Our Achievements</h4>
                <p className="card-text">Discover our success stories and achievements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-2 justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card bg-light border-0 shadow-sm mb-4">
            <div className="card-body d-flex align-items-center">
              <div className="icon mr-4" style={{fontSize: '2.5rem' }}>
                <i className="fa-solid fa-book-open"></i>
              </div>
              <div className='mx-3'>
                <h4 className="card-title" style={{color:'#f29200'}}>Academic Policies</h4>
                <p className="card-text">Explore our academic policies and guidelines.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-5">
          <div className="card bg-light border-0 shadow-sm mb-4">
            <div className="card-body d-flex align-items-center">
              <div className="icon mr-4" style={{fontSize: '2.5rem' }}>
                <i className="fa-solid fa-award"></i>
              </div>
              <div className='mx-3'>
                <h4 className="card-title" style={{color:'#f29200'}}>Scholarship and Awards</h4>
                <p className="card-text">Learn about our scholarship programs and awards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnExcellancy;
