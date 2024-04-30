import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../apiClient';
import AppNavbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const EventDetails = () => {
    const { slug } = useParams();
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [adData, setAdData] = useState([]);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await apiClient.get(`/api/get-events/${slug}/`);
                setEvent(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false); 
            }
        };

        fetchEvent();
    }, [slug]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/api/get-random-ads2/');
                setAdData(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []); 

    if (isLoading) { 
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!event) {
        return <div>No data found for this event.</div>;
    }

    return (
        <>
            <AppNavbar />
            <div className="container" style={{ marginTop: '130px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <Link to="/" style={{ marginRight: '5px', color: 'black', textDecoration: 'none' }}>Home</Link>
                    <span>/</span>
                    <Link to="/events" style={{ marginLeft: '5px', marginRight: '5px', color: 'black', textDecoration: 'none' }}>Events</Link>
                    <span>/ </span>
                    <span>{event.name}</span>
                </div>

                <div className="row">
                    <div className="col-lg-9">
                        <div className="row">
                            <h2 style={{ color: '#333', zIndex: 1 }}>{event.name}</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: event.description }} style={{ zIndex: 1 }} />
                    </div>
                    <div className="col-lg-3">
                        {adData.map((item, index) => (
                            <div key={index} className="row mb-3">
                                <Link to={item.link}>
                                    <img src={`${apiClient.defaults.baseURL}${item.image}`} alt={item.title} className="img-fluid" style={{ width: '100%' }} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default EventDetails;
