import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';
import { Link } from 'react-router-dom';
const BlogPost = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/api/last-three-events/');
        setEvents(response.data);  
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);  

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const truncateDescription = (description, maxLength) => {
    const lines = description.split('<p>').filter(Boolean).slice(0, 2);
    const truncatedDescription = lines.join('<p>').substring(0, maxLength);
    return truncatedDescription;
  };

  return (
    <div className='container mb-3 mt-3 my-3 py-3' style={{ overflow: 'hidden' }}>
      <div className="row text-center mb-3">
        <h3>Events / Seminars</h3>
        <div className="underline"></div>
      </div> 
      {events.length > 0 ? (
        <div className="row">
          {events.map(event => (
            <div key={event.id} className="col-md-4 mb-3">
              <div className="card">
                <img src={event.image} className="card-img-top" alt={event.name} style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  
                  <Link to={`/events/${event.slug}`} style={{textDecoration:'none', color:'#000'}}><h5 className="card-title">{event.name}</h5></Link>
                  <p className="card-text" dangerouslySetInnerHTML={{ __html: truncateDescription(event.description, 100) }}></p>
                  {event.description.length > 50 && (
                      <Link to={`/events/${event.slug}`} className="btn btn-primary btn-sm">Read More</Link>
                    )}
                  <div className="row d-flex justify-content-end">
                    <div className="col-auto">
                    <small className="text-muted">Posted Date: {formatDate(event.posted_date)}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No events to display.</p>
      )}
    </div>
  );
};

export default BlogPost;
