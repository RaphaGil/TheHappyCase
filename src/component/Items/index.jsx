import React, { useState } from "react";
import { Link } from "react-router-dom";
import { allItems } from '../../data/landing';

const Items = () => {
  // Define colors matching What We Do section
  const buttonColors = [
    'bg-orange-400 hover:bg-orange-500',
    'bg-blue-400 hover:bg-blue-500', 
    'bg-green-400 hover:bg-green-500'
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decoration with different shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Hexagonal shapes */}
        <div className="absolute top-16 left-16 w-24 h-24 bg-orange-200 opacity-25 animate-pulse" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}></div>
        <div className="absolute top-32 right-24 w-20 h-20 bg-blue-200 opacity-20 animate-bounce" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', animationDelay: '1s', animationDuration: '3s'}}></div>
        
        {/* Diamond shapes */}
        <div className="absolute bottom-24 left-32 w-28 h-28 bg-green-200 opacity-30 animate-pulse" style={{clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 right-16 w-16 h-16 bg-pink-200 opacity-25 animate-bounce" style={{clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', animationDelay: '0.5s', animationDuration: '2.5s'}}></div>
        
        {/* Triangle shapes */}
        <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-orange-300 opacity-20 animate-pulse" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/3 right-1/3 w-14 h-14 bg-blue-300 opacity-25 animate-bounce" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animationDelay: '3s', animationDuration: '2s'}}></div>
        
        {/* Star shapes */}
        <div className="absolute top-1/4 right-1/4 w-18 h-18 bg-green-300 opacity-20 animate-pulse" style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-pink-300 opacity-30 animate-bounce" style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', animationDelay: '0.8s', animationDuration: '3.5s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 tracking-tight" 
              style={{fontFamily: "'Fredoka One', cursive"}}>
            Products Available
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed" 
             style={{fontFamily: "'Poppins', sans-serif"}}>
            Choose from our premium collection of passport cases
          </p>
        </div>
      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {allItems.map((item, index) => (
            <ProductCard key={index} item={item} buttonColor={buttonColors[index % buttonColors.length]} />
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ item, buttonColor }) => {
  const [selectedImage, setSelectedImage] = useState(item.images[0].src);
  const [selectedColor, setSelectedColor] = useState(item.images[0].color);

  return (
    <div className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-2">
      {/* Product Image */}
      <div className="relative mb-6">
        <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-100 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
          <img
            src={selectedImage}
            alt={item.text}
            className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-105"
          />
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      </div>

      {/* Color Selector */}
      <div className="flex justify-center space-x-3 mb-6">
        {item.images.map((img, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedImage(img.src);
              setSelectedColor(img.color);
            }}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ${img.color} ${
              selectedColor === img.color ? 'border-3 border-gray-400 scale-110 shadow-lg' : 'border-2 border-gray-200'
            } hover:border-gray-400 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg`}
          ></button>
        ))}
      </div>

      {/* Product Info */}
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300" 
            style={{fontFamily: "'Fredoka One', cursive"}}>
          {item.text}
        </h3>
        <p className="text-lg sm:text-xl text-gray-600 font-semibold mb-6" 
           style={{fontFamily: "'Poppins', sans-serif"}}>
          {item.price}
        </p>
        
        {/* Create Now Button */}
        <Link
          to="/pages/CreateYours"
          className={`inline-block ${buttonColor} text-white font-bold py-3 px-6 sm:px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}
          style={{fontFamily: "'Poppins', sans-serif"}}
        >
          Create Now
        </Link>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-6 h-6 bg-white/20 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 w-4 h-4 bg-white/20 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
    </div>
  );
};

export default Items;
