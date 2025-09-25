import React from "react";
import { Wedo } from '../../data/landing';

const WhatWeDo = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full text-center py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{fontFamily: "'Fredoka One', cursive"}}>
           What We Do
          </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4">
        {Wedo.Items.map((item, index) => (
          <React.Fragment key={index}>
            {/* Image Container */}
            <div className="relative group w-full aspect-square">
              <img
                src={item.image}
                className="w-full h-full object-cover shadow-lg"
                alt="Feature"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Colorful Square with Phrase */}
            <div
              className={`relative flex items-center justify-center w-full aspect-square ${
                Wedo.colors[index % Wedo.colors.length]
              } transition-all duration-300 overflow-hidden`}
            >
              <p className="text-white text-2xl font-thin text-center px-6 relative z-10 student-text" style={{fontFamily: "'Poppins', sans-serif"}}>
                {item.text}
              </p>
              <div className="absolute inset-0 bg-white opacity-0 hover:opacity-60 transition-opacity duration-300"></div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WhatWeDo;
