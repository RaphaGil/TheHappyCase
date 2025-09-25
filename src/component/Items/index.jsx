import React, { useState } from "react";
import { Link } from "react-router-dom";
import { allItems } from '../../data/landing';

const Items = () => {
  return (
    <div className="relative h-full py-28 fle">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{fontFamily: "'Fredoka One', cursive"}}>
           Products Available
          </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allItems.map((item, index) => (
          <ProductCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ item }) => {
  const [selectedImage, setSelectedImage] = useState(item.images[0].src);
  const [selectedColor, setSelectedColor] = useState(item.images[0].color);

  return (
    <div className="aspect-square rounded-lg mb-4">
      <div className="h-38 sm:h-62 md:h-96 flex justify-center mb-4">
        <img
          src={selectedImage}
          alt={item.text}
          className="w-full object-cover rounded-lg transition-transform duration-500 transform hover:scale-105"
        />
      </div>
      <div className="flex justify-center space-x-2 mb-4">
        {item.images.map((img, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedImage(img.src);
              setSelectedColor(img.color);
            }}
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${img.color} ${
              selectedColor === img.color ? 'border-2 border-white scale-110' : 'border-2 border-transparent'
            } hover:border-gray-300 hover:scale-105 transition-all duration-300`}
          ></button>
        ))}
      </div>

      <div className="text-center flex flex-col items-center justify-end flex-grow">
        <p className="text-lg sm:text-xl font-light text-gray-700 student-text" style={{fontFamily: "'Poppins', sans-serif"}}>{item.text}</p>
        <p className="text-md sm:text-lg text-gray-600 font-bold student-text-bold" style={{fontFamily: "'Poppins', sans-serif"}}>{item.price}</p>
        <Link
          to="/pages/CreateYours"
          className="mt-3 sm:mt-4 bg-blue-800 py-2 px-4 sm:px-6 rounded-lg text-white font-bold hover:scale-105 transition-transform duration-300 student-text-bold"
          style={{fontFamily: "'Poppins', sans-serif"}}
        >
          Create Now
        </Link>
      </div>
    </div>
  );
};

export default Items;
