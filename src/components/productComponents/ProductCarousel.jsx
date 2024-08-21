"use client";
import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const ProductCarousel = ({produk}) => {

  const [activeIndex, setActiveIndex] = useState(0);

  // handling slide navigation pada carousel
  const nextSlide = () => {
    setActiveIndex((activeIndex + 1) % produk.imgUrl.length);
  };

  const prevSlide = () => {
    setActiveIndex((activeIndex - 1 + produk.imgUrl.length) % produk.imgUrl.length);
  };


  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-2/3 min-h-[500px] relative me-10 overflow-hidden rounded-xl">
      <div className="h-[80%] relative overflow-hidden">
        {produk.imgUrl?.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-full h-full">
              <img
                src={image.image_url}
                alt={`Slide ${index + 1}`}
                className="object-cover blur-lg w-full h-full"
              />
            </div>
            <img
              src={image.image_url}
              alt={`Slide ${index + 1}`}
              className="w-auto h-auto max-w-full max-h-full absolute inset-0 m-auto"
            />
          </div>
        ))}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2"
          onClick={prevSlide}
        >
          <FaChevronLeft />
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2"
          onClick={nextSlide}
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="h-[20%] flex py-2 justify-center items-center bg-white">
        {produk.imgUrl?.map((image, index) => (
          <div
            key={index}
            className={`w-16 h-16 p-0 m-1 cursor-pointer rounded-xl overflow-hidden ${
              index === activeIndex ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => goToSlide(index)}
          >
            <img
              src={image.image_url}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
