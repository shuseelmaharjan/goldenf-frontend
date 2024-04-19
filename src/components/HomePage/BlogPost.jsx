import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './PopularCourse.css';

const BlogPost = () => {
  const [courses, setCourses] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setCourses(data.products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      const maxContentHeight = Math.max(...Array.from(contentRef.current.children).map(child => child.clientHeight));
      Array.from(contentRef.current.children).forEach(child => {
        child.style.height = `${maxContentHeight}px`;
      });
    }
  }, [courses]);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
  };

  return (
    <div className='container mb-3 mt-3 my-3 py-3' style={{ overflow: 'hidden' }}>
      <div className="row text-center mb-3">
        <h3>Events / Seminars</h3>
        <div className="underline"></div>
      </div>    
      <Slider {...settings}>
        {courses.map((blog, index) => (
          <div key={index} className="blogs mb-3 mt-3" style={{ border: '1px solid #ccc' }}>
            <div className="blog-item">
              <img className='card-img-top' src={blog.images} alt={blog.title} style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
            </div>
            <div className="blog-content px-2" ref={contentRef}>
              <h4>{blog.title}</h4>
              <p>{blog.description.substring(0, 100)}</p>
            </div>
            <div className="blog-footer px-2">
              <p>Posted Date: {blog.category}</p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="row d-flex justify-content-center">
        <button className='btn btn-sm btn-primary' style={{ width: '30%' }}>View More</button>
      </div>
    </div>
  );
};

export default BlogPost;
