import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { hero } from '../../data/landing';

function Hero() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };


  return (
    <section className="flex flex-col md:flex-row lg:space-x-8 items-center text-center py-16 bg-yellow-300">
      <div className="md:w-4/5 px-6">
        <h1 className="text-4xl font-bold text-blue-800">Design Your Unique Passport Case with Custom Pins</h1>
        <p className="mt-4 text-lg text-gray-600">
          Express your individuality with our custom passport cases. Choose your favorite pins and create a travel accessory that tells your story. Whether it’s for your next adventure or as a special gift, make it uniquely yours.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-800 text-white rounded hover:bg-blue-600 font-bold">Create Now</button>
      </div>
      <div className="w-4/5 sm:w-3/5 lg:w-2/5 px-6 mt-8 md:mt-0 flex justify-center items-center ">
        <Slider {...settings} className="w-full h-full">
          {hero.Images.map((src, index) => (
            <div key={index}>
              <img src={src} className="w-full h-full object-cover rounded-lg" alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Hero;
