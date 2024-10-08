"use client";
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/app/globals.css";

// handle button untuk navigasi carousel
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-next-arrow `}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-prev-arrow`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

export default function CarouselHero() {
    const settings = {
      
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

  return (
    <div className="slider-container relative overflow-hidden">
      <Slider {...settings} className="w-full h-full">
        <div className='w-full h-full'>
            <img src="/images/hero1.webp" alt="" className='w-full h-[50vh] object-fill'/>
        </div>
        <div className='w-full h-full'>
            <img src="/images/hero2.webp" alt="" className='w-full h-[50vh] object-fill'/>
        </div>
        <div className='w-full h-full'>
            <img src="/images/hero3.jpg" alt="" className='w-full h-[50vh] object-fill'/>
        </div>
        <div className='w-full h-full'>
            <img src="/images/hero4.jpg" alt="" className='w-full h-[50vh] object-fill'/>
        </div>
        <div className='w-full h-full'>
            <img src="/images/hero5.jpg" alt="" className='w-full h-[50vh] object-fill'/>
        </div>
      </Slider>
    </div>
  );
}
