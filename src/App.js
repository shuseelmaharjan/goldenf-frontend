import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import Courses from './components/Courses/Courses';
import Language from './components/Language/Language';
import Tuition from './components/Tuition/Tuition';
import BridgeCourse from './components/BridgeCourse/BridgeCourse';
import Events from './components/Events/Events';
import Syllabus from './components/Syllabus/Syllabus';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import OnlineApplication from './components/Navbar/OnlineApplication';
import PopularCourse from './components/HomePage/PopularCourse'; // Import PopularCourse component
import CourseDetails from './components/Slug/CourseDetails'; // Import the CourseDetails component
import LanguageDetails from './components/Slug/LanguageDetails';


function App() {
  return (
    <Router>
      <div>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/popular-courses' element={<PopularCourse />} /> {/* Add route for PopularCourse */}
          <Route path="/courses/:slug" element={<CourseDetails />} /> {/* Define route with dynamic slug */}
          <Route path='/languages' element={<Language />} />
          <Route path='languages/:slug' element={<LanguageDetails/>}/>
          <Route path='/tuition' element={<Tuition />} />
          <Route path='/bridgecourse' element={<BridgeCourse />} />
          <Route path='/events' element={<Events />} />
          <Route path='/syllabus' element={<Syllabus />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/online-application' element={<OnlineApplication />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
