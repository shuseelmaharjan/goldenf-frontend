import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import apiClient from '../apiClient';
import './BannerCarousel.css';

function BannerCarousel() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await apiClient.get('/api/all-banners/');
        if (response.status === 200) {
          setBanners(response.data);
        } else {
          throw new Error('Failed to fetch banners');
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <Carousel fade interval={5000} pause={false}>
      {banners.map((banner, index) => (
        <Carousel.Item key={index}>
          <img src={banner.image} alt={`Banner ${index}`} className="carousel-image" />
          <div className="overlay"></div>
          <Carousel.Caption>
            <div className="row d-block">
              <h3>{banner.title ? banner.title : `Welcome to Golden Future Institute`}<br /></h3>
              <p>{banner.caption ? banner.caption : ``}<br /></p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BannerCarousel;
