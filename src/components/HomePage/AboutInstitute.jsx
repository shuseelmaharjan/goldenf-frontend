import React from 'react'
import AppNavbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const AboutInstitute = () => {
  window.scrollTo(0, 0); 
  return (
    <>
    <AppNavbar/>
    <div style={{ marginTop: '130px' }}>
      <div className="container py-3">
        <div className="row text-center mb-3">
          <h3>About Golden Future Institute</h3>
          <div className="underline" style={{ width: '50px', height: '5px', margin: '0 auto', backgroundColor: '#f29200' }}></div>
        </div>
        <div className="row">
            <p>Golden Future Institute, nestled in the heart of Chandragiri-11, Satungal Kathmandu, stands as a beacon of educational excellence. Our institute is renowned for its comprehensive array of computer courses, catering to students eager to delve into the realm of technology and innovation. From programming languages to software applications, we offer top-notch training that equips learners with the tools they need to thrive in today's digital landscape.</p>
            <br />
            <p>
                In addition to our esteemed computer courses, Golden Future Institute extends its educational offerings to encompass a wide range of tutoring services. Students from various academic levels, including school and +2, benefit from personalized guidance and support across subjects. Our dedicated team of educators ensures that each student receives the attention and resources necessary to excel academically and achieve their fullest potential.</p>
                <br />
                <p>Furthermore, Golden Future Institute goes beyond traditional education by providing language classes designed to broaden horizons and foster cultural understanding. Whether it's mastering English for global communication, delving into the intricacies of Korean language and culture, or exploring the nuances of Japanese, our language programs offer enriching experiences that prepare students for a diverse and interconnected world. Join us at Golden Future Institute, where knowledge meets opportunity and dreams take flight.
                </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>

  )
}

export default AboutInstitute
