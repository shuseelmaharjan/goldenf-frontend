import React, { useState, useEffect } from 'react';
import AppNavbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import apiClient from '../apiClient';
import { Link } from 'react-router-dom';
import './Downloads.css';

const Downloads = () => {
    const [adData, setAdData] = useState([]);
    const [downloadData, setDownloadsFiles] = useState([]);
    const [showDescription, setShowDescription] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/api/resources-list/');
                setDownloadsFiles(response.data);
                const initialShowDescriptionState = {};
                response.data.forEach(item => {
                    initialShowDescriptionState[item.id] = false;
                });
                setShowDescription(initialShowDescriptionState);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/api/get-random-ads4/');
                if (response && response.data) {
                    setAdData(response.data);
                } else {
                    console.error('Empty response data');
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    const toggleDescription = id => {
        setShowDescription(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <>
            <AppNavbar />
            <div style={{ marginTop: '130px' }}>
                <div className="container py-3">
                    <div className="row text-center mb-3">
                        <h3>Downloads</h3>
                        <div className="underline" style={{ width: '50px', height: '5px', margin: '0 auto', backgroundColor: '#f29200' }}></div>
                    </div>
                    <div className="row">
                        <div className="col-lg-9">
                            <p>Golden Future Institute offers a diverse range of software downloads tailored to enhance your learning experience. Our collection includes tools beneficial for both students and everyday users, ensuring convenience and efficiency in various tasks. Explore our repository and discover the software solutions that cater to your needs.</p>
                            {downloadData.map(download => (
                                <div key={download.id} className="mb-3">
                                    <div
                                        className={`shadow download-card ${
                                            showDescription[download.id] ? 'expanded' : ''
                                            }`}
                                    >
                                        <div
                                            className="row d-flex justify-content-between align-items-center"
                                            onClick={() => toggleDescription(download.id)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="col-auto">
                                                <h4 style={{fontSize:'1.2rem'}}>{download.title}</h4>
                                            </div>
                                            <div className="col-auto">
                                                <i
                                                    className={`fa-solid fa-arrow-${
                                                        showDescription[download.id] ? 'down' : 'up'
                                                        }`}
                                                ></i>
                                            </div>
                                        </div>
                                       
                                        {showDescription[download.id] && (
    <div className="row mt-3 d-block">
        {download.image ? (
            <div className="col-auto">
                <img src={download.image} alt="Download" style={{ width: '100%' }} onClick={() => window.open(download.image, '_blank')} />
                <a href={download.image} download className="btn btn-primary">Download Image</a>
            </div>
        ) : null}
        {download.file ? (
            <div className="col-auto">
                {/* Check the file extension and display appropriate button */}
                {download.file.endsWith('.pdf') ? (
                    <a href={download.file} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Open PDF</a>
                ) : download.file.endsWith('.doc') ? (
                    <a href={download.file} download className="btn btn-primary">Download DOC</a>
                ) : download.file.endsWith('.ppt') ? (
                    <a href={download.file} download className="btn btn-primary">Download PPT</a>
                ) : (
                    <a href={download.file} download className="btn btn-primary">Download File</a>
                )}
            </div>
        ) : null}
        {download.link ? (
            <div className="col-auto">
                <a href={download.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Download Link</a>
            </div>
        ) : null}
        <div className="col mt-3">
            <p dangerouslySetInnerHTML={{ __html: download.description }}></p>
        </div>
    </div>
)}




                                    </div>
                                </div>
                            ))}
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
            </div>
            <Footer />
        </>

    )
}

export default Downloads;
