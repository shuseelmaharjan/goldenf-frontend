import React from 'react';

const Events = () => {
  return (
    <div style={{ marginTop: '120px' }}>
      <div className="container py-3">
        <div className="row text-center mb-3">
          <h3>Events</h3>
          <div className="underline" style={{ width: '50px', height: '5px', margin: '0 auto', backgroundColor: '#f29200' }}></div>
        </div>
        <div className="row">
          {/* Blog Post 1 */}
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="https://via.placeholder.com/300" className="card-img-top" alt="Event 1" />
              <div className="card-body">
                <h5 className="card-title">Event Title 1</h5>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fringilla lectus vel felis lobortis, sit amet dapibus ex porta.</p>
                <button className="btn btn-primary">Read More</button> {/* Replace anchor with button */}
              </div>
              <div className="card-footer text-muted">Published Date</div>
            </div>
          </div>
          
          {/* Blog Post 2 */}
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="https://via.placeholder.com/300" className="card-img-top" alt="Event 2" />
              <div className="card-body">
                <h5 className="card-title">Event Title 2</h5>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fringilla lectus vel felis lobortis, sit amet dapibus ex porta.</p>
                <button className="btn btn-primary">Read More</button> {/* Replace anchor with button */}
              </div>
              <div className="card-footer text-muted">Published Date</div>
            </div>
          </div>
          
          {/* Blog Post 3 */}
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="https://via.placeholder.com/300" className="card-img-top" alt="Event 3" />
              <div className="card-body">
                <h5 className="card-title">Event Title 3</h5>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fringilla lectus vel felis lobortis, sit amet dapibus ex porta.</p>
                <button className="btn btn-primary">Read More</button> {/* Replace anchor with button */}
              </div>
              <div className="card-footer text-muted">Published Date</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
