import React from 'react';
import PopularCourse from './PopularCourse'; 
import ComputerCourse from './ComputerCourse';
import IconsCarousel from './IconsCarousel';
import CeoMessage from './CeoMessage';
import BlogPost from './BlogPost';
import AppNavbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import LearnExcellancy from './LearnExcellancy';
import BannerCarousel from './BannerCarousel';
import Testimonials from './Testimonials';

const HomePage = () => {
  return (
    <>
    <AppNavbar />

    <div style={{ marginTop: '120px' }}>
      <BannerCarousel/>
      <PopularCourse/>
      <LearnExcellancy/>
      <ComputerCourse/>
      <IconsCarousel/>
      <CeoMessage/>
      <Testimonials/>
      <BlogPost/>
    </div>
    <Footer/>
    </>
  );
};

export default HomePage;
