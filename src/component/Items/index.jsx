import React from "react";
import { Link } from "react-router-dom";

const Items = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <h2 className="text-center text-3xl text-blue-800 font-bold mb-5">
        All Products Available
      </h2>

      <div className="space-y-4 md:py-10 md:columns-3 p-4 mb-6">
        <div className="mx-auto md:w-full overflow-hidden group rounded-md text-center">
          <img
            src="/assets/images/smart.png"
            alt="Smart Case"
            className="object-fit transition-transform duration-500 group-hover:scale-105 md:h-full mb-2 h-96   "
          />
          <Link to="/SmartCase" className=" text-blue-900 text-xl font-bold">
            Smart Case
          </Link>
        </div>

        <div className="mx-auto md:w-full overflow-hidden group rounded-md text-center">
          <img
            src="/assets/images/smart.png"
            alt="Smart Case"
            className="object-fit transition-transform duration-500 group-hover:scale-105 md:h-full mb-2 h-96 "
          />
          <Link to="/SmartCase" className=" text-blue-900 text-xl font-bold">
            First Class Case
          </Link>
        </div>

        <div className="mx-auto md:w-full overflow-hidden group rounded-md text-center">
          <img
            src="/assets/images/smart.png"
            alt="Smart Case"
            className="object-fit transition-transform duration-500 group-hover:scale-105 md:h-full mb-2  h-96"
          />
          <Link to="/SmartCase" className=" text-blue-900 text-xl font-bold">
            Premium Case
          </Link>
        </div>
      </div>

      <div className="space-y-4 md:py-10 md:columns-3 p-4 mb-6">
        <div className="mx-auto md:w-full overflow-hidden group rounded-md text-center">
          <img
            src="/assets/images/pink.png"
            alt="Smart Case"
            className="object-fit transition-transform duration-500 group-hover:scale-105 md:h-full mb-2 h-96 "
          />
          <Link to="/SmartCase" className=" text-blue-900 text-xl font-bold">
            Bronze Pins
          </Link>
        </div>

        <div className="mx-auto md:w-full overflow-hidden group rounded-md text-center">
          <img
            src="/assets/images/pink.png"
            alt="Smart Case"
            className="object-fit transition-transform duration-500 group-hover:scale-105 md:h-full mb-2 h-96 "
          />
          <Link to="/SmartCase" className=" text-blue-900 text-xl font-bold">
            Colourful Pins
          </Link>
        </div>
        <div className="mx-auto md:w-full overflow-hidden group rounded-md text-center">
          <img
            src="/assets/images/pink.png"
            alt="Smart Case"
            className="object-fit transition-transform duration-500 group-hover:scale-105 md:h-full mb-2 h-96"
          />
          <Link to="/SmartCase" className=" text-blue-900 text-xl font-bold">
            Letters
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Items;
