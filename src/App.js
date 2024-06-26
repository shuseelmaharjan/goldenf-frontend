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
import Dashboard from './components/Dashboard/Dashboard';
import Exams from './components/Dashboard/Exams';
import ChangePassword from './components/Dashboard/ChangePassword';
import ExamPage from './components/Slug/ExamPage'; 
import ExamHistroy from './components/Dashboard/ExamHistroy';
import LoginUser from './components/Login/LoginUser';
import AboutInstitute from './components/HomePage/AboutInstitute';
import SyllabusDetails from './components/Slug/SyllabusDetails';
import EventDetails from './components/Slug/EventDetails';
import Downloads from './components/HomePage/Downloads';
import LogOut from './components/Dashboard/LogOut';
import CreateQuestions from './components/Dashboard/CreateQuestions';
import ScheduleExam from './components/Dashboard/ScheduleExam';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
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
          <Route path='/syllabus/:slug' element={<SyllabusDetails />} />
          <Route path='/events/:slug' element={<EventDetails />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/downloads' element={<Downloads />} />
          <Route path='/about-us' element={<AboutInstitute />} />
          <Route path="/login" element={<LoginUser setLoggedIn={setLoggedIn} />} />
          <Route path='/online-application' element={<OnlineApplication />} />
          <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Navigate to="/login"/>} />
          <Route path='/exams' element={loggedIn ? <Exams /> : <Navigate to="/login"/>}/>
          <Route path='/change-password' element={loggedIn ? <ChangePassword /> : <Navigate to="/login"/>}/>
          <Route path="/exam/:slug" element={loggedIn ? <ExamPage /> : <Navigate to="/login"/>} /> 
          <Route path="/exam/examhistory" element={loggedIn ? <ExamHistroy /> : <Navigate to="/login"/>} /> 
          <Route path="/create-questions" element={loggedIn ? <CreateQuestions /> : <Navigate to="/login"/>} /> 
          <Route path="/schedule-exam" element={loggedIn ? <ScheduleExam /> : <Navigate to="/login"/>} /> 
          <Route path="/logout" element={<LogOut />} /> 
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
