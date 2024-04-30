import React, { useState } from 'react';
import apiClient from '../apiClient'; 
import AppNavbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    subject: '',
    message: '',
    phone: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });

  const [success, setSuccess] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidEmail = /\S+@\S+\.\S+/.test(formData.email);
    const isValidphone = /^\d{10}$/.test(formData.phone);
    if (!isValidEmail) {
      setErrors({ ...errors, email: 'Invalid email' });
    } else if (!isValidphone) {
      setErrors({ ...errors, phone: 'Invalid phone number' });
    } else {
      try {
        setErrors({ email: '', phone: '' });
        await apiClient.post('/api/create-contact/', formData);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false); 
        }, 3000);
        setFormData({
          full_name: '',
          email: '',
          subject: '',
          message: '',
          phone: ''
        });
      } catch (error) {
        console.error('Error submitting contact form:', error);
        alert('An error occurred while submitting the contact form. Please try again later.');
      }
    }
  };

  return (
    <>
      <AppNavbar/>
      
      <div style={{ marginTop: '120px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }} className="container py-3">
        <div className="row text-center mb-3">
          <h3>Contact</h3>
          <div className="underline" style={{ width: '50px', height: '5px', margin: '0 auto', backgroundColor: '#f29200' }}></div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="row">
              <h4 className="ml-3" style={{ paddingLeft: '2rem' }}>Get in Touch with Us</h4>
              <div className="col-12 mt-2">
                <div className="d-flex align-items-center" style={{ paddingLeft: '2rem' }}>
                  <span className="icon mr-2"><i className="fa-solid fa-envelope"></i></span>
                  <a href="mailto:goldenfutureinstitute1@gmail.com" style={{ textDecoration: 'none', color: 'black', marginLeft: '10px' }}>goldenfutureinstitute1@gmail.com</a>
                </div>
                <div className="d-flex align-items-center mt-2" style={{ paddingLeft: '2rem' }}>
                  <span className="icon mr-2"><i className="fa-solid fa-phone"></i></span>
                  <a href="tel:+977-01-5108166" style={{ textDecoration: 'none', color: 'black', marginLeft: '10px' }}>01-5108166</a>,
                  <a href="tel:+977-9813940696" style={{ textDecoration: 'none', color: 'black', marginLeft: '10px' }}>9813940696</a>
                </div>
                <div className="d-flex align-items-center mt-2" style={{ paddingLeft: '2rem' }}>
                  <span className="icon mr-2"><i className="fa-solid fa-location-dot"></i></span>
                  <span style={{ marginLeft: '10px' }}>Satungal, Chandragiri-11, Kathmandu</span>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.7059742276452!2d85.25232080720956!3d27.68670241882602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb229346686321%3A0xfd893f2b4a26070e!2sGolden%20Future%20Institute!5e0!3m2!1sen!2snp!4v1713265806686!5m2!1sen!2snp"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title='Golden Future Institute'
                ></iframe>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="full_name" className="form-label">Full Name:</label>
                <input type="text" className="form-control" name="full_name" value={formData.full_name} onChange={handleChange} />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
              </div>
              <div className="form-group mt-2">
                <label htmlFor="phone" className="form-label">Phone Number:</label>
                <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
              </div>
              <div className="form-group mt-2">
                <label htmlFor="subject" className="form-label">Subject:</label>
                <input type="text" className="form-control" name="subject" value={formData.subject} onChange={handleChange} />
              </div>
              <div className="form-group mt-2 mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea name="message" id="message" className="form-control" cols="10" rows="4" value={formData.message} onChange={handleChange}></textarea>
              </div>
              <div className="form-group mt-2 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">Send</button>
              </div>
            </form>
            {success && ( 
              <div className="alert alert-success my-3" role="alert">
                Contact form submitted successfully!
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Contact;
