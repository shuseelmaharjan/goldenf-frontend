import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Courses from './components/Courses/Courses';
import Language from './components/Language/Language';
import Tuition from './components/Tuition/Tuition';
import BridgeCourse from './components/BridgeCourse/BridgeCourse';
import Events from './components/Events/Events';
import Syllabus from './components/Syllabus/Syllabus';
import Contact from './components/Contact/Contact';
import OnlineApplication from './components/Navbar/OnlineApplication';
import PopularCourse from './components/HomePage/PopularCourse';
import CourseDetails from './components/Slug/CourseDetails';
import LanguageDetails from './components/Slug/LanguageDetails';
import NotFound from './NotFound/NotFound';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Exams from './components/Dashboard/Exams';
import ChangePassword from './components/Dashboard/ChangePassword';
import ExamPage from './components/Slug/ExamPage'; 
import ExamHistroy from './components/Dashboard/ExamHistroy';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('user') !== null;
    setLoggedIn(userLoggedIn);
    setLoading(false); 
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/popular-courses' element={<PopularCourse />} />
          <Route path="/courses/:slug" element={<CourseDetails />} />
          <Route path='/languages' element={<Language />} />
          <Route path='/languages/:slug' element={<LanguageDetails/>}/>
          <Route path='/tuition' element={<Tuition />} />
          <Route path='/bridgecourse' element={<BridgeCourse />} />
          <Route path='/events' element={<Events />} />
          <Route path='/syllabus' element={<Syllabus />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path='/online-application' element={<OnlineApplication />} />
          <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Navigate to="/login"/>} />
          <Route path='/exams' element={<Exams/>}/>
          <Route path='/change-password' element={<ChangePassword/>}/>
          <Route path="/exam/:slug" element={<ExamPage />} /> 
          <Route path="/exam/examhistory" element={<ExamHistroy />} /> 
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
