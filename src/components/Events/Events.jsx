import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import apiClient from '../apiClient';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiClient.get('/api/events/');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div style={{ marginTop: '120px' }}>
        <div className="container py-3">
          <div className="row text-center mb-3">
            <h3>Events</h3>
            <div className="underline" style={{ width: '50px', height: '5px', margin: '0 auto', backgroundColor: '#f29200' }}></div>
          </div>
          <div className="row">
            {events.length === 0 ? (
              <div className="col-12 text-center">
                <p>No post have published yet.</p>
              </div>
            ) : (
              events.slice().reverse().map((event) => (
                <div key={event.id} className="col-md-4 mb-4">
                  <div className="card">
                    <img src={event.image} className="card-img-top" alt={event.name} style={{width:'100%', height:'200px', objectFit:'cover'}}/>
                    <div className="card-body">
                      <h5 className="card-title">{event.name}</h5>
                      <p className="card-text" dangerouslySetInnerHTML={{ __html: event.description.substring(0, 100) + (event.description.length > 150 ? '...' : '') }}></p>
                      <Link to={`/events/${event.slug}`} className="btn btn-primary">Read More</Link>
                    </div>
                    <div className="card-footer text-muted">Published Date: {formatDate(event.posted_date)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Events;