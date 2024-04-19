import React from 'react';
import PopularCourse from './PopularCourse'; 
import ComputerCourse from './ComputerCourse';
import IconsCarousel from './IconsCarousel';
import CeoMessage from './CeoMessage';
import BlogPost from './BlogPost';
// import BannerCarousel from './BannerCarousel';

const HomePage = () => {
  return (
    <div style={{ marginTop: '120px' }}>
      {/* <BannerCarousel/> */}
      <PopularCourse/>
      <div className="container-fluid mt-4 py-3" style={{ background: '#f9fafe' }}>
        <div className="row py-4">
          <div className="row text-center mb-3">
            <h5>You Can Learn</h5>
            <h3>Start your journey to a better life with our practical learning approach</h3>
          </div>
        </div>

        <div className="row my-2 d-flex justify-content-between">
          <div className="box-container d-flex justify-content-between" style={{ width: '80%', margin: '0 auto', boxShadow: '0 0 0 0.6' }}>
            <div className="box px-4 py-2" style={{ width: '45%', borderLeft: '5px solid #f29200', background:'#fff' }}>
              <div className="row">
                <div className="col-3" style={{ alignItems:'center', textAlign:'center', fontSize:'3rem' }}>
                  <i className="fa-solid fa-graduation-cap"></i>                    
                </div>
                <div className="col-12 col-md-9">
                  <h4 className="d-none d-md-block">Excellency</h4>
                  <p className="d-none d-md-block">This is the content for Test 1.</p>
                </div>
              </div>
            </div>

            <div className="box px-4 py-2" style={{ width: '45%', borderLeft: '5px solid #f29200', background:'#fff' }}>
              <div className="row">
                <div className="col-3" style={{ alignItems:'center', textAlign:'center', fontSize:'3rem' }}>
                  <i className="fa-solid fa-trophy"></i>                    
                </div>
                <div className="col-12 col-md-9">
                  <h4 className="d-none d-md-block">Our Achievements</h4>
                  <p className="d-none d-md-block">This is the content for Test 2.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-2 d-flex justify-content-between">
          <div className="box-container d-flex justify-content-between" style={{ width: '80%', margin: '0 auto', boxShadow: '0 0 0 0.6' }}>
            <div className="box px-4 py-2" style={{ width: '45%', borderLeft: '5px solid #f29200', background:'#fff' }}>
              <div className="row">
                <div className="col-3" style={{ alignItems:'center', textAlign:'center', fontSize:'3rem' }}>
                  <i class="fa-solid fa-book-open"></i>                   
                </div>
                <div className="col-12 col-md-9">
                  <h4 className="d-none d-md-block">Our academic policies</h4>
                  <p className="d-none d-md-block">This is the content for Test 1.</p>
                </div>
              </div>
            </div>

            <div className="box px-4 py-2" style={{ width: '45%', borderLeft: '5px solid #f29200', background:'#fff' }}>
              <div className="row">
                <div className="col-3" style={{ alignItems:'center', textAlign:'center', fontSize:'3rem' }}>
                  <i class="fa-solid fa-award"></i>                    
                </div>
                <div className="col-12 col-md-9">
                  <h4 className="d-none d-md-block">Scholarship and Awards</h4>
                  <p className="d-none d-md-block">This is the content for Test 2.</p>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
      <ComputerCourse/>
      <IconsCarousel/>
      <CeoMessage/>
      <BlogPost/>
    </div>

  );
};

export default HomePage;
